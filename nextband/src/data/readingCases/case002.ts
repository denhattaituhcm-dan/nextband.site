import { ReadingCase } from "@/features/reading/types";

export const CASE_002: ReadingCase = {
  id: "case-002",
  title: "The Buffett Multiplier: The Human Skill That Outperforms AI",
  level: {
    realm: "HOC_SI",
    realm_name_vi: "Học Sĩ",
    ielts_band: 6.0,
    difficulty: 3,
  },
  universe: {
    type: "REAL_WORLD",
    name: "Fast Company Executive Strategy & Leadership Archive",
  },
  estimated_minutes: 12,
  sources: [
    {
      id: "source-01",
      type: "witness_statement",
      title: "The Stanford Conversation & The 1952 Diploma",
      subtitle: "Warren Buffett Advice Archive · Dale Carnegie 1952",
      paragraphs: [
        {
          id: "p01",
          text: "Warren Buffett has spent decades dispensing simple advice that tends to age remarkably well. In an era where AI can write emails, summarize meetings, draft business plans, and generate presentations in seconds, the ability to communicate as a human has become a genuine competitive advantage.",
        },
        {
          id: "p02",
          text: "Speaking to a Stanford graduate many years ago, Buffett offered this advice: “At your age, the best way you can improve yourself is to learn to communicate better. Your results in life will be magnified if you can communicate them better. The only diploma I hang in my office is the communications diploma I got from Dale Carnegie in 1952.”",
        },
        {
          id: "p03",
          text: "Buffett added that without good communication skills, you won’t be able to convince people to follow you, even though you see over the mountain and they don’t.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "The Strategic Multiplier in the AI Era",
      subtitle: "Fast Company · Marcel Schwantes",
      paragraphs: [
        {
          id: "p04",
          text: "While Buffett’s advice sounds obvious, its value has skyrocketed in the AI era. AI can generate business plans, write marketing copy, analyze spreadsheets, summarize research, and even produce software code in seconds. What it can’t do is earn trust, inspire commitment, navigate conflict, or make another human feel understood.",
        },
        {
          id: "p05",
          text: "That’s why communication has become a force multiplier. The leaders who will thrive over the next decade won’t necessarily be the ones with the best prompts. They’ll be the ones who can translate complexity into clarity, rally people around a vision, ask thoughtful questions, and build relationships that AI simply can’t replicate.",
        },
        {
          id: "p06",
          text: "In fact, communication has evolved from being a soft skill into a strategic business skill. Every entrepreneur eventually discovers that customers don’t buy products—they buy confidence. Investors don’t fund ideas—they fund founders they believe can execute. Employees don’t stay because of perks alone—they stay because they trust the people leading them.",
        },
        {
          id: "p07",
          text: "Buffett understood this long before generative AI arrived. When he says your results in life will be magnified by learning to communicate, he’s describing a principle that compounds over time. Every conversation, presentation, sales pitch, interview, difficult feedback session, podcast appearance, or keynote becomes an opportunity to create influence—or lose it.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Three Habits of Transformational Communicators",
      subtitle: "Fast Company Leadership Insights",
      paragraphs: [
        {
          id: "p08",
          text: "Replace assumptions with curiosity. The fastest way to derail communication is to assume you already know what someone thinks or why they acted a certain way. Curiosity changes the conversation. Instead of preparing your rebuttal, ask another question. Instead of defending your position, seek to understand theirs. Research consistently shows that people who demonstrate genuine curiosity build stronger relationships, collaborate more effectively, and are viewed as more trustworthy.",
        },
        {
          id: "p09",
          text: "Make feedback an everyday conversation. The strongest leaders don’t save feedback for annual performance reviews. They offer it consistently, specifically, and with the person’s success in mind. What’s the end goal here? It’s clarity. People want to know what’s working, where they can improve, and how to move forward. Clarity builds confidence because it removes uncertainty. The best feedback answers three questions: What should I keep doing? What should I change? Why does it matter?",
        },
        {
          id: "p10",
          text: "Listen to understand, not to respond. With all the notifications and daily distractions we face, attention and active listening are among the rarest gifts you can give another person. Active listening means resisting the urge to formulate your response while someone else is still speaking. It means putting away your phone, asking follow-up questions, and reflecting back what you’ve heard before offering advice. People rarely remember every word you said. They almost always remember how you made them feel.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what is unique about the Dale Carnegie diploma in Warren Buffett’s office?",
      options: [
        { id: "A", text: "It is the only diploma or certificate he visibly hangs on his office wall." },
        { id: "B", text: "It was presented to him by the faculty of Stanford University." },
        { id: "C", text: "It replaced all his investment licenses and financial awards." },
        { id: "D", text: "It was the only course he ever completed during his academic career." },
      ],
      answer: "A",
      evidence_paragraph_id: "p02",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what fundamental limitation distinguishes AI tools from authentic human leaders?",
      options: [
        { id: "A", text: "AI cannot write software code or analyze complex financial spreadsheets." },
        { id: "B", text: "AI cannot draft business plans or generate marketing materials in seconds." },
        { id: "C", text: "AI cannot generate interpersonal trust, inspire commitment, or make humans feel understood." },
        { id: "D", text: "AI tools require prompt engineers whose salaries exceed traditional managers." },
      ],
      answer: "C",
      evidence_paragraph_id: "p04",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "In Source 3, what psychological principle explains why active listening is essential for leaders?",
      options: [
        { id: "A", text: "People judge leadership effectiveness primarily by how understood and respected they feel rather than specific words spoken." },
        { id: "B", text: "Leaders who listen without taking notes can remember statistical data with higher accuracy." },
        { id: "C", text: "Active listening allows leaders to formulate more aggressive rebuttals during negotiations." },
        { id: "D", text: "Employees prefer listening to recorded podcasts rather than participating in one-on-one meetings." },
      ],
      answer: "A",
      evidence_paragraph_id: "p10",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 2 that explains what customers, investors, and employees genuinely seek when making decisions.",
      target_paragraph_id: "p06",
      target_sentence: "Every entrepreneur eventually discovers that customers don’t buy products—they buy confidence.",
    },
  ],

  final_deduction: {
    question: "Based on all 3 sources, why does Warren Buffett define communication as a 'force multiplier' that compounds over time?",
    options: [
      {
        id: "hyp-1",
        text: "Technical Replacement: Learning public speaking allows executives to replace all digital tools and AI software.",
      },
      {
        id: "hyp-2",
        text: "Compounding Relational Capital: Effective communication builds cumulative trust and influence across every interaction, magnifying all technical abilities.",
      },
      {
        id: "hyp-3",
        text: "Academic Prestige: Hanging formal certifications in an executive office intimidates competitors.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Your results in life will be magnified if you can communicate better; Dale Carnegie 1952 diploma (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "AI can generate plans and code, but cannot earn trust, inspire commitment, or navigate conflict (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p06",
        label: "Customers buy confidence, investors fund trusted founders, and employees stay when they trust leaders (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p08",
        label: "Replacing assumptions with curiosity builds stronger collaborative relationships (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-03"],
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng trong kỷ nguyên AI thì kỹ năng viết prompt là quan trọng nhất. Bài viết chứng minh người lãnh đạo thành công là người chuyển hóa sự phức tạp thành rõ ràng và xây dựng sự tin cậy giữa người với người.",
      },
    ],
    takeaways: [
      "Khách hàng mua sự tự tin (confidence), nhà đầu tư rót vốn cho người sáng lập mà họ tin cậy (trusted founders), nhân viên gắn bó vì niềm tin vào lãnh đạo.",
      "Giao tiếp không còn là 'soft skill' đơn thuần mà là 'strategic business skill' có tính chất lãi kép (compounds over time).",
    ],
  },
};
