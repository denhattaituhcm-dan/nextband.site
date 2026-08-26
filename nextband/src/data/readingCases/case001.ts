import { ReadingCase } from "@/features/reading/types";

export const CASE_001: ReadingCase = {
  id: "case-001",
  title: "The Locked Room",
  level: {
    realm: "HOC_SI",
    realm_name_vi: "Học Sĩ",
    ielts_band: 5.0,
    difficulty: 2, // Trung kỳ: ★★☆☆
  },
  universe: {
    type: "CASE_FILES",
    name: "St. Jude Investigation Dossier",
  },
  estimated_minutes: 15,
  sources: [
    {
      id: "source-01",
      type: "incident_log",
      title: "Official Incident Log",
      subtitle: "St. Jude Security Division · Archive Room B-12",
      paragraphs: [
        {
          id: "p01",
          text: "At 11:47 PM, the emergency sensor in Archive Room B-12 was triggered. Upon arrival at 11:49 PM, security personnel discovered the reinforced oak door securely locked by the internal magnetic deadbolt. There was no physical damage or evidence of forced entry on the exterior frame.",
        },
        {
          id: "p02",
          text: "After using the emergency master key, officers entered and found Professor Arthur Vance slumped over the central desk in an unconscious state. No external bodily injuries were observed. The primary steel security vault stood open, and the folder containing Exam Paper Alpha was missing.",
        },
        {
          id: "p03",
          text: "The overhead ventilation duct was unbolted from the inside. However, the duct’s opening measures only 30 cm x 40 cm, which precludes any adult human from passing through.",
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
          text: "I had no intention of going to the archive room tonight. After concluding my 09:30 PM lecture, I went directly to the Senior Faculty Lounge. At approximately 10:30 PM, I left my overcoat on the sofa and went to the cafeteria for tea.",
        },
        {
          id: "p05",
          text: "My security card and written vault credentials were inside the inner pocket of that coat. When I returned around 10:45 PM, I began to feel unusually dizzy. I have no recollection of anything that occurred between 10:50 PM and waking up here in the clinic.",
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
          text: "[10:32 PM] Access Gate: Professor Vance’s security card logged entering the Faculty Lounge. (No further card-swipes registered campus-wide until 11:43 PM).",
        },
        {
          id: "p07",
          text: "[11:39 PM] Terminal 04 (Faculty Open Workstation): Remote print command sent: Exam_Paper_Alpha.pdf.",
        },
        {
          id: "p08",
          text: "[11:40 PM] Printer Sensor (Basement Corridor): Document successfully printed. Hardware sensor logged: Paper physically removed from output tray.",
        },
        {
          id: "p09",
          text: "[11:41 PM] Vault B-12 Sensor: Vault unlocked using Professor Vance’s personal digital credentials.",
        },
        {
          id: "p10",
          text: "[11:43 PM] Room B-12 Internal Reader: Professor Vance’s physical card scanned at the interior console to engage the internal lock. (Note: The internal deadbolt can only be engaged by scanning the card at the interior console inside the room).",
        },
        {
          id: "p11",
          text: "[11:47 PM] Environmental Sensor (Room B-12): Sudden temperature drop logged (23°C -> 15°C) as ventilation cycle engaged -> Automated alarm triggered.",
        },
      ],
    },
  ],
  vocabulary: [
    {
      term: "forced entry",
      pronunciation: "/fɔːst ˈɛntri/",
      pos: "noun phrase",
      meaning_en: "breaking into a building using physical violence or damage",
      meaning_vi: "đột nhập bằng vũ lực (cạy phá cửa)",
      context_note: "No forced entry = cửa không hề bị cạy phá từ bên ngoài",
    },
    {
      term: "unconscious",
      pronunciation: "/ʌnˈkɒnʃəs/",
      pos: "adjective",
      meaning_en: "in a state like sleep, unable to see, hear, or feel",
      meaning_vi: "bất tỉnh, hôn mê",
      context_note: "found unconscious = tìm thấy trong trạng thái ngất xỉu",
    },
    {
      term: "preclude",
      pronunciation: "/prɪˈkluːd/",
      pos: "verb",
      meaning_en: "to prevent something or make it impossible to happen",
      meaning_vi: "ngăn chặn; khiến điều gì đó không thể xảy ra",
      context_note: "precludes human egress = làm cho con người hoàn toàn không thể thoát ra",
    },
    {
      term: "credentials",
      pronunciation: "/krɪˈdɛnʃəlz/",
      pos: "noun (plural)",
      meaning_en: "information or documents used to verify a person's identity and permissions",
      meaning_vi: "thông tin xác thực / mật mã đăng nhập két",
      context_note: "vault credentials = mật khẩu kỹ thuật số mở két sắt",
    },
    {
      term: "discrepancy",
      pronunciation: "/dɪˈskrɛpənsi/",
      pos: "noun",
      meaning_en: "a difference between two things that should be the same",
      meaning_vi: "sự mâu thuẫn / bất nhất giữa 2 nguồn dữ liệu",
      context_note: "discrepancy in timeline = sự bất nhất về mốc thời gian",
    },
  ],
  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what concrete physical observation proves that the room was not entered by breaking down the door?",
      options: [
        { id: "A", text: "The ventilation duct was unbolted from the inside." },
        { id: "B", text: "The internal deadbolt had malfunctioned." },
        { id: "C", text: "There were no exterior signs of forced entry." },
        { id: "D", text: "The master key was used by the security team." },
      ],
      answer: "C",
      evidence_paragraph_id: "p01",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "Compare Professor Vance’s statement (Source 2) with the Digital Logs (Source 3). Which detail reveals an inconsistency regarding Professor Vance’s physical items?",
      options: [
        { id: "A", text: "Vance claims he lost consciousness before 10:50 PM, but his card was used at the internal console of Room B-12 at 11:43 PM." },
        { id: "B", text: "Vance claims he never entered the Faculty Lounge, but the gate log recorded him at 10:32 PM." },
        { id: "C", text: "Vance claims his coat was stolen at 11:39 PM from the cafeteria." },
        { id: "D", text: "Vance claims he printed the exam file himself during his lecture." },
      ],
      answer: "A",
      evidence_paragraph_ids: ["p05", "p10"],
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What can be reasonably deduced from the fact that the printed file was physically removed from the printer tray at 11:40 PM (Source 3), one minute before Vault B-12 was opened?",
      options: [
        { id: "A", text: "Professor Vance woke up and collected the printout himself." },
        { id: "B", text: "A physical person was present at the basement printer before the vault was accessed." },
        { id: "C", text: "The entire exam contents were leaked online to students." },
        { id: "D", text: "The printer was malfunctioning and discarded the paper into the trash." },
      ],
      answer: "B",
      evidence_paragraph_id: "p08",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Select the single sentence in Source 1 that serves as definitive proof that the intruder could NOT have escaped through the ceiling duct.",
      target_paragraph_id: "p03",
      target_sentence: "However, the duct’s opening measures only 30 cm x 40 cm, which precludes any adult human from passing through.",
    },
  ],
  final_deduction: {
    question: "Which explanation is best supported by the available evidence?",
    options: [
      { id: "A", text: "Professor Vance simulated unconsciousness and escaped through the ventilation duct." },
      { id: "B", text: "An individual used Professor Vance’s stolen credentials and card to print and access the material, physically locking the room from the inside before escaping via an undetermined internal route." },
      { id: "C", text: "An armed outsider broke through the exterior door immediately before the 11:47 PM alarm." },
      { id: "D", text: "The exam file was permanently lost due to a system error during the 11:39 PM remote command." },
    ],
    correct_hypothesis: "B",
    required_evidence_pool: [
      { id: "ev-01", paragraph_id: "p08", label: "Physical document removal from printer at 11:40 PM" },
      { id: "ev-02", paragraph_id: "p10", label: "Internal lock engaged via interior console requiring physical presence inside" },
      { id: "ev-03", paragraph_id: "p03", label: "Ventilation duct dimensions (30x40cm) preclude adult human egress" },
    ],
    correct_evidence_ids: ["ev-02", "ev-03"],
  },
  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Suy diễn danh tính thủ phạm khi văn bản chỉ ghi nhận Terminal 04 là máy tính công cộng mở cho giảng viên.",
      },
      {
        type: "PARAPHRASE_PRECISION",
        description: "Không nhận ra cụm 'precludes ... egress' đồng nghĩa với việc chặn hoàn toàn khả năng thoát ra ngoài của một người lớn.",
      },
    ],
    takeaways: [
      "IELTS Reading không đo lường khả năng đoán mò tình tiết; chỉ chấp nhận kết luận có câu văn bằng chứng trực tiếp.",
      "Mâu thuẫn mốc thời gian khách quan (Timestamps) luôn có giá trị xác thực cao hơn lời kể chủ quan của nhân chứng.",
    ],
  },
};
