import { ReadingCase } from "@/features/reading/types";

export const CASE_001: ReadingCase = {
  id: "case-001",
  title: "The Locked Room",
  level: {
    realm: "HOC_SI",
    realm_name_vi: "Học Sĩ",
    ielts_band: 5.0,
    difficulty: 2, // Trung kỳ: ★★☆☆ (B1 Language / B2 Logic)
  },
  universe: {
    type: "CASE_FILES",
    name: "St. Jude Investigation Dossier",
  },
  estimated_minutes: 10,
  sources: [
    {
      id: "source-01",
      type: "incident_log",
      title: "Official Incident Log",
      subtitle: "St. Jude Security Division · Archive Room B-12",
      paragraphs: [
        {
          id: "p01",
          text: "At 11:47 PM, an alarm went off in Archive Room B-12. When security guards arrived at 11:49 PM, the heavy wooden door was locked from the inside with a magnetic lock. There was no damage to the door and no signs that someone broke in.",
        },
        {
          id: "p02",
          text: "The guards used a master key to open the door. Inside, they found Professor Arthur Vance lying unconscious on the central desk. He had no visible injuries. The steel safe was open, and the folder with Exam Paper Alpha was missing.",
        },
        {
          id: "p03",
          text: "The air vent on the ceiling was unbolted from the inside. However, the opening is only 30 cm by 40 cm, so an adult cannot climb through it.",
        },
      ],
    },
    {
      id: "source-02",
      type: "witness_statement",
      title: "Witness Statement",
      subtitle: "Recorded Interview with Prof. Arthur Vance",
      paragraphs: [
        {
          id: "p04",
          text: "I did not plan to go to the archive room tonight. After finishing my 9:30 PM class, I went straight to the Teachers' Lounge. At about 10:30 PM, I left my coat on the sofa and went to the cafeteria to drink tea.",
        },
        {
          id: "p05",
          text: "My security keycard and safe passwords were in the inside pocket of that coat. When I returned around 10:45 PM, I started to feel very dizzy. I do not remember anything that happened between 10:50 PM and waking up in the clinic.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Digital Access & Hardware Logs",
      subtitle: "Automated System Audit Trail · October 24",
      paragraphs: [
        {
          id: "p06",
          text: "[10:32 PM] Entrance Gate: Professor Vance's keycard was scanned entering the Teachers' Lounge. (No other card scans were recorded anywhere on campus until 11:43 PM).",
        },
        {
          id: "p07",
          text: "[11:39 PM] Computer 04 (Public Workstation): Print command sent: Exam_Paper_Alpha.pdf.",
        },
        {
          id: "p08",
          text: "[11:40 PM] Basement Printer: Document printed successfully. Sensor recorded: Paper was taken from the printer tray.",
        },
        {
          id: "p09",
          text: "[11:41 PM] Safe B-12 Sensor: Safe unlocked using Professor Vance's personal password.",
        },
        {
          id: "p10",
          text: "[11:43 PM] Room B-12 Inside Reader: Professor Vance's keycard was scanned at the control panel inside the room to lock the door. (Note: The door can only be locked from the inside by scanning the card at this panel).",
        },
        {
          id: "p11",
          text: "[11:47 PM] Temperature Sensor (Room B-12): Temperature dropped quickly from 23°C to 15°C when the air vent was opened -> Alarm triggered.",
        },
      ],
    },
  ],
  vocabulary: [
    {
      term: "broke in",
      pronunciation: "/brəʊk ɪn/",
      pos: "phrasal verb",
      meaning_en: "entered a building by force",
      meaning_vi: "đột nhập bằng vũ lực / cạy cửa",
      context_note: "no signs that someone broke in = không có dấu hiệu cạy phá",
    },
    {
      term: "unconscious",
      pronunciation: "/ʌnˈkɒnʃəs/",
      pos: "adjective",
      meaning_en: "in a state like deep sleep, unable to see, hear, or feel",
      meaning_vi: "bất tỉnh, ngất xỉu",
      context_note: "lying unconscious = nằm bất tỉnh trên bàn",
    },
    {
      term: "climb through",
      pronunciation: "/klaɪm θruː/",
      pos: "phrasal verb",
      meaning_en: "to move through a tight or narrow space by climbing",
      meaning_vi: "chui qua / leo qua",
      context_note: "cannot climb through = không thể chui qua được",
    },
    {
      term: "keycard",
      pronunciation: "/ˈkiːkɑːd/",
      pos: "noun",
      meaning_en: "a small plastic card used instead of a key to open a door",
      meaning_vi: "thẻ từ / thẻ quẹt bảo mật",
      context_note: "security keycard = thẻ từ ra vào",
    },
    {
      term: "conflict",
      pronunciation: "/ˈkɒnflɪkt/",
      pos: "noun",
      meaning_en: "a difference or disagreement between two facts or statements",
      meaning_vi: "sự mâu thuẫn / bất nhất giữa 2 thông tin",
      context_note: "shows a clear conflict = thể hiện sự mâu thuẫn rõ ràng",
    },
  ],
  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what physical evidence shows that no one broke down the door?",
      options: [
        { id: "A", text: "The air vent was opened from the inside." },
        { id: "B", text: "The magnetic lock had broken down." },
        { id: "C", text: "There was no damage to the door and no signs that someone broke in." },
        { id: "D", text: "The security guards used a master key." },
      ],
      answer: "C",
      evidence_paragraph_id: "p01",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "Compare Professor Vance’s statement (Source 2) with the Computer Logs (Source 3). Which detail shows a clear conflict regarding Professor Vance’s card?",
      options: [
        { id: "A", text: "Vance says he lost memory before 10:50 PM, but his keycard was used inside Room B-12 at 11:43 PM." },
        { id: "B", text: "Vance says he never went to the Teachers' Lounge, but the gate log recorded him at 10:32 PM." },
        { id: "C", text: "Vance says his coat was stolen at 11:39 PM from the cafeteria." },
        { id: "D", text: "Vance says he printed the exam file himself during his class." },
      ],
      answer: "A",
      evidence_paragraph_ids: ["p05", "p10"],
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the sensor log at 11:40 PM directly show?",
      options: [
        { id: "A", text: "Professor Vance was standing at the basement printer." },
        { id: "B", text: "A printed document was physically removed from the printer tray at 11:40 PM." },
        { id: "C", text: "The exam was leaked onto the internet." },
        { id: "D", text: "The printer malfunctioned and threw the document away." },
      ],
      answer: "B",
      evidence_paragraph_id: "p08",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Select the single sentence in Source 1 that proves the person could NOT escape through the ceiling air vent.",
      target_paragraph_id: "p03",
      target_sentence: "However, the opening is only 30 cm by 40 cm, so an adult cannot climb through it.",
    },
  ],
  final_deduction: {
    question: "Which explanation is best supported by all the evidence?",
    options: [
      { id: "A", text: "Professor Vance was pretending to be unconscious and escaped through the air vent." },
      { id: "B", text: "Someone took Professor Vance's keycard and password, printed and took the exam, locked the room from the inside, and escaped." },
      { id: "C", text: "An armed attacker broke the front door just before the 11:47 PM alarm." },
      { id: "D", text: "The exam file was lost because of a computer error at 11:39 PM." },
    ],
    correct_hypothesis: "B",
    required_evidence_pool: [
      { id: "ev-01", paragraph_id: "p08", label: "Printed document removed from printer tray at 11:40 PM" },
      { id: "ev-02", paragraph_id: "p10", label: "Door locked from inside console at 11:43 PM requiring physical presence inside" },
      { id: "ev-03", paragraph_id: "p03", label: "Air vent opening is only 30x40cm, so an adult cannot climb through it" },
    ],
    correct_evidence_ids: ["ev-02", "ev-03"],
  },
  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Suy diễn danh tính thủ phạm khi văn bản chỉ ghi nhận Computer 04 là máy tính công cộng mở cho giảng viên.",
      },
      {
        type: "PARAPHRASE_PRECISION",
        description: "Không nhận ra câu 'an adult cannot climb through it' chứng minh kẻ trộm không thể thoát qua ống gió.",
      },
    ],
    takeaways: [
      "IELTS Reading không đo lường khả năng đoán mò tình tiết; chỉ chấp nhận kết luận có câu văn bằng chứng trực tiếp.",
      "Mâu thuẫn mốc thời gian khách quan (Timestamps) luôn có giá trị xác thực cao hơn lời kể chủ quan của nhân chứng.",
    ],
  },
};
