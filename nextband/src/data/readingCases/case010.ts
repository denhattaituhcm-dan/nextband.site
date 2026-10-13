import { ReadingCase } from "@/features/reading/types";

export const CASE_010: ReadingCase = {
  id: "case-010",
  title: "The Death of the Starter Home: Generation Rent and the Structural Housing Trap",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Conversation · Urban Sociology & Housing Policy",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Broken Escalator of Property Ownership",
      subtitle: "The Conversation · Dr. Julian Croft, Associate Professor of Urban Planning",
      paragraphs: [
        {
          id: "p01",
          text: "For post-war generations across North America, Europe, and Australasia, homeownership functioned as the indispensable cornerstone of the middle-class social contract. Buying an affordable 'starter home' in one’s twenties was not merely about securing shelter; it served as the primary mechanism for forced savings, long-term wealth accumulation, and intergenerational stability.",
        },
        {
          id: "p02",
          text: "Today, that property escalator has ground to a violent halt. Over the past three decades, residential real estate in major metropolitan centres has decoupled entirely from median household incomes. House price-to-income multiples that historically hovered around three or four have surged past ten or twelve in cities like London, Sydney, Toronto, and Auckland, rendering homeownership virtually unattainable for young professionals without access to the 'Bank of Mum and Dad'.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "The Financialisation of Housing as an Asset Class",
      subtitle: "Socio-Economic Empirical Analysis · Institute for Policy Research",
      paragraphs: [
        {
          id: "p03",
          text: "Mainstream political rhetoric frequently misdiagnoses this crisis as a simple failure of personal frugality—chiding younger generations for spending extravagantly on artisanal coffees and foreign holidays. Empirical economic reality refutes this condescending narrative: runaway housing costs are driven by the structural financialisation of real estate.",
        },
        {
          id: "p04",
          text: "Favourable tax regimes, negative gearing, and decades of ultra-low central bank interest rates transformed residential shelter from a basic human necessity into a speculative, high-yield asset class for institutional investors and multi-property landlords. Capital that should have flowed into productive technological innovation was instead absorbed by speculative land banking, creating an artificial scarcity that punishes first-time buyers.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Ripple Effects of Generation Rent",
      subtitle: "Demographic and Sociological Inquiry · The Conversation Policy Desk",
      paragraphs: [
        {
          id: "p05",
          text: "The societal consequences of locking an entire generation out of homeownership extend far beyond housing affordability. Chronic financial precarity in the private rental market directly suppresses birth rates, as couples delay marriage and parenthood due to eviction vulnerability and exorbitant rent burdens consuming upwards of 40% of their take-home pay.",
        },
        {
          id: "p06",
          text: "A genuine solution requires moving past incremental demand-side subsidies like first-home buyer grants, which merely inflate property prices further. Governments must undertake aggressive supply-side reforms: ending exclusionary single-family zoning, taxing speculative vacant properties, and treating non-market public social housing as essential civic infrastructure rather than emergency welfare.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, how has the ratio between house prices and median household income changed in major global cities?",
      options: [
        { id: "A", text: "It has decreased significantly due to automated 3D printing of affordable houses." },
        { id: "B", text: "It has surged from historical ratios of 3-4 times annual income to over 10-12 times median earnings." },
        { id: "C", text: "It has equalized completely with the price of electric vehicles." },
        { id: "D", text: "It has remained strictly frozen under international housing treaty mandates." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) chỉ ra sự tách rời khủng khiếp giữa giá nhà và thu nhập: tỷ lệ giá nhà so với thu nhập trung bình trước đây chỉ dao động ở mức 3–4 lần thì nay đã vọt lên trên 10–12 lần tại các đô thị lớn ('surged past ten or twelve in cities like London, Sydney...').",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what structural factor genuinely drove up housing unaffordability instead of young people's spending habits?",
      options: [
        { id: "A", text: "The financialisation of housing, tax exemptions, and cheap credit that transformed shelter into speculative asset investments." },
        { id: "B", text: "A severe global shortage of concrete and structural timber imports." },
        { id: "C", text: "Young people universally refusing to work in construction industries." },
        { id: "D", text: "Mandatory architectural regulations requiring private swimming pools in every home." },
      ],
      answer: "A",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 bóc tách nguyên nhân thực sự: các ưu đãi thuế, lãi suất rẻ và chính sách biến nhà ở từ nhu cầu sinh tồn thành kênh đầu cơ tài chính cho giới đầu tư ('transformed residential shelter from a basic human necessity into a speculative, high-yield asset class').",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What broader sociological consequence of the rental crisis does Source 3 highlight regarding demographic trends?",
      options: [
        { id: "A", text: "Young workers are migrating exclusively to rural farming communes." },
        { id: "B", text: "Financial instability and high rent burdens cause young couples to postpone marriage and childbearing, depressing national birth rates." },
        { id: "C", text: "Commercial banks are shutting down all consumer mortgage divisions." },
        { id: "D", text: "Public universities are replacing degrees with free residential dormitories." },
      ],
      answer: "B",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 (đoạn 1) chỉ ra hệ lụy xã hội: gánh nặng tiền thuê nhà nuốt chửng hơn 40% thu nhập và nỗi lo bị trục xuất khiến các cặp đôi trì hoãn kết hôn và sinh con, làm sụt giảm tỷ lệ sinh ('directly suppresses birth rates, as couples delay marriage and parenthood').",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains what governments must do regarding non-market public housing.",
      target_paragraph_id: "p06",
      target_sentence: "Governments must undertake aggressive supply-side reforms: ending exclusionary single-family zoning, taxing speculative vacant properties, and treating non-market public social housing as essential civic infrastructure rather than emergency welfare.",
      explanation: "Câu văn tại Source 3 (đoạn 2) nêu rõ giải pháp đột phá thể chế: 'Governments must undertake aggressive supply-side reforms: ending exclusionary single-family zoning, taxing speculative vacant properties, and treating non-market public social housing as essential civic infrastructure rather than emergency welfare.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources from The Conversation, what is the central thesis regarding the housing crisis?",
    options: [
      {
        id: "hyp-1",
        text: "Consumer Recklessness: The housing crisis is an individual moral failure solved entirely by skipping takeout meals.",
      },
      {
        id: "hyp-2",
        text: "The Structural Property Disconnect: The financialisation of housing has priced an entire generation out of wealth building and depressed family formation, requiring systemic supply-side reforms and public social housing investment.",
      },
      {
        id: "hyp-3",
        text: "Subsidised Demand: Governments should double first-home buyer cash grants to permanently lower home prices.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "House prices have decoupled from incomes, surging beyond 10-12 times annual earnings (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Housing was transformed from basic shelter into a speculative, high-yield asset class (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Exorbitant rent precarity forces couples to delay marriage and suppresses birth rates (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Solutions demand supply-side rezoning and treating social housing as essential civic infrastructure (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "Bài viết đưa ra góc nhìn thời sự đầy thấu cảm: Giá nhà tăng phi mã không phải lỗi của việc uống cà phê hay ăn hàng quán, mà là hệ quả của 'financialisation of housing'. Cuộc khủng hoảng này đang bẻ gãy nấc thang tích lũy tài sản và đẩy lùi việc lập gia đình của giới trẻ, đòi hỏi nhà nước phải xem nhà ở xã hội phi lợi nhuận như cơ sở hạ tầng công cộng thiết yếu.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng các gói trợ cấp tiền mặt cho người mua nhà lần đầu (first-home buyer grants) là giải pháp hiệu quả. Bài viết chứng minh các gói kích cầu tiền mặt chỉ càng thổi phồng giá nhà lên cao hơn, và giải pháp căn cơ phải nằm ở phía cung (supply-side reforms).",
      },
    ],
    takeaways: [
      "Hiện tượng 'Starter home' biến mất và sự ra đời của 'Generation Rent' (thế hệ thuê nhà trọn đời).",
      "Khái niệm 'Financialisation of housing' (tài chính hóa nhà ở thành tài sản đầu cơ).",
      "Collocations cực mạnh cho IELTS: 'house price-to-income multiples', 'intergenerational wealth divide', 'financial precarity', 'speculative asset class', 'social housing infrastructure'.",
    ],
  },
};
