import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const FORECAST_SETTINGS_KEY = 'speaking_forecast';

const seasons = [
  {
    id: 'season-2026-q3',
    name: 'Q3 / 2026',
    year: 2026,
    quarter: 3,
    isCurrent: true,
    isPublished: true,
  },
  {
    id: 'season-2026-q2',
    name: 'Q2 / 2026',
    year: 2026,
    quarter: 2,
    isCurrent: false,
    isPublished: true,
  },
  {
    id: 'season-2026-q1',
    name: 'Q1 / 2026',
    year: 2026,
    quarter: 1,
    isCurrent: false,
    isPublished: true,
  },
];

const newQ3Topics = [
  // ==========================================
  // TOPIC 1 (PART 3) - CON NGƯỜI
  // ==========================================
  {
    id: 'topic-2026-q3-p3-influential-people',
    seasonId: 'season-2026-q3',
    topicName: 'Influential People & The Role of Family and Society',
    category: 'People',
    part: 'Part 3',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [
      'Do you think family members have more influence on a person than friends do?',
      "How do people's role models change as they get older?",
      'Is it good for children to have only one strong role model, or several?',
      'Do you think society today provides enough positive role models for young people?',
    ],
    cueCardPrompt: '',
    cueCardBulletPoints: [],
    part3Questions: [],
    sampleAnswers: {
      band75: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think family members have more influence on a person than friends do?</p>
    <p class="text-foreground/90 leading-relaxed">I'd say it depends heavily on the stage of life. In early childhood, family shapes almost everything, from values to habits, simply because there's no one else around. But once someone reaches their teenage years, friends often start to <strong>carry more weight</strong>, especially on day-to-day decisions like how to dress or what to prioritise. So it's less that one group wins outright, and more that influence shifts over time.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: How do people's role models change as they get older?</p>
    <p class="text-foreground/90 leading-relaxed">When we're young, role models tend to be close and visible — a parent, a teacher, maybe an older sibling — because our world is small. As people grow older and gain more exposure, role models often become more abstract or distant, like a public figure whose career path someone admires. I think this shift reflects how our understanding of what 'success' looks like becomes more specific with age.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Is it good for children to have only one strong role model, or several?</p>
    <p class="text-foreground/90 leading-relaxed">I'd lean towards several being healthier. If a child idealises just one person, they risk copying that person's flaws along with their strengths, since children rarely judge role models critically. Having a few different influences — one for work ethic, another for kindness, say — lets a child <strong>assemble their own values</strong> rather than <strong>inheriting someone else's entire package</strong>, mistakes included.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think society today provides enough positive role models for young people?</p>
    <p class="text-foreground/90 leading-relaxed">Honestly, I think the issue isn't a shortage of good role models, but that algorithms on social media don't necessarily prioritise showing them. Someone genuinely admirable but quiet often gets far less visibility than someone loud or controversial, simply because the second type <strong>generates more engagement</strong>. So the role models exist, but young people have to look a bit harder to find them.</p>
  </div>
</div>
      `.trim(),
      band65: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think family members have more influence on a person than friends do?</p>
    <p class="text-foreground/90 leading-relaxed">I think both are very important, but it changes depending on our age. When we are children, parents have the biggest impact because we spend all our time with them. However, when people become teenagers, they usually spend more time with friends and listen to their advice more.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: How do people's role models change as they get older?</p>
    <p class="text-foreground/90 leading-relaxed">Young children usually look up to people around them, such as parents or school teachers. But when people grow up and start working, they often admire successful business leaders, scientists, or celebrities who have achieved big goals in life.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Is it good for children to have only one strong role model, or several?</p>
    <p class="text-foreground/90 leading-relaxed">I believe having multiple role models is much better. Nobody is perfect, so if a child only looks at one person, they might copy their bad habits too. Having different role models helps them learn various good qualities like honesty and hard work.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think society today provides enough positive role models for young people?</p>
    <p class="text-foreground/90 leading-relaxed">Yes, there are many inspiring people today. However, on social media, sensational and dramatic content often gets more attention than quiet, positive role models. So young people need to be careful when choosing who to follow online.</p>
  </div>
</div>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'v1',
        word: 'carry more weight',
        meaning: 'có sức ảnh hưởng / trọng lượng hơn',
        example: 'Once someone reaches their teenage years, friends often start to carry more weight, especially on day-to-day decisions.',
      },
      {
        id: 'v2',
        word: "inherit someone's entire package",
        meaning: 'thừa hưởng toàn bộ (cả điểm tốt lẫn xấu) của ai đó',
        example: "Having a few different influences lets a child assemble their own values rather than inheriting someone else's entire package.",
      },
      {
        id: 'v3',
        word: 'generate engagement',
        meaning: 'tạo ra tương tác (trên mạng xã hội)',
        example: 'Someone loud or controversial gets far more visibility simply because they generate more engagement.',
      },
      {
        id: 'v4',
        word: "assemble one's own values",
        meaning: 'tự xây dựng hệ giá trị của riêng mình',
        example: 'Having diverse role models lets children assemble their own values rather than copying someone blindly.',
      },
    ],
    ideas: `📌 CHIẾN THUẬT LẬP LUẬN & PHÂN TÍCH HỌC THUẬT (CHỦ ĐỀ 01/07 · CON NGƯỜI):
• Khác biệt bản chất Part 3: Giám khảo chờ đợi LẬP LUẬN có chiều sâu, không cần kể chuyện cá nhân. Mỗi câu trả lời nên tuân theo cấu trúc: Quan điểm rõ ràng → Lý do / cơ chế giải thích → Ví dụ hoặc điều kiện đi kèm (nuance).
• Dạng câu hỏi "Ý kiến trừu tượng" (Câu 3 & 4): Điểm ăn điểm nằm ở việc KHÔNG trả lời một chiều, mà chỉ ra các góc nhìn phân tầng (vd: "phụ thuộc vào giai đoạn cuộc đời", "vấn đề không phải thiếu người tốt, mà do thuật toán ưu tiên tương tác giật gân").
• Chiến thuật liên kết: Chủ đề này liên kết trực tiếp với Part 2 - Đề 01: "Describe a person who has influenced you the most". Thí sinh nên chuẩn bị sẵn 1-2 ví dụ thật (ông bà, thầy cô giáo cũ) để chêm vào bất kỳ câu nào khi cần minh họa nhanh.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 - Topic: Influential People & Role of Family and Society (Part 3)',
    metaDescription: 'Trọn bộ câu hỏi và câu trả lời mẫu Band 7.5+ IELTS Speaking Part 3 chủ đề Influential People & The Role of Family and Society Quý 3/2026.',
    slug: 'q3-2026-part3-influential-people-role-family-society',
  },

  // ==========================================
  // TOPIC 2 (PART 3) - ĐỊA ĐIỂM
  // ==========================================
  {
    id: 'topic-2026-q3-p3-travel-conservation',
    seasonId: 'season-2026-q3',
    topicName: 'Travel & The Conservation of Natural Landscapes',
    category: 'Places',
    part: 'Part 3',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [
      'Why do you think people are so drawn to travelling to beautiful natural places?',
      'How has tourism affected natural landscapes in your country?',
      'Do you think governments should limit the number of tourists visiting natural sites?',
      'Is it better to travel to well-known destinations or lesser-known ones?',
    ],
    cueCardPrompt: '',
    cueCardBulletPoints: [],
    part3Questions: [],
    sampleAnswers: {
      band75: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Why do you think people are so drawn to travelling to beautiful natural places?</p>
    <p class="text-foreground/90 leading-relaxed">I think it comes down to contrast more than the scenery itself. Most people's daily lives are structured and predictable, so a place that feels untouched or quiet offers a kind of <strong>psychological reset</strong> that's hard to get at home. It's less about the view being objectively stunning and more about it being different from everything ordinary.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: How has tourism affected natural landscapes in your country?</p>
    <p class="text-foreground/90 leading-relaxed">It's a genuinely mixed picture. On one hand, tourism revenue has funded conservation efforts that probably wouldn't exist otherwise, since protecting land costs money. On the other hand, popular spots often suffer from <strong>overcrowding</strong>, littering, and infrastructure built too quickly to blend in properly. So tourism has both saved and strained the same landscapes, sometimes simultaneously.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do you think governments should limit the number of tourists visiting natural sites?</p>
    <p class="text-foreground/90 leading-relaxed">To some extent, yes, particularly for fragile ecosystems that can't recover quickly from heavy foot traffic. That said, an outright cap without a clear system for allocating access can just create <strong>a black market for tickets</strong> or favour wealthier visitors. A better approach might be timed entry combined with a fee that's reinvested directly into maintaining the site.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Is it better to travel to well-known destinations or lesser-known ones?</p>
    <p class="text-foreground/90 leading-relaxed">I'd argue lesser-known places offer more genuine value, mainly because they haven't been shaped around tourist expectations yet. Well-known destinations often end up feeling like <strong>a performance of themselves</strong>, curated for photos rather than reflecting how locals actually live. Lesser-known spots require more effort to find, but that effort usually pays off in authenticity.</p>
  </div>
</div>
      `.trim(),
      band65: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Why do you think people are so drawn to travelling to beautiful natural places?</p>
    <p class="text-foreground/90 leading-relaxed">I think people love visiting natural places because they want to escape the stressful city life and breathe fresh air. Spending time in mountains or by the beach helps them relax and clear their minds after long working hours.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: How has tourism affected natural landscapes in your country?</p>
    <p class="text-foreground/90 leading-relaxed">Tourism has brought both positive and negative impacts. It creates jobs for locals and gives money to protect natural parks. However, too many visitors also cause pollution, trash, and damage to natural habitats.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do you think governments should limit the number of tourists visiting natural sites?</p>
    <p class="text-foreground/90 leading-relaxed">Yes, I think it is necessary in fragile areas. If thousands of people visit every day, the environment cannot recover. Governments can set daily limits or charge tickets to control crowd numbers.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Is it better to travel to well-known destinations or lesser-known ones?</p>
    <p class="text-foreground/90 leading-relaxed">Both options have benefits. Famous places have great hotels and transportation, which is very convenient. On the other hand, hidden gems offer more authentic cultural experiences and peaceful atmosphere without crowds.</p>
  </div>
</div>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'v1',
        word: 'a psychological reset',
        meaning: 'một sự làm mới về mặt tâm lý',
        example: "A place that feels untouched or quiet offers a kind of psychological reset that's hard to get at home.",
      },
      {
        id: 'v2',
        word: 'overcrowding',
        meaning: 'tình trạng quá tải, đông đúc',
        example: 'Popular spots often suffer from overcrowding, littering, and infrastructure built too quickly.',
      },
      {
        id: 'v3',
        word: 'a black market for tickets',
        meaning: 'chợ đen vé (mua bán trái phép)',
        example: 'An outright visitor cap without a fair allocation system can easily create a black market for tickets.',
      },
      {
        id: 'v4',
        word: 'a performance of themselves',
        meaning: 'trở thành phiên bản trình diễn của chính nó (không còn tự nhiên)',
        example: 'Well-known destinations often end up feeling like a performance of themselves, curated for photos rather than authenticity.',
      },
    ],
    ideas: `📌 CHIẾN THUẬT LẬP LUẬN & PHÂN TÍCH HỌC THUẬT (CHỦ ĐỀ 02/07 · ĐỊA ĐIỂM):
• Kỹ thuật "Impact" (Câu 2): Cấu trúc mạnh nhất là chỉ ra CẢ HAI mặt cùng tồn tại (mixed picture) thay vì chọn hẳn một phía, vì thực tế luôn phức tạp hơn một câu trả lời đơn giản (vừa tạo kinh phí bảo tồn, vừa gây áp lực sinh thái).
• Câu hỏi chính sách (Câu 3): Nên tránh trả lời tuyệt đối "yes"/"no". Hãy đưa thêm điều kiện (to some extent, particularly for fragile ecosystems) và đề xuất giải pháp cụ thể (timed entry, fee reinvestment) để câu trả lời thể hiện tư duy thực tế, không học thuộc.
• Vốn từ đắc giá: Từ vựng "overcrowding", "conservation", "ecosystem" nên được chuẩn bị sẵn cho toàn bộ nhóm chủ đề Địa điểm / Môi trường vì tần suất xuất hiện rất cao ở Part 3.
• Liên kết Part 2: Nối tiếp từ Part 2 - Đề 02: "Describe a beautiful place you visited".`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 - Topic: Travel & Natural Conservation (Part 3)',
    metaDescription: 'Trọn bộ câu hỏi và câu trả lời mẫu Band 7.5+ IELTS Speaking Part 3 chủ đề Travel & The Conservation of Natural Landscapes Quý 3/2026.',
    slug: 'q3-2026-part3-travel-conservation-natural-landscapes',
  },

  // ==========================================
  // TOPIC 3 (PART 3) - TRẢI NGHIỆM
  // ==========================================
  {
    id: 'topic-2026-q3-p3-overcoming-challenges',
    seasonId: 'season-2026-q3',
    topicName: 'Overcoming Challenges & Resilience',
    category: 'Experiences',
    part: 'Part 3',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [
      'Do you think facing difficulties makes people stronger, or can it have the opposite effect?',
      'Should parents let their children experience failure, or try to protect them from it?',
      "Why do some people give up easily when facing challenges while others don't?",
      'Do you think modern life has made people less able to cope with difficulty?',
    ],
    cueCardPrompt: '',
    cueCardBulletPoints: [],
    part3Questions: [],
    sampleAnswers: {
      band75: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think facing difficulties makes people stronger, or can it have the opposite effect?</p>
    <p class="text-foreground/90 leading-relaxed">I think it can genuinely go either way, and the deciding factor is usually whether the person has any support while going through it. A difficulty faced alone, with no guidance or <strong>safety net</strong>, often just causes lasting damage. But the same difficulty, faced with some support, can build real resilience. So it's not the hardship itself that builds character, it's the conditions around it.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: Should parents let their children experience failure, or try to protect them from it?</p>
    <p class="text-foreground/90 leading-relaxed">I lean towards letting children experience small, manageable failures rather than shielding them entirely. A child who never loses at anything, or never has a plan fall through, doesn't get the chance to build the emotional tools needed for bigger <strong>setbacks</strong> later. The key word is manageable, though — there's a real difference between a bad grade on a test and something genuinely traumatic.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Why do some people give up easily when facing challenges while others don't?</p>
    <p class="text-foreground/90 leading-relaxed">A lot of it comes down to how someone interprets failure in the first place. People who see a setback as evidence they're simply not capable tend to give up faster, whereas people who see it as one flawed attempt among many tend to keep going. That interpretation is often shaped early, by how adults around them reacted to their childhood mistakes.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think modern life has made people less able to cope with difficulty?</p>
    <p class="text-foreground/90 leading-relaxed">In some specific ways, yes. Constant convenience means many people simply have fewer everyday opportunities to practise tolerating discomfort, so when a real difficulty does arrive, it can feel <strong>disproportionately overwhelming</strong>. That said, I wouldn't say people today are inherently weaker; they're just less trained in an area that previous generations were forced to practise more often <strong>out of necessity</strong>.</p>
  </div>
</div>
      `.trim(),
      band65: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think facing difficulties makes people stronger, or can it have the opposite effect?</p>
    <p class="text-foreground/90 leading-relaxed">In many cases, difficulties can make people stronger because they learn how to solve problems. However, if a problem is too overwhelming and someone has no help, it can make them feel stressed and lose confidence.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: Should parents let their children experience failure, or try to protect them from it?</p>
    <p class="text-foreground/90 leading-relaxed">I think parents should allow kids to face small failures, like not winning a game or getting a lower score. This teaches them how to bounce back and try harder next time, instead of being overprotected.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Why do some people give up easily when facing challenges while others don't?</p>
    <p class="text-foreground/90 leading-relaxed">I believe it depends on their mindset and encouragement from others. People who have supportive families tend to be more patient and keep trying, while those who lack self-belief give up quickly.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think modern life has made people less able to cope with difficulty?</p>
    <p class="text-foreground/90 leading-relaxed">Yes, because life today is very convenient with smartphones and fast delivery services. People are not used to waiting or struggling, so when serious problems arise, they may feel more overwhelmed than past generations.</p>
  </div>
</div>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'v1',
        word: 'a safety net',
        meaning: 'mạng lưới / chỗ dựa an toàn',
        example: 'A difficulty faced alone, with no guidance or safety net, often causes lasting psychological damage.',
      },
      {
        id: 'v2',
        word: 'a setback',
        meaning: 'một thất bại / trở ngại tạm thời',
        example: 'Children who experience minor failures build emotional stamina needed for bigger setbacks later in adulthood.',
      },
      {
        id: 'v3',
        word: 'disproportionately overwhelming',
        meaning: 'quá sức một cách không tương xứng',
        example: 'Because of modern convenience, ordinary obstacles can feel disproportionately overwhelming.',
      },
      {
        id: 'v4',
        word: 'out of necessity',
        meaning: 'vì cần thiết, bắt buộc phải làm vậy',
        example: 'Previous generations were forced to practise patience and endurance out of sheer necessity.',
      },
    ],
    ideas: `📌 CHIẾN THUẬT LẬP LUẬN & PHÂN TÍCH HỌC THUẬT (CHỦ ĐỀ 03/07 · TRẢI NGHIỆM):
• Tránh sáo rỗng (Câu 1): Chủ đề "resilience" rất dễ bị trả lời sáo rỗng ("khó khăn giúp ta mạnh mẽ hơn"). Bài mẫu ở câu 1 chỉ ra ĐIỀU KIỆN quyết định (có mạng lưới hỗ trợ hay không) thay vì khẳng định một chiều. Đây là kỹ thuật nên áp dụng cho hầu hết câu hỏi dạng "does X make people Y".
• Giải thích cơ chế tâm lý (Câu 3): Yêu cầu giải thích CƠ CHẾ tâm lý — bài mẫu dùng khái niệm "cách diễn giải thất bại" (interpretation of failure) để trả lời có chiều sâu, tránh liệt kê tính cách chung chung (lazy, not determined).
• So sánh thời gian (Câu 4): Là dạng so sánh quá khứ - hiện tại thường gặp — nên tránh phán xét gay gắt thế hệ hiện tại; bài mẫu dùng cách nói cân bằng ("less trained", không phải "weaker") để tránh nghe phiến diện.
• Liên kết Part 2: Nối tiếp từ Part 2 - Đề 03: "Describe a challenge you overcame".`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 - Topic: Overcoming Challenges & Resilience (Part 3)',
    metaDescription: 'Trọn bộ câu hỏi và câu trả lời mẫu Band 7.5+ IELTS Speaking Part 3 chủ đề Overcoming Challenges & Resilience Quý 3/2026.',
    slug: 'q3-2026-part3-overcoming-challenges-resilience',
  },

  // ==========================================
  // TOPIC 4 (PART 3) - KỸ NĂNG
  // ==========================================
  {
    id: 'topic-2026-q3-p3-learning-new-skills',
    seasonId: 'season-2026-q3',
    topicName: 'Learning New Skills & Practical Education',
    category: 'Skills',
    part: 'Part 3',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [
      'What kinds of practical skills do you think schools should teach but often don\'t?',
      'Is it better to learn a skill through formal training or by teaching yourself?',
      'Do adults nowadays have enough time to learn new skills?',
      'Do you think technology has made it easier or harder for people to learn new skills?',
    ],
    cueCardPrompt: '',
    cueCardBulletPoints: [],
    part3Questions: [],
    sampleAnswers: {
      band75: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: What kinds of practical skills do you think schools should teach but often don't?</p>
    <p class="text-foreground/90 leading-relaxed">Basic financial literacy is probably the most obvious gap — things like understanding interest rates, taxes, or how to budget. Most schools spend years teaching abstract maths but rarely connect it to a skill nearly every adult needs immediately after graduating. I think schools avoid it partly because it doesn't fit neatly into a single subject, so it <strong>falls through the cracks</strong>.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: Is it better to learn a skill through formal training or by teaching yourself?</p>
    <p class="text-foreground/90 leading-relaxed">It really depends on the skill's margin for error. For something like cooking or a language, self-teaching works fine because mistakes are <strong>low-stakes</strong> and easily corrected through practice. For something like driving or using specialised equipment, formal training matters more, since early bad habits can be dangerous or expensive to unlearn later. So the format should match the risk involved.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do adults nowadays have enough time to learn new skills?</p>
    <p class="text-foreground/90 leading-relaxed">Time itself isn't really the scarce resource, in my view, it's uninterrupted attention. People do technically have spare hours, but those hours are often fragmented by notifications and small distractions, which makes sustained skill-building difficult even when the time exists <strong>on paper</strong>. So the real barrier is <strong>fragmented focus</strong> rather than an actual lack of free time.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think technology has made it easier or harder for people to learn new skills?</p>
    <p class="text-foreground/90 leading-relaxed">Easier, on balance, mainly because access to quality instruction used to depend heavily on location and money, and that barrier has largely disappeared. The harder part is filtering: with so much content available, people can spend more time choosing what to learn than actually learning it. So technology solved the access problem but introduced a new decision-making problem.</p>
  </div>
</div>
      `.trim(),
      band65: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: What kinds of practical skills do you think schools should teach but often don't?</p>
    <p class="text-foreground/90 leading-relaxed">I think schools should teach personal financial management, like calculating taxes, saving money, and budgeting. Students study lots of theoretical subjects, but practical survival skills are often missing.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: Is it better to learn a skill through formal training or by teaching yourself?</p>
    <p class="text-foreground/90 leading-relaxed">It depends on the difficulty of the skill. Easy hobbies like drawing or cooking can be self-taught using online tutorials. But complex skills like medicine or piloting require professional courses with certified instructors.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do adults nowadays have enough time to learn new skills?</p>
    <p class="text-foreground/90 leading-relaxed">Many working adults find it tough to balance job duties, family commitments, and study time. Even during free evenings, tiredness and social media make it hard to focus on practicing new abilities.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: Do you think technology has made it easier or harder for people to learn new skills?</p>
    <p class="text-foreground/90 leading-relaxed">Overall, technology makes learning much more accessible through YouTube, podcasts, and online courses. Anyone can learn from anywhere at low cost, though online distractions are a big challenge.</p>
  </div>
</div>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'v1',
        word: 'fall through the cracks',
        meaning: 'bị bỏ sót, không ai để ý tới',
        example: "Practical money management doesn't fit neatly into a single school subject, so it easily falls through the cracks.",
      },
      {
        id: 'v2',
        word: 'low-stakes',
        meaning: 'ít rủi ro, hậu quả không nghiêm trọng',
        example: 'Self-teaching works fine when mistakes are low-stakes and easily corrected through daily trial and error.',
      },
      {
        id: 'v3',
        word: 'fragmented attention / focus',
        meaning: 'sự tập trung bị phân mảnh, ngắt quãng',
        example: 'The primary obstacle is fragmented attention caused by digital notifications, not a literal lack of hours.',
      },
      {
        id: 'v4',
        word: 'on paper',
        meaning: 'về mặt lý thuyết / hình thức',
        example: 'Sustained skill-building remains difficult even when people possess adequate spare hours on paper.',
      },
    ],
    ideas: `📌 CHIẾN THUẬT LẬP LUẬN & PHÂN TÍCH HỌC THUẬT (CHỦ ĐỀ 04/07 · KỸ NĂNG):
• Phân loại theo mức độ rủi ro (Câu 2): Dạng so sánh kinh điển (formal vs self-teaching) — thay vì chọn hẳn một bên, bài mẫu đưa ra TIÊU CHÍ phân loại (mức độ rủi ro của kỹ năng: margin for error). Đây là cách trả lời an toàn và có tính khái quát cao cho nhiều câu hỏi tương tự.
• Tái định nghĩa vấn đề (Câu 3): Thay vì trả lời trực tiếp "có/không đủ thời gian", bài mẫu chỉ ra vấn đề thật là "sự tập trung bị phân mảnh" (fragmented attention). Kỹ thuật này giúp câu trả lời nghe sâu sắc hơn hẳn so với trả lời bề mặt.
• Chuẩn bị ví dụ đa dạng: Nên chuẩn bị sẵn 1 ví dụ về kỹ năng có "rủi ro cao" (lái xe, y tế) và 1 ví dụ "rủi ro thấp" (nấu ăn, ngôn ngữ) để dùng linh hoạt cho các câu hỏi so sánh.
• Liên kết Part 2: Nối tiếp từ Part 2 - Đề 04: "Describe a useful skill you learned".`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 - Topic: Learning New Skills & Practical Education (Part 3)',
    metaDescription: 'Trọn bộ câu hỏi và câu trả lời mẫu Band 7.5+ IELTS Speaking Part 3 chủ đề Learning New Skills & Practical Education Quý 3/2026.',
    slug: 'q3-2026-part3-learning-new-skills-practical-education',
  },

  // ==========================================
  // TOPIC 5 (PART 3) - CÔNG NGHỆ
  // ==========================================
  {
    id: 'topic-2026-q3-p3-technology-apps',
    seasonId: 'season-2026-q3',
    topicName: 'Technology Apps & Device Dependency',
    category: 'Technology',
    part: 'Part 3',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [
      'Do you think people have become too dependent on apps and technology in daily life?',
      'What are the advantages and disadvantages of mobile apps compared to traditional methods?',
      'Do you think app developers have a responsibility to design apps that are less addictive?',
      'How do you think apps will change the way people live in the future?',
    ],
    cueCardPrompt: '',
    cueCardBulletPoints: [],
    part3Questions: [],
    sampleAnswers: {
      band75: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think people have become too dependent on apps and technology in daily life?</p>
    <p class="text-foreground/90 leading-relaxed">In terms of convenience, yes, quite heavily, but I'd separate dependency from harm. Relying on a map app instead of memorising routes isn't really a problem, since the outcome is the same either way. The dependency becomes concerning only in areas where it replaces a skill people would genuinely need if the technology failed, like basic mental arithmetic.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: What are the advantages and disadvantages of mobile apps compared to traditional methods?</p>
    <p class="text-foreground/90 leading-relaxed">The clearest advantage is speed and personalisation, since an app can adapt to individual habits in a way a fixed traditional method can't. The disadvantage is that convenience can quietly <strong>erode patience</strong>; people get used to instant results and become less tolerant of slower, traditional processes even when those processes are perfectly adequate.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do you think app developers have a responsibility to design apps that are less addictive?</p>
    <p class="text-foreground/90 leading-relaxed">I'd say yes, particularly given how deliberately some design choices, like infinite scrolling or unpredictable rewards, are built to exploit attention rather than simply serve a function. A company <strong>optimising purely for engagement</strong> isn't neutral; it's actively shaping behaviour, so I think there's a reasonable ethical expectation that they consider the <strong>downstream effects</strong> of that design.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: How do you think apps will change the way people live in the future?</p>
    <p class="text-foreground/90 leading-relaxed">I suspect the bigger shift won't be new apps so much as apps becoming less visible, quietly <strong>running in the background</strong> rather than requiring active opening and closing. We're already seeing this with predictive suggestions and automation. The risk is that as apps become more invisible, it also becomes harder for users to notice how much of their behaviour is being shaped by them.</p>
  </div>
</div>
      `.trim(),
      band65: `
<div class="space-y-4">
  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q1: Do you think people have become too dependent on apps and technology in daily life?</p>
    <p class="text-foreground/90 leading-relaxed">Yes, many people today rely heavily on smartphones for everything from alarms to online shopping and maps. If they lose their phone or battery runs out, they often feel lost and cannot do simple daily tasks.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q2: What are the advantages and disadvantages of mobile apps compared to traditional methods?</p>
    <p class="text-foreground/90 leading-relaxed">The main advantage is saving time and high speed. Apps allow instant communication and payment. However, the downside is that users become addicted to notifications and spend less face-to-face time with others.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q3: Do you think app developers have a responsibility to design apps that are less addictive?</p>
    <p class="text-foreground/90 leading-relaxed">Yes, software creators should be responsible for their users' health. Social media apps often keep people scrolling for hours, which harms their sleep and productivity. Adding usage reminders would be very helpful.</p>
  </div>

  <div class="p-3.5 bg-muted/40 rounded-xl border border-border/50">
    <p class="font-bold text-primary mb-1.5">Q4: How do you think apps will change the way people live in the future?</p>
    <p class="text-foreground/90 leading-relaxed">In the future, apps with artificial intelligence will become much smarter. They will predict our schedule, order groceries automatically, and control smart home appliances without requiring manual inputs.</p>
  </div>
</div>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'v1',
        word: 'erode patience',
        meaning: 'bào mòn dần sự kiên nhẫn',
        example: 'Instant digital convenience can quietly erode patience for slower, traditional offline processes.',
      },
      {
        id: 'v2',
        word: 'downstream effects',
        meaning: 'những tác động / hệ quả kéo theo về sau',
        example: 'Platform developers must consider the downstream effects of gamification and endless scrolling on teen mental health.',
      },
      {
        id: 'v3',
        word: 'optimise for engagement',
        meaning: 'tối ưu hóa để tăng tương tác',
        example: 'A corporation optimising purely for user engagement is actively manipulating human behavioral loops.',
      },
      {
        id: 'v4',
        word: 'run in the background',
        meaning: 'chạy ngầm, hoạt động không hiển thị rõ',
        example: 'Future intelligent systems will quietly run in the background, minimizing unnecessary manual clicks.',
      },
    ],
    ideas: `📌 CHIẾN THUẬT LẬP LUẬN & PHÂN TÍCH HỌC THUẬT (CHỦ ĐỀ 07/07 · CÔNG NGHỆ):
• Phân tách khái niệm (Câu 1): Câu hỏi "too dependent" kinh điển — bài mẫu tránh trả lời một chiều bằng cách phân biệt "dependency" (phụ thuộc, trung tính) và "harm" (gây hại, cần điều kiện). Đây là kỹ thuật phân tách khái niệm giúp câu trả lời sắc bén hơn hẳn.
• Góc nhìn đạo đức phát triển (Câu 3): Đưa quan điểm đạo đức (ethical expectation) về trách nhiệm của nhà làm ứng dụng — dạng câu hỏi này ngày càng phổ biến ở Part 3 công nghệ; nên chuẩn bị vốn từ về "thiết kế gây nghiện" (infinite scrolling, engagement) để trả lời tự tin.
• Dự đoán tương lai thận trọng (Câu 4): Là dạng khó nhất Part 3 vì đòi hỏi suy đoán có cơ sở — bài mẫu dùng cách nói thận trọng ("I suspect") thay vì khẳng định tuyệt đối, đúng tinh thần một dự đoán học thuật có căn cứ.
• Liên kết Part 2: Nối tiếp từ Part 2 - Đề 07: "Describe an app you use frequently".`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 - Topic: Technology Apps & Device Dependency (Part 3)',
    metaDescription: 'Trọn bộ câu hỏi và câu trả lời mẫu Band 7.5+ IELTS Speaking Part 3 chủ đề Technology Apps & Device Dependency Quý 3/2026.',
    slug: 'q3-2026-part3-technology-apps-device-dependency',
  },

  // ==========================================
  // 5 LINKED PART 2 TOPICS (ĐỀ 01, 02, 03, 04, 07)
  // ==========================================
  {
    id: 'topic-2026-q3-p2-describe-a-person-who-influenced-you',
    seasonId: 'season-2026-q3',
    topicName: 'Describe a person who has influenced you the most',
    category: 'People',
    part: 'Part 2',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [],
    cueCardPrompt: 'Describe a person who has influenced you the most',
    cueCardBulletPoints: [
      'Who this person is',
      'How you know this person',
      'What this person did that influenced you',
      'And explain how this person has influenced your thinking or life',
    ],
    part3Questions: [
      'Do you think family members have more influence on a person than friends do?',
      "How do people's role models change as they get older?",
      'Is it good for children to have only one strong role model, or several?',
      'Do you think society today provides enough positive role models for young people?',
    ],
    sampleAnswers: {
      band75: `
<p>Today I would like to talk about my former high school teacher, Mr. Minh, who has exerted a profound influence on both my academic journey and personal outlook.</p>
<p>I first met him during my sophomore year when I was struggling significantly with literature. Unlike conventional teachers who adhered strictly to rigid curricula, Mr. Minh approached education through intellectual curiosity and open dialogue. He constantly encouraged us to question underlying assumptions and think from diverse perspectives.</p>
<p>What influenced me most was his unwavering integrity and dedication. When I failed an important regional competition, he did not dwell on the disappointment; instead, he helped me break down each flaw objectively, demonstrating that setbacks are merely constructive feedback. Under his mentorship, I transformed from a passive student into an active, inquisitive learner. To this day, whenever I encounter daunting challenges, I always recall his analytical approach and resilience.</p>
      `.trim(),
      band65: `
<p>I would like to tell you about my grandfather, who is the most influential person in my life. I have known him since I was born, and he lived with my family for many years.</p>
<p>He was a retired teacher who always woke up early, read books, and treated everyone with great respect and kindness. Even when he faced difficult times in his life, he never complained.</p>
<p>He taught me the value of discipline and honesty. Whenever I had difficulties with my homework or felt discouraged, he would sit down patiently and encourage me. Because of his example, I always try to work hard and remain optimistic in life.</p>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'p2-v1',
        word: 'exert a profound influence',
        meaning: 'tạo ra sức ảnh hưởng sâu rộng',
        example: 'My mentor exerted a profound influence on my professional career choices.',
      },
      {
        id: 'p2-v2',
        word: 'intellectual curiosity',
        meaning: 'sự tò mò, ham học hỏi về mặt trí tuệ',
        example: 'He fostered intellectual curiosity by asking thought-provoking questions.',
      },
      {
        id: 'p2-v3',
        word: 'unwavering integrity',
        meaning: 'sự chính trực, liêm khiết kiên định',
        example: 'Colleagues admired him for his unwavering integrity during difficult decisions.',
      },
    ],
    ideas: `Dàn ý gợi ý cho bài thi Part 2:
• Introduction: Giới thiệu người có tầm ảnh hưởng (người thân, thầy cô, người cố vấn).
• Relationship: Hoàn cảnh quen biết và tính cách tiêu biểu.
• Action / Story: Một sự kiện hoặc bài học cụ thể mà người đó đã truyền cảm hứng cho bạn.
• Impact: Tác động lâu dài đến tư duy, quyết định hoặc lối sống của bạn ngày hôm nay.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 Part 2: Describe a person who has influenced you the most',
    metaDescription: 'Bài mẫu Band 7.5+ IELTS Speaking Part 2 & 3: Describe a person who has influenced you the most Quý 3/2026.',
    slug: 'q3-2026-part2-describe-a-person-who-has-influenced-you-the-most',
  },

  {
    id: 'topic-2026-q3-p2-describe-a-beautiful-place-you-visited',
    seasonId: 'season-2026-q3',
    topicName: 'Describe a beautiful place you visited',
    category: 'Places',
    part: 'Part 2',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [],
    cueCardPrompt: 'Describe a beautiful place you visited',
    cueCardBulletPoints: [
      'Where this place is',
      'When you went there and who you went with',
      'What you did there',
      'And explain why you think it was so beautiful',
    ],
    part3Questions: [
      'Why do you think people are so drawn to travelling to beautiful natural places?',
      'How has tourism affected natural landscapes in your country?',
      'Do you think governments should limit the number of tourists visiting natural sites?',
      'Is it better to travel to well-known destinations or lesser-known ones?',
    ],
    sampleAnswers: {
      band75: `
<p>I would like to describe a truly mesmerizing destination that left a lasting impression on me: the untouched coastal landscapes of Phu Quy Island, located off the south-central coast of Vietnam.</p>
<p>I traveled there two summers ago with a small group of close friends who share an appreciation for rugged, off-the-beaten-track travel. Unlike heavily commercialized beach towns with towering high-rises, Phu Quy has retained an authentic, rustic charm.</p>
<p>During our four-day excursion, we rented motorbikes to navigate the undulating coastal roads, explored secluded volcanic bays with crystal-clear turquoise waters, and watched stunning sunsets from the summit of Cao Cat mountain. What made the island exceptionally beautiful wasn't merely the pristine scenery, but the harmonious blend between the raw geological formations and the unpretentious, tranquil pace of local fishing hamlets.</p>
      `.trim(),
      band65: `
<p>I want to talk about Da Lat, a picturesque mountain town in Vietnam that I visited last year with my family during our summer vacation.</p>
<p>Da Lat is famous for its cool climate, lush pine forests, and colorful flower gardens. We stayed in a lovely villa near Tuyen Lam Lake.</p>
<p>While we were there, we went paddle boating on the lake, visited coffee farms on the hills, and enjoyed delicious street food at the night market. I found Da Lat so beautiful because the foggy atmosphere and peaceful hills offered a wonderful break from the bustling city noise.</p>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'p2-v1',
        word: 'off-the-beaten-track',
        meaning: 'hoang sơ, xa xôi hẻo lánh ít người biết',
        example: 'We prefer off-the-beaten-track destinations where local customs remain intact.',
      },
      {
        id: 'p2-v2',
        word: 'pristine scenery',
        meaning: 'phong cảnh nguyên sơ, trong lành',
        example: 'The national park is renowned for its pristine scenery and biodiverse forests.',
      },
      {
        id: 'p2-v3',
        word: 'rustic charm',
        meaning: 'vẻ đẹp mộc mạc, bình dị',
        example: 'The small fishing village charmed visitors with its peaceful, rustic charm.',
      },
    ],
    ideas: `Dàn ý gợi ý cho bài thi Part 2:
• Location & Occasion: Địa điểm ở đâu, bạn đi vào dịp nào và đi cùng ai.
• Atmosphere & Features: Không khí, địa hình, đặc trưng nổi bật (biển, núi non, rừng cây).
• Activities: Bạn đã trải nghiệm những hoạt động gì tại đây.
• Reflection: Cảm xúc lắng đọng và lý do khiến bạn coi đây là nơi đẹp nhất từng đặt chân đến.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 Part 2: Describe a beautiful place you visited',
    metaDescription: 'Bài mẫu Band 7.5+ IELTS Speaking Part 2 & 3: Describe a beautiful place you visited Quý 3/2026.',
    slug: 'q3-2026-part2-describe-a-beautiful-place-you-visited',
  },

  {
    id: 'topic-2026-q3-p2-describe-a-challenge-you-overcame',
    seasonId: 'season-2026-q3',
    topicName: 'Describe a challenge you overcame',
    category: 'Experiences',
    part: 'Part 2',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [],
    cueCardPrompt: 'Describe a challenge you overcame',
    cueCardBulletPoints: [
      'What the challenge was',
      'When and where it took place',
      'How you dealt with it',
      'And explain what you learned from this experience',
    ],
    part3Questions: [
      'Do you think facing difficulties makes people stronger, or can it have the opposite effect?',
      'Should parents let their children experience failure, or try to protect them from it?',
      "Why do some people give up easily when facing challenges while others don't?",
      'Do you think modern life has made people less able to cope with difficulty?',
    ],
    sampleAnswers: {
      band75: `
<p>One of the most intimidating hurdles I had to overcome was delivering a comprehensive research pitch in English before an auditorium of over two hundred academics and industry experts during my final undergraduate year.</p>
<p>Public speaking had always been a major vulnerability of mine; the prospect of presenting complex statistical findings in a foreign language exacerbated my performance anxiety tenfold.</p>
<p>To confront this, I adopted a structured desensitization strategy. I recorded my rehearsals repeatedly, scrutinized non-verbal mannerisms, and held simulated Q&A sessions with my peers to prepare for hostile inquiries. On the actual day, although my heart was pounding initially, thorough preparation took over and the presentation was received with enthusiastic applause. This trial taught me that confidence isn't the absence of fear, but rather the mastery of systematic preparation under pressure.</p>
      `.trim(),
      band65: `
<p>I would like to describe a big challenge I faced when I was preparing for my university entrance exam two years ago.</p>
<p>Math was always my weakest subject, and my trial test scores were too low to get into my preferred finance major, which made me feel quite discouraged.</p>
<p>To overcome this difficulty, I created a strict daily study plan. I woke up one hour earlier every day to practice difficult math problems and joined an online study group where friends helped explain tough concepts. In the end, my score improved significantly and I passed the entrance exam. That experience taught me that persistence and daily consistency can solve almost any problem.</p>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'p2-v1',
        word: 'intimidating hurdle',
        meaning: 'rào cản / thử thách đáng sợ',
        example: 'Passing the professional certification exam proved to be an intimidating hurdle.',
      },
      {
        id: 'p2-v2',
        word: 'performance anxiety',
        meaning: 'sự lo âu, hồi hộp trước giờ biểu diễn / thuyết trình',
        example: 'Thorough rehearsals helped her manage performance anxiety effectively.',
      },
      {
        id: 'p2-v3',
        word: 'confront the issue',
        meaning: 'đối mặt trực diện với vấn đề',
        example: 'Rather than procrastinating, she chose to confront the issue head-on.',
      },
    ],
    ideas: `Dàn ý gợi ý cho bài thi Part 2:
• The Challenge: Thử thách là gì, diễn ra khi nào và tại sao lại cam go đối với bạn.
• Initial Obstacles: Những cảm xúc lo lắng, bối rối lúc ban đầu.
• Solution & Action: Các bước hành động cụ thể để xử lý thử thách.
• Lessons Learned: Bài học trưởng thành và ý nghĩa đối với cuộc sống của bạn sau này.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 Part 2: Describe a challenge you overcame',
    metaDescription: 'Bài mẫu Band 7.5+ IELTS Speaking Part 2 & 3: Describe a challenge you overcame Quý 3/2026.',
    slug: 'q3-2026-part2-describe-a-challenge-you-overcame',
  },

  {
    id: 'topic-2026-q3-p2-describe-a-useful-skill-you-learned',
    seasonId: 'season-2026-q3',
    topicName: 'Describe a useful skill you learned',
    category: 'Skills',
    part: 'Part 2',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [],
    cueCardPrompt: 'Describe a useful skill you learned',
    cueCardBulletPoints: [
      'What the skill is',
      'How and when you learned it',
      'Why you decided to learn it',
      'And explain how this skill has helped you in life',
    ],
    part3Questions: [
      'What kinds of practical skills do you think schools should teach but often don\'t?',
      'Is it better to learn a skill through formal training or by teaching yourself?',
      'Do adults nowadays have enough time to learn new skills?',
      'Do you think technology has made it easier or harder for people to learn new skills?',
    ],
    sampleAnswers: {
      band75: `
<p>I would like to share my experience of learning data analysis and spreadsheet automation, an indispensable practical skill that fundamentally elevated my academic and professional productivity.</p>
<p>I acquired this skill roughly a year ago through a self-paced online certification course. At the time, I was overwhelmed by repetitive manual reporting tasks at my internship, which frequently resulted in clerical oversights.</p>
<p>The learning curve was steep initially, particularly mastering nested formulas and writing automated macros. However, by decomposing complex tutorials into daily hands-on projects, I steadily gained fluency. This skill has proven transformative: tasks that once consumed hours now run in seconds, drastically curtailing human error and enabling me to extract actionable insights from voluminous datasets.</p>
      `.trim(),
      band65: `
<p>I would like to talk about cooking, which is one of the most useful skills I learned during my first year away from home for college.</p>
<p>I learned cooking mainly through watching cooking channels on YouTube and asking my mother over video calls for traditional recipes.</p>
<p>I decided to cook because eating out every day was expensive and not very healthy. Learning basic dishes like chicken soup and stir-fried vegetables helped me save a lot of money and maintain a balanced diet. It also makes me feel independent and confident taking care of myself.</p>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'p2-v1',
        word: 'indispensable practical skill',
        meaning: 'kỹ năng thực tế không thể thiếu',
        example: 'Effective communication is an indispensable practical skill in any workplace.',
      },
      {
        id: 'p2-v2',
        word: 'steep learning curve',
        meaning: 'độ khó ban đầu rất cao, tốn công sức làm quen',
        example: 'Programming has a steep learning curve, but perseverance brings great rewards.',
      },
      {
        id: 'p2-v3',
        word: 'curtail human error',
        meaning: 'cắt giảm sai sót của con người',
        example: 'Automated processes drastically curtail human error in data entry.',
      },
    ],
    ideas: `Dàn ý gợi ý cho bài thi Part 2:
• Identify the Skill: Tên kỹ năng và phân loại (kỹ năng số, kỹ năng sinh tồn, kỹ năng mềm).
• Motivation: Động lực hoặc tình huống thôi thúc bạn phải học nó.
• Learning Journey: Quá trình học (tự học, qua người hướng dẫn, qua video).
• Value Added: Kỹ năng đã tiết kiệm thời gian, tiền bạc hoặc nâng tầm cuộc sống của bạn ra sao.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 Part 2: Describe a useful skill you learned',
    metaDescription: 'Bài mẫu Band 7.5+ IELTS Speaking Part 2 & 3: Describe a useful skill you learned Quý 3/2026.',
    slug: 'q3-2026-part2-describe-a-useful-skill-you-learned',
  },

  {
    id: 'topic-2026-q3-p2-describe-an-app-you-use-frequently',
    seasonId: 'season-2026-q3',
    topicName: 'Describe an app you use frequently',
    category: 'Technology',
    part: 'Part 2',
    type: 'New',
    status: 'Published',
    updatedAt: '05 Sep 2026',
    questions: [],
    cueCardPrompt: 'Describe an app you use frequently',
    cueCardBulletPoints: [
      'What the app is',
      'What features it has',
      'How often and why you use it',
      'And explain why it is important or useful to you',
    ],
    part3Questions: [
      'Do you think people have become too dependent on apps and technology in daily life?',
      'What are the advantages and disadvantages of mobile apps compared to traditional methods?',
      'Do you think app developers have a responsibility to design apps that are less addictive?',
      'How do you think apps will change the way people live in the future?',
    ],
    sampleAnswers: {
      band75: `
<p>An application that has become an integral cornerstone of my daily routine is Notion, a comprehensive workspace app designed for note-taking, task management, and knowledge organization.</p>
<p>Its standout attribute is its modular flexibility. Rather than constraining users to rigid templates, Notion operates like digital LEGO blocks, enabling one to design custom relational databases, kanban boards, and personal wikis within an uncluttered, minimalist interface.</p>
<p>I utilize it multiple times every day to organize study schedules, capture fleeting ideas, and track project deadlines. What makes it indispensable is how effectively it alleviates cognitive load; by offloading reminders and structural planning to the app, I can devote my full mental energy to creative execution rather than fretting over forgotten appointments.</p>
      `.trim(),
      band65: `
<p>I would like to describe Google Maps, an app that I use almost every single day on my smartphone.</p>
<p>It provides real-time navigation, live traffic alerts, and recommendations for restaurants and cafes nearby. It can calculate the fastest route whether you are driving a motorbike, taking a bus, or walking.</p>
<p>I use it whenever I need to commute to a new client meeting or find an interesting place to hang out with friends. It saves me huge amounts of time by avoiding traffic gridlocks and prevents me from ever getting lost in unfamiliar districts.</p>
      `.trim(),
    },
    keyVocabulary: [
      {
        id: 'p2-v1',
        word: 'integral cornerstone',
        meaning: 'nền tảng cốt lõi, không thể tách rời',
        example: 'Smartphones have become an integral cornerstone of modern professional workflow.',
      },
      {
        id: 'p2-v2',
        word: 'modular flexibility',
        meaning: 'tính linh hoạt theo từng mô-đun lắp ghép',
        example: 'The software stands out due to its intuitive modular flexibility.',
      },
      {
        id: 'p2-v3',
        word: 'alleviate cognitive load',
        meaning: 'giải tỏa gánh nặng nhận thức / đầu óc',
        example: 'Checklists and task trackers effectively alleviate cognitive load during hectic workdays.',
      },
    ],
    ideas: `Dàn ý gợi ý cho bài thi Part 2:
• The Application: Tên ứng dụng, thể loại (năng suất, bản đồ, học tập, giao tiếp).
• Main Features: Các tính năng cốt lõi và giao diện.
• Frequency & Purpose: Tần suất và mục đích sử dụng trong ngày.
• Why It Matters: Lý do bạn không thể thiếu ứng dụng này trong đời sống hiện đại.`,
    seoTitle: 'IELTS Speaking Forecast Q3 / 2026 Part 2: Describe an app you use frequently',
    metaDescription: 'Bài mẫu Band 7.5+ IELTS Speaking Part 2 & 3: Describe an app you use frequently Quý 3/2026.',
    slug: 'q3-2026-part2-describe-an-app-you-use-frequently',
  },
];

async function run() {
  console.log('🚀 Starting Speaking Forecast Q3/2026 update...');

  // 1. Fetch existing settings from database
  const record = await prisma.siteSettings.findFirst({
    where: { key: FORECAST_SETTINGS_KEY },
  });

  let existingTopics = [];

  if (record && record.value) {
    const val = record.value;
    if (Array.isArray(val.topics)) {
      existingTopics = val.topics;
    }
  }

  // Filter out any test topics or duplicate IDs/slugs
  const newTopicIds = new Set(newQ3Topics.map((t) => t.id));
  const newTopicSlugs = new Set(newQ3Topics.map((t) => t.slug));

  const preservedTopics = existingTopics.filter(
    (t) =>
      !newTopicIds.has(t.id) &&
      !newTopicSlugs.has(t.slug) &&
      t.id !== 'topic-draft-secret' &&
      t.id !== 'topic-ai-technology'
  );

  const finalTopics = [...newQ3Topics, ...preservedTopics];

  const payloadValue = {
    seasons: seasons,
    topics: finalTopics,
    selectedSeasonId: 'season-2026-q3',
    updatedAt: new Date().toISOString(),
    updatedBy: 'system-forecast-update',
  };

  if (record) {
    await prisma.siteSettings.update({
      where: { id: record.id },
      data: { value: payloadValue },
    });
    console.log('✅ Updated existing speaking_forecast record in database.');
  } else {
    await prisma.siteSettings.create({
      data: {
        key: FORECAST_SETTINGS_KEY,
        value: payloadValue,
      },
    });
    console.log('✅ Created new speaking_forecast record in database.');
  }

  console.log(`🎉 Successfully synchronized ${newQ3Topics.length} new Q3/2026 topics (Part 3 & Part 2).`);
  console.log(`📊 Total topics in database: ${finalTopics.length}`);

  process.exit(0);
}

run().catch((e) => {
  console.error('❌ Error updating speaking forecast:', e);
  process.exit(1);
});
