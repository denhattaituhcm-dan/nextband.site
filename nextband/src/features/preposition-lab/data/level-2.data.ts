import { PuzzleScenario } from '../types';

/**
 * Level 2: "The Surface, The Boundary & The Point" (ON vs IN vs AT)
 * Grounded in Seth Lindstromberg (2010), Chapter 2 (ON) & Chapter 3 (AT vs IN vs ON):
 * 1. The Wall & The Picture (Surface adhesion vs Structural embedding: ON the wall vs IN the wall)
 * 2. The Tabletop Spill (Planar support vs Boundary containment: ON the table vs IN the cup)
 * 3. The Corner Paradox (3D Enclosure vs 2D Intersection: IN the corner of the room vs AT/ON the street corner)
 * 4. The Commuter's Vehicle (Walkable platform vs Cramped container: ON the bus/train vs IN the car)
 * 5. The Map & The Pin (Exact point coordinate vs Geographic expanse: AT the crossroads vs IN the district)
 */
export const LEVEL_2_PUZZLES: PuzzleScenario[] = [
  {
    id: 'p2-1-wall-and-picture',
    order: 1,
    title: 'The Wall & The Picture',
    subtitle: 'Surface Contact vs Structural Embedment',
    sourceReference: {
      chapter: 2,
      printedPages: '21–25',
      topic: 'Surface attachment vs Material inclusion (Lindstromberg Ch. 2 §2.1)'
    },
    sentencePrompt: {
      lead: 'The painting hangs',
      targetLandmark: 'the wall.',
      exampleFullSentence: 'The painting hangs on the wall.'
    },
    subjectName: 'painting',
    landmarkName: 'wall',
    hint: {
      en: 'The painting contacts only the flat vertical face of the wall. Is it buried inside the bricks?',
      vi: 'Bức tranh chỉ tiếp xúc với bề mặt phẳng thẳng đứng của bức tường. Nó có bị chôn sâu bên trong gạch vữa không?'
    },
    pedagogicalTakeaway: {
      principleName: 'Surface Adhesion & Support',
      principleNameVi: 'Tiếp xúc bề mặt phẳng & Nâng đỡ (ON)',
      en: 'ON applies when an object is supported by contacting a 2D surface (horizontal or vertical). Embedded wires or studs are IN the wall.',
      vi: 'Dùng ON khi vật thể được nâng đỡ nhờ tiếp xúc với một bề mặt 2D (dù nằm ngang hay thẳng đứng). Ổ cắm/dây điện chôn sâu trong tường mới dùng IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'Surface Appearance vs Deep Reality (Bề nổi vs Bản chất sâu xa)',
      academicExplanation: 'Tiếp xúc bề mặt (ON) tạo nên phép ẩn dụ cho những thứ bề nổi, nông cạn ("on the surface", "on face value"). Ngược lại, những yếu tố cốt lõi ăn sâu luôn là IN ("in essence", "in depth").',
      collocationPills: ['on the surface', 'on face value', 'in depth', 'in essence', 'on paper'],
      writingExample: {
        band: 'Band 8.5 Task 2',
        sentence: 'While globalization appears advantageous on the surface, it deepens economic inequalities in developing nations.',
        targetPreposition: 'on'
      },
      microChallenge: {
        prompt: 'The government proposal looks highly promising ______ paper, but implementation costs remain exorbitant.',
        options: ['in', 'on', 'at', 'with'],
        correctAnswer: 'on',
        explanation: 'Thành ngữ học thuật: "ON paper" (trên lý thuyết / trên giấy tờ, trái ngược với thực tế triển khai).'
      }
    },
    options: [
      {
        id: 'on',
        label: 'ON',
        fit: 'canonical',
        explanation: {
          en: 'Accurate! The painting rests against the outer vertical surface of the wall. Vertical surface support is ON.',
          vi: 'Chính xác! Bức tranh tì lên mặt phẳng đứng bên ngoài của tường. Bề mặt nâng đỡ luôn dùng ON.'
        },
        simulationEffect: 'The painting clings smoothly to the outer face of the wall.'
      },
      {
        id: 'in',
        label: 'IN',
        fit: 'misconception',
        explanation: {
          en: 'If the painting were IN the wall, it would be plastered or buried inside the brickwork like hidden water pipes!',
          vi: 'Nếu bức tranh IN the wall, nó phải bị trát vữa hoặc chôn ngập vào trong gạch như đường ống nước ngầm!'
        },
        simulationEffect: 'The painting would sink into the bricks and disappear.'
      },
      {
        id: 'at',
        label: 'AT',
        fit: 'misconception',
        explanation: {
          en: 'AT denotes proximity or a functional landmark point, not physical surface attachment.',
          vi: 'AT chỉ vị trí toạ độ hay sự lân cận, không diễn tả sự bám dính nâng đỡ của bề mặt.'
        },
        simulationEffect: 'AT lacks tactile surface adhesion.'
      }
    ]
  },
  {
    id: 'p2-2-tabletop-spill',
    order: 2,
    title: 'The Tabletop Spill',
    subtitle: 'Planar Surface vs Contained Boundary',
    sourceReference: {
      chapter: 2,
      printedPages: '23–26',
      topic: 'Flat plane support vs rim containment'
    },
    sentencePrompt: {
      lead: 'Water was accidentally spilled',
      targetLandmark: 'the desk.',
      exampleFullSentence: 'Water was accidentally spilled on the desk.'
    },
    subjectName: 'water spill',
    landmarkName: 'desk',
    hint: {
      en: 'The tabletop has no borders or concave walls. Where does the liquid spread?',
      vi: 'Mặt bàn là mặt phẳng không có gờ chắn. Nước loang ra đâu?'
    },
    pedagogicalTakeaway: {
      principleName: 'Unbounded Planar Spread',
      principleNameVi: 'Mặt phẳng trải rộng không biên giới (ON)',
      en: 'Liquids held by a rim/cup are IN. Unbounded horizontal planes that support substances spread out freely are ON.',
      vi: 'Nước nằm trong ly có thành chắn là IN. Nước đổ loang trên mặt bàn phẳng không có gờ bao bọc là ON.'
    },
    ieltsBridge: {
      metaphorTitle: 'Spreading Across Domains (Sự lan tỏa trên diện rộng)',
      academicExplanation: 'Mặt phẳng mở rộng (ON) là nguồn gốc của các diễn đạt về sự lan tỏa, ảnh hưởng trên quy mô diện rộng ("impact on society", "on a global scale").',
      collocationPills: ['impact on the environment', 'on a global scale', 'influence on policy', 'on average'],
      writingExample: {
        band: 'Band 8.0 Task 2',
        sentence: 'Rapid urbanization exerts severe pressure on public infrastructure and natural resource management.',
        targetPreposition: 'on'
      },
      microChallenge: {
        prompt: 'Unregulated carbon emissions exert an irreversible toll ______ global biodiversity.',
        options: ['in', 'on', 'at', 'with'],
        correctAnswer: 'on',
        explanation: 'Thành ngữ học thuật: "toll/impact/pressure ON something" (tác động/gánh nặng đè lên một hệ thống).'
      }
    },
    options: [
      {
        id: 'on',
        label: 'ON',
        fit: 'canonical',
        explanation: {
          en: 'Natural English! The desk is a flat planar platform supporting the puddle across its surface.',
          vi: 'Chuẩn xác! Mặt bàn là bề mặt phẳng đỡ vũng nước loang trên bề mặt của nó.'
        },
        simulationEffect: 'The puddle spreads freely over the flat surface.'
      },
      {
        id: 'in',
        label: 'IN',
        fit: 'misconception',
        explanation: {
          en: 'Liquids are only IN if enclosed in a drawer, glass, or depression.',
          vi: 'Nước chỉ IN nếu nằm trong ngăn kéo hoặc cốc nước có thành lõm giữ lại.'
        },
        simulationEffect: 'The water cannot sink into solid polished wood.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'misconception',
        explanation: {
          en: 'UNDER means beneath the desk floor, not upon its working surface.',
          vi: 'UNDER nghĩa là dưới gầm bàn, không phải trên mặt bàn làm việc.'
        },
        simulationEffect: 'The liquid does not drip to the floor.'
      }
    ]
  },
  {
    id: 'p2-3-corner-paradox',
    order: 3,
    title: 'The Corner Paradox',
    subtitle: '3D Enclosing Angle vs 2D Street Intersection',
    sourceReference: {
      chapter: 3,
      printedPages: '42–45',
      topic: 'Internal corner (IN) vs External corner/intersection (AT/ON)'
    },
    sentencePrompt: {
      lead: 'The bookshelf stands',
      targetLandmark: 'the room.',
      exampleFullSentence: 'The bookshelf stands in the corner of the room.'
    },
    subjectName: 'bookshelf',
    landmarkName: 'corner of the room',
    hint: {
      en: 'Two walls meet to form an embracing niche. Does it wrap around the bookshelf?',
      vi: 'Hai bức tường giao nhau tạo thành một góc lòng chảo ôm lấy đồ vật. Nó có bao bọc giá sách không?'
    },
    pedagogicalTakeaway: {
      principleName: 'Interior Enclosing Niche vs Exterior Apex',
      principleNameVi: 'Góc phòng lòng chảo (IN) vs Góc phố ngã tư (AT/ON)',
      en: 'Interior corners form a 3D enclosure embracing the object (IN the corner). Outside street intersections are meeting points (AT/ON the corner).',
      vi: 'Góc trong phòng tạo bởi 2 bức tường có tính bao bọc nên dùng IN the corner. Ngã tư đường bên ngoài chỉ là điểm tiếp giáp 2D nên dùng AT/ON the corner.'
    },
    ieltsBridge: {
      metaphorTitle: 'The Niche & Strategic Stance (Vị thế thị trường & Góc nhìn)',
      academicExplanation: 'Góc phòng 3D (IN the corner) gắn với khái niệm "bị dồn vào chân tường / thế bí" ("backed into a corner") hoặc chiếm lĩnh một thị trường ngách ("in a niche market").',
      collocationPills: ['backed into a corner', 'in the corner of the market', 'around the corner', 'at the intersection of'],
      writingExample: {
        band: 'Band 9.0 Task 2',
        sentence: 'When tech monopolies dominate distribution, smaller competitors are effectively pushed into a defensive corner.',
        targetPreposition: 'in'
      },
      microChallenge: {
        prompt: 'Modern public policy operates ______ the intersection of technological innovation and ethical governance.',
        options: ['in', 'at', 'on', 'with'],
        correctAnswer: 'at',
        explanation: 'Thành ngữ học thuật: "AT the intersection of..." (tại điểm giao thoa giữa 2 lĩnh vực). Giao thoa là một điểm hội tụ (point) nên dùng AT.'
      }
    },
    options: [
      {
        id: 'in',
        label: 'IN',
        fit: 'canonical',
        explanation: {
          en: 'Perfect! An inside corner encloses the object from two intersecting walls: IN the corner of a room.',
          vi: 'Chính xác tuyệt đối! Góc trong phòng được tạo bởi 2 vách tường ôm lấy đồ vật: IN the corner of a room.'
        },
        simulationEffect: 'The bookshelf slots neatly into the recessed angle of the two walls.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'nuanced',
        explanation: {
          en: 'You say ON the corner for street intersections outdoors, not inside an enclosing room niche.',
          vi: 'Ta nói ON the corner cho ngã tư đường bên ngoài phố, không dùng cho góc phòng trong nhà.'
        },
        simulationEffect: 'ON suggests an exterior edge rather than a recessed interior.'
      },
      {
        id: 'at',
        label: 'AT',
        fit: 'nuanced',
        explanation: {
          en: 'AT the corner is used for exterior meeting points (e.g. meet me at the corner of 5th Ave). Inside a room, IN is canonical.',
          vi: 'AT the corner dùng để hẹn nhau tại góc phố ngoài đường. Trong góc phòng kín, người bản xứ luôn dùng IN.'
        },
        simulationEffect: 'AT treats the location as a dimensionless pinpoint.'
      }
    ]
  },
  {
    id: 'p2-4-commuters-vehicle',
    order: 4,
    title: "The Commuter's Vehicle",
    subtitle: 'Walkable Platform vs Cramped Capsule',
    sourceReference: {
      chapter: 2,
      printedPages: '27–30',
      topic: 'Public transports with aisles (ON) vs Private enclosed vehicles (IN)'
    },
    sentencePrompt: {
      lead: 'Dozens of passengers are traveling',
      targetLandmark: 'the express bus.',
      exampleFullSentence: 'Dozens of passengers are traveling on the express bus.'
    },
    subjectName: 'passengers',
    landmarkName: 'bus',
    hint: {
      en: 'Can you stand upright and walk along an aisle inside a bus, train, or plane?',
      vi: 'Bạn có thể đứng thẳng người và bước đi dọc theo lối đi trên xe buýt, tàu hỏa hay máy bay không?'
    },
    pedagogicalTakeaway: {
      principleName: 'Walkable Platform vs Compact Container',
      principleNameVi: 'Mặt sàn di động (ON) vs Khoang gập người (IN)',
      en: 'If a vehicle has a platform/aisle where you can stand and walk (bus, train, plane, ship), English uses ON. In low-ceiling private vehicles where you stoop and sit (car, taxi, helicopter), English uses IN.',
      vi: 'Nếu phương tiện có mặt sàn cho phép đứng và đi lại (xe buýt, tàu lửa, máy bay), tiếng Anh dùng ON (như đứng trên một mặt phẳng). Nếu phải khom lưng chui vào ghế ngồi (ô tô con, taxi), tiếng Anh dùng IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'Boarding Platforms & Shared Ventures (Hành trình & Nền tảng chung)',
      academicExplanation: 'Mặt sàn phương tiện công cộng (ON the bus/train/ship) dẫn đến phép ẩn dụ "on board with a project" (đồng thuận tham gia dự án) hoặc "embarked on a journey" (bắt đầu hành trình).',
      collocationPills: ['on board with the plan', 'embarked on an initiative', 'on the right track', 'on the brink of'],
      writingExample: {
        band: 'Band 8.5 Task 2',
        sentence: 'Before enacting sweeping educational reforms, authorities must ensure that frontline teachers are fully on board.',
        targetPreposition: 'on'
      },
      microChallenge: {
        prompt: 'Developing economies that invest heavily in renewable energy are ______ the right track toward sustainability.',
        options: ['in', 'at', 'on', 'with'],
        correctAnswer: 'on',
        explanation: 'Thành ngữ học thuật: "ON the right track" (đang đi đúng hướng/đúng lộ trình). Track là đường ray/hành lang phẳng.'
      }
    },
    options: [
      {
        id: 'on',
        label: 'ON',
        fit: 'canonical',
        explanation: {
          en: 'Brilliant! A bus is treated as a moving platform with an aisle: ON the bus (like on a train, plane, or ship).',
          vi: 'Xuất sắc! Xe buýt được xem như một mặt sàn di động có lối đi: ON the bus (giống như tàu hỏa, máy bay, du thuyền).'
        },
        simulationEffect: 'Passengers stand and move freely along the raised central aisle platform.'
      },
      {
        id: 'in',
        label: 'IN',
        fit: 'nuanced',
        explanation: {
          en: 'Grammatically possible if emphasizing the metal hull, but native speakers overwhelmingly say "on the bus". IN is strictly reserved for cars and taxis.',
          vi: 'Có thể hiểu được nếu nhấn mạnh cái vỏ xe kim loại, nhưng người bản xứ luôn nói ON the bus. IN dành riêng cho xe con và taxi.'
        },
        simulationEffect: 'IN shrinks the perspective to a confined box.'
      },
      {
        id: 'at',
        label: 'AT',
        fit: 'misconception',
        explanation: {
          en: 'You can be AT the bus stop waiting, but once aboard the vehicle you are ON the bus.',
          vi: 'Bạn có thể đứng đợi AT the bus stop, nhưng khi đã lên xe thì bạn ở ON the bus.'
        },
        simulationEffect: 'AT refers to the station stop, not traveling aboard.'
      }
    ]
  },
  {
    id: 'p2-5-map-and-pin',
    order: 5,
    title: 'The Map & The Pin',
    subtitle: 'Zero-Dimensional Coordinate vs Extended Territory',
    sourceReference: {
      chapter: 3,
      printedPages: '35–39',
      topic: 'Point reference (AT) vs Enclosed surface (ON) vs 3D Realm (IN)'
    },
    sentencePrompt: {
      lead: 'The international summit convened',
      targetLandmark: 'the border checkpoint.',
      exampleFullSentence: 'The international summit convened at the border checkpoint.'
    },
    subjectName: 'delegates',
    landmarkName: 'border checkpoint',
    hint: {
      en: 'The checkpoint is viewed on a country map as a single pinpoint dot, not a wide province.',
      vi: 'Trạm kiểm soát trên bản đồ quốc gia được nhìn như một chấm toạ độ đơn lẻ, không phải một vùng lãnh thổ rộng lớn.'
    },
    pedagogicalTakeaway: {
      principleName: 'Point Dimension (0D) vs Bounded Region (2D/3D)',
      principleNameVi: 'Toạ độ điểm hội tụ (AT) vs Lãnh thổ địa lý (IN)',
      en: 'English uses AT when viewing a place as a dimensionless point, target, or meeting coordinate. When viewing it as an area with boundaries, it uses IN.',
      vi: 'Tiếng Anh dùng AT khi coi địa điểm như một điểm toạ độ không chiều/điểm hẹn hội tụ. Khi coi nó như một khu vực có ranh giới bao quanh, ta dùng IN.'
    },
    ieltsBridge: {
      metaphorTitle: 'Target Points, Rates & Thresholds (Điểm toạ độ & Ngưỡng định lượng)',
      academicExplanation: 'Toạ độ điểm (AT) là nguồn gốc của toàn bộ ngôn ngữ chỉ mốc đo lường và tốc độ trong IELTS Writing Task 1: "at an alarming rate", "peaked at 80%", "at the zenith of".',
      collocationPills: ['at an unprecedented rate', 'peaked at 70%', 'at the disposal of', 'at the expense of'],
      writingExample: {
        band: 'Band 9.0 Task 1',
        sentence: 'Urban household consumption of renewable electricity peaked at 65% in 2020 before stabilizing.',
        targetPreposition: 'at'
      },
      microChallenge: {
        prompt: 'Industrial automation has expanded ______ an unprecedented pace across emerging markets.',
        options: ['in', 'at', 'on', 'with'],
        correctAnswer: 'at',
        explanation: 'Thành ngữ học thuật Task 1/2: "AT an unprecedented pace/rate" (ở một tốc độ chưa từng có). Tốc độ và ngưỡng đo lường luôn dùng AT.'
      }
    },
    options: [
      {
        id: 'at',
        label: 'AT',
        fit: 'canonical',
        explanation: {
          en: 'Mastery achieved! The checkpoint is treated as a pinpoint functional location on a map: AT the border checkpoint.',
          vi: 'Lĩnh hội trọn vẹn! Trạm kiểm soát được xem như một điểm toạ độ chức năng trên bản đồ: AT the border checkpoint.'
        },
        simulationEffect: 'A crisp geographic target crosshair locks onto the coordinate point.'
      },
      {
        id: 'in',
        label: 'IN',
        fit: 'nuanced',
        explanation: {
          en: 'You would say IN if talking about standing physically inside the customs building room, not the geographic meeting point.',
          vi: 'Dùng IN nếu đang nói về việc đứng bên trong căn phòng hải quan, chứ không phải nói về địa điểm hội nghị trên bản đồ.'
        },
        simulationEffect: 'IN zooms too closely into the room interior.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'nuanced',
        explanation: {
          en: 'You can say ON the border line (contacting the demarcation line), but for the functional facility point, AT is canonical.',
          vi: 'Có thể nói ON the border line (nằm trên đường ranh giới), nhưng với trạm kiểm soát cụ thể thì AT là chuẩn nhất.'
        },
        simulationEffect: 'ON emphasizes the borderline strip rather than the facility.'
      }
    ]
  }
];
