import esbuild from "esbuild";
import { writeFileSync, mkdirSync, unlinkSync, existsSync } from "fs";

mkdirSync("api/v1", { recursive: true });

const createTemplate = (importPath) => `
import { buildApp } from "${importPath}";

let fastifyApp = null;

export default async function handler(req, res) {
  try {
    if (!fastifyApp) {
      fastifyApp = await buildApp();
      await fastifyApp.ready();
    }

    const response = await fastifyApp.inject({
      method: req.method || "GET",
      url: req.url,
      headers: req.headers,
      query: req.query,
      payload: req.body,
    });

    if (response.headers) {
      for (const [key, value] of Object.entries(response.headers)) {
        if (value !== undefined) {
          res.setHeader(key, value);
        }
      }
    }

    res.statusCode = response.statusCode;
    res.end(response.body);
  } catch (err) {
    console.error("Fastify Serverless Handler Error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        statusCode: 500,
        error: "Internal Server Error",
        message: err?.message || "Serverless runtime error",
        stack: err?.stack,
      })
    );
  }
}
`;

const targets = [
  { temp: "api/_temp_index.ts", out: "api/index.js", importPath: "../server/app.js" },
  { temp: "api/v1/_temp_courses.ts", out: "api/v1/courses.js", importPath: "../../server/app.js" },
  { temp: "api/v1/_temp_classes.ts", out: "api/v1/classes.js", importPath: "../../server/app.js" },
  { temp: "api/v1/_temp_exams.ts", out: "api/v1/exams.js", importPath: "../../server/app.js" },
  { temp: "api/v1/_temp_submissions.ts", out: "api/v1/submissions.js", importPath: "../../server/app.js" },
];

for (const target of targets) {
  writeFileSync(target.temp, createTemplate(target.importPath));
  await esbuild.build({
    entryPoints: [target.temp],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: target.out,
    external: ["@prisma/client", "bcrypt", "@vercel/node"],
  });
  if (existsSync(target.temp)) {
    unlinkSync(target.temp);
  }
}

const leadsSource = `
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://gzpdlqxjggyxlkeatvvf.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyOTc3NjMsImV4cCI6MjEwMDg3Mzc2M30.M7uMAo2qJCDQtxQMP-_58VKF1LfSBdwR31gpvqcCN6I";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    if (res.status) return res.status(200).end();
    res.statusCode = 200;
    return res.end();
  }

  const sendJson = (status, data) => {
    if (res.status && res.json) {
      return res.status(status).json(data);
    }
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };

  if (req.method === "GET") {
    try {
      const response = await fetch(
        \`\${supabaseUrl}/rest/v1/contact_leads?select=*&order=created_at.desc&limit=50\`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: \`Bearer \${supabaseKey}\`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        return sendJson(response.status, { success: false, error: errText });
      }

      const data = await response.json();
      return sendJson(200, { success: true, data });
    } catch (err) {
      return sendJson(500, { success: false, error: err?.message || "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch {
          body = {};
        }
      }
      body = body || {};

      const fullName = (body.fullName || body.name || "").trim();
      const phone = (body.phone || "").trim().replace(/\\s+/g, "");
      const email = (body.email || "").trim();
      const leadType = body.leadType || "CONTACT";
      const course = (body.course || "").trim();
      const preferredSchedule = (body.preferredSchedule || "").trim();
      const message = (body.message || body.goal || "").trim();
      const metadata = body.metadata || {};

      if (!fullName) {
        return sendJson(400, { success: false, error: "Vui lòng nhập họ và tên" });
      }

      if (!phone || phone.length < 9) {
        return sendJson(400, { success: false, error: "Số điện thoại không hợp lệ (tối thiểu 9 số)" });
      }

      let formattedGoal = message;
      if (leadType === "QUICK_TRIAL") {
        formattedGoal = \`[Học Thử 02 Buổi] Khóa: \${course || "N/A"} | Ca học: \${preferredSchedule || "Linh hoạt"}\`;
        if (message) formattedGoal += \` | Ghi chú: \${message}\`;
      } else if (leadType === "ASSESSMENT") {
        formattedGoal = \`[Khảo Thí] Trình độ: \${metadata.currentLevel || "N/A"} -> Mục tiêu: \${metadata.targetBand || "N/A"} (\${metadata.testFormat || "online"})\`;
        if (metadata.preferredDate) formattedGoal += \` | Ngày hẹn: \${metadata.preferredDate}\`;
        if (message) formattedGoal += \` | Lời nhắn: \${message}\`;
      }

      const sourceTag = body.source || \`web_\${leadType.toLowerCase()}\`;
      const now = new Date().toISOString();

      const dbResponse = await fetch(\`\${supabaseUrl}/rest/v1/contact_leads\`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: \`Bearer \${supabaseKey}\`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          email: email || null,
          goal: formattedGoal || null,
          source: sourceTag,
          status: "NEW",
        }),
      });

      if (!dbResponse.ok) {
        const dbErrText = await dbResponse.text();
        console.error("[Leads API] Supabase Insert Error:", dbErrText);
        return sendJson(500, {
          success: false,
          error: "Không thể lưu thông tin vào hệ thống. Vui lòng liên hệ Hotline 0933.319.693.",
        });
      }

      const insertedRows = await dbResponse.json();
      const dbLead = Array.isArray(insertedRows) ? insertedRows[0] : insertedRows;
      const leadId = dbLead?.id || \`lead-\${Date.now()}\`;
      const createdAt = dbLead?.created_at || now;

      // Google Apps Script Dispatch (Async / Non-blocking)
      const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
      const webhookSecret = process.env.GOOGLE_APPS_SCRIPT_SECRET || "";

      if (webhookUrl) {
        const dispatchPayload = {
          secret: webhookSecret,
          leadType,
          leadId,
          fullName,
          phone,
          email: email || "",
          course: course || "",
          preferredSchedule: preferredSchedule || "",
          message: formattedGoal || message || "",
          metadata,
          source: sourceTag,
          createdAt,
        };

        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
          },
          body: JSON.stringify(dispatchPayload),
        })
          .then(async (response) => {
            if (!response.ok) {
              const errText = await response.text().catch(() => "");
              console.warn(\`[Leads API] ⚠️ Google Apps Script Webhook returned HTTP \${response.status}: \${errText}\`);
            } else {
              console.log(\`[Leads API] ✅ Successfully dispatched lead [\${leadId}] to Google Apps Script Webhook\`);
            }
          })
          .catch((err) => {
            console.error(\`[Leads API] ❌ Failed to dispatch lead [\${leadId}] to Google Apps Script Webhook:\`, err?.message || err);
          });
      } else {
        console.info(
          \`[Leads API] Notice: GOOGLE_APPS_SCRIPT_WEBHOOK_URL not configured. Lead [\${leadId}] saved safely in Supabase.\`
        );
      }

      return sendJson(201, {
        success: true,
        message: "Gửi thông tin thành công! Ban Học Thuật ARIS sẽ liên hệ trong thời gian sớm nhất.",
        data: {
          id: leadId,
          fullName,
          phone,
          createdAt,
        },
      });
    } catch (err) {
      console.error("[Leads API] Unhandled Error:", err);
      return sendJson(500, {
        success: false,
        error: "Đã xảy ra lỗi xử lý. Vui lòng gọi trực tiếp Hotline 0933.319.693.",
      });
    }
  }

  return sendJson(405, { success: false, error: "Method Not Allowed" });
}
`;

writeFileSync("api/v1/leads.js", leadsSource.trim());
writeFileSync("api/leads.js", leadsSource.trim());

console.log("✅ All standalone Serverless API handlers bundled directly with zero external relative dependencies!");
