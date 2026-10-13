import { ReadingCase } from "@/features/reading/types";

export const CASE_007: ReadingCase = {
  id: "case-007",
  title: "The Demographic Winter: Shrinking Workforces, Pension Arithmetics and Global Stagnation",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 8.0,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Economist · Finance & Economics Intelligence Archive",
  },
  estimated_minutes: 14,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Implosion of Global Fertility",
      subtitle: "The Economist · Briefing & Global Demography Column",
      paragraphs: [
        {
          id: "p01",
          text: "For more than two centuries, the calculus of global capitalism rested upon an unspoken demographic premise: that each successive generation would be more numerous and productive than the last. That foundational assumption has now dissolved. Across advanced industrial economies and a rapidly widening swath of the developing world, fertility rates have plunged precipitously below the 2.1 births per woman required for long-term population replacement.",
        },
        {
          id: "p02",
          text: "From East Asia to southern Europe, nations are confronting what demographers term an unprecedented 'demographic winter'. While environmentalists occasionally celebrate the prospect of fewer ecological footprints, macroeconomists view this contraction with profound apprehension. A shrinking workforce does not simply mean smaller factories; it undermines innovation velocity, suppresses aggregate consumer demand, and permanently alters the balance between capital accumulation and social welfare.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "The Bankruptcy of the Pay-As-You-Go Social Contract",
      subtitle: "Fiscal Sustainability Assessment · Economic Policy Directorate",
      paragraphs: [
        {
          id: "p03",
          text: "The institutional architecture of modern welfare states relies overwhelmingly on pay-as-you-go (PAYG) pension models, wherein current workers’ payroll taxes directly finance the retirement stipends of living pensioners. When Bismarck conceived this mechanism, demographic pyramids were broad-based: dozens of active labourers supported a solitary retiree who rarely survived past seventy.",
        },
        {
          id: "p04",
          text: "Today, that pyramid is inverted into an unsustainable obelisk. As dependency ratios deteriorate, governments face an unpalatable trilemma: hike payroll taxes to extortionate rates that strangle wage growth, slash pension entitlements to trigger widespread elderly impoverishment, or run chronic sovereign deficits that risk sovereign bond market rebellions. Cash-for-kids pronatalist incentives have yielded negligible statistical rebounds, confirming that fertility decisions are structurally tethered to prohibitive childcare and housing economics.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Robotic Substitutions and the Silver Dividend",
      subtitle: "The Economist · Leaders: Adapting to Grey Planet",
      paragraphs: [
        {
          id: "p05",
          text: "Faced with this structural arithmetic, technocrats frequently place undue faith in technological substitutes—hoping generative automation and humanoid robotics will effortlessly offset declining headcount. Yet automation requires capital expenditure that ageing, risk-averse societies are often reluctant to deploy, and caregiving for geriatric populations resists automated productivity gains.",
        },
        {
          id: "p06",
          text: "A resilient response requires dismantling rigid retirement orthodoxies. Modern economies must transition toward flexible, phased retirement, recalibrate immigration frameworks to absorb skilled foreign labor, and unlock what economists term the 'silver dividend'—capitalising on the institutional wisdom and longevity of healthy older citizens without cannibalising the fiscal prospects of the young.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what fundamental demographic assumption of global capitalism has permanently dissolved?",
      options: [
        { id: "A", text: "That rural populations would indefinitely migrate to urban centres without wage increases." },
        { id: "B", text: "That each subsequent generation would naturally be more numerous and economically productive than the previous one." },
        { id: "C", text: "That governments could fund universal higher education through export tariffs alone." },
        { id: "D", text: "That manufacturing industries would always generate higher profit margins than financial services." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) chỉ rõ tiền đề nhân khẩu học bị sụp đổ: 'that each successive generation would be more numerous and productive than the last. That foundational assumption has now dissolved.'",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, why has the traditional Bismarckian 'pay-as-you-go' pension structure become fiscally unsustainable?",
      options: [
        { id: "A", text: "Because international trade organizations banned sovereign pension funds from buying foreign equities." },
        { id: "B", text: "Because dependency ratios have inverted: a shrinking tax-paying workforce must now support an expanding cohort of retirees living far longer." },
        { id: "C", text: "Because commercial banks refused to process automated retirement payroll deductions." },
        { id: "D", text: "Because young workers are legally exempt from paying national social security contributions." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 đối chiếu tháp dân số thời Bismarck (hàng chục người đi làm nuôi một người về hưu) với hiện tại khi tháp dân số bị đảo ngược ('inverted into an unsustainable obelisk'), khiến tỷ lệ phụ thuộc (dependency ratio) xấu đi nghiêm trọng.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 imply about relying solely on robotics and AI to solve demographic decline?",
      options: [
        { id: "A", text: "Robotics and AI are fully capable of replacing human labour within the next twelve months." },
        { id: "B", text: "Technological automation cannot fully compensate for human caregiving deficits or the risk-aversion of ageing capital markets." },
        { id: "C", text: "Governments should prohibit artificial intelligence research in order to preserve manufacturing jobs." },
        { id: "D", text: "Older populations universally refuse to use robotic household appliances." },
      ],
      answer: "B",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 (đoạn 1) chỉ ra hạn chế của giải pháp thuần kỹ trị: tự động hóa đòi hỏi nguồn vốn đầu tư lớn mà các xã hội già hóa thường e ngại rủi ro, đồng thời công việc chăm sóc người cao tuổi ('caregiving for geriatric populations') rất khó tăng năng suất bằng máy móc.",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that specifies what policy reforms are required instead of rigid traditional retirement ages.",
      target_paragraph_id: "p06",
      target_sentence: "Modern economies must transition toward flexible, phased retirement, recalibrate immigration frameworks to absorb skilled foreign labor, and unlock what economists term the 'silver dividend'—capitalising on the institutional wisdom and longevity of healthy older citizens without cannibalising the fiscal prospects of the young.",
      explanation: "Câu văn tại Source 3 (đoạn 2) nêu rõ toàn diện các giải pháp thích ứng: 'Modern economies must transition toward flexible, phased retirement, recalibrate immigration frameworks to absorb skilled foreign labor, and unlock what economists term the 'silver dividend'—capitalising on the institutional wisdom and longevity of healthy older citizens without cannibalising the fiscal prospects of the young.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources from The Economist, what is the central macroeconomic diagnosis of the global demographic winter?",
    options: [
      {
        id: "hyp-1",
        text: "Malthusian Inevitability: Population decline is an exclusively positive development that will permanently eradicate unemployment without fiscal adjustments.",
      },
      {
        id: "hyp-2",
        text: "The Structural Welfare Trilemma: Collapsing fertility inverts demographic pyramids, rendering traditional pensions unsustainable and requiring structural economic adaptation beyond simple cash incentives or automation.",
      },
      {
        id: "hyp-3",
        text: "Technological Omnipotence: Humanoid robots will universally replace all retirees, making national pension systems obsolete within three years.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p01",
        label: "Fertility rates across industrial nations have plunged below the 2.1 replacement threshold (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Deteriorating dependency ratios force an unpalatable trilemma on pay-as-you-go welfare states (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Automation alone cannot effortlessly offset declining headcount or resolve caregiving deficits (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Adapting requires phased retirement, calibrated immigration, and unlocking the silver dividend (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "The Economist phân tích bản chất kinh tế vĩ mô: Già hóa dân số không đơn thuần là câu chuyện y tế mà là cuộc khủng hoảng thể chế tài khóa (fiscal sustainability) của mô hình nhà nước phúc lợi PAYG. Các chính sách thưởng tiền đẻ (cash-for-kids) hay kỳ vọng robot làm thay đều bất khả thi nếu không cải cách tuổi nghỉ hưu, mở cửa lao động nhập cư và khai thác 'cổ tức bạc' (silver dividend).",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả ủng hộ cắt giảm triệt để chế độ an sinh người già. Thực tế, bài viết nhấn mạnh rằng việc cắt giảm trợ cấp đẩy người già vào bần cùng hóa, do đó giải pháp cốt lõi là chuyển đổi mô hình nghỉ hưu linh hoạt (phased retirement) và mở rộng năng suất lao động.",
      },
    ],
    takeaways: [
      "Khái niệm 'Demographic winter' (mùa đông nhân khẩu học) và 'Dependency ratio' (tỷ lệ phụ thuộc).",
      "Mô hình 'Pay-as-you-go (PAYG) pension' và sự thất bại của các chính sách trợ cấp tiền mặt 'cash-for-kids'.",
      "Thuật ngữ 'Silver dividend' (cổ tức bạc) khai thác kinh nghiệm và trí tuệ của lực lượng lao động cao tuổi khỏe mạnh.",
    ],
  },
};
