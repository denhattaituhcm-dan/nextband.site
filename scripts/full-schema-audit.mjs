import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const prisma = new PrismaClient();

async function fullAudit() {
  try {
    const dbColumns = await prisma.$queryRawUnsafe(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
    `);

    const dbMap = {};
    for (const col of dbColumns) {
      if (!dbMap[col.table_name]) dbMap[col.table_name] = new Set();
      dbMap[col.table_name].add(col.column_name);
    }

    const schemaContent = fs.readFileSync("prisma/schema.prisma", "utf8");
    
    // Parse enums
    const enumNames = new Set(
      [...schemaContent.matchAll(/enum\s+(\w+)/g)].map(m => m[1])
    );
    const scalarTypes = new Set([
      "String", "Int", "Float", "Boolean", "DateTime", "Json", "Bytes", "Decimal", "BigInt"
    ]);

    const modelBlocks = schemaContent.split(/model\s+/).slice(1);

    const missingColumns = [];
    const missingTables = [];

    for (const block of modelBlocks) {
      const lines = block.split("\n");
      const modelName = lines[0].trim().split(/\s+/)[0];
      
      let tableName = modelName;
      const mapMatch = block.match(/@@map\("([^"]+)"\)/);
      if (mapMatch) {
        tableName = mapMatch[1];
      }

      if (!dbMap[tableName]) {
        missingTables.push({ modelName, tableName });
        continue;
      }

      for (const line of lines.slice(1)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("@@")) continue;
        const parts = trimmed.split(/\s+/);
        if (parts.length < 2) continue;
        const fieldName = parts[0];
        let baseType = parts[1].replace("?", "").replace("[]", "");

        // Only check fields that are scalars or enums
        if (!scalarTypes.has(baseType) && !enumNames.has(baseType)) {
          continue; // It's a relation
        }

        let dbColName = fieldName;
        const fieldMapMatch = trimmed.match(/@map\("([^"]+)"\)/);
        if (fieldMapMatch) {
          dbColName = fieldMapMatch[1];
        }

        if (!dbMap[tableName].has(dbColName)) {
          missingColumns.push({ modelName, tableName, fieldName, dbColName, fieldType: parts[1] });
        }
      }
    }

    console.log("=== MISSING TABLES ===");
    console.log(JSON.stringify(missingTables, null, 2));

    console.log("\n=== MISSING COLUMNS ===");
    console.log(JSON.stringify(missingColumns, null, 2));

  } catch (err) {
    console.error("Full audit error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

fullAudit();
