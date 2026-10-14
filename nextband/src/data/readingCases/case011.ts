import { ReadingCase } from "@/features/reading/types";

export const CASE_011: ReadingCase = {
  id: "case-011",
  title: "Alien Oceans: The Bizarre Creatures of the Hadal Zone & Deep-Sea Mining Dilemmas",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "National Geographic · Deep-Sea Exploration & Oceanography Archive",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "Descent into the Hadal Trenches",
      subtitle: "National Geographic Expedition · Submersible Survey of Mariana Trench",
      paragraphs: [
        {
          id: "p01",
          text: "Beyond the sunlit continental shelves lies the hadal zone—vast oceanic abysses plunging deeper than six thousand metres beneath the surface. At these staggering depths, absolute perpetual darkness reigns, ambient temperatures hover barely above freezing, and hydrostatic pressures exceed one thousand atmospheres, a crushing force capable of compacting a steel submarine hull like an aluminium can.",
        },
        {
          id: "p02",
          text: "For centuries, natural philosophers assumed these abyssal plains were sterile ecological wastelands devoid of complex life. Yet exploratory autonomous submersibles have revealed an alien biosphere thriving against all biological probability. From translucent snailfish with gelatinous tissue resisting immense pressure to giant amphipods scavenging marine snow, hadal fauna represent the outer limits of evolutionary adaptation.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Chemosynthesis and Bioluminescent Adaptations",
      subtitle: "Marine Biology Field Report · Oceanographic Research Vessel Challenger",
      paragraphs: [
        {
          id: "p03",
          text: "In the absence of solar irradiance, photosynthesis is impossible. Instead, primary biological productivity around deep-sea hydrothermal vents relies on chemosynthesis: extremophile bacteria metabolizing toxic hydrogen sulfide and methane belched from volcanic fissures in tectonic plates, forming the base of an entirely sunlight-independent food web.",
        },
        {
          id: "p04",
          text: "Further up the water column, organisms employ sophisticated bioluminescence—chemical enzymatic reactions producing cold light via luciferin-luciferase pathways. Predators utilize bioluminescent lures dangling from cranial stalks to entice prey, while schooling prey project ventral photophores to mirror downwelling ambient light, achieving 'counter-illumination' camouflage that renders them invisible to upward-looking predators.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Clarion-Clipperton Scramble & Ecological Fragility",
      subtitle: "Conservation Policy Assessment · Marine Sanctuary Protection Brief",
      paragraphs: [
        {
          id: "p05",
          text: "This pristine wilderness now faces unprecedented commercial peril. Vast swaths of the abyssal seafloor, notably the Clarion-Clipperton Zone in the central Pacific, are paved with polymetallic nodules—potato-sized mineral accretions containing astronomical concentrations of nickel, cobalt, copper, and manganese, critical raw materials coveted for electric vehicle batteries.",
        },
        {
          id: "p06",
          text: "Mining consortia argue that vacuuming the deep seafloor presents lower carbon footprints than terrestrial mining. However, marine biologists warn of irreversible ecological catastrophe. These nodules took millions of years to accrete, and the benthic sediment plumes kicked up by robotic seabed scrapers travel thousands of kilometres, suffocating fragile filter-feeding communities that reproduce over centuries. Once destroyed, hadal ecosystems may never recover on human timescales.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what extreme environmental conditions characterise the oceanic hadal zone?",
      options: [
        { id: "A", text: "Boiling surface water and frequent toxic coral reef die-offs." },
        { id: "B", text: "Perpetual darkness, near-freezing temperatures, and hydrostatic pressure exceeding one thousand atmospheres." },
        { id: "C", text: "Violent surface hurricane waves that prevent any autonomous robotic diving." },
        { id: "D", text: "High concentrations of atmospheric oxygen that corrode robotic titanium joints." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) liệt kê điều kiện khắc nghiệt tột cùng: bóng tối vĩnh cửu, nhiệt độ suýt đóng băng và áp suất thủy tĩnh vượt quá một nghìn áp-mốt-phe ('perpetual darkness, ambient temperatures hover barely above freezing, and hydrostatic pressures exceed one thousand atmospheres').",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, how does chemosynthesis fundamentally differ from terrestrial food webs?",
      options: [
        { id: "A", text: "It relies on extremophile bacteria metabolizing sulfur and methane from volcanic vents rather than solar photosynthesis." },
        { id: "B", text: "It uses artificial lasers emitted by scientific research ships to grow kelp forests." },
        { id: "C", text: "It requires marine predators to consume dissolved plastic particles on the seafloor." },
        { id: "D", text: "It functions only during full moon cycles in polar waters." },
      ],
      answer: "A",
      evidence_paragraph_id: "p03",
      explanation: "Source 2 làm rõ sự khác biệt của hóa tổng hợp (chemosynthesis): vi khuẩn cực hạn chuyển hóa khí độc sulfide và methane phun ra từ các vết nứt địa nhiệt núi lửa thay vì quang hợp dựa vào ánh sáng mặt trời ('extremophile bacteria metabolizing toxic hydrogen sulfide and methane... entirely sunlight-independent food web').",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 imply about the long-term impact of deep-sea mining for green energy minerals?",
      options: [
        { id: "A", text: "Seabed mining will immediately lower the global price of consumer smartphones to zero." },
        { id: "B", text: "Attempting to solve the green transition by dredging the seabed risks permanently destroying ecosystems that require millions of years to form." },
        { id: "C", text: "Polymetallic nodules regenerate naturally within a few months after industrial extraction." },
        { id: "D", text: "Mining robotics will purify seawater and eliminate ocean acidification completely." },
      ],
      answer: "B",
      evidence_paragraph_id: "p06",
      explanation: "Source 3 (đoạn 2) cảnh báo thảm họa: các quặng đa kim phải mất hàng triệu năm mới hình thành ('took millions of years to accrete'), bụi bùn do máy cào đáy biển tạo ra sẽ làm ngạt thở các loài sinh vật sinh sản chậm chạp qua nhiều thế kỷ, gây thiệt hại vĩnh viễn không thể phục hồi trên quy mô thời gian của loài người.",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains why mining consortia are eager to exploit the Clarion-Clipperton seafloor.",
      target_paragraph_id: "p05",
      target_sentence: "Vast swaths of the abyssal seafloor, notably the Clarion-Clipperton Zone in the central Pacific, are paved with polymetallic nodules—potato-sized mineral accretions containing astronomical concentrations of nickel, cobalt, copper, and manganese, critical raw materials coveted for electric vehicle batteries.",
      explanation: "Câu văn tại Source 3 (đoạn 1) nêu bật giá trị thương mại thúc đẩy các tập đoàn khai khoáng: 'Vast swaths of the abyssal seafloor, notably the Clarion-Clipperton Zone in the central Pacific, are paved with polymetallic nodules—potato-sized mineral accretions containing astronomical concentrations of nickel, cobalt, copper, and manganese, critical raw materials coveted for electric vehicle batteries.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources from National Geographic, what is the central paradox surrounding deep-sea discovery?",
    options: [
      {
        id: "hyp-1",
        text: "Technological Futility: Human submarines cannot withstand oceanic pressure, proving that all deep-sea footage is computer-generated.",
      },
      {
        id: "hyp-2",
        text: "The Exploration vs Exploitation Paradox: Just as science uncovers the miraculous adaptations of hadal ecosystems, commercial greed threatens to destroy these fragile habitats before they are even fully understood.",
      },
      {
        id: "hyp-3",
        text: "Geological Inevitability: Subsea volcanic fissures will vaporize all marine water within fifty years regardless of human mining.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Autonomous submersibles revealed thriving biospheres adapting to extreme hadal conditions (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Hadal life relies on delicate chemosynthesis and enzymatic bioluminescent camouflage (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Polymetallic nodules contain coveted battery metals like nickel and cobalt (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Benthic sediment plumes from mining scrapers will irreversibly wipe out slow-reproducing hadal communities (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-03", "ev-04"],
    explanation: "NatGeo làm nổi bật nghịch lý nhức nhối của thời đại: Đúng lúc khoa học khám phá ra thế giới kỳ diệu của sinh vật thích nghi vùng vô quang (hadal zone), thì chính cơn khát kim loại làm pin xe điện lại đe dọa biến đáy đại dương thành mỏ khai thác hoang tàn, phá hủy hệ sinh thái biển sâu trước khi con người kịp thấu hiểu.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng đáy biển sâu hoàn toàn không có sự sống do thiếu ánh sáng mặt trời. Bài viết chứng minh có cả một hệ sinh thái phong phú phát triển nhờ hóa tổng hợp (chemosynthesis) và thích nghi áp suất cực hạn.",
      },
    ],
    takeaways: [
      "Khái niệm 'Hadal zone' (vùng rãnh đại dương siêu sâu) và cơ chế 'Chemosynthesis' (hóa tổng hợp phi mặt trời).",
      "Kỹ thuật ngụy trang 'Counter-illumination' của sinh vật phát quang sinh học (bioluminescence).",
      "Vấn đề thời sự toàn cầu: 'Seabed mining' (khai thác khoáng sản đáy biển) tại vùng quặng đa kim Clarion-Clipperton Zone.",
    ],
  },
};
