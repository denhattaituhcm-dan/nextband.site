import { ReadingCase } from "@/features/reading/types";

export const CASE_001: ReadingCase = {
  id: "case-001",
  title: "The Vanishing Glacial Lake",
  case_number: "CASE #001",
  universe: {
    name: "Arctic Climate & Glaciology Research Archive",
    role_vi: "Hồ Sơ Nghiên Cứu Địa Vật Lý & Biến Đổi Khí Hậu",
  },
  level: {
    ielts_band: 5.0,
    cefr: "B1",
    realm_name_vi: "Học Sĩ",
  },
  summary:
    "At 03:15 AM on June 14, an 8-million-cubic-meter lake on the Greenland Ice Sheet drained completely in less than 90 minutes. Scientists at Summit Station Alpha-4 must examine sensor logs, field notes, and satellite radar data to discover how the water escaped through 850 meters of solid ice.",
  
  sources: [
    {
      id: "source-01",
      title: "Field Station Incident Report",
      subtitle: "Summit Station Alpha-4 · Greenland Ice Sheet Survey",
      document_type: "Official Field Log",
      security_level: "Unrestricted Scientific Data",
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
      title: "Field Expedition Journal",
      subtitle: "Dr. Alistair Vance · Lead Glaciologist",
      document_type: "Researcher Personal Log",
      security_level: "Field Notes",
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
      title: "Satellite Radar & Seismic Telemetry",
      subtitle: "Arctic Monitoring Network · Automated Sensors",
      document_type: "Electronic System Logs",
      security_level: "Raw Instrument Archive",
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

  investigation_tasks: [
    {
      id: "task-01",
      type: "locating_detail",
      title: "Task 01 · FIND (Locating Detail)",
      question: "According to Source 1, what physical evidence proved that the lake water did not escape across the surface of the ice sheet?",
      options: [
        "A. The acoustic water sensors recorded no sound before 03:15 AM.",
        "B. The perimeter ice ridges showed no signs of water overflow or horizontal collapse.",
        "C. The temperature of the water remained constant at 0.4°C.",
        "D. The research team arrived at the basin before sunrise.",
      ],
      correct_answer: "B",
      explanation_vi: "Source 1 nêu rõ: 'The perimeter ice ridges showed no signs of overflow or horizontal collapse' (Các gờ băng xung quanh không hề có dấu hiệu tràn nước hay sụp đổ theo chiều ngang).",
      required_evidence_sources: ["source-01"],
    },
    {
      id: "task-02",
      type: "cross_reference",
      title: "Task 02 · MATCH (Cross-Source Conflict)",
      question: "Compare Dr. Vance's theory (Source 2) with the Automated Sensor Logs (Source 3). Which detail directly contradicts Dr. Vance's geothermal heating explanation?",
      options: [
        "A. The lake water had drained completely before Dr. Vance woke up.",
        "B. Micro-fractures were detected 200 meters below the ice at 01:45 AM.",
        "C. Sub-ice bedrock temperature stayed at -1.8°C during drainage instead of warming up.",
        "D. The automated alarm woke the team at 03:20 AM.",
      ],
      correct_answer: "C",
      explanation_vi: "Dr. Vance cho rằng nhiệt địa chất (geothermal heat) làm ấm đáy băng, nhưng Source 3 chứng minh nhiệt độ đáy đá vẫn giữ nguyên mức -1.8°C (lạnh giá) trong suốt quá trình xả nước.",
      required_evidence_sources: ["source-02", "source-03"],
    },
    {
      id: "task-03",
      type: "inference_verification",
      title: "Task 03 · INFER (Fact vs. Assumption)",
      question: "What does the seismic shock wave recorded at 03:12 AM (Source 3) directly prove?",
      options: [
        "A. A major vertical crack opened through the ice sheet 3 minutes before rapid drainage began.",
        "B. An underground volcano erupted beneath Summit Station Alpha-4.",
        "C. The field research team caused the fracture while collecting ice cores.",
        "D. The lake had already been empty since 01:45 AM.",
      ],
      correct_answer: "A",
      explanation_vi: "Dữ liệu địa chấn lúc 03:12 AM ghi nhận sóng xung kích thẳng đứng, chứng minh khe nứt chính mở toang ngay trước khi tốc độ xả nước đạt đỉnh lúc 03:15 AM.",
      required_evidence_sources: ["source-03"],
    },
    {
      id: "task-04",
      type: "sentence_hunting",
      title: "Task 04 · PROVE (Find Direct Evidence)",
      question: "Click directly on the sentence in Source 1 that proves the meltwater drained straight down through the entire depth of the ice sheet to the rock beneath.",
      target_paragraph_id: "p03",
      target_sentence: "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock.",
      correct_answer: "However, the crevasse extends straight down through the entire 850-meter ice sheet, so the water drained directly to the bedrock.",
      explanation_vi: "Câu văn này xác nhận cả độ sâu 850m và hướng thoát nước thẳng đứng xuống lớp đá nền (bedrock).",
      required_evidence_sources: ["source-01"],
    },
  ],

  final_deduction: {
    prompt: "Based on all 3 sources, what is the true scientific explanation for the sudden disappearance of Supraglacial Lake G-4?",
    hypotheses: [
      {
        id: "hyp-1",
        label: "Sub-Glacial Geothermal Eruption",
        description: "A sudden burst of volcanic heat under the ice sheet melted the lake from the bottom up.",
        is_correct: false,
        critique_vi: "Sai. Dữ liệu cảm biến đáy Source 3 ghi nhận nhiệt độ bedrock không đổi ở mức -1.8°C, bác bỏ hoàn toàn giả thuyết núi lửa hay nhiệt địa chất.",
      },
      {
        id: "hyp-2",
        label: "Fast Hydro-Fracturing (Nứt Gãy Thủy Lực Thẳng Đứng)",
        description: "Heavy surface water pressure forced a micro-fracture open, driving a vertical crack through 850m of ice and draining the lake directly into the sub-glacial river system.",
        is_correct: true,
        critique_vi: "Chính xác! Áp lực nước khổng lồ tạo ra hiện tượng nứt gãy thủy lực (hydro-fracturing) mở toang khe nứt 850m thẳng xuống lớp đá đáy, làm 8 triệu m³ nước thoát hết trong 90 phút.",
      },
      {
        id: "hyp-3",
        label: "Horizontal Surface Spillover",
        description: "The perimeter ice walls collapsed under strong winds, causing the water to flow into neighboring surface valleys.",
        is_correct: false,
        critique_vi: "Sai. Báo cáo Source 1 xác nhận gờ băng quanh hồ không hề có vết tràn nước hay sụp đổ ngang.",
      },
    ],
    required_evidence_pool: [
      {
        id: "ev-01",
        text: "The perimeter ice ridges showed no signs of overflow or horizontal collapse (Source 1).",
        source_id: "source-01",
        weight: 1,
      },
      {
        id: "ev-02",
        text: "The crevasse extends straight down through the entire 850-meter ice sheet to bedrock (Source 1).",
        source_id: "source-01",
        weight: 2,
      },
      {
        id: "ev-03",
        text: "Sub-glacial bedrock temperature remained constant at -1.8°C during drainage (Source 3).",
        source_id: "source-03",
        weight: 2,
      },
      {
        id: "ev-04",
        text: "Seismic sensor recorded vertical shock wave when main crack opened at 03:12 AM (Source 3).",
        source_id: "source-03",
        weight: 2,
      },
    ],
  },
};
