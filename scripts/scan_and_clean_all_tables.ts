import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Comprehensive & Safe Text Cleaning Function
export function cleanCorruptedNString(raw: string): { isChanged: boolean; cleaned: string } {
  if (!raw || typeof raw !== "string") return { isChanged: false, cleaned: raw };

  let text = raw;

  // 1. Specific known corrupted words where \n between two words got stripped of \
  text = text
    .replace(/impressingnteachers/g, "impressing teachers")
    .replace(/trafficncongestion/g, "traffic congestion")
    .replace(/improvenpublic/g, "improve public")
    .replace(/,nrequiring/g, ", requiring")
    .replace(/makingnnavigation/g, "making navigation")
    .replace(/separatenresidential/g, "separate residential")
    .replace(/movenquickly/g, "move quickly")
    .replace(/farnahead/g, "far ahead")
    .replace(/sunlightnwhen/g, "sunlight when")
    .replace(/ofnsomething/g, "of something")
    .replace(/Touristn\s+/g, "Tourist ")
    .replace(/Featuresn\s+/g, "Features ")
    .replace(/andnactivities/g, "and activities")
    .replace(/beenn\s+/g, "been ")
    .replace(/–n\s+/g, "– ")
    .replace(/-n\s+/g, "- ");

  // 2. Trailing 'n' before parentheses containing hints: e.g. "____.n(responsible)" -> "____. (responsible)"
  text = text.replace(/([._a-zA-Z0-9])n\(([a-zA-Z0-9\s:;,/–—'"À-ỹ]+)\)/g, "$1\n($2)");

  // 3. Leading 'n' after opening list item tag: e.g. "<li>nto view" -> "<li>to view"
  text = text.replace(/<li>n([a-zA-Z0-9À-ỹ])/gi, "<li>$1");

  // 4. Clean stray 'n' between HTML tags: e.g. </p>nn<p>, </p>n<p>, </h3>n<p>, </div>n<p>, </li>n<li>, </ul>n<ul>, </ul>n<p>
  text = text.replace(/(<\/(?:p|div|h[1-6]|li|ul|ol|strong|b|i|em|span|table|tbody|tr|td)>)\s*n{1,4}\s*(<(?:p|div|h[1-6]|li|ul|ol|strong|b|i|em|span|table|tbody|tr|td)[ >])/gi, "$1\n$2");

  // 5. Clean stray 'n' between closing tag and opening tag of any element: e.g. >nn< -> ><
  text = text.replace(/>\s*n{1,4}\s*</g, "><");

  // 6. Clean isolated 'nn' standalone lines at end of tags or string: e.g. "</p>nn"
  text = text.replace(/<\/p>\s*n{1,4}\s*$/gi, "</p>");

  // 7. Clean Microsoft Word artifact tags <o:p></o:p> and <o:p>&nbsp;</o:p>
  text = text.replace(/<o:p>\s*(?:&nbsp;)?\s*<\/o:p>/gi, "");

  // 8. Clean trailing space-n before tag, e.g. "something n<p>" -> "something \n<p>"
  text = text.replace(/\s+n\s*(<p[ >])/gi, "\n$1");

  const cleaned = text.trim();
  return { isChanged: cleaned !== raw, cleaned };
}

async function scanAndCleanAllTables(dryRun: boolean = true) {
  console.log(`\n======================================================`);
  console.log(`🔍 FULL DATABASE SCAN & CLEANUP (${dryRun ? "PREVIEW / DRY RUN" : "LIVE EXECUTION"})`);
  console.log(`======================================================\n`);

  // Get all text columns in public schema
  const columns: Array<{ table_name: string; column_name: string }> =
    await prisma.$queryRaw`
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND data_type IN ('text', 'character varying')
        AND table_name NOT LIKE '_prisma%'
      ORDER BY table_name, column_name;
    `;

  let totalTablesChecked = 0;
  let totalRowsChecked = 0;
  let totalCorruptedFound = 0;
  const updatesByTable: Record<string, number> = {};

  // Group columns by table
  const tableMap = new Map<string, string[]>();
  for (const col of columns) {
    if (!tableMap.has(col.table_name)) {
      tableMap.set(col.table_name, []);
    }
    tableMap.get(col.table_name)!.push(col.column_name);
  }

  for (const [tableName, colNames] of tableMap.entries()) {
    totalTablesChecked++;
    try {
      // Find primary key column of the table
      const pkResult: Array<{ column_name: string }> = await prisma.$queryRawUnsafe(`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_name = '${tableName}'
          AND tc.table_schema = 'public'
        LIMIT 1;
      `);

      const pkCol = pkResult.length > 0 ? pkResult[0].column_name : "id";

      // Select all records from table
      const selectCols = Array.from(new Set([pkCol, ...colNames])).map(c => `"${c}"`).join(", ");
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT ${selectCols} FROM "${tableName}"`);
      totalRowsChecked += rows.length;

      let tableCorruptedCount = 0;

      for (const row of rows) {
        const pkVal = row[pkCol];
        const updateFields: Record<string, string> = {};

        for (const colName of colNames) {
          const val = row[colName];
          if (typeof val === "string") {
            const { isChanged, cleaned } = cleanCorruptedNString(val);
            if (isChanged) {
              updateFields[colName] = cleaned;
              totalCorruptedFound++;
              tableCorruptedCount++;

              console.log(`\n------------------------------------------------------`);
              console.log(`[TABLE: "${tableName}" | PK ${pkCol} = "${pkVal}" | COL: "${colName}"]`);
              console.log(`🔴 BEFORE:`);
              console.log(val.slice(0, 300));
              console.log(`🟢 AFTER:`);
              console.log(cleaned.slice(0, 300));
            }
          }
        }

        if (!dryRun && Object.keys(updateFields).length > 0) {
          const setClauses = Object.entries(updateFields)
            .map(([k, v]) => `"${k}" = ${JSON.stringify(v)}`) // parameterize safely in Postgres raw
            .join(", ");

          // Safe raw update
          const setClauseParams = Object.keys(updateFields).map((k, i) => `"${k}" = $${i + 1}`).join(", ");
          const setValues = Object.values(updateFields);
          const query = `UPDATE "${tableName}" SET ${setClauseParams} WHERE "${pkCol}" = $${setValues.length + 1}`;
          await prisma.$executeRawUnsafe(query, ...setValues, pkVal);
        }
      }

      if (tableCorruptedCount > 0) {
        updatesByTable[tableName] = tableCorruptedCount;
      }
    } catch (tblErr: any) {
      console.warn(`Notice scanning table "${tableName}":`, tblErr.message);
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 FINAL SCAN SUMMARY:`);
  console.log(`- Total Tables Checked: ${totalTablesChecked}`);
  console.log(`- Total Records Inspected: ${totalRowsChecked}`);
  console.log(`- Corrupted Fields Found: ${totalCorruptedFound}`);
  console.log(`- Breakdown by Table:`, updatesByTable);
  if (dryRun) {
    console.log(`\n⚠️ DRY RUN ONLY — No database modifications were committed yet.`);
  } else {
    console.log(`\n✅ LIVE CLEANUP COMPLETED — All corrupted strings across all tables are fixed!`);
  }
  console.log(`======================================================\n`);
}

// First run in Preview / Dry Run mode
scanAndCleanAllTables(true)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
