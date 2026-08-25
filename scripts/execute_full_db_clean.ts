import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Precise cleaner that ONLY modifies text if a real corrupted pattern is present
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

  const isChanged = text !== raw;
  return { isChanged, cleaned: text };
}

async function scanAndCleanAllTables(dryRun: boolean = false) {
  console.log(`\n======================================================`);
  console.log(`🔍 FULL DATABASE SCAN & CLEANUP (${dryRun ? "PREVIEW / DRY RUN" : "LIVE DATABASE EXECUTION"})`);
  console.log(`======================================================\n`);

  // Target tables containing educational content, questions, exams, courses, and texts
  const targetTables = [
    "questions",
    "question_groups",
    "question_versions",
    "exam_sections",
    "exams",
    "exam_versions",
    "courses",
    "classes",
    "class_sessions",
    "student_questions",
    "announcements",
    "site_settings",
    "answers",
    "assessment_sessions",
    "profiles"
  ];

  let totalTablesChecked = 0;
  let totalRecordsChecked = 0;
  let totalCorruptedCleaned = 0;
  const tableStats: Record<string, number> = {};

  for (const tableName of targetTables) {
    totalTablesChecked++;
    try {
      // Introspect columns of this table
      const columns: Array<{ column_name: string }> = await prisma.$queryRawUnsafe(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = '${tableName}'
          AND data_type IN ('text', 'character varying')
      `);

      if (columns.length === 0) continue;

      const colNames = columns.map(c => c.column_name);

      // Find primary key column
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

      // Query rows
      const selectCols = Array.from(new Set([pkCol, ...colNames])).map(c => `"${c}"`).join(", ");
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT ${selectCols} FROM "${tableName}"`);
      totalRecordsChecked += rows.length;

      let tableCleanedCount = 0;

      for (const row of rows) {
        const pkVal = row[pkCol];
        const updates: Record<string, string> = {};

        for (const colName of colNames) {
          const val = row[colName];
          if (typeof val === "string") {
            const { isChanged, cleaned } = cleanCorruptedNString(val);
            if (isChanged) {
              updates[colName] = cleaned;
              totalCorruptedCleaned++;
              tableCleanedCount++;
              console.log(`[CLEANED] Table: "${tableName}" | PK: "${pkVal}" | Col: "${colName}"`);
            }
          }
        }

        if (!dryRun && Object.keys(updates).length > 0) {
          const setClause = Object.keys(updates).map((k, i) => `"${k}" = $${i + 1}`).join(", ");
          const setValues = Object.values(updates);
          const query = `UPDATE "${tableName}" SET ${setClause} WHERE "${pkCol}" = $${setValues.length + 1}`;
          await prisma.$executeRawUnsafe(query, ...setValues, pkVal);
        }
      }

      if (tableCleanedCount > 0) {
        tableStats[tableName] = tableCleanedCount;
      }
    } catch (err: any) {
      console.warn(`Notice on table ${tableName}:`, err.message);
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 FINAL FULL DATABASE SCAN REPORT:`);
  console.log(`- Total Tables Checked: ${totalTablesChecked}`);
  console.log(`- Total Records Inspected: ${totalRecordsChecked}`);
  console.log(`- Total Fields Cleaned: ${totalCorruptedCleaned}`);
  console.log(`- Breakdown by Table:`, tableStats);
  console.log(`======================================================\n`);
}

scanAndCleanAllTables(false)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
