import { ReadingCase } from "@/features/reading/types";

export const CASE_003: ReadingCase = {
  id: "case-003",
  title: "The Generative AI Paradox: Intellectual Displacement vs Human Agency",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Guardian Opinion & Technology Analysis Archive",
  },
  estimated_minutes: 14,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Illusion of Effortless Intelligence",
      subtitle: "The Guardian Opinion · Critical Technology Column",
      paragraphs: [
        {
          id: "p01",
          text: "The rapid ascendancy of generative artificial intelligence has inaugurated an era of profound cognitive disruption. Where previous technological revolutions mechanised physical toil, large language models now encroach upon the sanctum of intellectual production: synthesising literature, composing legal briefs, writing code, and orchestrating complex strategic analyses within seconds.",
        },
        {
          id: "p02",
          text: "Silicon Valley evangelists herald this transition as the ultimate democratization of expertise, arguing that cognitive barriers are permanently dissolved. However, this techno-optimistic narrative glosses over an insidious reality: outsourcing the strenuous friction of analytical thinking risks inducing cognitive atrophy. When students and professionals circumvent the iterative struggle of formulating ideas, they forfeit the precise cognitive pathways responsible for genuine discernment.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Labour Market Polarisation & The Creative Class",
      subtitle: "Socio-Economic Impact Assessment · Oxford & Cambridge Collective",
      paragraphs: [
        {
          id: "p03",
          text: "Historical transitions in industrial automation demonstrated a predictable bifurcated outcome: low-skill repetitive functions were eradicated while supervisory high-skill roles flourished. Generative AI fundamentally subverts this established dynamic by targeting intermediate knowledge work—paralegals, copywriters, entry-level programmers, and junior financial analysts.",
        },
        {
          id: "p04",
          text: "Economic data indicates that corporate deployment of autonomous algorithms is rarely paired with equitable wage distribution or working-hour reductions. Instead, it precipitates labour market polarization, systematically disenfranchising early-career professionals from foundational apprenticeships where nuanced craft and tacit knowledge are traditionally cultivated.",
        },
        {
          id: "p05",
          text: "Without institutional safeguards and ethical governance, the widespread redundancy of intermediate intellectual labour threatens to exacerbate income disparity and concentrate unprecedented capital in the hands of a microscopic oligopoly of platform monopolists.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Reclaiming Human Agency in the Algorithmic Age",
      subtitle: "Philosophical & Educational Inquiry · The Guardian Long Read",
      paragraphs: [
        {
          id: "p06",
          text: "To navigate this precipice, our educational paradigm must undergo systemic reform. Assessing students based on rote informational retrieval or formulaic academic essays has become obsolete, as large models replicate these conventions flawlessly. Pedagogy must pivot toward nurturing critical discernment, ethical reasoning, epistemic humility, and interpersonal empathy.",
        },
        {
          id: "p07",
          text: "Ultimately, generative artificial intelligence should be conceived not as an infallible surrogate for human intellect, but as an augmentative instrument. Genuine mastery in the post-AI era will not belong to passive consumers of algorithmic answers, but to individuals capable of interrogation, skepticism, and moral stewardship.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what fundamental distinction separates generative AI from previous technological revolutions?",
      options: [
        { id: "A", text: "It relies on cloud supercomputers instead of steam and electrical machinery." },
        { id: "B", text: "It encroaches upon intellectual production rather than merely mechanising physical labour." },
        { id: "C", text: "It was developed exclusively by private educational institutions rather than industrial factories." },
        { id: "D", text: "It eliminates energy consumption in manufacturing processes." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Trong Source 1 (đoạn 1): 'Where previous technological revolutions mechanised physical toil, large language models now encroach upon the sanctum of intellectual production.' Điều này làm rõ sự khác biệt giữa AI tạo sinh và các cuộc cách mạng cơ giới hóa trước đây.",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, why is generative AI disrupting traditional career progressions for young professionals?",
      options: [
        { id: "A", text: "It permanently deprives early-career workers of entry-level apprenticeships where tacit knowledge is cultivated." },
        { id: "B", text: "It forces university graduates to work entirely in manual trade jobs." },
        { id: "C", text: "It requires all new employees to hold doctoral degrees in data science." },
        { id: "D", text: "It lowers the retirement age of senior executives across Fortune 500 corporations." },
      ],
      answer: "A",
      evidence_paragraph_id: "p04",
      explanation: "Trong Source 2 (đoạn 2): 'systematically disenfranchising early-career professionals from foundational apprenticeships where nuanced craft and tacit knowledge are traditionally cultivated.'",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 1 imply when mentioning the risk of 'cognitive atrophy'?",
      options: [
        { id: "A", text: "Students will suffer from chronic biological vision deterioration due to high-resolution computer monitors." },
        { id: "B", text: "Bypassing the demanding process of formulating ideas weakens the brain's capacity for critical discernment and deep thinking." },
        { id: "C", text: "Users will entirely forget grammar and spoken vocabulary within months of using conversational assistants." },
        { id: "D", text: "Search engines will intentionally delete historical archives to boost AI subscriptions." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) giải thích rằng khi người học tránh né quá trình vật lộn tư duy ('iterative struggle of formulating ideas'), họ đánh mất các liên kết nhận thức giúp tôi luyện sự phân định độc lập ('forfeit the precise cognitive pathways responsible for genuine discernment').",
    },
    {
      id: "task-04",
      type: "PROVE",
      question: "Identify the critical sentence in Source 3 that defines what future pedagogy must prioritize instead of obsolete rote retrieval.",
      instruction: "Click directly on the sentence in Source 3 that specifies the core qualities education must cultivate in the post-AI era.",
      target_paragraph_id: "p06",
      target_sentence: "Pedagogy must pivot toward nurturing critical discernment, ethical reasoning, epistemic humility, and interpersonal empathy.",
      explanation: "Câu văn tại Source 3 (đoạn 1) nêu bật trọng tâm cải cách giáo dục: 'Pedagogy must pivot toward nurturing critical discernment, ethical reasoning, epistemic humility, and interpersonal empathy.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the central thesis regarding the societal impact of generative AI?",
    options: [
      {
        id: "hyp-1",
        text: "Technological Inevitability: Generative AI will seamlessly replace human universities and abolish the need for ethical regulation.",
      },
      {
        id: "hyp-2",
        text: "The Dual Threat of De-skilling & Oligopoly: AI risks eroding human analytical faculties while polarizing labour markets, necessitating urgent pedagogical reform and ethical stewardship.",
      },
      {
        id: "hyp-3",
        text: "Economic Democratization: AI creates universal wage increases for all intermediate knowledge workers regardless of institutional policies.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Outsourcing analytical friction risks cognitive atrophy and forfeiting discernment (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Deployment of autonomous algorithms precipitates labour market polarization and disenfranchises junior professionals (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Unregulated intellectual automation risks exacerbating income disparity and empowering platform monopolists (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p07",
        label: "AI should serve as an augmentative instrument under human interrogation and moral stewardship (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "Bài viết đúc kết toàn diện: Trí tuệ nhân tạo không chỉ là câu chuyện công nghệ đơn thuần mà là cuộc biến đổi sâu sắc về mặt nhận thức (nguy cơ suy giảm tư duy sâu) và kinh tế xã hội (phân cực thị trường lao động). Do đó, con người cần chủ động chuyển dịch sang rèn luyện tư duy phản biện, đạo đức và sự kiểm soát nhân tính thay vì lệ thuộc thụ động.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả kêu gọi bài xích hoặc cấm đoán hoàn toàn AI. Thực tế, tác giả đề xuất xem AI như một 'augmentative instrument' (công cụ bổ trợ) đặt dưới sự phản biện, hoài nghi khoa học và trách nhiệm đạo đức của con người.",
      },
    ],
    takeaways: [
      "Nguy cơ 'Cognitive atrophy' (teo mòn nhận thức) khi lạm dụng AI để bỏ qua quá trình vật lộn tư duy phản biện.",
      "Thị trường lao động tri thức trung cấp (intermediate knowledge work) đang bị xáo trộn, đòi hỏi người học phải nâng cấp lên năng lực phân định (discernment) và thấu cảm (empathy).",
      "Giáo dục cần chuyển trục từ kiểm tra ghi nhớ sang tư duy phản biện và trách nhiệm đạo đức.",
    ],
  },
};
