import { ReadingCase } from "@/features/reading/types";

export const CASE_009: ReadingCase = {
  id: "case-009",
  title: "The 60-Second Brain: How Short-Form Video Algorithms Rewire Youth Attention",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Conversation · Cognitive Neuroscience & Digital Culture",
  },
  estimated_minutes: 12,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Micro-Burst Attention Trap",
      subtitle: "The Conversation · Dr. Rachel Vance, Professor of Cognitive Psychology",
      paragraphs: [
        {
          id: "p01",
          text: "Open any short-form video feed—be it TikTok, Instagram Reels, or YouTube Shorts—and you are instantly stepping into a behavioral laboratory engineered to captivate the human brain. Every dynamic swipe serves a high-velocity payload of sensory stimulation, calibrated by recommendation algorithms to maximize dwell time. For millions of teenagers and young adults, scrolling has become an involuntary ambient soundtrack to everyday life.",
        },
        {
          id: "p02",
          text: "Yet developmental neuroscientists are sounding an urgent alarm. The human prefrontal cortex—the anatomical command centre tasked with sustained focus, impulse inhibition, and working memory—does not finish maturing until roughly age twenty-five. When developing minds are bathed in rapid algorithmic micro-bursts, the brain undergoes neuroplastic adaptation, growing habituated to immediate dopamine rewards and losing tolerance for the patient friction of deep, contemplative tasks.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Continuous Partial Attention & The Multitasking Myth",
      subtitle: "Empirical Behavioural Study · Oxford Cognitive Lab & The Conversation",
      paragraphs: [
        {
          id: "p03",
          text: "Contrary to the widespread cultural myth of the 'digital native' effortlessly multitasking, cognitive science demonstrates that the human brain cannot parallel-process complex informational streams. What looks like multitasking is actually rapid task-switching, a neurochemical ping-pong that incurs what researchers term an 'attentional switching penalty'.",
        },
        {
          id: "p04",
          text: "Students who habitually toggle between study materials and algorithm feeds suffer documented declines in reading comprehension and critical synthesis. More subtly, this perpetual fragmentation induces a state of 'continuous partial attention'—a background cognitive anxiety where the mind remains on perpetual high alert for incoming digital stimuli, eroding the baseline mental stillness necessary for creative epiphany.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Algorithmic Accountability and Attentional Hygiene",
      subtitle: "Public Health & Policy Commentary · Centre for Humane Technology",
      paragraphs: [
        {
          id: "p05",
          text: "Framing this attentional crisis as an individual failing of discipline or willpower misunderstands the asymmetric nature of modern surveillance capitalism. A lone fifteen-year-old willpower is pitted against supercomputing clusters employing thousands of machine learning engineers whose singular corporate mandate is to capture and monetize attention.",
        },
        {
          id: "p06",
          text: "Resolving this epidemic demands both structural regulation and deliberate personal agency. Governments must enforce age-appropriate algorithmic designs that curb predatory infinite-scroll loops, while schools and households cultivate 'attentional hygiene'—sacred analog zones of unbroken reading, handwriting, and face-to-face dialogue where human cognition can flourish uncolonized by algorithms.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, why is the human prefrontal cortex uniquely vulnerable to short-form video feeds?",
      options: [
        { id: "A", text: "It cannot process moving digital colours without severe ocular migraines." },
        { id: "B", text: "It is the brain centre for focus and impulse control that continues maturing until roughly age twenty-five." },
        { id: "C", text: "It loses the ability to understand auditory speech after thirty minutes of scrolling." },
        { id: "D", text: "It requires surgical intervention to adapt to high-definition mobile screens." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) chỉ ra vỏ não trước trán (prefrontal cortex) chịu trách nhiệm kiểm soát xung động và khả năng tập trung sâu, chỉ hoàn thiện vào khoảng tuổi 25, khiến người trẻ dễ bị cuốn vào các vòng lặp vi mô của thuật toán: 'does not finish maturing until roughly age twenty-five.'",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what reality debunks the myth that young people are skilled digital multitaskers?",
      options: [
        { id: "A", text: "They actually engage in rapid task-switching, which imposes an 'attentional switching penalty' that degrades deep comprehension." },
        { id: "B", text: "They consistently prefer listening to analogue vinyl records over mobile streaming apps." },
        { id: "C", text: "They score higher on memorisation tests when studying inside commercial shopping malls." },
        { id: "D", text: "Their eye movements completely freeze whenever they receive a notification alert." },
      ],
      answer: "A",
      evidence_paragraph_id: "p03",
      evidence_paragraph_ids: ["p03", "p04"],
      explanation: "Source 2 vạch trần ảo tưởng đa nhiệm: bộ não con người không thể xử lý song song các tác vụ phức tạp mà thực chất chỉ là nhảy việc liên tục (rapid task-switching), gây ra 'attentional switching penalty' làm suy giảm khả năng đọc hiểu và tổng hợp phản biện.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 argue regarding the power dynamic between adolescents and tech platforms?",
      options: [
        { id: "A", text: "Teenagers possess advanced hacking capabilities that consistently defeat corporate security systems." },
        { id: "B", text: "Expecting individual willpower to overcome hyper-optimized algorithmic engagement is an unfair and unrealistic expectation." },
        { id: "C", text: "Social media companies should be operated exclusively as non-profit charitable trusts." },
        { id: "D", text: "Hardware manufacturers intentionally limit battery life to enforce digital detoxes." },
      ],
      answer: "B",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 (đoạn 1) chỉ ra sự bất cân xứng khổng lồ: một đứa trẻ 15 tuổi với ý chí cá nhân không thể đọ lại những cụm siêu máy tính và hàng nghìn kỹ sư thuật toán có nhiệm vụ thương mại hóa sự chú ý: 'A lone fifteen-year-old willpower is pitted against supercomputing clusters...'",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains what dual approach is required to resolve this attentional crisis.",
      target_paragraph_id: "p06",
      target_sentence: "Resolving this epidemic demands both structural regulation and deliberate personal agency.",
      explanation: "Câu mở đầu tại Source 3 (đoạn 2) làm rõ giải pháp kép: 'Resolving this epidemic demands both structural regulation and deliberate personal agency.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources from The Conversation, what is the central thesis regarding short-form video media?",
    options: [
      {
        id: "hyp-1",
        text: "Evolutionary Superiority: Short-form videos enhance long-term IQ and should replace written examinations entirely in high schools.",
      },
      {
        id: "hyp-2",
        text: "The Cognitive Rewiring Crisis: Algorithmic feeds habituate developing brains to dopamine micro-bursts and continuous distraction, requiring regulatory safeguards and intentional attentional hygiene.",
      },
      {
        id: "hyp-3",
        text: "Hardware Malfunction: Mobile screens emit micro-frequencies that physically deteriorate prefrontal bone structures.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Developing prefrontal cortex habituates to immediate dopamine rewards and loses deep focus stamina (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Multitasking induces continuous partial attention and degrades reading comprehension (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Surveillance capitalism pits individual youth willpower against corporate supercomputers (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Solutions require structural algorithmic regulation paired with cultivated attentional hygiene (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "Bài viết đúc kết vấn đề thời sự nhức nhối: Thói quen lướt video ngắn không chỉ làm lãng phí thời gian mà đang biến đổi thần kinh (neuroplastic adaptation) của thế hệ trẻ, tạo ra hội chứng 'Continuous Partial Attention'. Giải pháp không thể chỉ là kêu gọi cá nhân tự giác mà phải có luật chế tài thuật toán vô tận và kiến tạo các không gian analog không thiết bị số.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả kêu gọi cấm hoàn toàn điện thoại thông minh. Thực tế, bài viết nhấn mạnh việc thiết lập ranh giới 'Attentional hygiene' (vệ sinh chú ý) và can thiệp pháp lý đối với các tính năng gây nghiện như infinite scroll.",
      },
    ],
    takeaways: [
      "Khái niệm 'Continuous partial attention' (chú ý phân mảnh liên tục) và 'Attentional switching penalty'.",
      "Sự bất cân xứng quyền lực giữa ý chí người trẻ và 'supercomputing clusters' của các tập đoàn công nghệ.",
      "Collocations đắt giá cho IELTS: 'dopamine micro-bursts', 'continuous partial attention', 'task-switching penalty', 'attentional hygiene', 'prefrontal cortex development'.",
    ],
  },
};
