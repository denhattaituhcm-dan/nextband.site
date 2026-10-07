import { ReadingCase } from "@/features/reading/types";

export const CASE_004: ReadingCase = {
  id: "case-004",
  title: "The EdTech Delusion: Screen-Based Learning & The Erosion of Deep Literacy",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Guardian Opinion & Pedagogical Critique Archive",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Commercial Colonisation of the Modern Classroom",
      subtitle: "The Guardian Opinion · Education & Society Column",
      paragraphs: [
        {
          id: "p01",
          text: "Over the past decade, a seductive orthodoxy has captured educational policymakers worldwide: the presumption that saturating classrooms with tablets, interactive touchscreens, and algorithmic learning platforms inherently improves academic performance. Silicon Valley venture funds and educational technology conglomerates have commodified the classroom, framing continuous digitisation as an incontestable moral imperative.",
        },
        {
          id: "p02",
          text: "Yet empirical scrutiny paints an unsettling picture. Instead of fostering intellectual curiosity, the pervasive presence of networked devices frequently reduces students to passive consumers of gamified micro-content. By conflating fleeting entertainment with pedagogical efficacy, school districts have unwittingly dismantled environments conducive to sustained contemplation.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Neuroscience of Reading: Deep Reading vs Skimming",
      subtitle: "Cognitive Science Review · Centre for Human Literacy",
      paragraphs: [
        {
          id: "p03",
          text: "Neurobiological research reveals that reading is not an innate biological faculty like spoken language, but a culturally acquired circuit that the brain shapes dynamically. Reading complex physical print cultivates 'deep reading' circuits—neural pathways dedicated to analogical reasoning, critical deduction, and empathetic perspective-taking.",
        },
        {
          id: "p04",
          text: "Conversely, digital interfaces encourage rapid information grazing, hyper-skimming, and keyword spotting. When children primarily interact with hyperlinked screen media, their brains experience persistent cognitive overload, which systematically impairs their capacity to comprehend long-form syntax, infer subtext, or construct nuanced counter-arguments.",
        },
      ],
    },
    {
      id: "source-03",
      type: "witness_statement",
      title: "The Nordic Reversal & A Return to Tactile Pedagogy",
      subtitle: "Policy Retrospective · Scandinavian Ministry of Education",
      paragraphs: [
        {
          id: "p05",
          text: "Having previously led the global vanguard in one-to-one laptop initiatives, Scandinavian educational authorities have executed a striking policy reversal. Facing documented declines in basic reading stamina and handwriting fluidity, Sweden and neighbouring jurisdictions have reallocated hundreds of millions of euros toward physical textbooks, handwriting instruction, and silent library reading periods.",
        },
        {
          id: "p06",
          text: "This strategic pivot does not advocate total technological denial, but rather asserts the irreplaceable primacy of tactile pedagogy. True educational equity is not achieved by distributing identical glass screens, but by safeguarding the quiet cognitive architecture that allows a young mind to grapple deeply with complex thought.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what commercial presumption has dominated global educational policy over the last decade?",
      options: [
        { id: "A", text: "That equipping classrooms with digital screens and algorithmic platforms automatically enhances academic outcomes." },
        { id: "B", text: "That privatising all secondary schools would eliminate municipal administrative overhead." },
        { id: "C", text: "That replacing human teachers with robotic tutors would reduce nationwide educational budgets." },
        { id: "D", text: "That physical sports should be substituted with competitive e-sports leagues." },
      ],
      answer: "A",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) nêu rõ: 'the presumption that saturating classrooms with tablets, interactive touchscreens, and algorithmic learning platforms inherently improves academic performance.'",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, how does reading physical print uniquely differ from reading on digital screens?",
      options: [
        { id: "A", text: "Print reading requires more physical energy and accelerates cognitive fatigue." },
        { id: "B", text: "Print reading trains neural circuits responsible for analogical deduction and empathetic perspective-taking, whereas screens encourage skimming." },
        { id: "C", text: "Digital reading expands children's peripheral vision and improves acoustic memory." },
        { id: "D", text: "Screen reading guarantees superior comprehension of historical chronologies." },
      ],
      answer: "B",
      evidence_paragraph_id: "p03",
      evidence_paragraph_ids: ["p03", "p04"],
      explanation: "Source 2 đối chiếu rõ: việc đọc sách giấy nuôi dưỡng 'deep reading circuits' (suy luận tương tự, suy diễn phản biện và thấu cảm), trong khi màn hình kỹ thuật số kích hoạt trạng thái 'information grazing, hyper-skimming, and keyword spotting'.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What lesson can be inferred from the Scandinavian policy reversal described in Source 3?",
      options: [
        { id: "A", text: "Northern European governments intend to ban home internet connections for all families." },
        { id: "B", text: "Early aggressive digitisation in schools resulted in measurable deficits in foundational literacy and reading endurance." },
        { id: "C", text: "Handwriting has been scientifically proven to be irrelevant to long-term memory formation." },
        { id: "D", text: "Textbook manufacturers exerted corrupt political leverage over Scandinavian parliaments." },
      ],
      answer: "B",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 chỉ ra rằng chính các quốc gia từng đi đầu về số hóa lớp học đã phải quay lại với sách giấy sau khi ghi nhận sự sụt giảm về sức bền đọc hiểu cơ bản ('declines in basic reading stamina and handwriting fluidity').",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains why educational equity cannot be simplified to providing identical digital screens.",
      target_paragraph_id: "p06",
      target_sentence: "True educational equity is not achieved by distributing identical glass screens, but by safeguarding the quiet cognitive architecture that allows a young mind to grapple deeply with complex thought.",
      explanation: "Câu kết tại Source 3 (đoạn 2) làm rõ triết lý công bằng giáo dục đích thực: 'True educational equity is not achieved by distributing identical glass screens, but by safeguarding the quiet cognitive architecture that allows a young mind to grapple deeply with complex thought.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the core critical argument regarding educational technology (EdTech)?",
    options: [
      {
        id: "hyp-1",
        text: "Technological Superiority: Traditional paper books should be discarded entirely to prepare pupils for the modern metaverse.",
      },
      {
        id: "hyp-2",
        text: "The Superficiality Trap: Indiscriminate digitisation commodifies education and fragments attention, proving that true deep literacy relies on sustained, tactile engagement.",
      },
      {
        id: "hyp-3",
        text: "Economic Conservation: Schools should cancel digital subscriptions purely to lower annual electricity expenditures.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Conflating entertainment with pedagogy reduces students to passive consumers of gamified fragments (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Digital screens encourage hyper-skimming and induce cognitive overload, impairing deep comprehension (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Scandinavian nations reversed laptop policies due to declines in reading stamina and handwriting (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Educational equity requires safeguarding the cognitive architecture of deep thought, not just distributing screens (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "Cả 3 nguồn cùng hợp nhất luận điểm: Việc nhồi nhét công nghệ vào lớp học thường chỉ mang tính biểu diễn thương mại, trong khi việc đọc lướt trên màn hình làm tổn hại mạch tư duy sâu (deep reading circuits). Giáo dục bền vững đòi hỏi sự cân bằng và bảo tồn không gian đọc sâu, rèn luyện sự kiên nhẫn nhận thức.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả kêu gọi loại bỏ hoàn toàn máy tính khỏi xã hội hiện đại. Bài viết nhấn mạnh rằng công nghệ là công cụ, nhưng không thể thay thế phương pháp sư phạm tiếp xúc trực tiếp (tactile pedagogy) và khả năng đọc sâu.",
      },
    ],
    takeaways: [
      "Khái niệm 'Deep reading circuits' đối lập với thói quen 'hyper-skimming' trên màn hình kỹ thuật số.",
      "Bài học từ 'The Nordic Reversal': Ngay cả các quốc gia phát triển nhất cũng phải tái thiết lập ranh giới cho thiết bị số trong học đường.",
      "Từ vựng đỉnh cao cho IELTS Writing Task 2 chủ đề Education & Technology: 'pedagogical efficacy', 'commodify education', 'cognitive overload', 'tactile pedagogy'.",
    ],
  },
};
