import { ReadingCase } from "@/features/reading/types";

export const CASE_015: ReadingCase = {
  id: "case-015",
  title: "Surprising Scenes in Stone: The Huqoq Mosaics and Galilean Resilience",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 8.0,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "National Geographic · Archaeology & Ancient Civilization Archive",
  },
  estimated_minutes: 15,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "Unearthing the Galilean Masterpiece",
      subtitle: "Archaeological Excavation Dispatches · The Discovery of the Fifth-Century Huqoq Synagogue",
      paragraphs: [
        {
          id: "p01",
          text: "In June 2012, amidst the rocky Mediterranean terrain of Lower Galilee, an archaeological excavation led by Jodi Magness of the University of North Carolina made an extraordinary discovery. While clearing foundational trenches seven feet below ground, team members scraped against hard floor tiles, suddenly revealing the delicately traced face of a woman staring upward from intricate stone tesserae. Over the ensuing decade, systematic field seasons unearthed the perimeter of an opulent fifth-century synagogue, measuring 65 feet by 50 feet, constructed during the late Roman and early Byzantine epoch when imperial legislation increasingly curtailed Jewish religious freedoms.",
        },
        {
          id: "p02",
          text: "Historical consensus long posited that the Christianization of the Roman Empire under Constantine and his successors relegated Jewish communities to severe socioeconomic distress and cultural decline. However, the magnificent Huqoq synagogue vigorously subverts this narrative of persecution. Its monumental ashlar masonry, soaring two-story architectural elevation, and lavish decorative program demonstrate that rural Galilean settlements were not merely surviving, but actively prospering. The monumental construction was likely underwritten not solely by wealthy aristocrats, but through widespread collective donations from thriving agrarian villagers engaged in olive oil and wine commerce.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Biblical Epics and Hellenistic Legends",
      subtitle: "Iconographic Analysis · Horizontal Registers, Mosaic Panels & the Alexander Encounter",
      paragraphs: [
        {
          id: "p03",
          text: "The interior floor of the synagogue boasts the richest, most iconographically diverse mosaic program ever uncovered in an ancient Jewish sanctuary. Rather than restricting imagery to conventional menorahs or standard geometric borders, the artisans organized the expansive nave into vivid horizontal registers depicting both canonical biblical episodes and startling non-biblical historical legends. Spectacular panels portray the biblical hero Samson carrying the colossal gates of Gaza, Noah's Ark adrift upon deluge waters, and the Tower of Babel being erected by a multiracial labor force utilizing intricate wooden scaffold pulleys.",
        },
        {
          id: "p04",
          text: "Most astonishing to classical historians is an unprecedented non-biblical mosaic register depicting a historic diplomatic encounter. The panel features a regal Greek commander adorned in an imperial diadem and billowing purple cloak, accompanied by battle-armored hoplites and war elephants, meeting with the venerable high priest of Jerusalem dressed in ceremonial white vestments. Scholars identify the majestic figure as Alexander the Great, reflecting a beloved Jewish Hellenistic legend where even the supreme conqueror of antiquity bows in reverence before the God of Israel, affirming Jewish identity and spiritual sovereignty amidst foreign domination.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Cultural Grappling and Seismic Preservation",
      subtitle: "Socio-Religious Metamorphosis · Mamluk Renovation & Modern Conservation Backfilling",
      paragraphs: [
        {
          id: "p05",
          text: "The iconographic tapestry of Huqoq reflects the profound theological grappling of a minority community facing rapid geopolitical and religious metamorphosis. As Byzantine authorities enacted increasingly restrictive edicts, the villagers used their synagogue floor to celebrate divine deliverance achieved through legendary human warriors, recontextualizing ancient resistance against Philistines, Canaanites, and Greeks to reinforce spiritual resilience. Furthermore, the sheer opulence of the sanctuary suggests intense inter-village prestige competition, where rival Galilean communities vied to construct the definitive civic masterpiece.",
        },
        {
          id: "p06",
          text: "Following generations of communal vitality, the Huqoq synagogue was abruptly decommissioned and abandoned, likely crippled by the devastating catastrophic seismic tremors that periodically shatter the Great Rift Valley. Centuries later, during the thirteenth-century Mamluk dynasty, regional prosperity rebounded along the Cairo-to-Damascus commercial caravan route, prompting local inhabitants to rehabilitate the sacred edifice with a concrete-like protective bedding that fortuitously shielded the mosaics. Concluding their twelve-year field campaign in 2023, conservators backfilled the excavated trenches to protect the vulnerable tesserae in situ for prospective UNESCO-level heritage preservation.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, how does the archaeological discovery at Huqoq challenge traditional historical assumptions regarding Jewish communities in the late Roman and early Byzantine era?",
      options: [
        { id: "A", text: "It proves that Jewish populations completely abandoned agriculture and migrated en masse to Rome." },
        { id: "B", text: "It directly subverts the narrative of inevitable cultural and economic decline by demonstrating that rural Galilean communities were actively prospering and funding lavish monumental architecture." },
        { id: "C", text: "It indicates that synagogues were exclusively financed by foreign Roman emperors seeking political favor." },
        { id: "D", text: "It reveals that fifth-century synagogues were built underground to conceal forbidden pagan idolatry." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) chỉ rõ: Trái ngược với giả thuyết lịch sử lâu nay cho rằng việc Ki-tô giáo hóa Đế chế La Mã đã đẩy người Do Thái vào suy thoái và nghèo khó, giáo đường Huqoq với kiến trúc hoành tráng và tranh khảm lộng lẫy đã bác bỏ luận điểm này ('subverts this narrative of persecution'), chứng minh các cộng đồng nông thôn vùng Galilee vẫn thịnh vượng rực rỡ và đủ tiềm lực tài chính để cùng đóng góp xây dựng thánh đường.",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what makes the mosaic depicting Alexander the Great particularly unprecedented in ancient synagogue iconography?",
      options: [
        { id: "A", text: "It is the first discovered depiction of a purely secular, non-biblical historical and legendary scene on an ancient synagogue floor." },
        { id: "B", text: "It depicts Alexander destroying the Second Temple with Roman siege catapults." },
        { id: "C", text: "It was painted using modern oil canvases rather than stone tesserae." },
        { id: "D", text: "It portrays Greek hoplites converting to Christianity under papal supervision." },
      ],
      answer: "A",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 (đoạn 2) nhấn mạnh bức tranh khảm Alexander Đại đế là hiện tượng chưa từng có ('unprecedented non-biblical mosaic register'): một hoạt cảnh lịch sử và truyền thuyết phi kinh thánh xuất hiện trang trọng trên sàn giáo đường, miêu tả cuộc gặp gỡ ngoại giao giữa vị hoàng đế Hy Lạp và Thượng tế Jerusalem nhằm khẳng định chủ quyền tâm linh của người Do Thái.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What theological and psychological motivation does Source 3 suggest drove the Huqoq villagers to depict victorious warriors and divine deliverance on their floor?",
      options: [
        { id: "A", text: "To intimidate Roman tax collectors with threat of immediate armed rebellion." },
        { id: "B", text: "To grapple with an increasingly restrictive Christianizing empire by invoking ancient triumphs to foster spiritual resilience and communal pride." },
        { id: "C", text: "To celebrate their military alliance with the Persian Sasanian empire." },
        { id: "D", text: "To attract wealthy polytheistic tourists travelling from Damascus." },
      ],
      answer: "B",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 (đoạn 1) phân tích chiều sâu tư tưởng: Đối diện với những sắc lệnh hạn chế quyền tự do tôn giáo ngày càng gay gắt từ chính quyền Byzantine, cộng đồng Do Thái đã chiêm nghiệm thực tại ('theological grappling') bằng cách tái hiện những câu chuyện giải cứu thiêng liêng qua các chiến binh anh hùng (như Samson), kết nối các chiến thắng lịch sử trong quá khứ để bồi đắp sức mạnh tinh thần và lòng kiên cường trước ách cai trị ngoại bang.",
    },
    {
      id: "task-04",
      type: "PROVE",
      question: "Click directly on the sentence in Source 3 that explains how the ancient mosaics were serendipitously protected for centuries before modern archaeological excavation.",
      instruction: "Click directly on the sentence in Source 3 that explains how the ancient mosaics were serendipitously protected for centuries before modern archaeological excavation.",
      target_paragraph_id: "p06",
      target_sentence: "Centuries later, during the thirteenth-century Mamluk dynasty, regional prosperity rebounded along the Cairo-to-Damascus commercial caravan route, prompting local inhabitants to rehabilitate the sacred edifice with a concrete-like protective bedding that fortuitously shielded the mosaics.",
      explanation: "Câu thứ hai trong đoạn 6 (Source 3) giải thích cơ chế bảo quản may mắn trong lịch sử: 'Centuries later, during the thirteenth-century Mamluk dynasty, regional prosperity rebounded along the Cairo-to-Damascus commercial caravan route, prompting local inhabitants to rehabilitate the sacred edifice with a concrete-like protective bedding that fortuitously shielded the mosaics.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the central historical thesis revealed by the Huqoq synagogue excavations?",
    options: [
      {
        id: "hyp-1",
        text: "The Huqoq mosaics fundamentally redefine late antique Jewish history, proving that far from sinking into passive decline under imperial Christian restrictions, rural Galilean communities experienced cultural, artistic, and economic vitality, utilizing lavish public art to negotiate geopolitical anxieties and affirm communal identity.",
      },
      {
        id: "hyp-2",
        text: "The discovery demonstrates that ancient mosaic artists possessed no understanding of classical Greek history or biblical narratives, merely copying random patterns from Roman villas.",
      },
      {
        id: "hyp-3",
        text: "The synagogue proves that earthquakes in the Great Rift Valley completely eliminated all monotheistic religions from the Levant by the sixth century.",
      },
    ],
    correct_hypothesis: "hyp-1",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Monumental ashlar masonry and lavish decoration prove Galilean settlements actively prospered under Roman-Byzantine rule (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p03",
        label: "Artisans organized expansive registers depicting complex biblical scenes and non-biblical historical legends (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p04",
        label: "The Alexander the Great mosaic asserts Jewish identity and spiritual sovereignty in the face of imperial conquest (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p05",
        label: "Depicting divine deliverance and heroic warriors helped the community grapple with Byzantine restrictions and inter-village rivalry (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-03", "ev-04"],
    explanation: "Ba nguồn văn bản tạo thành một bức tranh lịch sử hoàn chỉnh: Các cuộc khai quật tại Huqoq đã đảo lộn định kiến lịch sử cũ, chứng minh người Do Thái thời kỳ Hậu Cổ đại (Late Antiquity) không hề suy tàn thụ động trước các đạo luật ngặt nghèo của Byzantine, mà ngược lại, họ trải qua một thời kỳ hoàng kim về nông nghiệp thương mại, biến nghệ thuật tranh khảm đá thành vũ khí biểu tượng để khẳng định sức sống kiên cường và niềm tự tôn văn hóa.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "EXTREME_GENERALIZATION",
        description: "Bẫy tuyệt đối hóa lịch sử: Cho rằng sự ra đời của các đạo luật hạn chế thời Byzantine đồng nghĩa với việc toàn bộ cộng đồng Do Thái lập tức rơi vào cảnh lụi tàn và nghèo đói tuyệt đối, bỏ qua sự năng động cục bộ và tự chủ kinh tế của các làng mạc nông thôn.",
      },
    ],
    takeaways: [
      "Thuật ngữ khảo cổ học & Nghệ thuật cổ đại: 'Tesserae' (Đá khảm mosaic), 'Horizontal registers' (Các dải băng ngang bố cục tranh), 'Ashlar masonry' (Kỹ thuật xây đá phiến đẽo vuông vức), 'In situ' (Bảo tồn nguyên vị trí).",
      "Bối cảnh lịch sử Hậu Cổ đại: 'Christianization of the Roman Empire', 'Byzantine imperial legislation', 'Inter-village prestige competition'.",
      "Khái niệm tri nhận & Văn hóa học: 'Theological grappling' (Sự chiêm nghiệm giằng xé đức tin), 'Narrative of persecution' (Khuôn mẫu tự sự về bức hại), 'Communal resilience' (Sức bền bỉ của cộng đồng).",
    ],
  },
};
