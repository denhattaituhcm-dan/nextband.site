import { ReadingCase } from "@/features/reading/types";

export const CASE_001: ReadingCase = {
  id: "case-001",
  title: "The Vanishing Glacial Lake",
  level: {
    realm: "HOC_SI",
    realm_name_vi: "Học Sĩ",
    ielts_band: 5.0,
    difficulty: 2,
  },
  universe: {
    type: "REAL_WORLD",
    name: "Arctic Climate & Glaciology Research Archive",
  },
  estimated_minutes: 10,
  sources: [
    {
      id: "source-01",
      type: "scientific_report",
      title: "Field Station Incident Report",
      subtitle: "Summit Station Alpha-4 · Greenland Ice Sheet Survey",
      paragraphs: [
        {
          id: "p01",
          text: "At 03:15 AM on June 14, acoustic water sensors recorded a rapid drop in water level at Supraglacial Lake G-4. In less than 90 minutes, all eight million cubic meters of meltwater completely disappeared from the surface.",
        },
        {
          id: "p02",
          text: "When the field research team reached the lake basin at 05:30 AM, they found an empty ice bowl with no surface streams flowing outward. The perimeter ice ridges showed no signs of overflow or horizontal collapse.",
        },
        {
          id: "p03",
          text: "At the center of the dry basin, the team found a deep vertical fracture measuring 1.2 meters wide. However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock.",
        },
      ],
    },
    {
      id: "source-02",
      type: "witness_statement",
      title: "Field Expedition Journal",
      subtitle: "Dr. Alistair Vance · Lead Glaciologist",
      paragraphs: [
        {
          id: "p04",
          text: "My team completed ice core sampling near Lake G-4 at 01:30 AM before the fog rolled in. The ice surface was stable, and the lake water was calm with zero visible cracks on the southern shore.",
        },
        {
          id: "p05",
          text: "I walked back to Station Alpha-4 and logged my manual water temperature reading of 0.4°C at 02:10 AM. After that, I remained inside the station laboratory until the automated alarm woke us at 03:20 AM.",
        },
        {
          id: "p06",
          text: "I believe sub-glacial geothermal heat warmed the bottom bedrock and melted a path upward. The sudden drainage was likely caused by underground volcanic warming rather than surface mechanical pressure.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Satellite Radar & Seismic Telemetry",
      subtitle: "Arctic Monitoring Network · Automated Sensors",
      paragraphs: [
        {
          id: "p07",
          text: "01:45 AM: Automated seismic sensor B-02 recorded a cluster of micro-fractures in the solid ice 200 meters below the lake center.",
        },
        {
          id: "p08",
          text: "02:15 AM: Satellite radar confirmed that the lake surface began to dome upward by 18 centimeters due to rising water pressure.",
        },
        {
          id: "p09",
          text: "03:12 AM: Sub-glacial pressure sensors recorded a massive vertical shock wave, indicating the main ice crack opened instantly.",
        },
        {
          id: "p10",
          text: "03:15 AM: Continuous drainage rate reached 1,500 cubic meters per second; sub-ice bedrock temperature remained constant at -1.8°C.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what physical evidence proved that the lake water did not escape across the surface of the ice sheet?",
      options: [
        { id: "A", text: "The acoustic water sensors recorded no sound before 03:15 AM." },
        { id: "B", text: "The perimeter ice ridges showed no signs of overflow or horizontal collapse." },
        { id: "C", text: "The temperature of the water remained constant at 0.4°C." },
        { id: "D", text: "The research team arrived at the basin before sunrise." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "Compare Dr. Vance's theory (Source 2) with the Automated Sensor Logs (Source 3). Which detail directly contradicts Dr. Vance's geothermal heating explanation?",
      options: [
        { id: "A", text: "The lake water had drained completely before Dr. Vance woke up." },
        { id: "B", text: "Micro-fractures were detected 200 meters below the ice at 01:45 AM." },
        { id: "C", text: "Sub-ice bedrock temperature stayed at -1.8°C during drainage instead of warming up." },
        { id: "D", text: "The automated alarm woke the team at 03:20 AM." },
      ],
      answer: "C",
      evidence_paragraph_ids: ["p06", "p10"],
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the seismic shock wave recorded at 03:12 AM (Source 3) directly prove?",
      options: [
        { id: "A", text: "A major vertical crack opened through the ice sheet 3 minutes before rapid drainage began." },
        { id: "B", text: "An underground volcano erupted beneath Summit Station Alpha-4." },
        { id: "C", text: "The field research team caused the fracture while collecting ice cores." },
        { id: "D", text: "The lake had already been empty since 01:45 AM." },
      ],
      answer: "A",
      evidence_paragraph_id: "p09",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 1 that proves the meltwater drained straight down through the entire depth of the ice sheet to the rock beneath.",
      target_paragraph_id: "p03",
      target_sentence: "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock.",
    },
  ],

  final_deduction: {
    question: "Based on all 3 sources, what is the true scientific explanation for the sudden disappearance of Supraglacial Lake G-4?",
    options: [
      {
        id: "hyp-1",
        text: "Sub-Glacial Geothermal Eruption: Volcanic heat beneath the ice sheet melted a path upward.",
      },
      {
        id: "hyp-2",
        text: "Fast Hydro-Fracturing: Surface water pressure opened an 850m vertical fracture straight to bedrock.",
      },
      {
        id: "hyp-3",
        text: "Horizontal Surface Spillover: The perimeter ice ridges collapsed and water poured over the surface.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "The perimeter ice ridges showed no signs of overflow or horizontal collapse (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p03",
        label: "The crevasse extends straight down through the entire 850-meter ice sheet to bedrock (Source 1).",
      },
      {
        id: "ev-03",
        paragraph_id: "p10",
        label: "Sub-glacial bedrock temperature remained constant at -1.8°C during drainage (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p09",
        label: "Seismic sensor recorded vertical shock wave when main crack opened at 03:12 AM (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-02", "ev-03"],
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Lời giải thích của nhà nghiên cứu (Dr. Vance) cho rằng nhiệt lòng đất làm tan băng đáy, nhưng dữ liệu cảm biến thực nghiệm chứng minh đá đáy vẫn ở mức -1.8°C. Không được xem giả thuyết là sự thật khi chưa đối chiếu số liệu.",
      },
    ],
    takeaways: [
      "Chỉ chọn đáp án được xác nhận trực tiếp bằng dữ liệu và câu chữ trong bài đọc.",
      "Luôn phân biệt rõ ràng giữa Quan sát thực tế (Observation), Giả thuyết cá nhân (Hypothesis) và Dữ liệu cảm biến khách quan (Sensor Data).",
    ],
  },
};
