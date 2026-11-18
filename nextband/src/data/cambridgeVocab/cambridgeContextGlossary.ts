import { LexiconEntry, UnitBilingualTranslation } from "./types";

function e(
  word: string,
  ipa: string,
  pos: string,
  def_vi: string,
  def_en: string,
  collocations = "",
  example = "",
  ielts_tip = ""
): LexiconEntry {
  return {
    word,
    ipa,
    pos,
    def_en,
    def_vi,
    collocations: collocations || word,
    example: example || `The academic term "${word}" frequently appears in IELTS contexts.`,
    ielts_tip: ielts_tip || "Từ vựng hữu ích giúp nâng cao điểm Lexical Resource."
  };
}

/**
 * Từ điển ngữ cảnh mở rộng cho Cambridge Vocabulary for IELTS (B2–C1):
 * - Bao phủ các từ xung quanh câu đề Chặng 1, Chặng 2, Bài luận Chặng 3 (đặc biệt Unit 1 và các từ phổ biến ở Units 2–20).
 * - Bao phủ toàn bộ 250+ từ phương án nhiễu (distractors) ở Chặng 2 của cả 20 Units.
 * - Bao phủ các cụm từ đồng nghĩa (ieltsInsight.synonyms) và từ nối học thuật.
 */
export const CAMBRIDGE_CONTEXT_GLOSSARY: Record<string, LexiconEntry> = {
  // =========================================================================
  // 1. TỪ VỰNG NGỮ CẢNH UNIT 1 & TỪ HỌC THUẬT PHỔ BIẾN
  // =========================================================================
  psychologist: e(
    "psychologist",
    "/saɪˈkɒl.ə.dʒɪst/",
    "noun",
    "nhà tâm lý học",
    "A scientist or specialist who studies the human mind and behavior.",
    "clinical psychologist, developmental psychologist",
    "Psychologists emphasize early emotional security in infancy."
  ),
  psychology: e(
    "psychology",
    "/saɪˈkɒl.ə.dʒi/",
    "noun",
    "tâm lý học",
    "The scientific study of the human mind and its functions.",
    "developmental psychology, child psychology",
    "Child psychology explores how upbringing shapes personality."
  ),
  sociologist: e(
    "sociologist",
    "/ˌsəʊ.siˈɒl.ə.dʒɪst/",
    "noun",
    "nhà xã hội học",
    "An expert who studies the development, structure, and functioning of human society.",
    "urban sociologist, sociologists argue",
    "Sociologists argue that family values strongly influence social harmony."
  ),
  emphasize: e(
    "emphasize",
    "/ˈem.fə.saɪz/",
    "verb",
    "nhấn mạnh, làm nổi bật",
    "To give special importance or prominence to something in speaking or writing.",
    "strongly emphasize, emphasize the importance of",
    "Educators emphasize the importance of parental involvement."
  ),
  establish: e(
    "establish",
    "/ɪˈstæb.lɪʃ/",
    "verb",
    "thiết lập, xây dựng, tạo lập",
    "To set up or create something on a firm or permanent basis.",
    "establish a relationship, establish trust, establish guidelines",
    "Parents should establish clear boundaries alongside emotional warmth."
  ),
  secure: e(
    "secure",
    "/sɪˈkjʊər/",
    "adjective",
    "an toàn, vững chắc, yên tâm",
    "Certain to remain safe and unthreatened; emotionally confident.",
    "secure emotional bond, feel secure, financially secure",
    "A secure attachment helps children explore the world confidently."
  ),
  emotional: e(
    "emotional",
    "/ɪˈməʊ.ʃən.əl/",
    "adjective",
    "thuộc về cảm xúc, tình cảm",
    "Relating to a person's feelings rather than logical thought.",
    "emotional bond, emotional regulation, emotional wellbeing",
    "Emotional stability at home boosts academic performance."
  ),
  primary: e(
    "primary",
    "/ˈpraɪ.mə.ri/",
    "adjective",
    "chính, chủ yếu, đầu tiên, sơ cấp",
    "Of chief importance; principal or earliest in time.",
    "primary caregiver, primary responsibility, primary education",
    "Parents are usually a child's primary caregivers."
  ),
  caregiver: e(
    "caregiver",
    "/ˈkeəˌɡɪv.ər/",
    "noun",
    "người chăm sóc chính (cha mẹ, ông bà hoặc bảo mẫu)",
    "A family member or paid helper who regularly looks after a child or dependent person.",
    "primary caregiver, loving caregiver",
    "Consistent responsiveness from a caregiver builds infant trust."
  ),
  "primary caregiver": e(
    "primary caregiver",
    "/ˈpraɪ.mə.ri ˈkeəˌɡɪv.ər/",
    "noun phrase",
    "người trực tiếp chăm sóc chính cho trẻ nhỏ",
    "The person who takes the main responsibility for looking after a child.",
    "bond with primary caregivers",
    "Infants rely heavily on their primary caregivers for emotional security."
  ),
  infancy: e(
    "infancy",
    "/ˈɪn.fən.si/",
    "noun",
    "thời kỳ sơ sinh, giai đoạn ẵm ngửa (hoặc thời kỳ đầu)",
    "The state or period of early childhood or babyhood.",
    "in infancy, from infancy",
    "Brain connections multiply rapidly during infancy."
  ),
  infant: e(
    "infant",
    "/ˈɪn.fənt/",
    "noun",
    "trẻ sơ sinh, trẻ nhỏ dưới 1 tuổi",
    "A very young child or baby.",
    "newborn infant, infant development",
    "Infants recognize their mothers' voices shortly after birth."
  ),
  fundamental: e(
    "fundamental",
    "/ˌfʌn.dəˈmen.təl/",
    "adjective",
    "cơ bản, nền tảng, thiết yếu",
    "Forming a necessary base or core; of central importance.",
    "fundamental right, fundamental to wellbeing",
    "Early nutrition is fundamental for healthy physical growth."
  ),
  fundamentally: e(
    "fundamentally",
    "/ˌfʌn.dəˈmen.təl.i/",
    "adverb",
    "về mặt bản chất, về cơ bản",
    "In central or primary respects; essentially.",
    "fundamentally different, fundamentally inherited",
    "Certain reflexes are fundamentally innate rather than learned."
  ),
  lifelong: e(
    "lifelong",
    "/ˈlaɪf.lɒŋ/",
    "adjective",
    "suốt đời, kéo dài cả cuộc đời",
    "Lasting or remaining in a particular state throughout a person's life.",
    "lifelong learning, lifelong wellbeing, lifelong habit",
    "Reading habits formed early often bring lifelong benefits."
  ),
  wellbeing: e(
    "wellbeing",
    "/ˌwelˈbiː.ɪŋ/",
    "noun",
    "sức khỏe thể chất và tinh thần, trạng thái hạnh phúc khỏe mạnh",
    "The state of being comfortable, healthy, and happy.",
    "psychological wellbeing, lifelong wellbeing",
    "Close family ties contribute significantly to mental wellbeing."
  ),
  diverse: e(
    "diverse",
    "/daɪˈvɜːs/",
    "adjective",
    "đa dạng, khác nhau về nhiều mặt",
    "Showing a great deal of variety; very different.",
    "culturally diverse, diverse environments",
    "Children grow up in increasingly diverse cultural settings."
  ),
  bear: e(
    "bear",
    "/beər/",
    "verb",
    "gánh vác, mang (trách nhiệm); có nét (tương đồng)",
    "To carry responsibility for something; to show or carry a likeness.",
    "bear the duty, bear a resemblance to, bear responsibility",
    "Parents bear the moral duty to guide their children responsibly."
  ),
  duty: e(
    "duty",
    "/ˈdʒuː.ti/",
    "noun",
    "nghĩa vụ, bổn phận, trách nhiệm",
    "A moral or legal obligation; a responsibility.",
    "legal duty, moral duty, filial duty",
    "Guardians have a legal duty to ensure child safety."
  ),
  ethical: e(
    "ethical",
    "/ˈeθ.ɪ.kəl/",
    "adjective",
    "thuộc về đạo đức, chuẩn mực đúng sai",
    "Relating to moral principles or the branch of knowledge dealing with these.",
    "ethical character, ethical values, ethical dilemma",
    "Ethical standards guide how individuals treat others."
  ),
  ethically: e(
    "ethically",
    "/ˈeθ.ɪ.kəl.i/",
    "adverb",
    "một cách có đạo đức, đúng chuẩn mực",
    "In a way that relates to moral principles and right conduct.",
    "nurture ethically, act ethically",
    "Adults must teach youngsters to behave ethically."
  ),
  observe: e(
    "observe",
    "/əbˈzɜːv/",
    "verb",
    "quan sát, nhận thấy, theo dõi",
    "To notice, perceive, or watch carefully.",
    "researchers observe, closely observe",
    "Researchers observe how siblings resolve conflicts."
  ),
  intense: e(
    "intense",
    "/ɪnˈtens/",
    "adjective",
    "mãnh liệt, gay gắt, dữ dội",
    "Of extreme force, degree, or strength.",
    "intense rivalry, intense pressure, intense emotion",
    "Intense competition between brothers often fades in adulthood."
  ),
  typically: e(
    "typically",
    "/ˈtɪp.ɪ.kəl.i/",
    "adverb",
    "thường, thông thường, điển hình là",
    "In most cases; usually.",
    "typically occurs, typically dissolves",
    "Teenage rebellion typically declines as youths gain maturity."
  ),
  dissolve: e(
    "dissolve",
    "/dɪˈzɒlv/",
    "verb",
    "tan biến, chấm dứt, hòa tan",
    "To disappear gradually, break up, or become incorporated into a liquid.",
    "dissolve tensions, rivalries dissolve",
    "Old misunderstandings often dissolve after honest communication."
  ),
  mature: e(
    "mature",
    "/məˈtʃʊər/",
    "verb / adj.",
    "trưởng thành, chín chắn",
    "Fully developed physically or mentally; to reach full maturity.",
    "emotionally mature, as children mature",
    "As adolescents mature, they think more about long-term goals."
  ),
  maturity: e(
    "maturity",
    "/məˈtʃʊə.rə.ti/",
    "noun",
    "sự trưởng thành, độ chín chắn",
    "The state, fact, or period of being mature.",
    "reach maturity, emotional maturity",
    "Emotional maturity enables better conflict resolution."
  ),
  frequently: e(
    "frequently",
    "/ˈfriː.kwənt.li/",
    "adverb",
    "thường xuyên, hay xảy ra",
    "Regularly or habitually; often.",
    "frequently experience, frequently occur",
    "New parents frequently seek advice on sleep routines."
  ),
  experience: e(
    "experience",
    "/ɪkˈspɪə.ri.əns/",
    "verb / noun",
    "trải qua, cảm nhận; kinh nghiệm",
    "To encounter or undergo an event or feeling; practical contact with facts.",
    "experience a surge, firsthand experience",
    "Young adults experience major transitions after university."
  ),
  profound: e(
    "profound",
    "/prəˈfaʊnd/",
    "adjective",
    "sâu sắc, mãnh liệt, thâm thúy",
    "Very great or intense; having deep insight or understanding.",
    "profound impact, profound surge, profound bond",
    "Early childhood experiences have a profound effect on adult confidence."
  ),
  surge: e(
    "surge",
    "/sɜːdʒ/",
    "noun / verb",
    "cơn trào dâng, sự tăng vọt đột ngột",
    "A sudden powerful forward or upward movement or increase in feeling.",
    "a surge of emotion, sudden surge",
    "Parents feel a surge of pride at their child's graduation."
  ),
  instinct: e(
    "instinct",
    "/ˈɪn.stɪŋkt/",
    "noun",
    "bản năng tự nhiên",
    "An innate, typically fixed pattern of behavior in animals or humans in response to stimuli.",
    "maternal instinct, survival instinct, gut instinct",
    "Protective instinct encourages caregivers to shield infants from danger."
  ),
  compel: e(
    "compel",
    "/kəmˈpel/",
    "verb",
    "thôi thúc, buộc phải, ép buộc",
    "To force or strongly motivate someone to do something.",
    "compel someone to act, feel compelled to",
    "Empathy compels people to help vulnerable community members."
  ),
  shield: e(
    "shield",
    "/ʃiːld/",
    "verb / noun",
    "che chở, bảo vệ; tấm khiên",
    "To protect from a danger, risk, or unpleasant experience.",
    "shield from harm, protective shield",
    "Loving homes shield children from unnecessary anxiety."
  ),
  newborn: e(
    "newborn",
    "/ˈnjuː.bɔːn/",
    "noun / adj.",
    "trẻ sơ sinh mới chào đời",
    "Recently or just born; a newly born baby.",
    "newborn baby, shield a newborn",
    "Newborns need constant warmth and responsive feeding."
  ),
  unconditionally: e(
    "unconditionally",
    "/ˌʌn.kənˈdɪʃ.ən.əl.i/",
    "adverb",
    "một cách vô điều kiện, không đòi hỏi đáp trả",
    "Without conditions or limits; completely.",
    "love unconditionally, accept unconditionally",
    "Supportive parents love their children unconditionally."
  ),
  unconditional: e(
    "unconditional",
    "/ˌʌn.kənˈdɪʃ.ən.əl/",
    "adjective",
    "vô điều kiện, tuyệt đối",
    "Not subject to any conditions.",
    "unconditional love, unconditional care",
    "Unconditional parental support strengthens self-esteem."
  ),
  argue: e(
    "argue",
    "/ˈɑːɡ.juː/",
    "verb",
    "lập luận, tranh luận, cho rằng",
    "To give reasons or cite evidence in support of an idea or theory.",
    "argue that, sociologists argue",
    "Many educators argue that play is essential for learning."
  ),
  loving: e(
    "loving",
    "/ˈlʌv.ɪŋ/",
    "adjective",
    "yêu thương, tràn đầy tình cảm",
    "Feeling or showing love or great care.",
    "loving environment, loving upbringing",
    "A loving household fosters emotional security."
  ),
  moral: e(
    "moral",
    "/ˈmɒr.əl/",
    "adjective",
    "thuộc về đạo đức, luân lý",
    "Concerned with the principles of right and wrong behavior.",
    "moral character, moral values, moral instruction",
    "Moral instruction begins within the immediate family."
  ),
  individual: e(
    "individual",
    "/ˌɪn.dɪˈvɪdʒ.u.əl/",
    "noun / adj.",
    "cá nhân, từng người riêng lẻ",
    "A single human being as distinct from a group; separate.",
    "an individual's character, individual differences",
    "Every individual develops at a unique psychological pace."
  ),
  character: e(
    "character",
    "/ˈkær.ək.tər/",
    "noun",
    "tính cách, phẩm chất, nhân cách",
    "The mental and moral qualities distinctive to an individual.",
    "ethical character, build character, character traits",
    "Overcoming setbacks builds resilience and strong character."
  ),
  deeply: e(
    "deeply",
    "/ˈdiːp.li/",
    "adverb",
    "một cách sâu sắc, thấm thía",
    "Intensely; profoundly.",
    "deeply shaped, deeply ingrained",
    "Early habits are often deeply rooted in childhood routines."
  ),
  formal: e(
    "formal",
    "/ˈfɔː.məl/",
    "adjective",
    "chính quy, trang trọng, có hệ thống",
    "Officially sanctioned or organized, such as school education.",
    "formal schooling, formal qualifications",
    "Formal schooling teaches literacy alongside social cooperation."
  ),
  schooling: e(
    "schooling",
    "/ˈskuː.lɪŋ/",
    "noun",
    "việc học ở trường, giáo dục trường lớp",
    "Education received at school.",
    "formal schooling, early schooling",
    "Home nurturing complements formal schooling."
  ),
  "formal schooling": e(
    "formal schooling",
    "/ˈfɔː.məl ˈskuː.lɪŋ/",
    "noun phrase",
    "giáo dục chính quy tại trường học",
    "Structured academic education delivered inside schools.",
    "beyond formal schooling",
    "Social empathy often develops outside formal schooling."
  ),
  unmistakable: e(
    "unmistakable",
    "/ˌʌn.mɪˈsteɪ.kə.bəl/",
    "adjective",
    "rõ rệt, không thể nhầm lẫn được",
    "Not able to be mistaken for anything else; very distinctive.",
    "unmistakable resemblance, unmistakable sign",
    "The twins showed an unmistakable similarity in voice tone."
  ),
  physical: e(
    "physical",
    "/ˈfɪz.ɪ.kəl/",
    "adjective",
    "thuộc về thể chất, ngoại hình, vật lý",
    "Relating to the body as opposed to the mind.",
    "physical resemblance, physical health",
    "Physical appearance is largely governed by inherited genes."
  ),
  especially: e(
    "especially",
    "/ɪˈspeʃ.əl.i/",
    "adverb",
    "đặc biệt là, nhất là",
    "Used to single out one person, thing, or situation over all others.",
    "especially around, especially important",
    "Support is vital, especially during adolescence."
  ),
  facial: e(
    "facial",
    "/ˈfeɪ.ʃəl/",
    "adjective",
    "thuộc về khuôn mặt",
    "Of or affecting the face.",
    "facial contours, facial expressions",
    "Infants quickly learn to read facial expressions."
  ),
  contour: e(
    "contour",
    "/ˈkɒn.tʊər/",
    "noun",
    "đường nét, đường viền khuôn mặt/hình khối",
    "An outline representing or bounding the shape or form of something.",
    "facial contours",
    "He inherited the sharp facial contours of his grandfather."
  ),
  "facial contours": e(
    "facial contours",
    "/ˈfeɪ.ʃəl ˈkɒn.tʊəz/",
    "noun phrase",
    "các đường nét trên khuôn mặt",
    "The distinctive outline and shape of a person's face.",
    "around the eyes and facial contours",
    "Family resemblance often shows in facial contours."
  ),
  unlike: e(
    "unlike",
    "/ʌnˈlaɪk/",
    "preposition",
    "khác với, không giống như",
    "Different from; not similar to.",
    "unlike temporary moods",
    "Unlike fleeting moods, temperament stays fairly steady."
  ),
  transient: e(
    "transient",
    "/ˈtræn.zi.ənt/",
    "adjective",
    "nhất thời, thoáng qua, ngắn ngủi",
    "Lasting only for a short time; impermanent.",
    "transient moods, transient phase",
    "Transient anger should not damage family bonds."
  ),
  mood: e(
    "mood",
    "/muːd/",
    "noun",
    "tâm trạng nhất thời",
    "A temporary state of mind or feeling.",
    "emotional mood, mood swings",
    "Sleep deprivation easily triggers irritable moods."
  ),
  innate: e(
    "innate",
    "/ɪˈneɪt/",
    "adjective",
    "bẩm sinh, tự nhiên có sẵn từ khi sinh ra",
    "Inborn; natural rather than acquired through learning.",
    "innate temperament, innate ability, innate talent",
    "Babies possess an innate curiosity about human faces."
  ),
  relatively: e(
    "relatively",
    "/ˈrel.ə.tɪv.li/",
    "adverb",
    "tương đối, khá là",
    "In relation, comparison, or proportion to something else; quite.",
    "relatively permanent, relatively stable",
    "Basic temperament remains relatively constant over time."
  ),
  permanent: e(
    "permanent",
    "/ˈpɜː.mə.nənt/",
    "adjective",
    "lâu dài, vĩnh viễn, cố định",
    "Lasting or intended to last or remain unchanged indefinitely.",
    "permanent change, relatively permanent",
    "Early trauma can leave permanent psychological marks."
  ),
  substantially: e(
    "substantially",
    "/səbˈstæn.ʃəl.i/",
    "adverb",
    "đáng kể, phần lớn, sâu rộng",
    "To a great or significant extent.",
    "substantially shaped, substantially increase",
    "Adult health is substantially influenced by childhood diet."
  ),
  shape: e(
    "shape",
    "/ʃeɪp/",
    "verb / noun",
    "định hình, uốn nắn, tạo nên",
    "To determine the nature of; to influence heavily.",
    "shape character, shaped by inheritance",
    "Both genes and surroundings shape who we become."
  ),
  biological: e(
    "biological",
    "/ˌbaɪ.əˈlɒdʒ.ɪ.kəl/",
    "adjective",
    "thuộc về sinh học, ruột thịt (huyết thống)",
    "Genetically related or relating to biology and living organisms.",
    "biological inheritance, biological parents, biological traits",
    "Biological parents pass down genetic traits."
  ),
  inheritance: e(
    "inheritance",
    "/ɪnˈher.ɪ.təns/",
    "noun",
    "sự di truyền, tài sản/đặc điểm thừa hưởng",
    "A thing that is inherited genetically or legally from ancestors.",
    "genetic inheritance, biological inheritance",
    "Height is strongly affected by genetic inheritance."
  ),
  "biological inheritance": e(
    "biological inheritance",
    "/ˌbaɪ.əˈlɒdʒ.ɪ.kəl ɪnˈher.ɪ.təns/",
    "noun phrase",
    "sự di truyền sinh học từ cha mẹ",
    "The passing of genetic traits from parents to offspring.",
    "shaped by biological inheritance",
    "Biological inheritance interacts with upbringing."
  ),
  supportive: e(
    "supportive",
    "/səˈpɔː.tɪv/",
    "adjective",
    "biết ủng hộ, che chở, nâng đỡ tinh thần",
    "Providing encouragement or emotional help.",
    "supportive family, supportive environment",
    "A supportive environment reduces exam stress."
  ),
  community: e(
    "community",
    "/kəˈmjuː.nə.ti/",
    "noun",
    "cộng đồng, tập thể",
    "A group of people living in the same place or sharing common ties.",
    "close-knit community, local community",
    "Community support helps families navigate hardships."
  ),
  demonstrate: e(
    "demonstrate",
    "/ˈdem.ən.streɪt/",
    "verb",
    "chứng minh, thể hiện rõ, cho thấy",
    "To clearly show the existence or truth of something by giving proof or behavior.",
    "demonstrate resilience, studies demonstrate",
    "Long-term studies demonstrate the value of early reading."
  ),
  resilience: e(
    "resilience",
    "/rɪˈzɪl.i.əns/",
    "noun",
    "khả năng phục hồi, sức bật tinh thần, sự kiên cường",
    "The capacity to withstand or recover quickly from difficulties.",
    "emotional resilience, build resilience",
    "Supportive mentorship builds resilience against failure."
  ),
  social: e(
    "social",
    "/ˈsəʊ.ʃəl/",
    "adjective",
    "thuộc về xã hội, giao tiếp cộng đồng",
    "Relating to society or its organization and interaction.",
    "social anxiety, social skills, social development",
    "Playgroups cultivate early social skills."
  ),
  anxiety: e(
    "anxiety",
    "/æŋˈzaɪ.ə.ti/",
    "noun",
    "nỗi lo âu, sự bất an, lo lắng",
    "A feeling of worry, nervousness, or unease about an uncertain outcome.",
    "social anxiety, relieve anxiety",
    "Warm reassurance reduces separation anxiety in toddlers."
  ),
  initiate: e(
    "initiate",
    "/ɪˈnɪʃ.i.eɪt/",
    "verb",
    "khởi đầu, khởi xướng, kích hoạt",
    "To cause a process or action to begin.",
    "initiate care, initiate dialogue",
    "Consistent smiling helps initiate bonding."
  ),
  sanctuary: e(
    "sanctuary",
    "/ˈsæŋk.tʃu.ər.i/",
    "noun",
    "chốn bình yên, nơi trú ẩn an toàn",
    "A place of refuge or safety.",
    "affectionate sanctuary, safe sanctuary",
    "Home should serve as an emotional sanctuary."
  ),
  bloodline: e(
    "bloodline",
    "/ˈblʌd.laɪn/",
    "noun",
    "dòng máu, huyết thống gia đình",
    "A set of ancestors or line of descent of a person or animal.",
    "generational bloodlines",
    "Certain health traits run in family bloodlines."
  ),
  forebear: e(
    "forebear",
    "/ˈfɔː.beər/",
    "noun",
    "ông cha, tổ tiên, thế hệ đi trước",
    "An ancestor.",
    "resemble one's forebears",
    "Young generations inherit traditions from their forebears."
  ),
  demeanor: e(
    "demeanor",
    "/dɪˈmiː.nər/",
    "noun",
    "phong thái, cử chỉ, thái độ ứng xử",
    "Outward behavior or bearing.",
    "calm demeanor, professional demeanor",
    "Her gentle demeanor put the anxious students at ease."
  ),
  embark: e(
    "embark",
    "/ɪmˈbɑːk/",
    "verb",
    "bắt đầu, dấn thân vào (hành trình, sự nghiệp)",
    "To begin a course of action, especially an important or challenging one.",
    "embark on a career, embark on a journey",
    "Graduates embark on diverse professional careers."
  ),
  navigate: e(
    "navigate",
    "/ˈnæv.ɪ.ɡeɪt/",
    "verb",
    "vượt qua, xoay xở, điều hướng (khó khăn/cuộc sống)",
    "To deal with or handle a complex or difficult situation successfully.",
    "navigate challenges, navigate transitions",
    "Resilience helps youths navigate adult responsibilities."
  ),
  discourse: e(
    "discourse",
    "/ˈdɪs.kɔːs/",
    "noun",
    "cuộc thảo luận học thuật, diễn ngôn, sự bàn luận",
    "Written or spoken communication or debate on a serious topic.",
    "ongoing discourse, academic discourse",
    "The discourse on nature versus nurture spans centuries."
  ),
  predominantly: e(
    "predominantly",
    "/prɪˈdɒm.ɪ.nənt.li/",
    "adverb",
    "chủ yếu, phần lớn, chiếm ưu thế",
    "Mainly; for the most part.",
    "predominantly forged, predominantly rural",
    "Personality is not predominantly fixed at birth."
  ),
  forge: e(
    "forge",
    "/fɔːdʒ/",
    "verb",
    "tạo dựng, rèn giũa, hình thành bền chặt",
    "To create something strong, enduring, or successful through effort.",
    "forge a bond, forge personality",
    "Shared struggles often forge lasting friendships."
  ),
  domestic: e(
    "domestic",
    "/dəˈmes.tɪk/",
    "adjective",
    "trong gia đình, nội bộ gia đình; quốc nội",
    "Relating to the running of a home or to family relations; within a country.",
    "domestic conditioning, domestic socialization, domestic environment",
    "Domestic harmony encourages healthy emotional growth."
  ),
  conditioning: e(
    "conditioning",
    "/kənˈdɪʃ.ən.ɪŋ/",
    "noun",
    "sự rèn luyện thói quen, sự uốn nắn bởi môi trường",
    "The process of training or accustoming someone to behave in a certain way.",
    "domestic conditioning, environmental conditioning",
    "Early social conditioning shapes politeness and habits."
  ),
  inquiry: e(
    "inquiry",
    "/ɪnˈkwaɪə.ri/",
    "noun",
    "cuộc điều tra, câu hỏi nghiên cứu, sự tìm tòi",
    "An act of asking for information or an official investigation.",
    "central inquiry, scientific inquiry",
    "Human motivation remains a central inquiry in psychology."
  ),
  proponent: e(
    "proponent",
    "/prəˈpəʊ.nənt/",
    "noun",
    "người ủng hộ, người đề xướng quan điểm",
    "A person who advocates a theory, proposal, or project.",
    "proponents of, leading proponent",
    "Proponents of early education stress cognitive stimulation."
  ),
  determinism: e(
    "determinism",
    "/dɪˈtɜː.mɪ.nɪ.zəm/",
    "noun",
    "thuyết tất định (cho rằng mọi thứ được định đoạt trước)",
    "The philosophical or scientific doctrine that all events or traits are determined by existing causes.",
    "genetic determinism",
    "Strict genetic determinism ignores the power of education."
  ),
  "genetic determinism": e(
    "genetic determinism",
    "/dʒəˈnet.ɪk dɪˈtɜː.mɪ.nɪ.zəm/",
    "noun phrase",
    "thuyết quyết định luận di truyền (cho rằng gen quyết định tất cả)",
    "The belief that human behavior and abilities are controlled primarily by genes.",
    "proponents of genetic determinism",
    "Modern science rejects extreme genetic determinism."
  ),
  hereditary: e(
    "hereditary",
    "/həˈred.ɪ.tər.i/",
    "adjective",
    "có tính di truyền qua các thế hệ",
    "Determined by genetic factors and able to be passed from parents to offspring.",
    "hereditary factors, hereditary traits",
    "Eye color is a purely hereditary trait."
  ),
  dictate: e(
    "dictate",
    "/dɪkˈteɪt/",
    "verb",
    "quyết định, chi phối, áp đặt",
    "To control or decisively affect; to lay down authoritatively.",
    "dictate outcomes, dictate behavior",
    "Genes do not completely dictate a person's destiny."
  ),
  advocate: e(
    "advocate",
    "/ˈæd.və.kət/",
    "noun / verb",
    "người ủng hộ, bênh vực; ủng hộ công khai",
    "A person who publicly supports or recommends a particular cause or policy.",
    "advocates of, strongly advocate",
    "Advocates of holistic parenting emphasize empathy."
  ),
  familial: e(
    "familial",
    "/fəˈmɪl.i.əl/",
    "adjective",
    "thuộc về gia đình",
    "Relating to or occurring in a family or its members.",
    "familial relationship, familial bonds",
    "Strong familial support lowers adolescent anxiety."
  ),
  exert: e(
    "exert",
    "/ɪɡˈzɜːt/",
    "verb",
    "tạo ra (ảnh hưởng), gây ra (áp lực), vận dụng",
    "To apply or bring to bear a force, influence, or quality.",
    "exert an effect, exert influence, exert pressure",
    "Peers exert considerable influence during teenage years."
  ),
  overriding: e(
    "overriding",
    "/ˌəʊ.vəˈraɪ.dɪŋ/",
    "adjective",
    "vượt trội, quan trọng hơn hết, lấn át",
    "More important than any other considerations.",
    "overriding effect, overriding priority",
    "Child safety is the overriding priority for caregivers."
  ),
  contend: e(
    "contend",
    "/kənˈtend/",
    "verb",
    "khẳng định, lập luận, cho rằng",
    "To assert something as a position in an argument.",
    "firmly contend that",
    "I firmly contend that nurture unlocks innate potential."
  ),
  baseline: e(
    "baseline",
    "/ˈbeɪs.laɪn/",
    "noun / adj.",
    "nền tảng ban đầu, mức cơ sở",
    "A minimum or starting point used for comparisons.",
    "baseline predispositions, baseline data",
    "Genetics set baseline capacities that learning expands."
  ),
  predisposition: e(
    "predisposition",
    "/ˌpriː.dɪs.pəˈzɪʃ.ən/",
    "noun",
    "khuynh hướng sẵn có, tố chất bẩm sinh",
    "A liability or tendency to suffer from a particular condition, hold a particular attitude, or act in a particular way.",
    "biological predisposition, genetic predisposition",
    "A predisposition to music thrives with regular practice."
  ),
  cultivate: e(
    "cultivate",
    "/ˈkʌl.tɪ.veɪt/",
    "verb",
    "nuôi dưỡng, trau dồi, vun đắp",
    "To try to acquire or develop a quality, sentiment, or skill.",
    "cultivate habits, cultivate a supportive upbringing",
    "Schools should cultivate critical thinking alongside empathy."
  ),
  steer: e(
    "steer",
    "/stɪər/",
    "verb",
    "dẫn dắt, định hướng, lái theo hướng",
    "To guide or control the movement or development of someone or something.",
    "steer towards, steer away from",
    "Mentors steer teenagers towards constructive choices."
  ),
  constructive: e(
    "constructive",
    "/kənˈstrʌk.tɪv/",
    "adjective",
    "mang tính xây dựng, tích cực, hữu ích",
    "Serving a useful purpose; tending to build up.",
    "constructive feedback, constructive adulthood",
    "Constructive guidance encourages self-reflection."
  ),
  constructively: e(
    "constructively",
    "/kənˈstrʌk.tɪv.li/",
    "adverb",
    "một cách mang tính xây dựng, tích cực",
    "In a helpful, positive, and productive manner.",
    "overcome challenges constructively",
    "Siblings learn to settle disagreements constructively."
  ),
  predeterminism: e(
    "predeterminism",
    "/ˌpriː.dɪˈtɜː.mɪ.nɪ.zəm/",
    "noun",
    "thuyết tiền định (cho rằng mọi đặc điểm đã ấn định sẵn)",
    "The philosophy that all events or human traits are decided in advance.",
    "biological predeterminism",
    "Biological predeterminism underestimates personal effort."
  ),
  empirical: e(
    "empirical",
    "/ɪmˈpɪr.ɪ.kəl/",
    "adjective",
    "dựa trên thực nghiệm, bằng chứng quan sát thực tế",
    "Based on, concerned with, or verifiable by observation or experience rather than pure theory.",
    "empirical evidence, empirical study",
    "Twin studies supply strong empirical evidence."
  ),
  transmit: e(
    "transmit",
    "/trænzˈmɪt/",
    "verb",
    "truyền lại, truyền tải (gen, văn hóa, thông tin)",
    "To pass on from one person or generation to another.",
    "transmit across generations",
    "Parents transmit both DNA and cultural values."
  ),
  transmission: e(
    "transmission",
    "/trænzˈmɪʃ.ən/",
    "noun",
    "sự truyền lại, sự di truyền, sự truyền tải",
    "The action or process of passing something from one person or generation to another.",
    "biological transmission, cultural transmission",
    "Biological transmission explains shared physical traits."
  ),
  identical: e(
    "identical",
    "/aɪˈden.tɪ.kəl/",
    "adjective",
    "giống hệt nhau (ví dụ: sinh đôi cùng trứng)",
    "Similar in every detail; exactly alike.",
    "identical twins, virtually identical",
    "Identical twins share nearly 100% of their DNA."
  ),
  twin: e(
    "twin",
    "/twɪn/",
    "noun",
    "anh/chị/em sinh đôi",
    "One of two children or animals born at the same birth.",
    "identical twins, separated twins",
    "Twin research clarifies how environment alters behavior."
  ),
  separate: e(
    "separate",
    "/ˈsep.ər.ət/",
    "verb / adj.",
    "tách biệt, chia tách; riêng lẻ",
    "To cause to move or be apart; forming a unit apart.",
    "separated at birth",
    "Twins separated at birth still display similar habits."
  ),
  parallel: e(
    "parallel",
    "/ˈpær.ə.lel/",
    "noun / adj.",
    "điểm tương đồng song song; song song",
    "A person or thing that is similar or analogous to another.",
    "striking parallels, draw a parallel",
    "Psychologists observe striking parallels in sibling habits."
  ),
  intellectual: e(
    "intellectual",
    "/ˌɪn.təlˈek.tʃu.əl/",
    "adjective",
    "thuộc về trí tuệ, tư duy học thuật",
    "Relating to the intellect or higher mental powers.",
    "intellectual aptitude, intellectual growth",
    "Reading aloud boosts children's intellectual curiosity."
  ),
  aptitude: e(
    "aptitude",
    "/ˈæp.tɪ.tʃuːd/",
    "noun",
    "năng khiếu bẩm sinh, khả năng tiếp thu tự nhiên",
    "A natural ability to do something.",
    "intellectual aptitude, natural aptitude for",
    "She showed an early aptitude for mathematics."
  ),
  divergent: e(
    "divergent",
    "/daɪˈvɜː.dʒənt/",
    "adjective",
    "khác biệt, phân kỳ, rẽ theo hướng khác nhau",
    "Tending to be different or develop in different directions.",
    "divergent environments, divergent views",
    "Even in divergent homes, twins keep certain shared habits."
  ),
  ancestor: e(
    "ancestor",
    "/ˈæn.ses.tər/",
    "noun",
    "tổ tiên, ông bà đời trước",
    "A person from whom one is descended, typically more remote than a grandparent.",
    "biological ancestors",
    "Physical traits can skip a generation from earlier ancestors."
  ),
  neurological: e(
    "neurological",
    "/ˌnjʊə.rəˈlɒdʒ.ɪ.kəl/",
    "adjective",
    "thuộc về hệ thần kinh và não bộ",
    "Relating to the anatomy, functions, and disorders of nerves and the nervous system.",
    "neurological responses, neurological development",
    "Early stimulation strengthens neurological pathways."
  ),
  acquire: e(
    "acquire",
    "/əˈkwaɪər/",
    "verb",
    "tiếp thu, lĩnh hội, đạt được qua học tập/trải nghiệm",
    "To learn or develop a skill, habit, or quality.",
    "socially acquired, acquire knowledge",
    "Language skills are socially acquired through interaction."
  ),
  intrinsic: e(
    "intrinsic",
    "/ɪnˈtrɪn.zɪk/",
    "adjective",
    "nội tại, vốn có bên trong, bản chất",
    "Belonging naturally; essential.",
    "intrinsic traits, intrinsic motivation",
    "Intrinsic curiosity drives lifelong learning."
  ),
  blueprint: e(
    "blueprint",
    "/ˈbluː.prɪnt/",
    "noun",
    "bản thiết kế gốc, khuôn mẫu di truyền",
    "A design plan or technical drawing; a genetic pattern.",
    "biological blueprint, genetic blueprint",
    "DNA acts as a biological blueprint, not an unchangeable fate."
  ),
  dismiss: e(
    "dismiss",
    "/dɪsˈmɪs/",
    "verb",
    "bác bỏ, gạt bỏ, xem nhẹ",
    "To treat as unworthy of serious consideration; reject.",
    "cannot be dismissed",
    "Genetic factors cannot be dismissed in psychology."
  ),
  assess: e(
    "assess",
    "/əˈses/",
    "verb",
    "đánh giá, xem xét mức độ",
    "To evaluate or estimate the nature, ability, or quality of.",
    "assess human development, assess performance",
    "Educators assess progress through continuous observation."
  ),
  inert: e(
    "inert",
    "/ɪˈnɜːt/",
    "adjective",
    "trơ, thụ động, chưa được kích hoạt phát huy",
    "Lacking the ability or strength to move or act; dormant.",
    "remain inert",
    "Raw talent remains inert without disciplined practice."
  ),
  comprehensively: e(
    "comprehensively",
    "/ˌkɒm.prɪˈhen.sɪv.li/",
    "adverb",
    "một cách toàn diện, đầy đủ mọi khía cạnh",
    "Completely; including all or nearly all elements or aspects.",
    "comprehensively nurtured",
    "Child welfare must be comprehensively supported."
  ),
  deliberate: e(
    "deliberate",
    "/dɪˈlɪb.ər.ət/",
    "adjective",
    "có chủ đích, có cân nhắc cẩn thận",
    "Done consciously and intentionally.",
    "deliberate effort, deliberate socialization",
    "Good habits grow through deliberate guidance."
  ),
  socialization: e(
    "socialization",
    "/ˌsəʊ.ʃə.laɪˈzeɪ.ʃən/",
    "noun",
    "quá trình hòa nhập xã hội và tiếp thu chuẩn mực ứng xử",
    "The process of learning to behave in a way that is acceptable to society.",
    "domestic socialization, early socialization",
    "Family is the first arena of childhood socialization."
  ),
  cohesive: e(
    "cohesive",
    "/kəʊˈhiː.sɪv/",
    "adjective",
    "gắn kết chặt chẽ, đoàn kết thống nhất",
    "Characterized by or causing cohesion and unity.",
    "cohesive family unit, cohesive community",
    "A cohesive household cushions children against stress."
  ),
  stability: e(
    "stability",
    "/stəˈbɪl.ə.ti/",
    "noun",
    "sự ổn định, vững vàng",
    "The state of being stable and steady.",
    "psychological stability, financial stability",
    "Routine gives young children emotional stability."
  ),
  empathetic: e(
    "empathetic",
    "/ˌem.pəˈθet.ɪk/",
    "adjective",
    "biết thấu cảm, đồng cảm sâu sắc",
    "Showing an ability to understand and share the feelings of another.",
    "empathetic warmth, empathetic listening",
    "Empathetic parents validate their children's emotions."
  ),
  warmth: e(
    "warmth",
    "/wɔːmθ/",
    "noun",
    "sự ấm áp, tình thương yêu trìu mến",
    "Enthusiasm, affection, or kindness.",
    "maternal warmth, emotional warmth",
    "Parental warmth fosters secure attachment."
  ),
  consistent: e(
    "consistent",
    "/kənˈsɪs.tənt/",
    "adjective",
    "nhất quán, kiên định, trước sau như một",
    "Acting or done in the same way over time, especially so as to be fair or accurate.",
    "consistent guidance, consistent discipline",
    "Consistent rules help youngsters distinguish right from wrong."
  ),
  regulation: e(
    "regulation",
    "/ˌreɡ.jəˈleɪ.ʃən/",
    "noun",
    "sự điều tiết, tự kiểm soát (cảm xúc); quy định",
    "The control or management of a complex system or emotion.",
    "emotional regulation skills",
    "Emotional regulation helps students stay calm under exam pressure."
  ),
  succumb: e(
    "succumb",
    "/səˈkʌm/",
    "verb",
    "sa ngã, khuất phục, không cưỡng lại được (thói xấu/áp lực)",
    "To fail to resist pressure, temptation, or some other negative force.",
    "succumb to peer pressure, succumb to temptation",
    "Isolated youths may succumb to negative peer influence."
  ),
  antisocial: e(
    "antisocial",
    "/ˌæn.tiˈsəʊ.ʃəl/",
    "adjective",
    "chống đối xã hội, gây hại cho cộng đồng",
    "Contrary to the laws and customs of society; devoid of sociable instincts.",
    "antisocial tendencies, antisocial behavior",
    "Mentorship programmes reduce antisocial behavior."
  ),
  tendency: e(
    "tendency",
    "/ˈten.dən.si/",
    "noun",
    "khuynh hướng, xu hướng dễ làm gì",
    "An inclination towards a particular characteristic or type of behavior.",
    "antisocial tendencies, natural tendency",
    "Children have a natural tendency to imitate adults."
  ),
  deprive: e(
    "deprive",
    "/dɪˈpraɪv/",
    "verb",
    "tước đoạt, làm cho thiếu thốn (tình thương, cơ hội)",
    "To deny a person or place the possession or use of something.",
    "deprived of affection, sleep-deprived",
    "Children deprived of affection may struggle with trust."
  ),
  deprived: e(
    "deprived",
    "/dɪˈpraɪvd/",
    "adjective",
    "bị thiếu thốn, thiệt thòi",
    "Suffering a severe and damaging lack of basic material or emotional benefits.",
    "deprived of nurture, economically deprived",
    "Communities must support youths from deprived backgrounds."
  ),
  reinforcement: e(
    "reinforcement",
    "/ˌriː.ɪnˈfɔːs.mənt/",
    "noun",
    "sự củng cố, khích lệ tinh thần",
    "The process of encouraging or establishing a belief or pattern of behavior.",
    "positive reinforcement",
    "Positive reinforcement motivates children better than harsh criticism."
  ),
  foundational: e(
    "foundational",
    "/faʊnˈdeɪ.ʃən.əl/",
    "adjective",
    "mang tính nền móng, cơ sở ban đầu",
    "Denoting an underlying basis or principle.",
    "foundational architecture, foundational skill",
    "Reading comprehension is a foundational academic skill."
  ),
  neural: e(
    "neural",
    "/ˈnjʊə.rəl/",
    "adjective",
    "thuộc về tế bào/mạng lưới thần kinh",
    "Relating to a nerve or the nervous system.",
    "neural architecture, neural pathways",
    "Early stimulation shapes neural connections in the brain."
  ),
  architecture: e(
    "architecture",
    "/ˈɑː.kɪ.tek.tʃər/",
    "noun",
    "kiến trúc, cấu trúc nền tảng (cơ thể/não bộ/công trình)",
    "The complex or carefully designed structure of something.",
    "neural architecture, modern architecture",
    "Genes outline the basic neural architecture of the brain."
  ),
  materialize: e(
    "materialize",
    "/məˈtɪə.ri.ə.laɪz/",
    "verb",
    "thành hình, trở thành hiện thực",
    "To become actual fact; happen or appear.",
    "potential materializes",
    "Hidden talents materialize when given patient mentorship."
  ),
  shoulder: e(
    "shoulder",
    "/ˈʃəʊl.dər/",
    "verb / noun",
    "gánh vác (trách nhiệm); bờ vai",
    "To take on a burden or responsibility.",
    "shoulder responsibilities",
    "Parents shoulder immense responsibilities in raising children."
  ),
  compassion: e(
    "compassion",
    "/kəmˈpæʃ.ən/",
    "noun",
    "lòng trắc ẩn, sự cảm thông yêu thương",
    "Sympathetic pity and concern for the sufferings or misfortunes of others.",
    "with compassion, show compassion",
    "Teaching with compassion builds confident learners."
  ),
  empower: e(
    "empower",
    "/ɪmˈpaʊər/",
    "verb",
    "trao quyền, tiếp sức mạnh, giúp tự tin làm chủ",
    "To make someone stronger and more confident, especially in controlling their life.",
    "empower children, empower learners",
    "Education empowers young people to overcome barriers."
  ),
  raw: e(
    "raw",
    "/rɔː/",
    "adjective",
    "thô sơ, nguyên bản, chưa qua mài giũa",
    "In its natural state; unrefined or undeveloped.",
    "raw innate traits, raw talent",
    "Upbringing refines raw temperament into social maturity."
  ),
  // Synonyms & Stage 1 options in Unit 1
  relation: e(
    "relation",
    "/rɪˈleɪ.ʃən/",
    "noun",
    "mối liên hệ logic hoặc người bà con họ hàng",
    "The way in which two or more concepts or people are connected; a relative.",
    "foreign relations, distant relation",
    "She is a distant relation on my mother's side."
  ),
  connection: e(
    "connection",
    "/kəˈnek.ʃən/",
    "noun",
    "sự kết nối (mạng, kỹ thuật, vật lý) hoặc mối liên hệ",
    "A relationship in which a person, thing, or idea is linked with something else.",
    "internet connection, emotional connection",
    "Check your network connection before submitting."
  ),
  "bring up": e(
    "bring up",
    "/brɪŋ ʌp/",
    "phrasal verb",
    "nuôi nấng, dạy dỗ con cái (ngoại động từ, có tân ngữ)",
    "To care for a child until they are an adult, often giving particular beliefs.",
    "bring up a child, strictly brought up",
    "Grandparents helped bring up the children while parents worked."
  ),
  rise: e(
    "rise",
    "/raɪz/",
    "verb",
    "mọc lên, tăng lên (giá cả, mặt trời)",
    "To move from a lower position to a higher one; increase.",
    "prices rise, sun rises",
    "Living costs continue to rise in major cities."
  ),
  filial: e(
    "filial",
    "/ˈfɪl.i.əl/",
    "adjective",
    "thuộc về lòng hiếu thảo, bổn phận con cái đối với cha mẹ",
    "Relating to or due from a son or daughter.",
    "filial duty, filial piety",
    "Filial duty is deeply respected in East Asian cultures."
  ),
  education: e(
    "education",
    "/ˌedʒ.ʊˈkeɪ.ʃən/",
    "noun",
    "giáo dục, sự đào tạo kiến thức",
    "The process of receiving or giving systematic instruction, especially at school.",
    "higher education, formal education",
    "Access to quality education reduces inequality."
  ),
  nutrition: e(
    "nutrition",
    "/njuːˈtrɪʃ.ən/",
    "noun",
    "dinh dưỡng, chất nuôi dưỡng cơ thể",
    "The process of providing or obtaining the food necessary for health and growth.",
    "balanced nutrition, child nutrition",
    "Proper nutrition supports early brain growth."
  ),
  imitation: e(
    "imitation",
    "/ˌɪm.ɪˈteɪ.ʃən/",
    "noun",
    "sự bắt chước, mô phỏng (hoặc hàng nhái)",
    "The action of using someone or something as a model; a copy.",
    "learning by imitation",
    "Toddlers acquire many gestures through imitation."
  ),
  reflection: e(
    "reflection",
    "/rɪˈflek.ʃən/",
    "noun",
    "hình ảnh phản chiếu; sự suy ngẫm sâu sắc",
    "An image seen in a mirror or shiny surface; serious thought or consideration.",
    "self-reflection, mirror reflection",
    "Quiet reflection helps students learn from mistakes."
  ),
  reputation: e(
    "reputation",
    "/ˌrep.jəˈteɪ.ʃən/",
    "noun",
    "danh tiếng, uy tín trong mắt người khác",
    "The beliefs or opinions that are generally held about someone or something.",
    "build a reputation, academic reputation",
    "The university holds a strong international reputation."
  ),
  rumor: e(
    "rumor",
    "/ˈruː.mər/",
    "noun",
    "tin đồn thất thiệt chưa kiểm chứng",
    "A currently circulating story or report of uncertain or doubtful truth.",
    "spread a rumor, baseless rumor",
    "Journalists must verify facts rather than repeating rumors."
  ),
  crowded: e(
    "crowded",
    "/ˈkraʊ.dɪd/",
    "adjective",
    "đông đúc, chật chội",
    "Full of people, leaving little or no room for movement.",
    "crowded streets, overcrowded city",
    "Public buses are often crowded during rush hour."
  ),
  attached: e(
    "attached",
    "/əˈtætʃt/",
    "adjective",
    "gắn bó tình cảm (to) hoặc được đính kèm",
    "Joined or connected; full of affection for someone or something.",
    "emotionally attached to",
    "Young children quickly become attached to caring teachers."
  ),
  "emotional bond": e(
    "emotional bond",
    "/ɪˈməʊ.ʃən.əl bɒnd/",
    "noun phrase",
    "sợi dây gắn kết tình cảm sâu sắc",
    "A deep psychological connection between people based on affection and trust.",
    "forge an emotional bond",
    "Skin-to-skin contact strengthens the early emotional bond."
  ),
  "interpersonal rapport": e(
    "interpersonal rapport",
    "/ˌɪn.təˈpɜː.sən.əl ræpˈɔːr/",
    "noun phrase",
    "sự hòa hợp, thấu hiểu trong giao tiếp giữa người với người",
    "A close and harmonious relationship in which people understand each other well.",
    "build interpersonal rapport",
    "Good teachers establish strong interpersonal rapport with students."
  ),
  "reach maturity": e(
    "reach maturity",
    "/riːtʃ məˈtʃʊə.rə.ti/",
    "verb phrase",
    "đạt đến độ trưởng thành, chín chắn",
    "To become fully grown or emotionally developed.",
    "reach full maturity",
    "Many individuals reach emotional maturity in their late twenties."
  ),
  "develop into adulthood": e(
    "develop into adulthood",
    "/dɪˈvel.əp ˈɪn.tuː ˈæd.ʌlt.hʊd/",
    "verb phrase",
    "phát triển bước vào tuổi trưởng thành",
    "To grow gradually from youth into an adult.",
    "develop smoothly into adulthood",
    "Guided independence helps teenagers develop into adulthood."
  ),
  "inter-sibling competition": e(
    "inter-sibling competition",
    "/ˌɪn.təˈsɪb.lɪŋ ˌkɒm.pəˈtɪʃ.ən/",
    "noun phrase",
    "sự cạnh tranh giữa các anh chị em ruột",
    "Competition for attention or resources among brothers and sisters.",
    "manage inter-sibling competition",
    "Fair parenting minimizes unhealthy inter-sibling competition."
  ),
  "fraternal rivalry": e(
    "fraternal rivalry",
    "/frəˈtɜː.nəl ˈraɪ.vəl.ri/",
    "noun phrase",
    "sự kình địch giữa anh em trong nhà",
    "Competition or jealousy between brothers or siblings.",
    "overcome fraternal rivalry",
    "Fraternal rivalry frequently decreases when siblings attend separate schools."
  ),
  "motherly devotion": e(
    "motherly devotion",
    "/ˈmʌð.ə.li dɪˈvəʊ.ʃən/",
    "noun phrase",
    "tình yêu thương tận tụy của người mẹ",
    "Deep, selfless care and affection characteristic of a mother.",
    "unwavering motherly devotion",
    "Stories often celebrate motherly devotion during hardship."
  ),
  "maternal drive": e(
    "maternal drive",
    "/məˈtɜː.nəl draɪv/",
    "noun phrase",
    "động lực bản năng làm mẹ",
    "The natural instinct motivating a mother to protect and nurture her young.",
    "powerful maternal drive",
    "The maternal drive ensures newborns receive constant care."
  ),
  "family nurture": e(
    "family nurture",
    "/ˈfæm.ɪ.li ˈnɜː.tʃər/",
    "noun phrase",
    "sự nuôi dưỡng và giáo dục từ gia đình",
    "Care, encouragement, and moral guidance provided by the family.",
    "consistent family nurture",
    "Quality family nurture bridges socio-economic disadvantages."
  ),
  "domestic socialization": e(
    "domestic socialization",
    "/dəˈmes.tɪk ˌsəʊ.ʃə.laɪˈzeɪ.ʃən/",
    "noun phrase",
    "quá trình rèn giũa kỹ năng xã hội trong gia đình",
    "Learning social norms, empathy, and manners within the household.",
    "early domestic socialization",
    "Domestic socialization prepares toddlers for school teamwork."
  ),
  rearing: e(
    "rearing",
    "/ˈrɪə.rɪŋ/",
    "noun",
    "việc nuôi nấng, chăm bẵm con cái",
    "The process of bringing up and caring for a child.",
    "child-rearing practices",
    "Child-rearing styles vary noticeably across cultures."
  ),
  "close likeness": e(
    "close likeness",
    "/kləʊs ˈlaɪk.nəs/",
    "noun phrase",
    "sự giống nhau rõ rệt về ngoại hình",
    "A strong similarity in appearance between two people.",
    "bear a close likeness to",
    "Neighbors noticed a close likeness between the boy and his father."
  ),
  "strong physical similarity": e(
    "strong physical similarity",
    "/strɒŋ ˈfɪz.ɪ.kəl ˌsɪm.ɪˈlær.ə.ti/",
    "noun phrase",
    "nét tương đồng rõ nét về ngoại hình thể chất",
    "Marked resemblance in facial or bodily features.",
    "show strong physical similarity",
    "Siblings often share strong physical similarity."
  ),
  disposition: e(
    "disposition",
    "/ˌdɪs.pəˈzɪʃ.ən/",
    "noun",
    "tính khí, khuynh hướng tính cách tự nhiên",
    "A person's inherent qualities of mind and character.",
    "cheerful disposition, artistic disposition",
    "Her calm disposition helps her handle stressful deadlines."
  ),
  "personality makeup": e(
    "personality makeup",
    "/ˌpɜː.sənˈæl.ə.ti ˈmeɪk.ʌp/",
    "noun phrase",
    "cấu trúc tính cách tổng thể của một người",
    "The combination of traits that form an individual's character.",
    "shape one's personality makeup",
    "Genes and friendships jointly influence personality makeup."
  ),
  "constitutional nature": e(
    "constitutional nature",
    "/ˌkɒn.stɪˈtʃuː.ʃən.əl ˈneɪ.tʃər/",
    "noun phrase",
    "bản chất khí chất bẩm sinh (của cơ thể/tâm lý)",
    "A person's inherent physical and psychological constitution.",
    "innate constitutional nature",
    "Temperament reflects a child's constitutional nature."
  ),
  "tight-knit clan": e(
    "tight-knit clan",
    "/ˌtaɪtˈnɪt klæn/",
    "noun phrase",
    "đại gia đình/dòng họ gắn bó keo sơn",
    "A closely connected extended family group that supports one another.",
    "belong to a tight-knit clan",
    "Growing up in a tight-knit clan offers strong social backing."
  ),
  "cohesive family unit": e(
    "cohesive family unit",
    "/kəʊˈhiː.sɪv ˈfæm.ɪ.li ˈjuː.nɪt/",
    "noun phrase",
    "tổ ấm gia đình gắn kết bền chặt",
    "A united household whose members share mutual trust and cooperation.",
    "maintain a cohesive family unit",
    "Shared meals help sustain a cohesive family unit."
  ),

  // =========================================================================
  // 2. TOÀN BỘ PHƯƠNG ÁN NHIỄU (DISTRACTORS) CHẶNG 2 CỦA CẢ 20 UNITS
  // =========================================================================
  infantile: e("infantile", "/ˈɪn.fən.taɪl/", "adjective", "thuộc về trẻ sơ sinh; hoặc trẻ con, ấu trĩ", "Relating to babies or very young children; childish.", "infantile behavior"),
  fraternal: e("fraternal", "/frəˈtɜː.nəl/", "adjective", "thuộc tình anh em; anh em song sinh khác trứng", "Relating to brothers or brotherly affection.", "fraternal bond, fraternal twins"),
  barrier: e("barrier", "/ˈbær.i.ər/", "noun", "rào cản, chướng ngại vật", "An obstacle that prevents movement or communication.", "language barrier, social barrier"),
  boundary: e("boundary", "/ˈbaʊn.də.ri/", "noun", "ranh giới, giới hạn", "A line marking the limits of an area or acceptable behavior.", "set boundaries"),
  conflict: e("conflict", "/ˈkɒn.flɪkt/", "noun / verb", "xung đột, mâu thuẫn", "A serious disagreement or clash between opposing ideas or people.", "family conflict, resolve conflict"),
  extended: e("extended", "/ɪkˈsten.dɪd/", "adjective", "mở rộng, kéo dài (extended family: đại gia đình nhiều thế hệ)", "Covering a larger group or longer period than usual.", "extended family"),
  distant: e("distant", "/ˈdɪs.tənt/", "adjective", "xa cách, xa xôi (họ hàng xa hoặc khoảng cách xa)", "Far away in space, time, or relationship.", "distant relative, distant planet"),
  external: e("external", "/ɪkˈstɜː.nəl/", "adjective", "bên ngoài, ngoại cảnh", "Coming from or located on the outside.", "external pressure, external factors"),
  neighbour: e("neighbour", "/ˈneɪ.bər/", "noun", "hàng xóm, người sống cạnh nhà", "A person living near or next door to another.", "next-door neighbour"),
  stranger: e("stranger", "/ˈstreɪn.dʒər/", "noun", "người lạ mặt", "A person whom one does not know.", "total stranger"),
  profession: e("profession", "/prəˈfeʃ.ən/", "noun", "nghề nghiệp chuyên môn cao", "A paid occupation requiring prolonged training and formal qualification.", "medical profession"),
  prestige: e("prestige", "/presˈtiːʒ/", "noun", "uy tín, thanh thế, danh giá", "Widespread respect and admiration based on achievement or quality.", "academic prestige"),
  discrepancy: e("discrepancy", "/dɪsˈkrep.ən.si/", "noun", "sự khác biệt, sự chênh lệch, bất nhất", "An unexpected difference between two facts or figures.", "salary discrepancy"),
  alienation: e("alienation", "/ˌeɪ.li.əˈneɪ.ʃən/", "noun", "sự xa lánh, cảm giác lạc lõng tách biệt", "The feeling of being isolated from a group or activity.", "social alienation"),
  contrast: e("contrast", "/ˈkɒn.trɑːst/", "noun / verb", "sự tương phản, trái ngược", "The state of being strikingly different from something else.", "in stark contrast to"),
  loose: e("loose", "/luːs/", "adjective", "lỏng lẻo, không chặt chẽ", "Not firmly fixed or tightly bound together.", "loose connection"),
  isolated: e("isolated", "/ˈaɪ.sə.leɪ.tɪd/", "adjective", "bị cô lập, tách biệt, hẻo lánh", "Far away from other places or people; solitary.", "socially isolated"),
  detached: e("detached", "/dɪˈtætʃt/", "adjective", "tách rời, thờ ơ, không gắn kết cảm xúc", "Separate or disconnected; emotionally aloof.", "emotionally detached"),
  childhood: e("childhood", "/ˈtʃaɪld.hʊd/", "noun", "thời thơ ấu", "The state or period of being a child.", "early childhood"),
  toddlerhood: e("toddlerhood", "/ˈtɒd.lə.hʊd/", "noun", "giai đoạn trẻ chập chững tập đi (1–3 tuổi)", "The stage of life when a young child is learning to walk.", "during toddlerhood"),
  abacus: e("abacus", "/ˈæb.ə.kəs/", "noun", "bàn tính gảy cổ truyền", "A traditional frame with sliding beads used for counting.", "ancient abacus"),
  abundance: e("abundance", "/əˈbʌn.dəns/", "noun", "sự dồi dào, phong phú dư thừa", "A very large quantity of something.", "an abundance of resources"),
  additives: e("additives", "/ˈæd.ɪ.tɪvz/", "noun (plural)", "chất phụ gia (trong thực phẩm/nhiên liệu)", "Substances added to improve flavor, appearance, or preservation.", "artificial food additives"),
  agility: e("agility", "/əˈdʒɪl.ə.ti/", "noun", "sự nhanh nhẹn, linh hoạt", "Ability to move or think quickly and easily.", "mental agility, physical agility"),
  altruism: e("altruism", "/ˈæl.tru.ɪ.zəm/", "noun", "lòng vị tha, sự hy sinh vì người khác", "Selfless concern for the wellbeing of others.", "pure altruism"),
  amnesia: e("amnesia", "/æmˈniː.zi.ə/", "noun", "chứng mất trí nhớ", "A partial or total loss of memory.", "suffer from amnesia"),
  amnesty: e("amnesty", "/ˈæm.nə.sti/", "noun", "lệnh ân xá, tha bổng tội phạm", "An official pardon for people convicted of political offenses.", "grant an amnesty"),
  anecdote: e("anecdote", "/ˈæn.ɪk.dəʊt/", "noun", "giai thoại, câu chuyện kể ngắn có thật", "A short amusing or interesting story about a real incident.", "personal anecdote"),
  apathy: e("apathy", "/ˈæp.ə.θi/", "noun", "sự thờ ơ, lãnh đạm, thiếu quan tâm", "Lack of interest, enthusiasm, or concern.", "public apathy"),
  asceticism: e("asceticism", "/əˈset.ɪ.sɪ.zəm/", "noun", "lối sống khổ hạnh, tiết chế vật chất", "Severe self-discipline and avoidance of all forms of indulgence.", "practice asceticism"),
  babble: e("babble", "/ˈbæb.əl/", "noun / verb", "tiếng bi bô của trẻ nhỏ; nói lảm nhảm vô nghĩa", "To talk rapidly and continuously in a foolish or incoherent way; baby sounds.", "infant babble"),
  bankrupt: e("bankrupt", "/ˈbæŋk.rʌpt/", "adjective / verb", "phá sản, vỡ nợ", "Declared in law unable to pay outstanding debts.", "go bankrupt"),
  barbaric: e("barbaric", "/bɑːˈbær.ɪk/", "adjective", "dã man, tàn bạo, thiếu văn minh", "Savagely cruel; unsophisticated.", "barbaric practices"),
  barbarism: e("barbarism", "/ˈbɑː.bər.ɪ.zəm/", "noun", "sự man rợ, tình trạng tàn bạo chưa văn minh", "Extreme cruelty or uncivilized behavior.", "descend into barbarism"),
  baroque: e("baroque", "/bəˈrɒk/", "adjective", "phong cách Ba-rốc cầu kỳ, hoa mỹ lộng lẫy", "Highly ornate and extravagant in European architecture or music.", "baroque architecture"),
  belatedly: e("belatedly", "/bɪˈleɪ.tɪd.li/", "adverb", "một cách muộn màng, chậm trễ", "Later than should have been the case.", "respond belatedly"),
  beneficial: e("beneficial", "/ˌben.ɪˈfɪʃ.əl/", "adjective", "có lợi, mang lại ích lợi", "Favorable or advantageous; resulting in good.", "mutually beneficial"),
  bilateral: e("bilateral", "/ˌbaɪˈlæt.ər.əl/", "adjective", "song phương (giữa hai bên hoặc hai quốc gia)", "Having or relating to two sides; affecting both sides.", "bilateral trade agreement"),
  "carbon-intensive": e("carbon-intensive", "/ˌkɑː.bən.ɪnˈten.sɪv/", "adjective", "thải nhiều khí carbon, gây ô nhiễm cao", "Producing large amounts of carbon dioxide emissions.", "carbon-intensive industries"),
  carelessness: e("carelessness", "/ˈkeə.ləs.nəs/", "noun", "sự cẩu thả, bất cẩn", "Failure to give sufficient attention to avoiding harm or errors.", "sheer carelessness"),
  chaotic: e("chaotic", "/keɪˈɒt.ɪk/", "adjective", "hỗn loạn, lộn xộn mất trật tự", "In a state of complete confusion and disorder.", "chaotic traffic"),
  chatter: e("chatter", "/ˈtʃæt.ər/", "noun / verb", "chuyện phiếm rôm rả; tiếng nói huyên thuyên", "Informal, rapid talk about trivial matters.", "idle chatter"),
  climatic: e("climatic", "/klaɪˈmæt.ɪk/", "adjective", "thuộc về khí hậu, thời tiết vùng miền", "Relating to climate.", "climatic conditions"),
  clumsiness: e("clumsiness", "/ˈklʌm.zi.nəs/", "noun", "sự vụng về, lóng ngóng", "Awkwardness in movement or handling things.", "physical clumsiness"),
  coagulation: e("coagulation", "/kəʊˌæɡ.jəˈleɪ.ʃən/", "noun", "sự đông máu, sự đông tụ", "The action or process of a liquid, especially blood, changing to a solid state.", "blood coagulation"),
  collaborator: e("collaborator", "/kəˈlæb.ə.reɪ.tər/", "noun", "cộng tác viên, người hợp tác cùng thực hiện", "A person who works jointly on an activity or project.", "research collaborator"),
  collateral: e("collateral", "/kəˈlæt.ər.əl/", "noun / adj.", "tài sản thế chấp; thiệt hại phụ phát sinh", "Something pledged as security for repayment of a loan; secondary.", "collateral damage"),
  collide: e("collide", "/kəˈlaɪd/", "verb", "va chạm, đụng độ mạnh", "To hit with force when moving.", "vehicles collide"),
  colony: e("colony", "/ˈkɒl.ə.ni/", "noun", "thuộc địa; hoặc đàn (kiến, ong)", "A country or area under the political control of another country.", "space colony"),
  commence: e("commence", "/kəˈmens/", "verb", "bắt đầu, khởi sự (trang trọng)", "To begin; start.", "commence studies"),
  commodities: e("commodities", "/kəˈmɒd.ə.tiz/", "noun (plural)", "hàng hóa thiết yếu, nguyên liệu thô", "Raw materials or primary agricultural products bought and sold.", "essential commodities"),
  commotion: e("commotion", "/kəˈməʊ.ʃən/", "noun", "sự náo loạn, ồn ào xôn xao", "A state of confused and noisy disturbance.", "cause a commotion"),
  complaint: e("complaint", "/kəmˈpleɪnt/", "noun", "lời phàn nàn, đơn khiếu nại", "A statement that something is unsatisfactory or unacceptable.", "file a formal complaint"),
  concealment: e("concealment", "/kənˈsiːl.mənt/", "noun", "sự che giấu, giấu giếm thông tin", "The action of hiding something or preventing it from being known.", "deliberate concealment"),
  conclude: e("conclude", "/kənˈkluːd/", "verb", "kết luận; kết thúc", "To bring something to an end; arrive at a judgment.", "conclude a contract"),
  condensation: e("condensation", "/ˌkɒn.denˈseɪ.ʃən/", "noun", "sự ngưng tụ hơi nước", "The conversion of a vapor or gas to a liquid.", "window condensation"),
  conduit: e("conduit", "/ˈkɒn.djʊɪt/", "noun", "ống dẫn; kênh trung gian truyền tải", "A channel for conveying water or information.", "conduit for trade"),
  confession: e("confession", "/kənˈfeʃ.ən/", "noun", "lời thú tội, sự thừa nhận", "A formal statement admitting that one is guilty of a crime.", "sign a confession"),
  confinement: e("confinement", "/kənˈfaɪn.mənt/", "noun", "sự giam giữ, hạn chế trong không gian hẹp", "The action of confining or state of being imprisoned.", "solitary confinement"),
  confiscate: e("confiscate", "/ˈkɒn.fɪ.skeɪt/", "verb", "tịch thu (vật cấm, tài sản)", "To take or seize someone's property with authority.", "confiscate illegal goods"),
  conjecture: e("conjecture", "/kənˈdʒek.tʃər/", "noun / verb", "sự phỏng đoán thiếu căn cứ", "An opinion or conclusion formed on the basis of incomplete information.", "mere conjecture"),
  conspiracy: e("conspiracy", "/kənˈspɪr.ə.si/", "noun", "âm mưu bí mật, thuyết âm mưu", "A secret plan by a group to do something unlawful or harmful.", "conspiracy theory"),
  containment: e("containment", "/kənˈteɪn.mənt/", "noun", "sự kiềm chế, khoanh vùng ngăn chặn lây lan", "The action of keeping something harmful under control or within limits.", "containment policy"),
  contaminate: e("contaminate", "/kənˈtæm.ɪ.neɪt/", "verb", "làm ô nhiễm, làm nhiễm độc", "To make something impure by exposure to or addition of a poisonous substance.", "contaminate groundwater"),
  contamination: e("contamination", "/kənˌtæm.ɪˈneɪ.ʃən/", "noun", "sự ô nhiễm, sự nhiễm bẩn", "The action or state of making or being made impure by polluting.", "soil contamination"),
  contraptions: e("contraptions", "/kənˈtræp.ʃənz/", "noun (plural)", "máy móc/thiết bị tự chế kỳ lạ", "Machines or devices that appear strange or unnecessarily complicated.", "weird contraptions"),
  cooked: e("cooked", "/kʊkt/", "adjective", "đã nấu chín; (nghĩa bóng) bị làm giả số liệu", "Prepared by heating food.", "home-cooked meals"),
  creche: e("creche", "/kreʃ/", "noun", "nhà trẻ giữ trẻ nhỏ", "A nursery where babies and young children are cared for during the working day.", "workplace creche"),
  crystallization: e("crystallization", "/ˌkrɪs.təl.aɪˈzeɪ.ʃən/", "noun", "sự kết tinh", "The process of forming crystals; becoming clear and definite.", "crystallization of ideas"),
  culinary: e("culinary", "/ˈkʌl.ɪ.nər.i/", "adjective", "thuộc về ẩm thực, nấu nướng", "Of or for cooking.", "culinary heritage"),
  debating: e("debating", "/dɪˈbeɪ.tɪŋ/", "noun / adj.", "việc tranh biện, tranh luận học thuật", "Formal discussion on a particular matter in a public meeting.", "debating society"),
  debt: e("debt", "/det/", "noun", "khoản nợ nần tài chính", "Something, typically money, that is owed or due.", "national debt, student debt"),
  decentralisation: e("decentralisation", "/ˌdiː.sen.trə.laɪˈzeɪ.ʃən/", "noun", "sự phân quyền, phi tập trung hóa khỏi lõi đô thị", "The transfer of authority or populations from central government/core to local regions.", "urban decentralisation"),
  defense: e("defense", "/dɪˈfens/", "noun", "sự phòng thủ, biện hộ trước tòa", "The action of defending from or resisting attack; legal defense.", "self-defense"),
  democracy: e("democracy", "/dɪˈmɒk.rə.si/", "noun", "nền dân chủ", "A system of government by the whole population through elected representatives.", "parliamentary democracy"),
  densification: e("densification", "/ˌden.sɪ.fɪˈkeɪ.ʃən/", "noun", "sự làm tăng mật độ dân số/xây dựng đô thị", "The process of increasing population or building density in an area.", "urban densification"),
  depletable: e("depletable", "/dɪˈpliː.tə.bəl/", "adjective", "có thể bị cạn kiệt (tài nguyên hữu hạn)", "Capable of being used up or exhausted.", "depletable fossil fuels"),
  depot: e("depot", "/ˈdep.əʊ/", "noun", "kho hàng, bến bãi tập kết", "A place for the storage of large quantities of equipment or goods.", "bus depot, supply depot"),
  dialect: e("dialect", "/ˈdaɪ.ə.lekt/", "noun", "phương ngữ, tiếng địa phương", "A particular form of a language peculiar to a specific region.", "regional dialect"),
  dilution: e("dilution", "/daɪˈluː.ʃən/", "noun", "sự pha loãng, làm suy giảm nồng độ/giá trị", "The action of making something weaker in force, content, or value.", "brand dilution"),
  "distance learning": e("distance learning", "/ˈdɪs.təns ˈlɜː.nɪŋ/", "noun phrase", "học từ xa (qua mạng hoặc bưu điện)", "A method of studying in which lectures are broadcast or conducted online.", "enroll in distance learning"),
  distraction: e("distraction", "/dɪˈstræk.ʃən/", "noun", "sự xao nhãng, phân tâm", "A thing that prevents someone from giving full attention to something else.", "digital distractions"),
  dividends: e("dividends", "/ˈdɪv.ɪ.dendz/", "noun (plural)", "cổ tức, tiền chia lợi nhuận cổ đông", "Sums of money paid regularly by a company to its shareholders out of profits.", "quarterly dividends"),
  domestication: e("domestication", "/dəˌmes.tɪˈkeɪ.ʃən/", "noun", "sự thuần hóa động vật/cây trồng", "The process of taming an animal and keeping it as a pet or on a farm.", "domestication of crops"),
  dormant: e("dormant", "/ˈdɔː.mənt/", "adjective", "ngủ yên, tạm ngưng hoạt động, tiềm ẩn", "Having normal physical functions suspended or slowed down for a period.", "dormant volcano"),
  duplicity: e("duplicity", "/dʒuːˈplɪs.ə.ti/", "noun", "sự hai mặt, gian dối lừa lọc", "Deceitfulness; double-dealing.", "political duplicity"),
  dynamo: e("dynamo", "/ˈdaɪ.nə.məʊ/", "noun", "máy phát điện một chiều; người tràn đầy năng lượng", "A machine for converting mechanical energy into electrical energy.", "human dynamo"),
  ecstasy: e("ecstasy", "/ˈek.stə.si/", "noun", "cơn ngất ngây, niềm hân hoan tột độ", "An overwhelming feeling of great happiness or joyful excitement.", "pure ecstasy"),
  elementary: e("elementary", "/ˌel.ɪˈmen.tər.i/", "adjective", "sơ đẳng, bậc tiểu học", "Relating to the most rudimentary aspects of a subject; primary school.", "elementary education"),
  embargo: e("embargo", "/ɪmˈbɑː.ɡəʊ/", "noun", "lệnh cấm vận thương mại", "An official ban on trade or other commercial activity with a particular country.", "trade embargo"),
  enclaves: e("enclaves", "/ˈeŋ.kleɪvz/", "noun (plural)", "khu biệt lập, vùng đất/cộng đồng khép kín", "Places or groups that are different in character from those surrounding them.", "affluent enclaves"),
  enhancement: e("enhancement", "/ɪnˈhɑːns.mənt/", "noun", "sự nâng cao, cải thiện chất lượng", "An increase or improvement in quality, value, or extent.", "cognitive enhancement"),
  enlightenment: e("enlightenment", "/ɪnˈlaɪ.tən.mənt/", "noun", "sự khai sáng, mở mang trí tuệ", "The state of being enlightened; the 18th-century European intellectual movement.", "Age of Enlightenment"),
  equality: e("equality", "/iˈkwɒl.ə.ti/", "noun", "sự bình đẳng", "The state of being equal, especially in status, rights, and opportunities.", "gender equality"),
  eradication: e("eradication", "/ɪˌræd.ɪˈkeɪ.ʃən/", "noun", "sự xóa sổ hoàn toàn, diệt trừ tận gốc", "The complete destruction of something.", "poverty eradication"),
  evacuate: e("evacuate", "/ɪˈvæk.ju.eɪt/", "verb", "sơ tán khẩn cấp", "To remove someone from a place of danger to a safer place.", "evacuate residents"),
  evaporation: e("evaporation", "/ɪˌvæp.əˈreɪ.ʃən/", "noun", "sự bay hơi", "The process of turning from liquid into vapor.", "water evaporation"),
  exaltation: e("exaltation", "/ˌeɡ.zɔːlˈteɪ.ʃən/", "noun", "sự tán dương tột bậc, niềm hưng phấn cao độ", "A feeling or state of extreme happiness or elevated praise.", "sense of exaltation"),
  exhilaration: e("exhilaration", "/ɪɡˌzɪl.əˈreɪ.ʃən/", "noun", "cảm giác phấn khích, sảng khoái tột độ", "A feeling of excitement, happiness, or elation.", "thrill and exhilaration"),
  expeditions: e("expeditions", "/ˌek.spəˈdɪʃ.ənz/", "noun (plural)", "những chuyến thám hiểm, viễn chinh", "Journeys undertaken by a group of people with a particular purpose.", "scientific expeditions"),
  fabricate: e("fabricate", "/ˈfæb.rɪ.keɪt/", "verb", "bịa đặt (tin giả); hoặc chế tạo lắp ghép", "To invent or concoct something, typically with deceitful intent; to manufacture.", "fabricate evidence"),
  fabrication: e("fabrication", "/ˌfæb.rɪˈkeɪ.ʃən/", "noun", "sự bịa đặt; sự chế tạo kết cấu", "The action or process of manufacturing or inventing false information.", "complete fabrication"),
  factory: e("factory", "/ˈfæk.tər.i/", "noun", "nhà máy, xí nghiệp sản xuất", "A building or group of buildings where goods are manufactured.", "manufacturing factory"),
  fictional: e("fictional", "/ˈfɪk.ʃən.əl/", "adjective", "hư cấu, không có thật (trong tiểu thuyết)", "Relating to or occurring in fiction; invented.", "fictional character"),
  fictitious: e("fictitious", "/fɪkˈtɪʃ.əs/", "adjective", "giả tạo, bịa đặt, không có thật", "Not real or true, being imaginary or having been fabricated.", "fictitious name"),
  foraging: e("foraging", "/ˈfɒr.ɪ.dʒɪŋ/", "noun", "việc kiếm ăn tự nhiên, hái lượm săn bắt", "The search for wild food resources.", "foraging behavior"),
  fortitude: e("fortitude", "/ˈfɔː.tɪ.tʃuːd/", "noun", "sự kiên cường, nghị lực chịu đựng nghịch cảnh", "Courage in pain or adversity.", "moral fortitude"),
  "fossil-dependent": e("fossil-dependent", "/ˈfɒs.əl dɪˈpen.dənt/", "adjective", "phụ thuộc vào nhiên liệu hóa thạch (than, dầu)", "Relying heavily on coal, oil, or natural gas for energy.", "fossil-dependent economy"),
  fragility: e("fragility", "/frəˈdʒɪl.ə.ti/", "noun", "sự mong manh, dễ vỡ, dễ tổn thương", "The quality of being easily broken or damaged.", "ecological fragility"),
  frail: e("frail", "/freɪl/", "adjective", "yếu ớt, mong manh (thường chỉ người cao tuổi)", "Weak and delicate.", "frail elderly patients"),
  freelancers: e("freelancers", "/ˈfriː.lɑːn.sərz/", "noun (plural)", "người làm việc tự do (không biên chế cố định)", "Self-employed people hired to work for different companies on particular assignments.", "digital freelancers"),
  fuel: e("fuel", "/ˈfjuː.əl/", "noun / verb", "nhiên liệu; châm ngòi thúc đẩy", "Material burned to produce heat or power; to stimulate.", "fossil fuel, fuel inflation"),
  furnace: e("furnace", "/ˈfɜː.nɪs/", "noun", "lò nung công nghiệp, lò sưởi cỡ lớn", "An enclosed structure in which material can be heated to very high temperatures.", "blast furnace"),
  geological: e("geological", "/ˌdʒiː.əˈlɒdʒ.ɪ.kəl/", "adjective", "thuộc về địa chất học", "Relating to the study of the earth's physical structure and rocks.", "geological strata"),
  geology: e("geology", "/dʒiˈɒl.ə.dʒi/", "noun", "ngành địa chất học", "The science that deals with the earth's physical structure and history.", "study geology"),
  gossip: e("gossip", "/ˈɡɒs.ɪp/", "noun / verb", "chuyện ngồi lê đôi mách, tin đồn đời tư", "Casual or unconstrained conversation or reports about other people.", "celebrity gossip"),
  guesswork: e("guesswork", "/ˈɡes.wɜːk/", "noun", "sự phỏng đoán mò mẫm thiếu dữ liệu", "The process of making a guess or estimates without exact information.", "eliminate guesswork"),
  hamlet: e("hamlet", "/ˈhæm.lət/", "noun", "xóm nhỏ, ngôi làng rất nhỏ không có nhà thờ", "A small settlement, generally smaller than a village.", "remote hamlet"),
  handicap: e("handicap", "/ˈhæn.di.kæp/", "noun", "trở ngại, bất lợi; sự khuyết tật", "A circumstance that makes progress or success difficult.", "competitive handicap"),
  haphazard: e("haphazard", "/hæpˈhæz.əd/", "adjective", "bừa bãi, ngẫu hứng thiếu tổ chức", "Lacking any obvious principle of organization.", "haphazard urban planning"),
  hesitation: e("hesitation", "/ˌhez.ɪˈteɪ.ʃən/", "noun", "sự do dự, ngập ngừng", "The action of pausing before saying or doing something.", "without hesitation"),
  hospitality: e("hospitality", "/ˌhɒs.pɪˈtæl.ə.ti/", "noun", "lòng hiếu khách; ngành dịch vụ khách sạn nhà hàng", "The friendly and generous reception of guests; hotel/catering industry.", "hospitality sector"),
  hostility: e("hostility", "/hɒsˈtɪl.ə.ti/", "noun", "thái độ thù địch, chống đối", "Hostile behavior; unfriendliness or opposition.", "open hostility"),
  hovel: e("hovel", "/ˈhɒv.əl/", "noun", "túp lều tồi tàn, căn nhà xập xệ", "A small, squalid, unpleasant, or simply constructed dwelling.", "cramped hovel"),
  humidity: e("humidity", "/hjuːˈmɪd.ə.ti/", "noun", "độ ẩm trong không khí", "The state or quality of being humid.", "high humidity"),
  hyperactivity: e("hyperactivity", "/ˌhaɪ.pə.rækˈtɪv.ə.ti/", "noun", "chứng tăng động, hiếu động thái quá", "The state of being unusually or abnormally active.", "childhood hyperactivity"),
  illiteracy: e("illiteracy", "/ɪˈlɪt.ər.ə.si/", "noun", "nạn mù chữ, sự thất học", "The inability to read or write.", "combat illiteracy"),
  illusions: e("illusions", "/ɪˈluː.ʒənz/", "noun (plural)", "ảo tưởng, ảo giác sai lầm", "Deceptive appearances or false beliefs.", "shatter illusions"),
  imbalance: e("imbalance", "/ɪmˈbæl.əns/", "noun", "sự mất cân bằng", "Lack of proportion or relation between corresponding things.", "work-life imbalance"),
  impairment: e("impairment", "/ɪmˈpeə.mənt/", "noun", "sự suy giảm chức năng, khiếm khuyết", "The state or fact of being impaired or weakened.", "cognitive impairment"),
  inarticulateness: e("inarticulateness", "/ˌɪn.ɑːˈtɪk.jə.lət.nəs/", "noun", "sự ấp úng, kém khả năng diễn đạt trôi chảy", "Inability to express ideas or feelings clearly.", "nervous inarticulateness"),
  infantilism: e("infantilism", "/ˈɪn.fən.tɪ.lɪ.zəm/", "noun", "tính trẻ con thái quá, sự chậm phát triển tâm lý", "Childish behavior in an adult.", "behavioral infantilism"),
  inflation: e("inflation", "/ɪnˈfleɪ.ʃən/", "noun", "lạm phát kinh tế", "A general increase in prices and fall in the purchasing value of money.", "curb inflation"),
  insular: e("insular", "/ˈɪn.sjʊ.lər/", "adjective", "bảo thủ, khép kín, hẹp hòi (hoặc thuộc về đảo)", "Ignorant of or uninterested in cultures or ideas outside one's own experience.", "insular mindset"),
  intensification: e("intensification", "/ɪnˌten.sɪ.fɪˈkeɪ.ʃən/", "noun", "sự tăng cường độ, gia tăng mức độ gay gắt", "The action of making or becoming more intense.", "agricultural intensification"),
  lethargy: e("lethargy", "/ˈleθ.ə.dʒi/", "noun", "sự uể oải, lờ đờ thiếu sức sống", "A lack of energy and enthusiasm.", "combat lethargy"),
  liberation: e("liberation", "/ˌlɪb.əˈreɪ.ʃən/", "noun", "sự giải phóng, tự do khỏi ràng buộc", "The action of setting someone free from imprisonment or oppression.", "social liberation"),
  liberty: e("liberty", "/ˈlɪb.ə.ti/", "noun", "quyền tự do cá nhân", "The state of being free within society from oppressive restrictions.", "civil liberty"),
  localization: e("localization", "/ˌləʊ.kəl.aɪˈzeɪ.ʃən/", "noun", "sự bản địa hóa, địa phương hóa", "The process of adapting a product or content to a specific locality.", "cultural localization"),
  luxurious: e("luxurious", "/lʌɡˈʒʊə.ri.əs/", "adjective", "xa hoa, sang trọng lộng lẫy", "Extremely comfortable, elegant, or enjoyable, especially at great expense.", "luxurious lifestyle"),
  magnetism: e("magnetism", "/ˈmæɡ.nə.tɪ.zəm/", "noun", "từ tính; sức hút cá nhân mãnh liệt", "A physical phenomenon produced by electric charge; compelling charm.", "earth's magnetism"),
  manufacture: e("manufacture", "/ˌmæn.jəˈfæk.tʃər/", "verb / noun", "sản xuất công nghiệp hàng loạt; bịa đặt", "To make something on a large scale using machinery.", "manufacture electronics"),
  matriculate: e("matriculate", "/məˈtrɪk.jə.leɪt/", "verb", "nhập học đại học, trúng tuyển", "To be enrolled at a college or university.", "matriculate at Oxford"),
  mediation: e("mediation", "/ˌmiː.diˈeɪ.ʃən/", "noun", "sự hòa giải, trung gian giải quyết tranh chấp", "Intervention in a dispute in order to resolve it.", "family mediation"),
  metallurgy: e("metallurgy", "/məˈtæl.ə.dʒi/", "noun", "ngành luyện kim", "The branch of science and technology concerned with the properties of metals.", "ancient metallurgy"),
  meteorite: e("meteorite", "/ˈmiː.ti.ə.raɪt/", "noun", "thiên thạch rơi xuống mặt đất", "A solid piece of debris from outer space that survives passage through the atmosphere.", "meteorite impact"),
  monarch: e("monarch", "/ˈmɒn.ək/", "noun", "quân vương, vị vua/nữ hoàng trị vì", "A sovereign head of state, especially a king, queen, or emperor.", "constitutional monarch"),
  monetary: e("monetary", "/ˈmʌn.ɪ.tər.i/", "adjective", "thuộc về tiền tệ, tài chính", "Relating to money or currency.", "monetary policy"),
  monolingualism: e("monolingualism", "/ˌmɒn.əˈlɪŋ.ɡwə.lɪ.zəm/", "noun", "tình trạng đơn ngữ (chỉ biết nói một thứ tiếng)", "The condition of speaking or knowing only one language.", "decline of monolingualism"),
  monotony: e("monotony", "/məˈnɒt.ən.i/", "noun", "sự đơn điệu, tẻ nhạt lặp đi lặp lại", "Lack of variety and interest; tedious repetition.", "daily monotony"),
  muteness: e("muteness", "/ˈmjuːt.nəs/", "noun", "sự câm lặng, im bặt không nói", "The state of being silent or unable to speak.", "shocked muteness"),
  neglect: e("neglect", "/nɪˈɡlekt/", "noun / verb", "sự bỏ bê, lơ là thiếu chăm sóc", "Failure to care for properly.", "childhood neglect"),
  nomadism: e("nomadism", "/ˈnəʊ.mæd.ɪ.zəm/", "noun", "lối sống du mục nay đây mai đó", "The way of life of peoples who do not live continually in the same place.", "pastoral nomadism"),
  nourishment: e("nourishment", "/ˈnʌr.ɪʃ.mənt/", "noun", "chất dinh dưỡng, sự bồi bổ nuôi sống", "The food or other substances necessary for growth, health, and good condition.", "essential nourishment"),
  novelties: e("novelties", "/ˈnɒv.əl.tiz/", "noun (plural)", "những thứ mới lạ, đồ chơi lạ mắt", "New or unusual things or occurrences.", "technological novelties"),
  nuisance: e("nuisance", "/ˈnjuː.səns/", "noun", "mối phiền toái, sự quấy rầy", "A person, thing, or circumstance causing inconvenience or annoyance.", "public nuisance"),
  nursery: e("nursery", "/ˈnɜː.sər.i/", "noun", "nhà trẻ mẫu giáo; vườn ươm cây", "A place where young children are cared for; a plant-growing place.", "nursery school"),
  obedience: e("obedience", "/əˈbiː.di.əns/", "noun", "sự vâng lời, phục tùng kỷ luật", "Compliance with an order, request, or law or submission to another's authority.", "blind obedience"),
  obligation: e("obligation", "/ˌɒb.lɪˈɡeɪ.ʃən/", "noun", "nghĩa vụ bắt buộc, bổn phận", "An act or course of action to which a person is morally or legally bound.", "moral obligation"),
  obsession: e("obsession", "/əbˈseʃ.ən/", "noun", "nỗi ám ảnh, sự mê mẩn thái quá", "An idea or thought that continually preoccupies or intrudes on a person's mind.", "unhealthy obsession"),
  oratory: e("oratory", "/ˈɒr.ə.tər.i/", "noun", "thuật hùng biện trước công chúng", "The art or practice of formal speaking in public.", "classical oratory"),
  ornamental: e("ornamental", "/ˌɔː.nəˈmen.təl/", "adjective", "dùng để trang trí, làm cảnh", "Serving or intended as an ornament; decorative.", "ornamental facade"),
  osmosis: e("osmosis", "/ɒzˈməʊ.sɪs/", "noun", "sự thẩm thấu (sinh học hoặc tiếp thu tự nhiên)", "Movement of solvent across a membrane; gradual unconscious assimilation of ideas.", "learn by osmosis"),
  parasite: e("parasite", "/ˈpær.ə.saɪt/", "noun", "ký sinh trùng; kẻ ăn bám", "An organism that lives in or on another organism at the host's expense.", "agricultural parasite"),
  "pass out": e("pass out", "/pɑːs aʊt/", "phrasal verb", "ngất xỉu; hoặc tốt nghiệp học viện quân sự", "To lose consciousness; to graduate from a military college.", "pass out from exhaustion"),
  petrochemical: e("petrochemical", "/ˌpet.rəʊˈkem.ɪ.kəl/", "noun / adj.", "hóa dầu (sản phẩm từ dầu mỏ và khí đốt)", "Relating to chemicals obtained from petroleum and natural gas.", "petrochemical industry"),
  pilgrimage: e("pilgrimage", "/ˈpɪl.ɡrɪ.mɪdʒ/", "noun", "chuyến hành hương tâm linh", "A journey to a sacred place for religious reasons.", "annual pilgrimage"),
  pipeline: e("pipeline", "/ˈpaɪp.laɪn/", "noun", "đường ống dẫn dầu/khí; quy trình đang triển khai", "A long pipe used for conveying oil, gas, or water over long distances.", "energy pipeline"),
  plastics: e("plastics", "/ˈplæs.tɪks/", "noun (plural)", "nhựa, chất dẻo tổng hợp", "Synthetic materials made from a wide range of organic polymers.", "single-use plastics"),
  plea: e("plea", "/pliː/", "noun", "lời khẩn cầu; lời biện hộ nhận/chối tội trước tòa", "A request made in an urgent and emotional manner; a formal statement by an accused person.", "guilty plea"),
  pollutant: e("pollutant", "/pəˈluː.tənt/", "noun", "chất gây ô nhiễm môi trường", "A substance that pollutes something, especially water or the atmosphere.", "airborne pollutants"),
  polluting: e("polluting", "/pəˈluː.tɪŋ/", "adjective", "gây ô nhiễm môi trường", "Causing contamination of the environment.", "heavy polluting industries"),
  portable: e("portable", "/ˈpɔː.tə.bəl/", "adjective", "nhỏ gọn có thể mang theo di động", "Able to be easily carried or moved.", "portable devices"),
  precarious: e("precarious", "/prɪˈkeə.ri.əs/", "adjective", "bấp bênh, chông chênh, thiếu an toàn", "Not securely held or in position; dependent on chance; uncertain.", "precarious employment"),
  predecessor: e("predecessor", "/ˈpriː.dɪ.ses.ər/", "noun", "người tiền nhiệm, vật thể thế hệ trước", "A person who held a job or office before the current holder; an earlier version.", "ancient predecessors"),
  premonition: e("premonition", "/ˌprem.əˈnɪʃ.ən/", "noun", "điềm báo trước, linh cảm chẳng lành", "A strong feeling that something is about to happen, especially something unpleasant.", "uncanny premonition"),
  preschool: e("preschool", "/ˈpriː.skuːl/", "noun / adj.", "bậc học mầm non, trước tuổi tiểu học", "Relating to the time before a child is old enough to go to school.", "preschool children"),
  privatize: e("privatize", "/ˈpraɪ.və.taɪz/", "verb", "tư nhân hóa (chuyển từ nhà nước sang tư nhân)", "To transfer a business or industry from public to private ownership.", "privatize public utilities"),
  privilege: e("privilege", "/ˈprɪv.ɪ.lɪdʒ/", "noun", "đặc quyền, vinh dự đặc biệt", "A special right, advantage, or immunity granted only to a particular person or group.", "social privilege"),
  procrastination: e("procrastination", "/prəˌkræs.tɪˈneɪ.ʃən/", "noun", "thói quen trì hoãn, chần chừ", "The action of delaying or postponing something.", "overcome procrastination"),
  prolonged: e("prolonged", "/prəˈlɒŋd/", "adjective", "kéo dài đằng đẵng, lâu hơn bình thường", "Continuing for a long time or longer than usual.", "prolonged exposure, prolonged sitting"),
  propagation: e("propagation", "/ˌprɒp.əˈɡeɪ.ʃən/", "noun", "sự nhân giống cây trồng; sự lan truyền thông tin", "The breeding of specimens of a plant or animal; spreading ideas.", "seed propagation"),
  prosaic: e("prosaic", "/prəˈzeɪ.ɪk/", "adjective", "tầm thường, khô khan thiếu chất thơ/sáng tạo", "Having the style or diction of prose; lacking poetic beauty; commonplace.", "prosaic routine"),
  province: e("province", "/ˈprɒv.ɪns/", "noun", "tỉnh thành, vùng lãnh thổ ngoài thủ đô", "A principal administrative division of certain countries.", "rural provinces"),
  provincialism: e("provincialism", "/prəˈvɪn.ʃəl.ɪ.zəm/", "noun", "tư tưởng cục bộ địa phương, tầm nhìn hạn hẹp", "The way of life or narrow-minded outlook characteristic of the provinces.", "cultural provincialism"),
  punishment: e("punishment", "/ˈpʌn.ɪʃ.mənt/", "noun", "hình phạt, sự trừng phạt", "The infliction or imposition of a penalty as retribution for an offense.", "capital punishment"),
  quarantine: e("quarantine", "/ˈkwɒr.ən.tiːn/", "noun / verb", "sự cách ly y tế kiểm dịch", "A state, period, or place of isolation to prevent the spread of disease.", "strict quarantine"),
  recession: e("recession", "/rɪˈseʃ.ən/", "noun", "cuộc suy thoái kinh tế", "A period of temporary economic decline during which trade and industrial activity are reduced.", "economic recession"),
  refined: e("refined", "/rɪˈfaɪnd/", "adjective", "đã tinh chế (dầu/đường); tao nhã tinh tế", "With impurities or unwanted elements having been removed by processing.", "refined petroleum, refined sugars"),
  regression: e("regression", "/rɪˈɡreʃ.ən/", "noun", "sự thụt lùi, thoái lui về trạng thái cũ", "A return to a former or less developed state.", "economic regression"),
  regressive: e("regressive", "/rɪˈɡres.ɪv/", "adjective", "thoái bộ, thụt lùi, đi ngược tiến bộ", "Returning to a former or less developed state; becoming less advanced.", "regressive policy"),
  rejection: e("rejection", "/rɪˈdʒek.ʃən/", "noun", "sự từ chối, bác bỏ", "The dismissing or refusing of a proposal or idea.", "fear of rejection"),
  relic: e("relic", "/ˈrel.ɪk/", "noun", "di tích cổ, cổ vật còn sót lại", "An object surviving from an earlier time, especially one of historical interest.", "archaeological relic"),
  reluctantly: e("reluctantly", "/rɪˈlʌk.tənt.li/", "adverb", "một cách miễn cưỡng, do dự", "In an unwilling and hesitant way.", "agree reluctantly"),
  remedial: e("remedial", "/rɪˈmiː.di.əl/", "adjective", "nhằm khắc phục, phụ đạo (học sinh yếu) hoặc chữa trị", "Giving or intended as a remedy or cure; helping slower students.", "remedial classes"),
  remission: e("remission", "/rɪˈmɪʃ.ən/", "noun", "sự giảm án tù; sự thuyên giảm bệnh tật", "A reduction in the length of a prison sentence; temporary recovery from illness.", "sentence remission"),
  respiratory: e("respiratory", "/rɪˈspɪr.ə.tər.i/", "adjective", "thuộc về hệ hô hấp", "Relating to or affecting respiration or the organs of respiration.", "respiratory illnesses"),
  retaliation: e("retaliation", "/rɪˌtæl.iˈeɪ.ʃən/", "noun", "sự trả đũa, đáp trả lại", "The action of returning a military attack or harming someone in return.", "fear of retaliation"),
  retraction: e("retraction", "/rɪˈtræk.ʃən/", "noun", "sự rút lại lời nói/bài báo sai sự thật", "A withdrawal of a statement, accusation, or undertaking.", "publish a retraction"),
  retrofit: e("retrofit", "/ˈret.rəʊ.fɪt/", "verb / noun", "cải tạo nâng cấp thiết bị cũ bằng công nghệ mới", "To add a component or accessory to something that did not have it when manufactured.", "retrofit older buildings"),
  routine: e("routine", "/ruːˈtiːn/", "noun / adj.", "thói quen hàng ngày; công việc lặp lại thường nhật", "A sequence of actions regularly followed.", "daily routine"),
  rudimentary: e("rudimentary", "/ˌruː.dɪˈmen.tər.i/", "adjective", "sơ khai, thô sơ, căn bản bước đầu", "Involving or limited to basic principles; undeveloped.", "rudimentary tools"),
  ruin: e("ruin", "/ˈruː.ɪn/", "noun / verb", "tàn tích đổ nát; phá hủy hoàn toàn", "The physical destruction or disintegration of something; remains of a building.", "ancient ruins"),
  ruralisation: e("ruralisation", "/ˌrʊə.rəl.aɪˈzeɪ.ʃən/", "noun", "quá trình nông thôn hóa (người dân rời phố về quê)", "The process of becoming rural or encouraging people to move back to countryside areas.", "reverse urbanisation or ruralisation"),
  satisfaction: e("satisfaction", "/ˌsæt.ɪsˈfæk.ʃən/", "noun", "sự hài lòng, thỏa mãn", "Fulfillment of one's wishes, expectations, or needs.", "job satisfaction"),
  scripture: e("scripture", "/ˈskrɪp.tʃər/", "noun", "kinh thánh, văn bản tôn giáo thiêng liêng", "The sacred writings of a religion.", "ancient scripture"),
  seclusion: e("seclusion", "/sɪˈkluː.ʒən/", "noun", "sự ẩn dật, tách biệt hoàn toàn khỏi thế giới", "The state of being private and away from other people.", "live in seclusion"),
  sedation: e("sedation", "/sɪˈdeɪ.ʃən/", "noun", "sự gây mê/an thần bằng thuốc", "The administering of a sedative drug to calm or put someone to sleep.", "under light sedation"),
  segmented: e("segmented", "/ˈseɡ.men.tɪd/", "adjective", "bị phân mảnh, chia tách từng phân khúc", "Divided into separate parts or sections.", "segmented market"),
  segregation: e("segregation", "/ˌseɡ.rɪˈɡeɪ.ʃən/", "noun", "sự phân biệt, tách biệt sắc tộc hoặc nhóm người", "The action or state of setting someone or something apart from others.", "residential segregation"),
  senescence: e("senescence", "/sɪˈnes.əns/", "noun", "sự lão hóa, quá trình già đi tự nhiên", "The condition or process of deterioration with age.", "cellular senescence"),
  shack: e("shack", "/ʃæk/", "noun", "căn chòi tạm bợ, nhà lụp xụp", "A roughly built hut or cabin.", "wooden shack"),
  shutdown: e("shutdown", "/ˈʃʌt.daʊn/", "noun", "sự đóng cửa, ngừng hoạt động hoàn toàn", "A closure of a factory or system, typically temporarily.", "grid shutdown"),
  similarity: e("similarity", "/ˌsɪm.ɪˈlær.ə.ti/", "noun", "sự giống nhau, điểm tương đồng", "The state or fact of being similar.", "striking similarity"),
  skyscraper: e("skyscraper", "/ˈskaɪˌskreɪ.pər/", "noun", "tòa nhà chọc trời", "A very tall building of many stories.", "glass skyscrapers"),
  smartphone: e("smartphone", "/ˈsmɑːt.fəʊn/", "noun", "điện thoại thông minh", "A mobile phone that performs many functions of a computer.", "smartphone addiction"),
  smother: e("smother", "/ˈsmʌð.ər/", "verb", "bóp nghẹt, dập tắt, ém nhẹm (tin tức/cảm xúc)", "To stifle or suppress completely.", "smother dissent"),
  solidarity: e("solidarity", "/ˌsɒl.ɪˈdær.ə.ti/", "noun", "tình đoàn kết, sự đồng lòng gắn bó", "Unity or agreement of feeling or action among individuals with a common interest.", "social solidarity"),
  solitude: e("solitude", "/ˈsɒl.ɪ.tjuːd/", "noun", "sự tĩnh lặng một mình, cảnh cô độc", "The state or situation of being alone.", "peaceful solitude"),
  souvenir: e("souvenir", "/ˌsuː.vəˈnɪər/", "noun", "quà lưu niệm (khi đi du lịch)", "A thing that is kept as a reminder of a person, place, or event.", "tourist souvenirs"),
  spectator: e("spectator", "/spekˈteɪ.tər/", "noun", "khán giả theo dõi trực tiếp (thể thao/sự kiện)", "A person who watches at a show, game, or other event.", "stadium spectators"),
  speculation: e("speculation", "/ˌspek.jəˈleɪ.ʃən/", "noun", "sự đầu cơ tài chính; sự suy đoán", "Investment in stocks or property in hope of gain despite risk of loss; forming theories without firm evidence.", "property speculation"),
  sporadically: e("sporadically", "/spəˈræd.ɪ.kəl.i/", "adverb", "một cách lác đác, thỉnh thoảng không đều đặn", "Occasionally or at irregular intervals.", "occur sporadically"),
  submissive: e("submissive", "/səbˈmɪs.ɪv/", "adjective", "phục tùng, ngoan ngoãn nghe theo", "Ready to conform to the authority or will of others.", "submissive attitude"),
  subsistence: e("subsistence", "/səbˈsɪs.təns/", "noun", "mức sống tối thiểu đủ ăn; nông nghiệp tự cung tự cấp", "The action or fact of maintaining or supporting oneself at a minimum level.", "subsistence farming"),
  suffocation: e("suffocation", "/ˌsʌf.əˈkeɪ.ʃən/", "noun", "sự ngạt thở, thiếu không khí", "Difficulty in breathing; dying from lack of air.", "risk of suffocation"),
  superficial: e("superficial", "/ˌsuː.pəˈfɪʃ.əl/", "adjective", "hời hợt, nông cạn, chỉ ở bề ngoài", "Existing or occurring at or on the surface; lacking depth.", "superficial knowledge"),
  superstition: e("superstition", "/ˌsuː.pəˈstɪʃ.ən/", "noun", "sự mê tín dị đoan", "Excessively credulous belief in and reverence for supernatural beings.", "ancient superstition"),
  suppress: e("suppress", "/səˈpres/", "verb", "đàn áp, kìm nén, bưng bít (thông tin)", "To forcibly put an end to; prevent dissemination of information.", "suppress press freedom"),
  tablet: e("tablet", "/ˈtæb.lət/", "noun", "máy tính bảng; viên thuốc; tấm bia khắc chữ", "A small portable flat computer; a flat slab of stone or clay.", "clay tablet"),
  telescope: e("telescope", "/ˈtel.ɪ.skəʊp/", "noun", "kính thiên văn", "An optical instrument designed to make distant objects appear nearer.", "space telescope"),
  terminate: e("terminate", "/ˈtɜː.mɪ.neɪt/", "verb", "chấm dứt, kết thúc hợp đồng/hoạt động", "To bring to an end.", "terminate employment"),
  tertiary: e("tertiary", "/ˈtɜː.ʃər.i/", "adjective", "bậc đại học và sau đại học (tertiary education)", "Relating to education at college or university level; third in order.", "tertiary education"),
  toxicity: e("toxicity", "/tɒkˈsɪs.ə.ti/", "noun", "độ độc hại, tính chất gây độc", "The quality of being toxic or poisonous.", "chemical toxicity"),
  toxin: e("toxin", "/ˈtɒk.sɪn/", "noun", "độc tố", "An antigenic poison or venom of plant, animal, or chemical origin.", "environmental toxins"),
  tragedy: e("tragedy", "/ˈtrædʒ.ə.di/", "noun", "bi kịch, thảm kịch đau thương", "An event causing great suffering, destruction, and distress.", "human tragedy"),
  transparency: e("transparency", "/trænˈspær.ən.si/", "noun", "sự minh bạch, rõ ràng công khai", "The quality of being done in an open way without secrets.", "financial transparency"),
  tribal: e("tribal", "/ˈtraɪ.bəl/", "adjective", "thuộc về bộ lạc, bộ tộc", "Relating to a tribe or tribes.", "tribal communities"),
  trivial: e("trivial", "/ˈtrɪv.i.əl/", "adjective", "tầm thường, vụn vặt, không đáng kể", "Of little value or importance.", "trivial details"),
  turbulence: e("turbulence", "/ˈtɜː.bjə.ləns/", "noun", "sự hỗn loạn, biến động dữ dội (không khí/kinh tế)", "Violent or unsteady movement of air, water, or markets.", "economic turbulence"),
  typewriter: e("typewriter", "/ˈtaɪpˌraɪ.tər/", "noun", "máy đánh chữ cơ học", "An electric or manual machine with keys for producing print-like characters.", "vintage typewriter"),
  ultimatum: e("ultimatum", "/ˌʌl.tɪˈmeɪ.təm/", "noun", "tối hậu thư", "A final demand or statement of terms, the rejection of which causes retaliation.", "issue an ultimatum"),
  understudy: e("understudy", "/ˈʌn.də.stʌd.i/", "noun", "diễn viên đóng thế dự phòng", "A person who learns another's role in order to act as a replacement if necessary.", "stage understudy"),
  unilateral: e("unilateral", "/ˌjuː.nɪˈlæt.ər.əl/", "adjective", "đơn phương (chỉ do một phía quyết định)", "Performed by or affecting only one person, group, or country.", "unilateral decision"),
  unrefined: e("unrefined", "/ˌʌn.rɪˈfaɪnd/", "adjective", "thô chưa tinh chế; thô kệch thiếu tinh tế", "Not processed to remove impurities; lacking polish.", "unrefined crude oil"),
  unsound: e("unsound", "/ʌnˈsaʊnd/", "adjective", "thiếu vững chắc, không đáng tin cậy, bất ổn", "Not safe, reliable, or based on sound reason.", "financially unsound"),
  upgrade: e("upgrade", "/ʌpˈɡreɪd/", "verb / noun", "nâng cấp, cải tiến lên phiên bản tốt hơn", "To raise something to a higher standard.", "upgrade infrastructure"),
  vacation: e("vacation", "/veɪˈkeɪ.ʃən/", "noun", "kỳ nghỉ phép, kỳ nghỉ lễ", "An extended period of leisure and recreation.", "take a vacation"),
  vandalism: e("vandalism", "/ˈvæn.dəl.ɪ.zəm/", "noun", "hành vi phá hoại tài sản công cộng", "Action involving deliberate destruction of or damage to public or private property.", "prevent vandalism"),
  vocational: e("vocational", "/vəʊˈkeɪ.ʃən.əl/", "adjective", "thuộc về đào tạo nghề nghiệp thực hành", "Relating to an occupation or employment training.", "vocational training"),
  volunteer: e("volunteer", "/ˌvɒl.ənˈtɪər/", "noun / verb", "tình nguyện viên; tự nguyện tham gia", "A person who freely offers to take part in an enterprise or undertake a task.", "community volunteers"),
  warehouse: e("warehouse", "/ˈweə.haʊs/", "noun", "nhà kho chứa hàng lớn", "A large building where raw materials or manufactured goods may be stored.", "automated warehouse"),
  wasteful: e("wasteful", "/ˈweɪst.fəl/", "adjective", "lãng phí, phung phí tài nguyên", "Using or expending something of value carelessly or extravagantly.", "wasteful consumption"),
  whisper: e("whisper", "/ˈwɪs.pər/", "verb / noun", "nói thì thầm; lời đồn thổi nhỏ", "To speak very softly using one's breath rather than one's throat.", "speak in a whisper"),

  // =========================================================================
  // 3. TỪ VỰNG PHỔ BIẾN XUYÊN SUỐT CÁC UNITS 2–20 (HỖ TRỢ B1 ĐỌC CÂU ĐỀ)
  // =========================================================================
  scientific: e("scientific", "/ˌsaɪ.ənˈtɪf.ɪk/", "adjective", "thuộc về khoa học", "Based on or characterized by the methods and principles of science.", "scientific research"),
  excessive: e("excessive", "/ekˈses.ɪv/", "adjective", "quá mức, thái quá", "More than is necessary, normal, or desirable.", "excessive screen time"),
  power: e("power", "/ˈpaʊər/", "noun / verb", "năng lượng, điện năng; quyền lực", "Energy produced by mechanical or electrical means; political authority.", "nuclear power, solar power"),
  rely: e("rely", "/rɪˈlaɪ/", "verb", "phụ thuộc, tin cậy dựa vào (on/upon)", "To depend on with full trust or support.", "rely heavily on"),
  hour: e("hour", "/aʊər/", "noun", "giờ đồng hồ", "A period of time equal to 60 minutes.", "working hours, rush hour"),
  minimize: e("minimize", "/ˈmɪn.ɪ.maɪz/", "verb", "giảm thiểu tối đa", "To reduce something, especially something undesirable, to the smallest possible amount.", "minimize emissions"),
  species: e("species", "/ˈspiː.ʃiːz/", "noun", "loài sinh vật (số ít và số nhiều giống nhau)", "A group of living organisms capable of exchanging genes.", "endangered species"),
  invention: e("invention", "/ɪnˈven.ʃən/", "noun", "phát minh, sáng chế mới", "The action of inventing something, typically a process or device.", "technological invention"),
  western: e("western", "/ˈwes.tən/", "adjective", "thuộc về phương Tây", "Situated in, directed towards, or facing the west.", "western societies"),
  mass: e("mass", "/mæs/", "adjective / noun", "đại trà, hàng loạt, số lượng lớn", "Involving or affecting large numbers of people or things.", "mass media, mass transit"),
  trigger: e("trigger", "/ˈtrɪɡ.ər/", "verb / noun", "kích hoạt, gây ra (chuỗi phản ứng)", "To cause an event or situation to happen or exist.", "trigger climate shifts"),
  posture: e("posture", "/ˈpɒs.tʃər/", "noun", "tư thế đứng/ngồi của cơ thể", "The position in which someone holds their body when standing or sitting.", "good posture"),
  acute: e("acute", "/əˈkjuːt/", "adjective", "cấp tính, nghiêm trọng sâu sắc", "Present or experienced to a severe or intense degree.", "acute energy shortage"),
  introduce: e("introduce", "/ˌɪn.trəˈdjuːs/", "verb", "ban hành, áp dụng, đưa vào giới thiệu", "To bring something into use or operation for the first time.", "introduce strict laws"),
  structured: e("structured", "/ˈstrʌk.tʃəd/", "adjective", "có cấu trúc bài bản, chặt chẽ", "Arranged according to a plan or pattern.", "structured curriculum"),
  planner: e("planner", "/ˈplæn.ər/", "noun", "nhà quy hoạch (đô thị), người lập kế hoạch", "A person who makes plans for towns or projects.", "urban planners"),
  allow: e("allow", "/əˈlaʊ/", "verb", "cho phép, tạo điều kiện cho", "To give permission or make it possible for someone to do something.", "allow flexibility"),
  hub: e("hub", "/hʌb/", "noun", "trung tâm đầu mối (tài chính/giao thông/công nghệ)", "The effective center of an activity, region, or network.", "financial hub, transport hub"),
  transform: e("transform", "/trænsˈfɔːm/", "verb", "biến đổi hoàn toàn, chuyển hóa", "To make a thorough or dramatic change in form or character.", "transform urban landscapes"),
  accelerate: e("accelerate", "/əkˈsel.ə.reɪt/", "verb", "tăng tốc, đẩy nhanh tiến độ", "To begin to move more quickly; increase in amount or extent.", "accelerate innovation"),
  art: e("art", "/ɑːt/", "noun", "nghệ thuật, mỹ thuật", "The expression of human creative skill and imagination.", "fine arts, visual arts"),
  toddler: e("toddler", "/ˈtɒd.lər/", "noun", "trẻ nhỏ tập đi (1–3 tuổi)", "A young child who is just beginning to walk.", "toddler development"),
  achieve: e("achieve", "/əˈtʃiːv/", "verb", "đạt được, hoàn thành (mục tiêu, thành tựu)", "To successfully bring about or reach a desired objective.", "achieve fluency"),
  enable: e("enable", "/ɪˈneɪ.bəl/", "verb", "cho phép, giúp có khả năng làm gì", "To make someone able to do something.", "enable remote work"),
  safeguard: e("safeguard", "/ˈseɪf.ɡɑːd/", "verb / noun", "bảo vệ, giữ gìn an toàn", "To protect from harm or damage with an appropriate measure.", "safeguard biodiversity"),
  attain: e("attain", "/əˈteɪn/", "verb", "đạt tới (trình độ, mục tiêu cao)", "To succeed in achieving something that one desires.", "attain mastery"),
  linguistic: e("linguistic", "/lɪŋˈɡwɪs.tɪk/", "adjective", "thuộc về ngôn ngữ học", "Relating to language or linguistics.", "linguistic diversity"),
  master: e("master", "/ˈmɑː.stər/", "verb / noun", "làm chủ, thành thạo; bậc thầy", "To acquire complete knowledge or skill in a subject.", "master academic vocabulary"),
  alongside: e("alongside", "/əˌlɒŋˈsaɪd/", "preposition", "cùng với, song hành bên cạnh", "Together with; at the same time as.", "work alongside AI"),
  function: e("function", "/ˈfʌŋk.ʃən/", "noun / verb", "chức năng; vận hành hoạt động", "An activity or purpose natural to or intended for a person or thing.", "cognitive function"),
  significantly: e("significantly", "/sɪɡˈnɪf.ɪ.kənt.li/", "adverb", "một cách đáng kể, rõ rệt", "In a sufficiently great or important way as to be worthy of attention.", "improve significantly"),
  lifestyle: e("lifestyle", "/ˈlaɪf.staɪl/", "noun", "lối sống, phong cách sinh hoạt", "The way in which a person or group lives.", "sedentary lifestyle"),
  warn: e("warn", "/wɔːn/", "verb", "cảnh báo trước nguy cơ", "To inform someone in advance of a possible danger or problem.", "scientists warn that"),
  process: e("process", "/ˈprəʊ.ses/", "verb / noun", "xử lý, chế biến; quy trình", "To perform a series of mechanical or chemical operations on something.", "processed foods"),
  processed: e("processed", "/ˈprəʊ.sest/", "adjective", "đã qua chế biến công nghiệp (thực phẩm)", "Treated by a chemical or industrial process to preserve or alter.", "ultra-processed food"),
  aerobic: e("aerobic", "/eəˈrəʊ.bɪk/", "adjective", "ưa khí; bài tập tăng nhịp tim và hô hấp", "Relating to exercise that increases oxygen consumption and heart rate.", "aerobic exercise"),
  campaign: e("campaign", "/kæmˈpeɪn/", "noun / verb", "chiến dịch tuyên truyền/hành động", "An organized course of action to achieve a goal.", "public awareness campaign"),
  standard: e("standard", "/ˈstæn.dəd/", "noun / adj.", "tiêu chuẩn, mức chuẩn mực", "A level of quality or attainment.", "living standards, safety standards"),
  suburban: e("suburban", "/səˈbɜː.bən/", "adjective", "thuộc vùng ngoại ô", "Of or characteristic of a suburb.", "suburban sprawl"),
  strain: e("strain", "/streɪn/", "noun / verb", "áp lực căng thẳng quá tải", "A severe or excessive demand on the strength or resources of something.", "infrastructure strain"),
  creative: e("creative", "/kriˈeɪ.tɪv/", "adjective", "sáng tạo, giàu trí tưởng tượng", "Relating to or involving the imagination or original ideas.", "creative industries"),
  undergraduate: e("undergraduate", "/ˌʌn.dəˈɡrædʒ.u.ət/", "noun / adj.", "sinh viên bậc đại học (chưa tốt nghiệp)", "A university student who has not yet taken a first degree.", "undergraduate degree"),
  substantial: e("substantial", "/səbˈstæn.ʃəl/", "adjective", "đáng kể, lớn lao, vững chắc", "Of considerable importance, size, or worth.", "substantial investment"),
  heavy: e("heavy", "/ˈhev.i/", "adjective", "nặng nề, dày đặc (giao thông/công nghiệp)", "Great in amount, density, or intensity.", "heavy traffic, heavy industry"),
  transition: e("transition", "/trænˈzɪʃ.ən/", "noun / verb", "sự chuyển đổi, giai đoạn chuyển tiếp", "The process or period of changing from one state or condition to another.", "energy transition"),
  code: e("code", "/kəʊd/", "noun", "bộ quy tắc (luật); mã lập trình", "A systematic collection of laws or regulations; computer instructions.", "building codes, legal code"),
  management: e("management", "/ˈmæn.ɪdʒ.mənt/", "noun", "sự quản lý, điều hành", "The process of dealing with or controlling things or people.", "waste management"),
  immersive: e("immersive", "/ɪˈmɜː.sɪv/", "adjective", "nhập vai, đắm chìm toàn diện", "Seeming to surround the user or participant completely.", "immersive learning"),
  ensure: e("ensure", "/ɪnˈʃʊər/", "verb", "bảo đảm, chắc chắn rằng", "To make certain that something will occur or be the case.", "ensure equal access"),
  budget: e("budget", "/ˈbʌdʒ.ɪt/", "noun", "ngân sách, kế hoạch chi tiêu", "An estimate of income and expenditure for a set period of time.", "public budget"),
  subway: e("subway", "/ˈsʌb.weɪ/", "noun", "tàu điện ngầm đô thị", "An underground electric railroad.", "expand subway networks"),
  millennia: e("millennia", "/mɪˈlen.i.ə/", "noun (plural)", "nhiều thiên niên kỷ (hàng nghìn năm)", "Periods of a thousand years (plural of millennium).", "across millennia"),
  unregulated: e("unregulated", "/ʌnˈreɡ.jə.leɪ.tɪd/", "adjective", "không được kiểm soát, thiếu quy định quản lý", "Not controlled or supervised by regulations or laws.", "unregulated emissions"),
  museum: e("museum", "/mjuːˈziː.əm/", "noun", "viện bảo tàng", "A building in which objects of historical, scientific, or artistic interest are exhibited.", "public museum"),
  strict: e("strict", "/strɪkt/", "adjective", "nghiêm khắc, chặt chẽ, khắt khe", "Demanding that rules concerning behavior are obeyed and observed.", "strict upbringing, strict laws"),
  marked: e("marked", "/mɑːkt/", "adjective", "rõ rệt, dễ nhận thấy", "Clearly noticeable; evident.", "a marked improvement"),
  continent: e("continent", "/ˈkɒn.tɪ.nənt/", "noun", "châu lục, lục địa", "Any of the world's main continuous expanses of land.", "across continents"),
  future: e("future", "/ˈfjuː.tʃər/", "noun / adj.", "tương lai", "The time or a period of time following the moment of speaking.", "future generations"),
  classify: e("classify", "/ˈklæs.ɪ.faɪ/", "verb", "phân loại theo nhóm/tiêu chí", "To arrange a group of people or things in classes or categories.", "classified as endangered"),
  combat: e("combat", "/ˈkɒm.bæt/", "verb / noun", "đấu tranh, chống lại (biến đổi khí hậu/tội phạm)", "To take action to reduce, destroy, or prevent something undesirable.", "combat climate change"),
  wildlife: e("wildlife", "/ˈwaɪld.laɪf/", "noun", "động vật hoang dã", "Wild animals collectively; native fauna and flora.", "protect wildlife"),
  cooling: e("cooling", "/ˈkuː.lɪŋ/", "noun / adj.", "làm mát, làm lạnh (hệ thống điều hòa/môi trường)", "The process of becoming or making cooler.", "global cooling"),
  comprehensive: e("comprehensive", "/ˌkɒm.prɪˈhen.sɪv/", "adjective", "toàn diện, bao quát rộng khắp", "Complete and including everything that is necessary.", "comprehensive reform"),
  planet: e("planet", "/ˈplæn.ɪt/", "noun", "hành tinh", "A celestial body moving in an elliptical orbit round a star.", "habitable planet"),
  concern: e("concern", "/kənˈsɜːn/", "noun / verb", "mối lo ngại, sự quan tâm", "Anxiety; worry; a matter of interest or importance.", "growing environmental concern"),
  architect: e("architect", "/ˈɑː.kɪ.tekt/", "noun", "kiến trúc sư; người kiến tạo", "A person who designs buildings and supervises their construction.", "urban architects"),
  city: e("city", "/ˈsɪt.i/", "noun", "thành phố, đô thị lớn", "A large town.", "megacity, smart city"),
  shortage: e("shortage", "/ˈʃɔː.tɪdʒ/", "noun", "sự thiếu hụt, khan hiếm", "A state or situation in which something needed cannot be obtained in sufficient amounts.", "housing shortage, power shortage"),
  prioritize: e("prioritize", "/praɪˈɒr.ə.taɪz/", "verb", "ưu tiên hàng đầu", "To designate or treat something as more important than other things.", "prioritize public health"),
  concrete: e("concrete", "/ˈkɒŋ.kriːt/", "noun / adj.", "bê tông xây dựng; cụ thể rõ ràng", "Building material; existing in a material or physical form; specific.", "concrete jungle, concrete evidence"),
  opera: e("opera", "/ˈɒp.ər.ə/", "noun", "nhạc kịch thính phòng Opera", "A dramatic work in one or more acts, set to music for singers and instrumentalists.", "opera house"),
  dollar: e("dollar", "/ˈdɒl.ər/", "noun", "đồng đô la", "The basic monetary unit of the US, Australia, and several other countries.", "billions of dollars"),
  deploy: e("deploy", "/dɪˈplɔɪ/", "verb", "triển khai, bố trí sử dụng hiệu quả", "To move or bring into effective action.", "deploy renewable technologies"),
  government: e("government", "/ˈɡʌv.ən.mənt/", "noun", "chính phủ, cơ quan điều hành nhà nước", "The governing body of a nation, state, or community.", "government subsidies"),
  coal: e("coal", "/kəʊl/", "noun", "than đá", "A combustible black or dark brown rock used as fossil fuel.", "coal-fired power"),
  crude: e("crude", "/kruːd/", "adjective", "thô sơ, chưa tinh chế (dầu thô)", "In a natural or raw state; not yet processed.", "crude oil"),
  democratic: e("democratic", "/ˌdem.əˈkræt.ɪk/", "adjective", "mang tính dân chủ", "Relating to or supporting democracy or its principles.", "democratic society"),
  painting: e("painting", "/ˈpeɪn.tɪŋ/", "noun", "bức tranh sơn dầu, hội họa", "A painted picture or the art of painting.", "oil painting"),
  painter: e("painter", "/ˈpeɪn.tər/", "noun", "họa sĩ", "An artist who paints pictures.", "Renaissance painter"),
  monitor: e("monitor", "/ˈmɒn.ɪ.tər/", "verb / noun", "theo dõi, giám sát sát sao", "To observe and check the progress or quality of something over time.", "monitor progress closely"),
  closely: e("closely", "/ˈkləʊs.li/", "adverb", "một cách chặt chẽ, sát sao", "In a close manner; carefully.", "closely connected"),
  step: e("step", "/step/", "noun / verb", "bước đi, bước tiến hành", "A flat surface, movement of foot, or measure taken towards a goal.", "first unassisted steps"),
  activity: e("activity", "/ækˈtɪv.ə.ti/", "noun", "hoạt động", "A thing that a person or group does or has done.", "extracurricular activities"),
  drawing: e("drawing", "/ˈdrɔː.ɪŋ/", "noun", "việc vẽ tranh, bản vẽ", "A picture or diagram made with a pencil, pen, or crayon.", "drawing intricate shapes"),
  coordination: e("coordination", "/kəʊˌɔː.dɪˈneɪ.ʃən/", "noun", "sự phối hợp nhịp nhàng (tay–mắt, tổ chức)", "The organization of different elements of a complex body or activity.", "hand-eye coordination"),
  philosophy: e("philosophy", "/fɪˈlɒs.ə.fi/", "noun", "triết học, triết lý sống", "The study of the fundamental nature of knowledge, reality, and existence.", "moral philosophy"),
  skeletal: e("skeletal", "/ˈskel.ɪ.təl/", "adjective", "thuộc về hệ xương khớp", "Relating to or functioning as a skeleton.", "skeletal strength"),
  spatial: e("spatial", "/ˈspeɪ.ʃəl/", "adjective", "thuộc về không gian, tư duy hình khối", "Relating to or occupying space.", "spatial awareness"),
  "short-term": e("short-term", "/ˌʃɔːtˈtɜːm/", "adjective", "ngắn hạn, trước mắt", "Occurring over or relating to a short period of time.", "short-term memory"),
  exercise: e("exercise", "/ˈek.sə.saɪz/", "noun / verb", "bài tập thể dục; thực thi (quyền)", "Activity requiring physical effort; to use or apply.", "regular physical exercise"),
  exhibit: e("exhibit", "/ɪɡˈzɪb.ɪt/", "verb / noun", "bộc lộ, thể hiện; triển lãm", "To manifest or display clearly; publicly show a work of art.", "exhibit symptoms"),
  survival: e("survival", "/səˈvaɪ.vəl/", "noun", "sự sinh tồn, sống sót", "The state or fact of continuing to live or exist.", "species survival"),
  directive: e("directive", "/dɪˈrek.tɪv/", "noun", "chỉ thị, quy định hướng dẫn chính thức", "An official or authoritative instruction.", "environmental directives"),
  heighten: e("heighten", "/ˈhaɪ.tən/", "verb", "làm tăng cao, gia tăng mức độ", "To make or become more intense.", "heightened anxiety"),
  peak: e("peak", "/piːk/", "noun / verb", "đỉnh cao, điểm cao nhất", "The point of highest activity, quality, or achievement.", "peak performance"),
  stage: e("stage", "/steɪdʒ/", "noun", "giai đoạn phát triển; sân khấu", "A point, period, or step in a process or development.", "developmental stage"),
  promote: e("promote", "/prəˈməʊt/", "verb", "thúc đẩy, quảng bá, khuyến khích", "To further the progress of something; support actively.", "promote public health"),
  alarming: e("alarming", "/əˈlɑː.mɪŋ/", "adjective", "đáng báo động, gây lo ngại", "Worrying or disturbing.", "at an alarming rate"),
  highly: e("highly", "/ˈhaɪ.li/", "adverb", "rất, ở mức độ cao", "To a high degree or level.", "highly effective"),
  viral: e("viral", "/ˈvaɪə.rəl/", "adjective", "thuộc về virus; lan truyền chóng mặt trên mạng", "Caused by a virus; rapidly circulated online.", "viral infection, go viral"),
  illness: e("illness", "/ˈɪl.nəs/", "noun", "căn bệnh, sự ốm đau", "A disease or period of sickness affecting the body or mind.", "chronic illness"),
  play: e("play", "/pleɪ/", "verb / noun", "đóng (vai trò); chơi đùa", "To have a part or role in something; engage in enjoyable activity.", "play a paramount role"),
  role: e("role", "/rəʊl/", "noun", "vai trò, nhiệm vụ", "The function assumed or part played by a person or thing.", "paramount role"),
  maintain: e("maintain", "/meɪnˈteɪn/", "verb", "duy trì; giữ vững quan điểm (cho rằng)", "To cause or enable a condition to continue; assert strongly.", "maintain that, maintain health"),
  dramatically: e("dramatically", "/drəˈmæt.ɪ.kəl.i/", "adverb", "một cách đột ngột, đáng kể rõ rệt", "By a strikingly large amount or to a strikingly great extent.", "decline dramatically"),
  muscular: e("muscular", "/ˈmʌs.kjə.lər/", "adjective", "thuộc về cơ bắp, cường tráng", "Relating to or affecting the muscles.", "muscular endurance"),
  accumulate: e("accumulate", "/əˈkjuː.mjə.leɪt/", "verb", "tích lũy dần theo thời gian", "To gather together or acquire an increasing number or quantity of.", "accumulate knowledge"),
  sleep: e("sleep", "/sliːp/", "noun / verb", "giấc ngủ; ngủ", "A natural state of rest for body and mind.", "sleep deprivation"),

  // =========================================================================
  // 4. TỪ CĂN BẢN B1 ĐỂ NGƯỜI HỌC KHÔNG BAO GIỜ BỊ RỖNG KHI CLICK
  // =========================================================================
  child: e("child", "/tʃaɪld/", "noun", "đứa trẻ, con cái (số nhiều: children)", "A young human being below the age of puberty.", "child development"),
  children: e("children", "/ˈtʃɪl.drən/", "noun (plural)", "trẻ em, con cái (số nhiều của child)", "Young human beings.", "nurture children"),
  parent: e("parent", "/ˈpeə.rənt/", "noun", "cha hoặc mẹ, phụ huynh", "A father or mother.", "single parent, loving parents"),
  family: e("family", "/ˈfæm.ɪ.li/", "noun", "gia đình", "A group consisting of parents and children living together.", "immediate family, close-knit family"),
  brother: e("brother", "/ˈbrʌð.ər/", "noun", "anh trai hoặc em trai", "A male sibling.", "brothers and sisters"),
  sister: e("sister", "/ˈsɪs.tər/", "noun", "chị gái hoặc em gái", "A female sibling.", "younger sister"),
  grandfather: e("grandfather", "/ˈɡræn.fɑː.ðər/", "noun", "ông nội hoặc ông ngoại", "The father of one's father or mother.", "maternal grandfather"),
  boy: e("boy", "/bɔɪ/", "noun", "bé trai, cậu bé", "A male child or youth.", "young boy"),
  young: e("young", "/jʌŋ/", "adjective", "trẻ tuổi, còn nhỏ", "Having lived or existed for only a short time.", "young adults"),
  youngster: e("youngster", "/ˈjʌŋ.stər/", "noun", "thanh thiếu niên, bạn trẻ", "A child, young person, or young animal.", "guide youngsters"),
  mother: e("mother", "/ˈmʌð.ər/", "noun", "người mẹ", "A woman in relation to her child or children.", "new mothers"),
  eyes: e("eyes", "/aɪz/", "noun (plural)", "đôi mắt", "The organs of sight.", "around the eyes"),
  roof: e("roof", "/ruːf/", "noun", "mái nhà (under the same roof: chung một mái nhà)", "The structure forming the upper covering of a building.", "under the same roof"),
  care: e("care", "/keər/", "noun / verb", "sự chăm sóc, quan tâm", "The provision of what is necessary for health, welfare, and protection.", "maternal care"),
  challenge: e("challenge", "/ˈtʃæl.ɪndʒ/", "noun / verb", "thử thách, khó khăn", "A task or situation that tests someone's abilities.", "overcome challenges"),
  career: e("career", "/kəˈrɪər/", "noun", "sự nghiệp, con đường công danh", "An occupation undertaken for a significant period of a person's life.", "professional career"),
  value: e("value", "/ˈvæl.juː/", "noun / verb", "giá trị sống; trân trọng", "Principles or standards of behavior; regard highly.", "family values"),
  tradition: e("tradition", "/trəˈdɪʃ.ən/", "noun", "truyền thống, phong tục lâu đời", "The transmission of customs or beliefs from generation to generation.", "pass down traditions"),
  pattern: e("pattern", "/ˈpæt.ən/", "noun", "khuôn mẫu, mô hình hành vi lặp lại", "A regular and intelligible form or sequence discernible in behavior.", "behavioral pattern"),
  environment: e("environment", "/ɪnˈvaɪ.rən.mənt/", "noun", "môi trường sống, hoàn cảnh xung quanh", "The surroundings or conditions in which a person lives or operates.", "loving environment"),
  environmental: e("environmental", "/ɪnˌvaɪ.rənˈmen.təl/", "adjective", "thuộc về môi trường", "Relating to the natural world or surrounding conditions.", "environmental influences"),
  influence: e("influence", "/ˈɪn.flu.əns/", "noun / verb", "sự ảnh hưởng, tác động", "The capacity to have an effect on the character, development, or behavior.", "environmental influence"),
  factor: e("factor", "/ˈfæk.tər/", "noun", "yếu tố, nhân tố", "A circumstance, fact, or influence that contributes to a result.", "hereditary factors"),
  ability: e("ability", "/əˈbɪl.ə.ti/", "noun", "khả năng, năng lực", "Possession of the means or skill to do something.", "innate abilities"),
  effect: e("effect", "/ɪˈfekt/", "noun", "tác động, hiệu quả, kết quả", "A change which is a result or consequence of an action or other cause.", "exert an overriding effect"),
  active: e("active", "/ˈæk.tɪv/", "adjective", "tích cực, chủ động, năng động", "Engaging or ready to engage in physically or mentally energetic pursuits.", "active parental guidance"),
  guidance: e("guidance", "/ˈɡaɪ.dəns/", "noun", "sự hướng dẫn, chỉ bảo", "Advice or information aimed at resolving a problem or difficulty.", "parental guidance"),
  evidence: e("evidence", "/ˈev.ɪ.dəns/", "noun", "bằng chứng, chứng cứ", "The available body of facts indicating whether a belief or proposition is true.", "empirical evidence"),
  essential: e("essential", "/ɪˈsen.ʃəl/", "adjective", "thiết yếu, cốt lõi", "Absolutely necessary; extremely important.", "essential traits"),
  trait: e("trait", "/treɪt/", "noun", "đặc điểm tính cách, nét di truyền", "A distinguishing quality or characteristic, typically one belonging to a person.", "character traits"),
  response: e("response", "/rɪˈspɒns/", "noun", "phản ứng, sự hồi đáp", "A reaction to something.", "neurological responses"),
  complex: e("complex", "/ˈkɒm.pleks/", "adjective", "phức tạp, nhiều khía cạnh", "Consisting of many different and connected parts.", "complex challenges"),
  overcome: e("overcome", "/ˌəʊ.vəˈkʌm/", "verb", "vượt qua, khắc phục", "To succeed in dealing with a problem or difficulty.", "overcome adversity"),
  instruction: e("instruction", "/ɪnˈstrʌk.ʃən/", "noun", "sự dạy bảo, hướng dẫn", "Detailed information or teaching about how something should be done.", "moral instruction"),
  positive: e("positive", "/ˈpɒz.ɪ.tɪv/", "adjective", "tích cực, lạc quan", "Constructive, optimistic, or confident.", "positive reinforcement"),
  responsible: e("responsible", "/rɪˈspɒn.sə.bəl/", "adjective", "có trách nhiệm, đáng tin cậy", "Having an obligation to do something or having control over someone.", "socially responsible"),
  society: e("society", "/səˈsaɪ.ə.ti/", "noun", "xã hội", "The aggregate of people living together in a more or less ordered community.", "members of society"),
  journey: e("journey", "/ˈdʒɜː.ni/", "noun", "hành trình, chặng đường", "An act of traveling from one place to another; long process of growth.", "journey into maturity"),
  paramount: e("paramount", "/ˈpær.ə.maʊnt/", "adjective", "tối quan trọng, hàng đầu", "More important than anything else; supreme.", "play the paramount role"),
  opinion: e("opinion", "/əˈpɪn.jən/", "noun", "quan điểm, ý kiến cá nhân", "A view or judgment formed about something.", "give your opinion"),
  view: e("view", "/vjuː/", "noun", "quan điểm, góc nhìn", "A particular way of considering or regarding something.", "discuss both views"),
  discuss: e("discuss", "/dɪˈskʌs/", "verb", "thảo luận, bàn bạc", "To talk or write about a topic in detail.", "discuss both views"),
  determine: e("determine", "/dɪˈtɜː.mɪn/", "verb", "quyết định, xác định", "To cause something to occur in a particular way; be the decisive factor.", "determined by inheritance"),
  success: e("success", "/səkˈses/", "noun", "sự thành công", "The accomplishment of an aim or purpose.", "future success"),
  crucial: e("crucial", "/ˈkruː.ʃəl/", "adjective", "then chốt, mang tính quyết định", "Decisive or critical, especially in the success or failure of something.", "crucial window"),
  focused: e("focused", "/ˈfəʊ.kəst/", "adjective", "tập trung, chuyên tâm", "Directing a great deal of attention, interest, or activity towards a particular aim.", "focused care"),
  provide: e("provide", "/prəˈvaɪd/", "verb", "cung cấp, mang lại", "To make available for use; supply.", "provide stability"),
  affectionate: e("affectionate", "/əˈfek.ʃən.ət/", "adjective", "trìu mến, giàu tình thương", "Readily feeling or showing fondness or tenderness.", "affectionate sanctuary"),
  engage: e("engage", "/ɪnˈɡeɪdʒ/", "verb", "tham gia, gắn kết vào", "To participate or become involved in.", "engage in rivalry"),
  gain: e("gain", "/ɡeɪn/", "verb / noun", "đạt được, giành được; lợi ích", "To obtain or secure something wanted or desirable.", "gain recognition"),
  recognition: e("recognition", "/ˌrek.əɡˈnɪʃ.ən/", "noun", "sự công nhận, ghi nhận", "Acknowledgment of someone's existence, validity, or achievements.", "gain recognition"),
  vividly: e("vividly", "/ˈvɪv.ɪd.li/", "adverb", "một cách sống động, rõ nét", "In a way that produces powerful feelings or strong, clear images.", "vividly reveals"),
  reveal: e("reveal", "/rɪˈviːl/", "verb", "bộc lộ, hé lộ, cho thấy", "To make previously unknown or secret information known.", "reveal temperament"),
  highlight: e("highlight", "/ˈhaɪ.laɪt/", "verb", "làm nổi bật, nhấn mạnh", "To pick out and emphasize.", "highlight empirical evidence"),
  behavioral: e("behavioral", "/bɪˈheɪ.vjər.əl/", "adjective", "thuộc về hành vi ứng xử", "Involving, relating to, or emphasizing behavior.", "behavioral patterns"),
  generational: e("generational", "/ˌdʒen.əˈreɪ.ʃən.əl/", "adjective", "qua nhiều thế hệ", "Relating to or characteristic of a generation or generations.", "generational traits"),
  prepare: e("prepare", "/prɪˈpeər/", "verb", "chuẩn bị sẵn sàng", "To make ready for use or consideration.", "prepare for independence"),
  independence: e("independence", "/ˌɪn.dɪˈpen.dəns/", "noun", "sự độc lập, tự lập", "The fact or state of being independent.", "financial independence"),
  former: e("former", "/ˈfɔː.mər/", "adjective", "trước đây, thuở xưa", "Having previously filled a particular role or been a particular thing.", "former children"),
  become: e("become", "/bɪˈkʌm/", "verb", "trở thành", "To begin to be.", "become caregivers"),
  ongoing: e("ongoing", "/ˈɒnˌɡəʊ.ɪŋ/", "adjective", "đang diễn ra liên tục", "Continuing; still in progress.", "ongoing discourse"),
  central: e("central", "/ˈsen.trəl/", "adjective", "trọng tâm, trung tâm", "Of the greatest importance; principal or essential.", "central inquiry"),
  potential: e("potential", "/pəˈten.ʃəl/", "noun / adj.", "tiềm năng, khả năng tiềm ẩn", "Latent qualities or abilities that may be developed and lead to future success.", "biological potential"),
  remain: e("remain", "/rɪˈmeɪn/", "verb", "vẫn còn, duy trì ở trạng thái", "To continue to possess a particular quality or fulfill a role.", "remain inert"),
  nevertheless: e("nevertheless", "/ˌnev.ə.ðəˈles/", "adverb", "tuy nhiên, dẫu vậy", "In spite of that; notwithstanding; all the same.", "nevertheless, nurture matters"),
  consequently: e("consequently", "/ˈkɒn.sɪ.kwənt.li/", "adverb", "do đó, kết quả là", "As a result.", "consequently, genes matter"),
  furthermore: e("furthermore", "/ˌfɜː.ðəˈmɔːr/", "adverb", "hơn nữa, ngoài ra", "In addition; besides.", "furthermore, studies show"),
  conclusion: e("conclusion", "/kənˈkluː.ʒən/", "noun", "kết luận", "The end or finish of an event or process; final judgment.", "in conclusion"),
  study: e("study", "/ˈstʌd.i/", "noun / verb", "nghiên cứu khoa học; học tập", "A detailed investigation and analysis of a subject or situation.", "scientific studies"),
  personality: e("personality", "/ˌpɜː.sənˈæl.ə.ti/", "noun", "nhân cách, tính cách cá nhân", "The combination of characteristics or qualities that form an individual's distinctive character.", "forged human personality"),
  genetics: e("genetics", "/dʒəˈnet.ɪks/", "noun", "di truyền học, bộ gen", "The study of heredity and the variation of inherited characteristics.", "human genetics"),
  genetically: e("genetically", "/dʒəˈnet.ɪ.kəl.i/", "adverb", "về mặt di truyền học", "In a way that relates to genes or heredity.", "genetically gifted"),
  gifted: e("gifted", "/ˈɡɪf.tɪd/", "adjective", "có năng khiếu thiên bẩm, tài năng", "Having exceptional talent or natural ability.", "genetically gifted"),
  firmly: e("firmly", "/ˈfɜːm.li/", "adverb", "một cách kiên quyết, vững chắc", "With resolute determination.", "firmly contend"),
  ultimately: e("ultimately", "/ˈʌl.tɪ.mət.li/", "adverb", "cuối cùng, suy cho cùng", "Finally; in the end.", "ultimately steers development"),
  unless: e("unless", "/ənˈles/", "conjunction", "trừ khi, nếu không", "Except if.", "unless nurtured properly"),
  whether: e("whether", "/ˈweð.ər/", "conjunction", "liệu rằng, dù là", "Expressing a doubt or choice between alternatives.", "whether nature or nurture"),
  throughout: e("throughout", "/θruːˈaʊt/", "preposition", "xuyên suốt, trong suốt quá trình", "In every part of a place or during the whole of a period.", "throughout maturity"),
  towards: e("towards", "/təˈwɔːdz/", "preposition", "hướng tới, về phía", "In the direction of.", "steer towards adulthood"),
  regarding: e("regarding", "/rɪˈɡɑː.dɪŋ/", "preposition", "liên quan đến, về vấn đề", "Concerning; about.", "regarding child development"),
  involve: e("involve", "/ɪnˈvɒlv/", "verb", "bao gồm, liên quan đến", "To include someone or something as a necessary part.", "studies involving twins"),
  window: e("window", "/ˈwɪn.dəʊ/", "noun", "khoảng thời gian vàng (developmental window); cửa sổ", "An interval or opportunity for action; glass opening in a wall.", "developmental window"),
  human: e("human", "/ˈhjuː.mən/", "adj. / noun", "thuộc về con người; loài người", "Relating to or characteristic of humankind.", "human development"),
  structure: e("structure", "/ˈstrʌk.tʃər/", "noun / verb", "khuôn khổ kỷ luật, cấu trúc tổ chức", "The arrangement of and relations between parts; organized framework.", "compassion and structure"),
  genetic: e("genetic", "/dʒəˈnet.ɪk/", "adjective", "thuộc về gen di truyền", "Relating to genes or heredity.", "genetic traits"),
  socially: e("socially", "/ˈsəʊ.ʃəl.i/", "adverb", "về mặt xã hội, thông qua tương tác cộng đồng", "In a way that relates to society or social interaction.", "socially acquired"),
  close: e("close", "/kləʊs/", "adjective", "gần gũi, thân thiết, sát sao", "Having a strong bond or near relationship.", "close relationship"),
  strong: e("strong", "/strɒŋ/", "adjective", "mạnh mẽ, bền chặt", "Having great power, intensity, or durability.", "strong bond"),
  member: e("member", "/ˈmem.bər/", "noun", "thành viên", "A person belonging to a group or society.", "responsible members of society"),
  example: e("example", "/ɪɡˈzɑːm.pəl/", "noun", "ví dụ minh họa", "A thing characteristic of its kind or illustrating a general rule.", "for example"),
  growth: e("growth", "/ɡrəʊθ/", "noun", "sự phát triển, tăng trưởng", "The process of increasing in size or maturing.", "intellectual growth"),
  skill: e("skill", "/skɪl/", "noun", "kỹ năng", "The ability to do something well.", "emotional regulation skills"),
  natural: e("natural", "/ˈnætʃ.ər.əl/", "adjective", "tự nhiên, bẩm sinh", "Existing in or derived from nature.", "natural development"),
  nature: e("nature", "/ˈneɪ.tʃər/", "noun", "bản chất tự nhiên, yếu tố bẩm sinh di truyền (trong Nature vs Nurture)", "The innate or hereditary qualities of a person; the physical world.", "nature versus nurture")
};

/**
 * Bản dịch tiếng Việt chuẩn hóa hỗ trợ người học B1 cho Chặng 1 & Chặng 3.
 */
export const UNIT_BILINGUAL_TRANSLATIONS: Record<number, UnitBilingualTranslation> = {
  1: {
    stage1: {
      s1_u1_m1: {
        maskedVi:
          "Các nhà tâm lý học nhấn mạnh rằng việc thiết lập một [ ... ] cảm xúc an toàn với những người chăm sóc chính trong giai đoạn sơ sinh là nền tảng cho sức khỏe tinh thần suốt đời.",
        fullVi:
          "Các nhà tâm lý học nhấn mạnh rằng việc thiết lập một mối quan hệ (relationship) cảm xúc an toàn với những người chăm sóc chính trong giai đoạn sơ sinh là nền tảng cho sức khỏe tinh thần suốt đời."
      },
      s1_u1_m2: {
        maskedVi:
          "Trong khi trẻ em tự nhiên [ ... ] trong những môi trường đa dạng, cha mẹ mang nghĩa vụ pháp lý phải nuôi dưỡng các em một cách có đạo đức.",
        fullVi:
          "Trong khi trẻ em tự nhiên lớn lên (grow up) trong những môi trường đa dạng, cha mẹ mang nghĩa vụ pháp lý phải nuôi dưỡng các em một cách có đạo đức."
      },
      s1_u1_m3: {
        maskedVi:
          "Các nhà tâm lý học quan sát thấy rằng sự kình địch giữa [ ... ] (các anh chị em trong nhà) thường tan biến dần khi họ trưởng thành.",
        fullVi:
          "Các nhà tâm lý học quan sát thấy rằng sự kình địch giữa anh chị em ruột (sibling rivalry) thường tan biến dần khi họ trưởng thành."
      },
      s1_u1_m4: {
        maskedVi:
          "Những người mẹ mới sinh thường trải qua một làn sóng bản năng [ ... ] sâu sắc thôi thúc họ che chở cho đứa trẻ sơ sinh vô điều kiện.",
        fullVi:
          "Những người mẹ mới sinh thường trải qua một làn sóng bản năng mẫu tử (maternal instinct) sâu sắc thôi thúc họ che chở cho đứa trẻ sơ sinh vô điều kiện."
      },
      s1_u1_m5: {
        maskedVi:
          "Các nhà xã hội học lập luận rằng sự [ ... ] đạo đức giàu yêu thương định hình nhân cách của một cá nhân sâu sắc hơn nhiều so với việc học chính quy ở trường.",
        fullVi:
          "Các nhà xã hội học lập luận rằng sự nuôi dạy gia đình (upbringing) đạo đức giàu yêu thương định hình nhân cách của một cá nhân sâu sắc hơn nhiều so với việc học chính quy ở trường."
      },
      s1_u1_m6: {
        maskedVi:
          "Cậu bé mang một nét [ ... ] ngoại hình không thể nhầm lẫn với ông của mình, đặc biệt là quanh vùng mắt và đường nét khuôn mặt.",
        fullVi:
          "Cậu bé mang một nét giống nhau (resemblance) về ngoại hình không thể nhầm lẫn với ông của mình, đặc biệt là quanh vùng mắt và đường nét khuôn mặt."
      },
      s1_u1_m7: {
        maskedVi:
          "Khác với những tâm trạng cảm xúc nhất thời, [ ... ] bẩm sinh của một đứa trẻ tương đối cố định và phần lớn được định hình bởi sự di truyền sinh học.",
        fullVi:
          "Khác với những tâm trạng cảm xúc nhất thời, khí chất (temperament) bẩm sinh của một đứa trẻ tương đối cố định và phần lớn được định hình bởi sự di truyền sinh học."
      },
      s1_u1_m8: {
        maskedVi:
          "Trẻ em được nuôi dạy trong một cộng đồng gia đình giàu yêu thương và [ ... ] thể hiện sức bật kiên cường cao hơn trước nỗi lo âu xã hội.",
        fullVi:
          "Trẻ em được nuôi dạy trong một cộng đồng gia đình giàu yêu thương và gắn bó khăng khít (close-knit) thể hiện sức bật kiên cường cao hơn trước nỗi lo âu xã hội."
      }
    },
    stage3Paragraphs: {
      1: "Cuộc thảo luận đang diễn ra xoay quanh việc liệu nhân cách con người chủ yếu được hình thành qua di truyền sinh học hay sự rèn giũa của gia đình vẫn là câu hỏi trọng tâm trong tâm lý học phát triển. Trong khi những người ủng hộ thuyết quyết định luận di truyền cho rằng các yếu tố di truyền chi phối năng lực bẩm sinh của một cá nhân, thì phe ủng hộ ảnh hưởng môi trường lại lập luận rằng mối quan hệ gia đình đầu đời tạo ra tác động vượt trội. Tôi kiên quyết cho rằng dù bộ gen thiết lập những khuynh hướng sinh học nền tảng, việc vun đắp một sự nuôi dạy giàu yêu thương cùng với sự dẫn dắt chủ động của cha mẹ suy cho cùng mới định hướng trẻ tiến tới tuổi trưởng thành tích cực.",
      2: "Những người ủng hộ thuyết tiền định sinh học nhấn mạnh các bằng chứng thực nghiệm chứng minh rằng những nét tính cách cốt lõi được truyền lại qua nhiều thế hệ. Các nghiên cứu khoa học về cặp song sinh cùng trứng bị tách biệt từ khi lọt lòng cho thấy những điểm tương đồng đáng kinh ngạc về khí chất bẩm sinh và năng lực trí tuệ, bất chấp môi trường sống khác biệt. Hơn nữa, trẻ nhỏ thường bộc lộ sự giống nhau rõ rệt về cả thể chất lẫn tâm lý với tổ tiên huyết thống, chứng minh rằng một số phản ứng thần kinh đặc thù về bản chất là được di truyền hơn là tiếp thu qua xã hội. Do đó, các khuôn mẫu sinh học nội tại không thể bị bác bỏ khi đánh giá sự phát triển của con người.",
      3: "Tuy nhiên, tiềm năng sinh học sẽ vẫn ở trạng thái ngủ yên trừ khi được nuôi dưỡng toàn diện thông qua quá trình rèn giũa xã hội có chủ đích tại gia đình. Một môi trường gia đình đoàn kết và gắn bó khăng khít mang lại sự ổn định tâm lý, giúp người trẻ vượt qua các thử thách xã hội phức tạp và giải quyết sự kình địch sớm một cách tích cực. Chẳng hạn, khi trẻ nhận được tình thương mẫu tử thấu cảm song hành cùng sự dạy bảo đạo đức nhất quán, các em học được kỹ năng điều tiết cảm xúc quan trọng. Ngược lại, ngay cả những cá nhân có năng khiếu bẩm sinh cũng có thể sa vào xu hướng chống đối xã hội nếu bị tước đoạt sự nuôi dưỡng tích cực và khích lệ từ gia đình.",
      4: "Tóm lại, trong khi sự di truyền sinh học cung cấp cấu trúc thần kinh nền tảng của khí chất, thì sự uốn nắn của môi trường sống mới quyết định tiềm năng đó thành hình như thế nào. Những bậc cha mẹ gánh vác trách nhiệm nuôi dạy con cái bằng lòng trắc ẩn và khuôn khổ kỷ luật sẽ tiếp sức để trẻ chuyển hóa tố chất thô sơ bẩm sinh thành những công dân sống có trách nhiệm với xã hội trên suốt hành trình trưởng thành."
    }
  }
};
