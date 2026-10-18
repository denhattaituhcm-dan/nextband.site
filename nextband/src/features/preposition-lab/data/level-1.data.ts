import { PuzzleScenario } from '../types';

/**
 * Level 1: "The Container & The Cover"
 * 5 Progressive Scenarios strictly grounded in Lindstromberg (2010):
 * 1. Placement Basics (Lindstromberg Ch. 1 §12, p. 13; Ch. 4 §2.1, p. 73)
 * 2. The Overflowing Bowl (Lindstromberg Ch. 4 §2.3, pp. 74-75; Coventry et al. 1994)
 * 3. Cover or Container? (Lindstromberg Ch. 4 §2.3, p. 74; Cuyckens 1993, Vandeloise 1986)
 * 4. The Smoke Challenge (Lindstromberg Ch. 4 §2.3, p. 74)
 * 5. The Transfer Test (Lindstromberg Ch. 4 §2.3, p. 75)
 */
export const LEVEL_1_PUZZLES: PuzzleScenario[] = [
  {
    id: 'p1-placement-basics',
    order: 1,
    title: 'Placement Basics',
    subtitle: 'Container Cavity vs Flat Surface',
    sourceReference: {
      chapter: 4,
      printedPages: '73–74',
      topic: 'Representative applications of static in and on'
    },
    sentencePrompt: {
      lead: 'The orange is',
      targetLandmark: 'the bowl.',
      exampleFullSentence: 'The orange is in the bowl.'
    },
    subjectName: 'orange',
    landmarkName: 'bowl',
    initialSnapZone: 'cavity',
    hint: {
      en: 'Notice how the curved walls surround the fruit. Does the bowl hold it when moved?',
      vi: 'Quan sát thành bát cong bao bọc xung quanh quả cam. Khi di chuyển, bát có giữ quả cam lại không?'
    },
    pedagogicalTakeaway: {
      principleName: 'Concave Enclosure & Containment',
      principleNameVi: 'Bao bọc & Chứa đựng (Lòng bát)',
      en: 'In English, when concave surfaces enclose an object and prevent it from rolling or falling out, the relationship is IN.',
      vi: 'Trong tiếng Anh, khi một bề mặt lõm bao bọc vật thể và giữ cho nó không bị lăn hay rơi ra ngoài, mối quan hệ đó dùng IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'State & Condition as Container (Vùng chứa trạng thái)',
      academicExplanation: 'Trong IELTS Writing & Speaking, các trạng thái xã hội, tâm lý hay kinh tế luôn được tư duy như một "chiếc bát chứa" vô hình. Khi chủ thể rơi vào đó, họ bị hoàn cảnh bao bọc và chi phối.',
      collocationPills: ['in a dilemma', 'in crisis', 'in jeopardy', 'in progress', 'invest in an initiative'],
      writingExample: {
        band: 'Band 8.0 Task 2',
        sentence: 'When developing nations find themselves in an economic downturn, vulnerable populations bear the heaviest burden.',
        targetPreposition: 'in'
      },
      microChallenge: {
        prompt: 'The government has poured billions of dollars ______ an effort to transition towards green energy.',
        options: ['on', 'in', 'at', 'with'],
        correctAnswer: 'in',
        explanation: 'Thành ngữ học thuật: "in an effort to" (trong nỗ lực nhằm...). "Effort" được tư duy như một chiếc phễu/vùng chứa đón nhận nguồn lực.'
      }
    },
    options: [
      {
        id: 'in',
        label: 'IN',
        fit: 'canonical',
        explanation: {
          en: 'Correct. The concave walls enclose the orange and keep it from rolling away when moved.',
          vi: 'Chính xác. Thành bát bao bọc quả cam và giữ nó không bị lăn ra ngoài khi di chuyển.'
        },
        simulationEffect: 'The orange rests securely inside the bowl and rides along smoothly when the bowl slides.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'If the orange were merely ON the bowl, it would balance on top of the rim without side support. Here, the cavity holds it.',
          vi: 'Nếu quả cam chỉ ON chiếc bát, nó sẽ thăng bằng trên miệng bát. Ở đây lòng bát giữ nó, nên dùng IN.'
        },
        simulationEffect: 'Balancing on the thin rim would easily cause it to topple without enclosing support.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'misconception',
        explanation: {
          en: 'UNDER means lower than or shielded beneath the bowl. Here, the orange is resting inside the open cavity.',
          vi: 'UNDER nghĩa là ở phía dưới đáy hoặc bị che phủ. Ở đây quả cam nằm gọn trong lòng bát.'
        },
        simulationEffect: 'The orange is not below the base of the bowl.'
      }
    ]
  },
  {
    id: 'p2-overflowing-bowl',
    order: 2,
    title: 'The Overflowing Bowl',
    subtitle: 'Fruit Rising Above the Physical Rim',
    sourceReference: {
      chapter: 4,
      printedPages: '74–75',
      topic: 'Functional containment beyond physical geometry (Coventry et al. 1994)'
    },
    sentencePrompt: {
      lead: 'The banana is',
      targetLandmark: 'the bowl.',
      exampleFullSentence: 'The banana is in the bowl.'
    },
    subjectName: 'banana',
    landmarkName: 'bowl',
    hint: {
      en: 'Try moving the bowl. Does the banana fall behind, or does it ride along with the rest of the fruit?',
      vi: 'Hãy thử đẩy chiếc bát. Quả chuối có bị tụt lại không, hay chuyển động cùng cả cụm trái cây?'
    },
    pedagogicalTakeaway: {
      principleName: 'Coupled Movement & Cargo Membership',
      principleNameVi: 'Cùng chuyển động & Thuộc khối vật chứa',
      en: 'Functional containment extends upward through interlocking objects. If moving the bowl moves the fruit, native speakers judge it as IN.',
      vi: 'Chức năng chứa đựng mở rộng lên trên nhờ các vật thể xếp lồng vào nhau. Nếu đẩy bát làm quả chuối di chuyển theo, người bản xứ dùng IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'The Coupled Drag Principle (Quy luật cùng chuyển động)',
      academicExplanation: 'Dù quả chuối nhô cao hơn vành bát, khi bát di chuyển, chuối vẫn bị cuốn theo. Trong IELTS, khi một cá thể hay tổ chức tham gia vào một hệ thống hoặc một khóa học, họ thuộc về hệ thống đó ("enrolled in", "engaged in").',
      collocationPills: ['engaged in dialogue', 'enrolled in university', 'caught in a vicious circle', 'involved in politics'],
      writingExample: {
        band: 'Band 8.5 Task 2',
        sentence: 'Individuals engaged in lifelong learning adapt significantly faster to sudden fluctuations in the job market.',
        targetPreposition: 'in'
      },
      microChallenge: {
        prompt: 'Both developed and developing nations must actively participate ______ international climate pacts.',
        options: ['with', 'in', 'on', 'to'],
        correctAnswer: 'in',
        explanation: 'Thành ngữ học thuật: "participate IN" (tham gia vào một hoạt động/hiệp ước). Hệ thống hiệp ước đóng vai trò như khối vận hành cuốn các thành viên cùng chuyển động.'
      }
    },
    options: [
      {
        id: 'in',
        label: 'IN',
        fit: 'canonical',
        explanation: {
          en: 'Naturally used by native speakers. Even though it sits higher than the rim, moving the bowl moves the banana as part of its contents.',
          vi: 'Được người bản xứ sử dụng rất tự nhiên. Dù nhô cao hơn vành bát, khi di chuyển bát quả chuối vẫn đi cùng cụm đồ chứa.'
        },
        simulationEffect: 'Pushing the bowl moves the entire interlocking stack of fruit, carrying the banana seamlessly.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'nuanced',
        explanation: {
          en: 'You can say "on top of the pile", emphasizing surface contact. But to express its role as part of the bowl’s contents, native speakers naturally say IN the bowl.',
          vi: 'Có thể nói "on top of the pile" (trên đỉnh đống quả) để nhấn mạnh tiếp xúc bề mặt. Nhưng để chỉ nó là đồ được bát đựng, người bản xứ tự nhiên dùng IN the bowl.'
        },
        simulationEffect: 'The banana contacts the apples below it, but it moves together as part of the contained group.'
      },
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'misconception',
        explanation: {
          en: 'ABOVE requires vertical separation without physical support. If the banana were ABOVE the bowl, pushing the bowl would leave it behind!',
          vi: 'ABOVE đòi hỏi sự tách biệt trong không gian, không có tiếp xúc nâng đỡ. Nếu nó ABOVE cái bát, đẩy bát sẽ không làm nó chuyển động theo!'
        },
        simulationEffect: 'A phantom hovering banana would stay suspended while the bowl moved away.'
      },
      {
        id: 'over',
        label: 'OVER',
        fit: 'nuanced',
        explanation: {
          en: 'OVER often describes covering or a path across. It does not capture how the bowl functionally holds and transports the fruit.',
          vi: 'OVER thường diễn tả sự che phủ hoặc quỹ đạo bay ngang qua, không thể hiện chức năng nâng đỡ và vận chuyển của chiếc bát.'
        },
        simulationEffect: 'OVER implies an arching or crossing relation rather than contained cargo.'
      }
    ]
  },
  {
    id: 'p3-cover-or-container',
    order: 3,
    title: 'Cover or Container?',
    subtitle: 'Geometric Space vs Functional Role',
    sourceReference: {
      chapter: 4,
      printedPages: '74–75',
      topic: 'Inverted bowl acting as cover (Cuyckens 1993, Vandeloise 1986)'
    },
    sentencePrompt: {
      lead: 'The apple is',
      targetLandmark: 'the bowl.',
      exampleFullSentence: 'The apple is under the bowl.'
    },
    subjectName: 'apple',
    landmarkName: 'bowl',
    hint: {
      en: 'What happens when you lift the bowl? Does the apple lift with it, or stay on the table?',
      vi: 'Điều gì xảy ra khi bạn nhấc chiếc bát lên? Quả táo có lên theo không, hay nằm lại trên bàn?'
    },
    pedagogicalTakeaway: {
      principleName: 'Covering vs Containing',
      principleNameVi: 'Vật che đậy vs Vật chứa đựng',
      en: 'Geometric enclosure alone does not make an object IN. When an inverted vessel acts as a roof/shield, the located object is UNDER.',
      vi: 'Bao bọc hình học đơn thuần không đủ để dùng IN. Khi một vật úp xuống đóng vai trò mái che/nắp đậy, vật ở bên dưới là UNDER.'
    },
    ieltsBridge: {
      metaphorTitle: 'The Shielding & Authority Umbrella (Mái che & Áp lực từ trên)',
      academicExplanation: 'Bát úp che quả táo chính là nguyên mẫu của "mái che bảo hộ hoặc thẩm quyền". Trong IELTS, khi ai đó chịu sự chi phối, giám sát hoặc áp lực từ cấp trên/hoàn cảnh nặng nề, ta dùng UNDER.',
      collocationPills: ['under the supervision of', 'under financial pressure', 'under severe scrutiny', 'under the guise of'],
      writingExample: {
        band: 'Band 8.0 Task 2',
        sentence: 'Medical professionals currently work under intense strain due to persistent shortages of essential hospital staff.',
        targetPreposition: 'under'
      },
      microChallenge: {
        prompt: 'New policies implemented ______ the jurisdiction of local councils have lowered crime rates.',
        options: ['under', 'in', 'at', 'on'],
        correctAnswer: 'under',
        explanation: 'Thành ngữ học thuật: "under the jurisdiction/authority of" (dưới thẩm quyền của...). Thẩm quyền phủ xuống như một chiếc vòm che chở/quản lý.'
      }
    },
    options: [
      {
        id: 'under',
        label: 'UNDER',
        fit: 'canonical',
        explanation: {
          en: 'Accurate. The inverted bowl acts as a cover or shield. Lifting the bowl leaves the apple behind on the table.',
          vi: 'Chính xác. Chiếc bát úp đóng vai trò nắp đậy/mái che. Nhấc bát lên thì quả táo vẫn nằm lại trên bàn.'
        },
        simulationEffect: 'Lifting the bowl 80px straight up leaves the apple stationary on the table.'
      },
      {
        id: 'in',
        label: 'IN',
        fit: 'misconception',
        explanation: {
          en: 'Notice what happened when the bowl was lifted: the apple stayed on the table! The bowl is not holding or containing it, but covering it.',
          vi: 'Hãy nhìn điều xảy ra khi nhấc bát: quả táo ở lại trên bàn! Chiếc bát không hề nâng hay chứa đựng nó mà chỉ đang úp che lên.'
        },
        simulationEffect: 'The apple does not rise with the bowl; it has no functional connection to the bowl.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'The apple is beneath the inverted bowl, not resting upon its upturned base.',
          vi: 'Quả táo nằm bên dưới đáy bát úp, không phải nằm trên mặt lưng đáy bát.'
        },
        simulationEffect: 'The apple rests on the table, not on the bowl.'
      },
      {
        id: 'behind',
        label: 'BEHIND',
        fit: 'misconception',
        explanation: {
          en: 'BEHIND implies an obstruction in the line of sight from a specific viewpoint. Here the bowl encloses it as a cover from above.',
          vi: 'BEHIND mang nghĩa nằm phía sau theo hướng nhìn. Ở đây chiếc bát úp chụp lên từ phía trên như mái che.'
        },
        simulationEffect: 'The bowl surrounds the apple completely from above.'
      }
    ]
  },
  {
    id: 'p4-smoke-challenge',
    order: 4,
    title: 'The Smoke Challenge',
    subtitle: 'Buoyancy & Trapped Escape (The Climax)',
    sourceReference: {
      chapter: 4,
      printedPages: '74–75',
      topic: 'Smoke in an inverted bowl preventing escape (Lindstromberg Ch. 4 §2.3)'
    },
    sentencePrompt: {
      lead: 'There is smoke',
      targetLandmark: 'the bowl.',
      exampleFullSentence: 'There is smoke in the bowl.'
    },
    subjectName: 'smoke',
    landmarkName: 'bowl',
    hint: {
      en: 'Unlike solid fruit, smoke rises. What is the inverted bowl doing to the rising smoke right now?',
      vi: 'Khác với trái cây đặc, khói có xu hướng bay lên. Chiếc bát úp đang làm gì với luồng khói bay lên ngay lúc này?'
    },
    pedagogicalTakeaway: {
      principleName: 'Prevention of Escape as Containment',
      principleNameVi: 'Chặn thoát ra chính là Chứa đựng',
      en: 'Because rising gas naturally escapes upward, the inverted bowl holds it and prevents escape. Holding something in creates functional containment: IN.',
      vi: 'Vì chất khí tự nhiên bốc lên và thoát ra, chiếc bát úp chặn lại và giữ không cho nó thoát. Ngăn không cho thoát ra chính là chức năng chứa đựng: IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'Containment as Restraint & Seclusion (Kiểm soát & Ngăn chặn phát tán)',
      academicExplanation: 'Bát úp giữ khói chứng minh bản chất sâu xa nhất của IN: Giữ không cho một thứ dễ bốc hơi/phát tán thoát ra ngoài. Trong IELTS Writing, khi bàn về dịch bệnh, lạm phát hoặc tội phạm, "keep/bring in check" hay "containment strategy" là cụm từ đắt giá band 8.5.',
      collocationPills: ['keep inflation in check', 'in custody', 'in quarantine', 'in detention'],
      writingExample: {
        band: 'Band 8.5 Task 2',
        sentence: 'During viral outbreaks, keeping contagious carriers in strict quarantine remains the most effective containment strategy.',
        targetPreposition: 'in'
      },
      microChallenge: {
        prompt: 'Central banks raised benchmark rates to keep surging inflation ______ check.',
        options: ['under', 'in', 'at', 'on'],
        correctAnswer: 'in',
        explanation: 'Thành ngữ học thuật C2: "keep something IN check" (kiểm soát, kiềm chế trong vòng kiểm soát). Nghĩa gốc là giam giữ trong lồng kiểm soát.'
      }
    },
    options: [
      {
        id: 'in',
        label: 'IN',
        fit: 'canonical',
        explanation: {
          en: 'Remarkable discovery! Because rising smoke would naturally escape, the inverted bowl traps and holds it. Preventing escape = functional containment (IN).',
          vi: 'Khám phá xuất sắc! Vì khói có xu hướng bay lên thoát ra ngoài, chiếc bát úp giữ lại và chặn nó. Ngăn thoát ra = chức năng chứa đựng (IN).'
        },
        simulationEffect: 'Tilting the rim allows smoke to billow out; sealing it down traps the smoke completely.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'nuanced',
        explanation: {
          en: 'While geometrically under the glass surface, "under the bowl" does not capture why the bowl is special here: it is actively trapping the rising gas from escaping!',
          vi: 'Dù về vị trí nó ở dưới mặt kính, "under the bowl" không diễn tả được bản chất: chiếc bát đang chủ động giam giữ luồng khí không cho bốc hơi!'
        },
        simulationEffect: 'Smoke swirls against the upper inner dome of the inverted bowl.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'The smoke is contained beneath the rim and trapped within the interior space, not resting on the exterior surface.',
          vi: 'Khói bị nhốt bên trong khoang vòm của bát, không phải bám ngoài mặt bát.'
        },
        simulationEffect: 'The smoke is sealed inside the cavity.'
      },
      {
        id: 'out_of',
        label: 'OUT OF',
        fit: 'misconception',
        explanation: {
          en: 'Smoke only moves "out of" the bowl if you tilt the rim and break the airtight seal!',
          vi: 'Khói chỉ đi "out of" (ra khỏi) chiếc bát khi bạn nhấc nghiêng vành bát làm vỡ vòng đệm khép kín!'
        },
        simulationEffect: 'Until tilted, the smoke cannot escape.'
      }
    ]
  },
  {
    id: 'p5-transfer-test',
    order: 5,
    title: 'The Transfer Test',
    subtitle: 'Functional Grip in a New Setting',
    sourceReference: {
      chapter: 4,
      printedPages: '75–76',
      topic: 'A nail in a board even when mostly protruding (Lindstromberg Ch. 4 §2.3)'
    },
    sentencePrompt: {
      lead: 'Most of the nail sticks out in the open air. Yet native speakers say: The nail is',
      targetLandmark: 'the wood.',
      exampleFullSentence: 'The nail is in the wood.'
    },
    subjectName: 'nail',
    landmarkName: 'wood',
    hint: {
      en: 'Slide the block of wood. What does the gripped tip of the nail do?',
      vi: 'Hãy thử trượt khối gỗ. Phần mũi đinh bị kẹp chặt phản ứng ra sao?'
    },
    pedagogicalTakeaway: {
      principleName: 'Mechanical Grip as Containment',
      principleNameVi: 'Lực kẹp giữ cơ học tạo nên Chứa đựng',
      en: 'No geometric box encloses the protruding nail. English uses IN because the wood fibers grip and hold it: moving the wood moves the nail.',
      vi: 'Không có chiếc hộp hình học nào bao bọc phần đinh nhô ra. Tiếng Anh dùng IN vì thớ gỗ kẹp chặt và giữ nó: di chuyển thanh gỗ thì đinh chuyển động theo.'
    },
    ieltsBridge: {
      metaphorTitle: 'Deep Rooted Embedding & Anchoring (Găm sâu & Ăn sâu vào cấu trúc)',
      academicExplanation: 'Dù 70% đinh lộ ra ngoài, người bản xứ dùng IN vì mũi đinh đã găm vào thớ gỗ. Trong IELTS, những định kiến xã hội, giá trị văn hóa hoặc lỗ hổng luật pháp đã "ăn sâu vào tiềm thức" luôn dùng cụm từ C1/C2 với IN.',
      collocationPills: ['deeply rooted in tradition', 'inherent in the system', 'ingrained in popular culture', 'anchored in reality'],
      writingExample: {
        band: 'Band 9.0 Task 2',
        sentence: 'Gender stereotypes are often so deeply ingrained in cultural customs that formal legislation alone cannot eradicate them.',
        targetPreposition: 'in'
      },
      microChallenge: {
        prompt: 'Corruption has unfortunately become deeply embedded ______ bureaucratic procedures.',
        options: ['on', 'with', 'in', 'at'],
        correctAnswer: 'in',
        explanation: 'Thành ngữ học thuật C1: "embedded IN" (găm chặt/ăn sâu vào bên trong). Thể hiện mối liên kết cấu trúc không thể tách rời.'
      }
    },
    options: [
      {
        id: 'in',
        label: 'IN',
        fit: 'canonical',
        explanation: {
          en: 'Mastery achieved! Even though 70% of the nail protrudes into open air, the wood grips and controls it. Moving the wood moves the nail (functional grip = IN).',
          vi: 'Lĩnh hội trọn vẹn! Dù 70% thân đinh nhô ra ngoài không khí, thớ gỗ kẹp chặt và giữ nó. Gỗ di chuyển thì đinh di chuyển theo (kẹp giữ chức năng = IN).'
        },
        simulationEffect: 'Sliding the wooden plank carries the rigid nail along; pulling it shows the wood resisting separation.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'The nail is not resting freely on the surface like dust. It is embedded and clamped inside the wood grains.',
          vi: 'Chiếc đinh không chỉ nằm hờ trên mặt phẳng như bụi. Mũi của nó bị cắm sâu và kẹp chặt trong thớ gỗ.'
        },
        simulationEffect: 'The nail cannot simply slide freely over the surface; it is anchored deep inside.'
      },
      {
        id: 'out_of',
        label: 'OUT OF',
        fit: 'nuanced',
        explanation: {
          en: 'You can say "part of it is sticking out of the wood", but to state where the nail is fixed, English speakers say "the nail is IN the wood".',
          vi: 'Bạn có thể nói "nhô ra khỏi gỗ (sticking out of)", nhưng khi nêu trạng thái định vị cố định của cây đinh, người bản xứ luôn nói "in the wood".'
        },
        simulationEffect: 'The protruding tail is visible, but its anchor remains embedded within.'
      },
      {
        id: 'at',
        label: 'AT',
        fit: 'misconception',
        explanation: {
          en: 'AT indicates a general geographic or point location, not physical embedment and mechanical grip.',
          vi: 'AT chỉ một toạ độ tiếp xúc hay vị trí chung, không thể hiện sự găm chặt và liên kết cơ học.'
        },
        simulationEffect: 'AT lacks the concept of material grip and retention.'
      }
    ]
  }
];
