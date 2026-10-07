import { ReadingCase } from "@/features/reading/types";

export const CASE_006: ReadingCase = {
  id: "case-006",
  title: "The Hyperconnected Loneliness Epidemic: Algorithmic Feeds & The Atomisation of Community",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Guardian Opinion & Sociological Inquiry Archive",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Illusion of Infinite Companionship",
      subtitle: "The Guardian Opinion · Social Psychology & Modern Life Column",
      paragraphs: [
        {
          id: "p01",
          text: "Never before in evolutionary history has humanity existed in such a state of perpetual informational saturation. Through ubiquitous smartphones and algorithmic recommendation engines, individuals possess instant access to global conversations, asynchronous messaging, and infinite curated feeds. Superficially, digital modernity appears to have fulfilled humanity’s primordial yearning for total connectivity.",
        },
        {
          id: "p02",
          text: "Yet underneath this shimmering veneer of interconnectedness lies a profound sociological paradox. Public health surveys across advanced industrial economies indicate unprecedented surges in chronic social isolation, depressive symptoms, and subjective feelings of alienation, particularly among digital natives. By mistaking continuous algorithmic stimulation for authentic emotional intimacy, society has substituted tactile companionship with shallow, performative interactions.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Parasocial Bonds & The Dopamine Feedback Economy",
      subtitle: "Behavioural Neuroscience Review · Centre for Human Attachment",
      paragraphs: [
        {
          id: "p03",
          text: "Human connection is neurobiologically mediated through subtle physical signals—synchronised breath, micro-facial expressions, shared silences, and direct eye contact—that trigger oxytocin synthesis and down-regulate the sympathetic nervous system. In sharp contrast, commercial engagement algorithms are engineered around intermittent variable rewards, trapping users in ephemeral dopamine feedback loops designed to extract attentional capital.",
        },
        {
          id: "p04",
          text: "This architecture incentivises asymmetric parasocial interactions, where users develop one-sided emotional attachments to digital influencers or algorithmically generated personas. Because these synthetic encounters demand zero vulnerability or mutual accountability, they atrophy real-world interpersonal friction tolerance, rendering unmediated social engagement awkward, exhausting, and intimidating.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Architecture of Belonging & Third Places",
      subtitle: "Urban Sociology Policy Brief · Collective Infrastructure Forum",
      paragraphs: [
        {
          id: "p05",
          text: "Framing this epidemic purely as an individual psychological deficit or personal failure of willpower conceals the systemic erosion of communal infrastructure. Sociologist Ray Oldenburg long argued that healthy civil society relies on 'third places'—neutral, non-commercial public spaces such as public libraries, civic squares, parks, and neighbourhood community halls where diverse citizens gather organically without the imperative to purchase goods.",
        },
        {
          id: "p06",
          text: "The financialization of urban real estate, coupled with the aggressive privatisation of civic spaces, has systematically atomised communities, marooning citizens in hyper-isolated domestic bubbles. Remedying modern loneliness cannot be achieved through mindfulness apps or digital detox retreats alone; it requires ambitious structural reinvestment in the civic and physical architecture of belonging.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what underlying paradox characterizes modern digital connectivity?",
      options: [
        { id: "A", text: "Subscription fees for social platforms are rising while internet bandwidth speeds are slowing down." },
        { id: "B", text: "Despite unprecedented technical access to communication, chronic social isolation and alienation have reached record levels." },
        { id: "C", text: "Digital natives spend more time reading physical literature than engaging with mobile applications." },
        { id: "D", text: "Older demographics use video conferencing more frequently than younger generations." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) chỉ ra nghịch lý xã hội học: dù công nghệ mang lại khả năng kết nối tức thì ở mọi nơi, các cuộc khảo sát y tế cộng đồng lại ghi nhận sự gia tăng chưa từng có của tình trạng cô lập xã hội mãn tính và cảm giác tha hóa ('unprecedented surges in chronic social isolation, depressive symptoms, and subjective feelings of alienation').",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, how do synthetic parasocial interactions negatively affect real-world relationships?",
      options: [
        { id: "A", text: "They erode interpersonal friction tolerance, making face-to-face interaction feel awkward and exhausting." },
        { id: "B", text: "They permanently reduce physical eyesight through continuous screen exposure." },
        { id: "C", text: "They eliminate the brain's ability to process verbal speech." },
        { id: "D", text: "They force users to spend their entire savings on digital influencer merchandise." },
      ],
      answer: "A",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 (đoạn 2) phân tích rằng vì các mối quan hệ ảo một chiều không đòi hỏi sự bộc lộ bản thân hay trách nhiệm tương hỗ, chúng làm thui chột khả năng chịu đựng ma sát tương tác ngoài đời thực: 'they atrophy real-world interpersonal friction tolerance, rendering unmediated social engagement awkward, exhausting, and intimidating.'",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 argue regarding popular remedies like 'mindfulness apps' or 'digital detoxes'?",
      options: [
        { id: "A", text: "They are completely illegal in Scandinavian urban jurisdictions." },
        { id: "B", text: "They are individualistic coping mechanisms that fail to address the systemic destruction of communal public spaces." },
        { id: "C", text: "They are manufactured exclusively by public libraries to boost membership fees." },
        { id: "D", text: "They effectively eliminate urban traffic congestion in major metropolitan centres." },
      ],
      answer: "B",
      evidence_paragraph_id: "p06",
      explanation: "Source 3 (đoạn 2) chỉ rõ: 'Remedying modern loneliness cannot be achieved through mindfulness apps or digital detox retreats alone; it requires ambitious structural reinvestment in the civic and physical architecture of belonging.' — tức việc coi cô đơn là vấn đề cá nhân là thiển cận, cần cải tạo cấu trúc không gian công cộng xã hội.",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that defines what 'third places' are and why they are vital for civil society.",
      target_paragraph_id: "p05",
      target_sentence: "Sociologist Ray Oldenburg long argued that healthy civil society relies on 'third places'—neutral, non-commercial public spaces such as public libraries, civic squares, parks, and neighbourhood community halls where diverse citizens gather organically without the imperative to purchase goods.",
      explanation: "Source 3 (đoạn 1) trích dẫn định nghĩa kinh điển của nhà xã hội học Ray Oldenburg về 'third places': 'Sociologist Ray Oldenburg long argued that healthy civil society relies on 'third places'—neutral, non-commercial public spaces such as public libraries, civic squares, parks, and neighbourhood community halls where diverse citizens gather organically without the imperative to purchase goods.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the root cause and remedy for the modern epidemic of loneliness?",
    options: [
      {
        id: "hyp-1",
        text: "Technological Inevitability: Society must surrender all in-person interaction and migrate permanently into virtual reality spaces.",
      },
      {
        id: "hyp-2",
        text: "The Structural Crisis of Belonging: Algorithmic dopamine loops replace genuine intimacy while urban privatisation destroys civic 'third places', requiring structural reinvestment in public communal infrastructure.",
      },
      {
        id: "hyp-3",
        text: "Personal Responsibility: Loneliness is caused entirely by individual lack of willpower and can be permanently resolved by deleting social apps.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Society has substituted tactile companionship with shallow, performative interactions, surging chronic isolation (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p03",
        label: "Commercial algorithms trap users in dopamine feedback loops instead of neurobiological oxytocin attachment (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p04",
        label: "Parasocial bonds atrophy real-world interpersonal friction tolerance (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Remedying loneliness requires ambitious structural reinvestment in the civic and physical architecture of belonging (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-04"],
    explanation: "Bài viết đúc kết đa tầng: Vấn nạn cô đơn thời hiện đại không đơn thuần là lỗi của cá nhân lướt điện thoại nhiều, mà là sự cộng hưởng giữa thiết kế thuật toán gây nghiện (thay thế thấu cảm sinh học bằng tương tác một chiều parasocial) và sự suy tàn của không gian công cộng phi thương mại ('third places'). Giải pháp căn cơ đòi hỏi đầu tư vào hạ tầng xã hội và gắn kết cộng đồng thực chất.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả đổ toàn bộ lỗi lên người dùng cá nhân (thiếu kỷ luật, thiếu kỹ năng sống). Bài viết chứng minh đây là một vấn đề cấu trúc hệ thống (systemic structural issue) bắt nguồn từ mô hình kinh tế thuật toán và sự tư nhân hóa không gian công cộng.",
      },
    ],
    takeaways: [
      "Khái niệm 'Third Places' của Ray Oldenburg: Nơi chốn thứ ba (sau gia đình và nơi làm việc) đóng vai trò sống còn cho sự gắn kết xã hội.",
      "Tương tác 'Parasocial interactions' (gắn kết một chiều với người nổi tiếng trên mạng) làm suy giảm 'interpersonal friction tolerance' (sức chịu đựng ma sát khi tương tác trực tiếp).",
      "Collocations đắt giá cho IELTS Writing Task 2 chủ đề Social Issues & Mental Health: 'epidemic of loneliness', 'parasocial bonds', 'atomisation of community', 'tactile companionship', 'third places', 'ephemeral dopamine loops'.",
    ],
  },
};
