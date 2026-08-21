import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "https://gzpdlqxjggyxlkeatvvf.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cGRscXhqZ2d5eGxrZWF0dnZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyOTc3NjMsImV4cCI6MjEwMDg3Mzc2M30.M7uMAo2qJCDQtxQMP-_58VKF1LfSBdwR31gpvqcCN6I";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET: List recent leads (Admin / verification)
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("contact_leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) {
        return res.status(500).json({ success: false, error: error.message });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message || "Internal server error" });
    }
  }

  // POST: Receive new lead
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const fullName = (body.fullName || body.name || "").trim();
      const phone = (body.phone || "").trim().replace(/\s+/g, "");
      const email = (body.email || "").trim();
      const leadType = body.leadType || "CONTACT"; // "QUICK_TRIAL" | "CONTACT" | "ASSESSMENT"
      const course = (body.course || "").trim();
      const preferredSchedule = (body.preferredSchedule || "").trim();
      const message = (body.message || body.goal || "").trim();
      const metadata = body.metadata || {};

      // 1. Validation
      if (!fullName) {
        return res.status(400).json({
          success: false,
          error: "Vui lòng nhập họ và tên",
        });
      }

      if (!phone || phone.length < 9) {
        return res.status(400).json({
          success: false,
          error: "Số điện thoại không hợp lệ (tối thiểu 9 số)",
        });
      }

      // Format goal / notes for Supabase persistence
      let formattedGoal = message;
      if (leadType === "QUICK_TRIAL") {
        formattedGoal = [Học Thử 02 Buổi] Khóa:  | Ca học: ;
        if (message) formattedGoal +=  | Ghi chú: ;
      } else if (leadType === "ASSESSMENT") {
        formattedGoal = [Khảo Thí] Trình độ:  -> Mục tiêu:  ();
        if (metadata.preferredDate) formattedGoal +=  | Ngày hẹn: ;
        if (message) formattedGoal +=  | Lời nhắn: ;
      }

      const sourceTag = body.source || web_;
      const now = new Date().toISOString();

      // 2. PRIMARY PERSISTENCE: Save to Supabase (Source of Truth)
      const { data: dbLead, error: dbError } = await supabase
        .from("contact_leads")
        .insert({
          full_name: fullName,
          phone,
          email: email || null,
          goal: formattedGoal || null,
          source: sourceTag,
          status: "NEW",
        })
        .select()
        .single();

      if (dbError) {
        console.error("[Leads API] Supabase Insert Error:", dbError);
        return res.status(500).json({
          success: false,
          error: "Không thể lưu thông tin vào hệ thống. Vui lòng liên hệ Hotline 0933.319.693.",
        });
      }

      const leadId = dbLead?.id || lead-;
      const createdAt = dbLead?.created_at || now;

      // 3. SECONDARY NOTIFICATION: Dispatch to Google Apps Script Webhook (Async & Resilient)
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
              console.warn([Leads API] ⚠️ Google Apps Script Webhook returned HTTP : );
            } else {
              console.log([Leads API] ✅ Successfully dispatched lead [] to Google Apps Script Webhook);
            }
          })
          .catch((err) => {
            console.error([Leads API] ❌ Failed to dispatch lead [] to Google Apps Script Webhook:, err?.message || err);
          });
      } else {
        console.info(
          [Leads API] Notice: GOOGLE_APPS_SCRIPT_WEBHOOK_URL not configured. Lead [] saved safely in Supabase.
        );
      }

      // 4. Return success immediately to client
      return res.status(201).json({
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
      return res.status(500).json({
        success: false,
        error: "Đã xảy ra lỗi xử lý. Vui lòng gọi trực tiếp Hotline 0933.319.693.",
      });
    }
  }

  return res.status(405).json({ success: false, error: "Method Not Allowed" });
}
