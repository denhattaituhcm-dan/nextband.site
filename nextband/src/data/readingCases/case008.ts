import { ReadingCase } from "@/features/reading/types";

export const CASE_008: ReadingCase = {
  id: "case-008",
  title: "The Deglobalisation Trap: Supply-Chain Weaponisation & The High Cost of Autarky",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 8.0,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Economist · International Trade & Geopolitics Archive",
  },
  estimated_minutes: 14,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Twilight of the Pax Mercatoria",
      subtitle: "The Economist · Leaders: The Fragmenting Global Economy",
      paragraphs: [
        {
          id: "p01",
          text: "For three decades following the collapse of the Soviet Union, economic orthodoxy adhered to the gospel of hyper-globalisation: that unfettered cross-border supply chains, comparative advantage, and just-in-time logistics would inexorably bind nations in mutual prosperity and diminish geopolitical conflict. That era of economic optimism has definitively shuttered.",
        },
        {
          id: "p02",
          text: "In its stead has emerged an era of aggressive geo-economic fragmentation. Major powers now treat cross-border trade not as a reciprocal engine of wealth generation, but as a vector of vulnerability. Critical inputs—from advanced lithography semiconductor tools and electric vehicle battery components to critical pharmaceutical precursors—have been weaponised through export controls, secondary sanctions, and aggressive state subsidies.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Friend-Shoring, Reshoring and the Efficiency Penalty",
      subtitle: "International Monetary Fund & The Economist Intelligence Unit Brief",
      paragraphs: [
        {
          id: "p03",
          text: "Western industrial strategy now orbits around fashionable catchphrases: 'friend-shoring', 'near-shoring', and 'de-risking'. Governments have committed trillions of dollars in public capital to onshore microchip fabrication and mineral processing, claiming that national resilience justifies abandoning pure market efficiency.",
        },
        {
          id: "p04",
          text: "Yet macroeconomic modeling demonstrates that decoupling carries an excruciating efficiency penalty. Duplicating specialized supply networks within national borders ignites structural inflation, squanders fiscal resources, and reduces productivity growth. Crucially, supply chains do not truly domesticate; they merely lengthen and obscure. Western economies claiming to de-risk from geopolitical rivals remain profoundly reliant on them via third-party intermediate hubs in Southeast Asia and Latin America.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Hidden Perils of Economic Autarky",
      subtitle: "The Economist · Finance & Economics Analysis",
      paragraphs: [
        {
          id: "p05",
          text: "The greatest risk of this zero-sum neo-mercantilism is institutional contagion. When powerful trading blocs dismantle World Trade Organization protocols and erect protectionist subsidies, developing nations with constrained fiscal balances are systematically locked out of capital-intensive industrial modernization.",
        },
        {
          id: "p06",
          text: "True strategic resilience is not achieved through defensive autarky or subsidised self-sufficiency, which invariably breeds complacency and rent-seeking among protected domestic monopolies. Instead, prudent statecraft demands diversified redundancy—cultivating multiple independent supplier corridors across neutral trading partners while maintaining multilateral rules that prevent global trade from degenerating into coercive economic warfare.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what core premise of hyper-globalisation has now been abandoned by major powers?",
      options: [
        { id: "A", text: "That developing nations would eliminate corporate tax rates to attract foreign factories." },
        { id: "B", text: "That open trade, comparative advantage, and efficient logistics would foster shared prosperity and suppress geopolitical rivalry." },
        { id: "C", text: "That gold reserves should directly determine international exchange rates." },
        { id: "D", text: "That global shipping containers should be replaced by high-speed freight trains." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) chỉ ra: 'unfettered cross-border supply chains, comparative advantage, and just-in-time logistics would inexorably bind nations in mutual prosperity and diminish geopolitical conflict. That era of economic optimism has definitively shuttered.'",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what reality contradicts the political claim of successful 'de-risking' and reshoring?",
      options: [
        { id: "A", text: "Advanced economies have abolished export taxes on electronic hardware." },
        { id: "B", text: "Supply chains are not truly domesticating, but merely lengthening through third-party intermediary countries while incurring higher inflation." },
        { id: "C", text: "Consumers refuse to purchase domestic microprocessors due to lower clock speeds." },
        { id: "D", text: "Central banks have banned domestic semiconductor subsidies." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 chỉ ra nghịch lý của 'de-risking': việc ép chuỗi cung ứng về nước vừa gây lạm phát cấu trúc ('efficiency penalty'), vừa không thực sự độc lập vì vẫn gián tiếp phụ thuộc qua các trạm trung chuyển trung gian ('supply chains do not truly domesticate; they merely lengthen and obscure').",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 warn will happen if nations pursue economic 'autarky' (self-sufficiency)?",
      options: [
        { id: "A", text: "International shipping firms will declare bankruptcy simultaneously." },
        { id: "B", text: "Subsidised protectionism creates market distortions, breeds complacency, and encourages rent-seeking among domestic monopolies." },
        { id: "C", text: "Developing countries will seize control of all foreign mineral reserves." },
        { id: "D", text: "Consumer inflation will drop to zero across industrial economies." },
      ],
      answer: "B",
      evidence_paragraph_id: "p06",
      explanation: "Source 3 phân tích mặt tối của tự cung tự cấp (autarky): bảo hộ và trợ cấp vô tội vạ làm tổn hại sức cạnh tranh, dẫn đến 'complacency and rent-seeking among protected domestic monopolies' (sự tự mãn và hành vi trục lợi của các tập đoàn được nhà nước bảo hộ).",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains what true strategic resilience requires instead of defensive autarky.",
      target_paragraph_id: "p06",
      target_sentence: "Instead, prudent statecraft demands diversified redundancy—cultivating multiple independent supplier corridors across neutral trading partners while maintaining multilateral rules that prevent global trade from degenerating into coercive economic warfare.",
      explanation: "Câu kết tại Source 3 (đoạn 2) làm rõ giải pháp chuẩn của The Economist: 'Instead, prudent statecraft demands diversified redundancy—cultivating multiple independent supplier corridors across neutral trading partners while maintaining multilateral rules that prevent global trade from degenerating into coercive economic warfare.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is The Economist’s central argument regarding the retreat from globalization?",
    options: [
      {
        id: "hyp-1",
        text: "Protectionist Triumph: Complete economic isolationism is the most cost-effective method to eradicate domestic sovereign debt.",
      },
      {
        id: "hyp-2",
        text: "The Illusion of Autarky: Weaponising trade and subsidising reshoring imposes severe efficiency penalties and disguises dependency, requiring diversified supplier redundancy rather than zero-sum protectionism.",
      },
      {
        id: "hyp-3",
        text: "Logistical Obsolescence: Sea freight containerisation will be permanently abolished in favour of bilateral barter agreements.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Critical economic inputs have been weaponised through export controls, sanctions, and subsidies (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Decoupling carries an efficiency penalty of structural inflation, while supply chains merely lengthen via intermediaries (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Protectionist subsidies systematically lock developing economies out of capital-intensive modernisation (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "True resilience lies in diversified redundancy across multiple corridors rather than defensive autarky (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "The Economist phê phán làn sóng bảo hộ thương mại và phong trào 'de-risking' nửa vời: việc tự cung tự cấp (autarky) khiến nền kinh tế trả giá đắt bằng lạm phát và suy giảm năng suất mà không thực sự an toàn. Nền kinh tế thế giới cần sự đa dạng hóa linh hoạt (diversified redundancy) thay vì chủ nghĩa dân tộc kinh tế vị kỷ.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả kêu gọi quay lại trạng thái toàn cầu hóa ngây thơ, không phòng bị như 30 năm trước. Bài viết thừa nhận tính dễ tổn thương của chuỗi cung ứng, nhưng chỉ trích cách tiếp cận cực đoan bảo hộ, tự cung tự cấp (autarky) và kêu gọi đa dạng hóa hành lang cung ứng (diversified redundancy).",
      },
    ],
    takeaways: [
      "Khái niệm 'Geo-economic fragmentation' (phân mảnh địa kinh tế) và 'Efficiency penalty' (cái giá phải trả về mặt hiệu quả kinh tế).",
      "Các thuật ngữ thời sự 'Friend-shoring', 'Reshoring', 'De-risking' và sự biến tướng thành chuỗi cung ứng kéo dài qua nước thứ ba.",
      "Thuật ngữ học thuật kinh tế đỉnh cao: 'comparative advantage', 'economic autarky', 'rent-seeking', 'diversified redundancy'.",
    ],
  },
};
