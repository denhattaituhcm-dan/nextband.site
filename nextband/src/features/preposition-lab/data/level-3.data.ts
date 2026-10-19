import { PuzzleScenario } from '../types';

/**
 * Level 3: "The Vertical Axis & Path of Motion" (OVER vs ABOVE vs UNDER vs BELOW)
 * Grounded in Seth Lindstromberg (2010), English Prepositions Explained: Revised Edition:
 * - Chapter 9: "Above, over" (pp. 109–132)
 * - Chapter 12: "Under, below" (pp. 156–166)
 *
 * Scenarios:
 * 1. The Arc of the Jumper: Dynamic trajectory passing from one side to the other (OVER the hurdle).
 * 2. The Cloud & The Mountain Peak: Relative higher elevation without trajectory or contact (ABOVE the peak).
 * 3. The Blanket & The Sleeper: Full surface coverage extending across a landmark (blanket OVER the sleeper, sleeper ON the sofa).
 * 4. The Submerged Submarine: Benchmark / scale measurement (BELOW sea level vs submerged UNDER the surface).
 * 5. The Radar Altitude Lock: Complex spatial matrix contrasting vertical proximity, vertical path, and measurement thresholds.
 */
export const LEVEL_3_PUZZLES: PuzzleScenario[] = [
  {
    id: 'p3-1-arc-of-the-jumper',
    order: 1,
    title: 'The Arc of the Jumper',
    subtitle: 'Dynamic Path of Motion vs Static Height',
    sourceReference: {
      chapter: 9,
      printedPages: '110–116',
      topic: 'Path over an obstacle (Lindstromberg Ch. 9 §2: Trajectory from one side to the other)'
    },
    sentencePrompt: {
      lead: 'The athlete leapt smoothly',
      targetLandmark: 'the hurdle.',
      exampleFullSentence: 'The athlete leapt smoothly over the hurdle.'
    },
    subjectName: 'athlete',
    landmarkName: 'hurdle',
    hint: {
      en: 'Observe the parabolic arc. The body rises from one side, crosses the top, and lands on the opposite side.',
      vi: 'Quan sát quỹ đạo hình vòng cung parabol: người nhảy xuất phát từ một phía, vượt qua đỉnh rào chắn và đáp xuống phía đối diện.'
    },
    pedagogicalTakeaway: {
      principleName: 'Trajectory Crossing a Barrier (Arc Path)',
      principleNameVi: 'Quỹ đạo chuyển động vượt qua rào cản (Hình vòng cung)',
      en: 'OVER prototypically expresses movement along a path that crosses from one side of a boundary or landmark to the other. ABOVE denotes higher vertical position without conveying this crossing motion.',
      vi: 'OVER biểu thị nguyên mẫu một quỹ đạo chuyển động vắt ngang từ phía này sang phía kia của một vật cản hoặc mốc ranh giới. ABOVE chỉ biểu thị vị trí cao hơn theo phương thẳng đứng mà không hàm ý hành trình vượt qua.'
    },
    ieltsBridge: {
      metaphorTitle: 'Overcoming Obstacles & Transition (Vượt qua nghịch cảnh & Chuyển giao)',
      academicExplanation: 'Nghĩa chuyển động vòng cung của OVER sản sinh các phép ẩn dụ học thuật then chốt: vượt qua khó khăn ("overcome obstacles"), hồi phục ("get over a crisis"), chuyển đổi trạng thái ("turn over a new leaf") và quyền lực giám sát ("oversight").',
      collocationPills: ['overcome barriers', 'preside over', 'hand over control', 'get over an economic shock'],
      writingExample: {
        band: 'IELTS Writing Task 2',
        sentence: 'Developing economies must implement structural reforms to get over the post-pandemic crisis.',
        targetPreposition: 'over'
      },
      microChallenge: {
        prompt: 'The regulatory commission was established to exercise strict oversight ______ cross-border financial transactions.',
        options: ['over', 'above', 'under', 'on'],
        correctAnswer: 'over',
        explanation: 'Thành ngữ học thuật: "exercise oversight OVER something" (thực hiện quyền giám sát vượt trên một lĩnh vực).'
      }
    },
    options: [
      {
        id: 'over',
        label: 'OVER',
        fit: 'canonical',
        explanation: {
          en: 'Accurate. OVER captures the continuous parabolic trajectory from one side of the barrier to the other.',
          vi: 'Chính xác. OVER nắm bắt trọn vẹn quỹ đạo hình vòng cung chuyển động từ phía này vượt qua rào chắn sang phía bên kia.'
        },
        simulationEffect: 'The athlete traces a glowing parabolic trajectory in mid-air and lands cleanly beyond the barrier.'
      },
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'misconception',
        explanation: {
          en: 'Inappropriate here. ABOVE indicates vertical elevation relative to a reference level, not a path that crosses over an obstacle.',
          vi: 'Chưa chính xác. ABOVE diễn tả vị trí tĩnh ở tầm cao hơn, không diễn đạt được hành trình chuyển động vượt qua rào chắn.'
        },
        simulationEffect: 'The athlete hovers statically in mid-air directly above the hurdle without moving forward.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'Incorrect. ON requires physical surface contact and support. Landing ON the hurdle would cause a collision.',
          vi: 'Không phù hợp. ON đòi hỏi tiếp xúc và tì đè lên bề mặt. Đáp lên (ON) rào chắn sẽ khiến rào đổ.'
        },
        simulationEffect: 'The athlete strikes the top rail of the hurdle directly, knocking it over.'
      }
    ]
  },
  {
    id: 'p3-2-cloud-and-mountain',
    order: 2,
    title: 'The Cloud & The Mountain Peak',
    subtitle: 'Static Elevation & Comparative Height',
    sourceReference: {
      chapter: 9,
      printedPages: '117–123',
      topic: 'Above as relative higher elevation along a vertical scale (Lindstromberg Ch. 9 §3)'
    },
    sentencePrompt: {
      lead: 'A solitary white cloud hovered',
      targetLandmark: 'the snowy peak.',
      exampleFullSentence: 'A solitary white cloud hovered above the snowy peak.'
    },
    subjectName: 'cloud',
    landmarkName: 'peak',
    hint: {
      en: 'The cloud is stationary at a higher altitude on the vertical axis, with clear separation between it and the summit.',
      vi: 'Đám mây lơ lửng tĩnh tại ở độ cao lớn hơn trên trục thẳng đứng, có khoảng cách không gian rõ ràng ngăn cách với đỉnh núi.'
    },
    pedagogicalTakeaway: {
      principleName: 'Static Superior Elevation (Higher on a Vertical Line)',
      principleNameVi: 'Vị trí cao hơn tương đối theo trục đứng (Không tiếp xúc)',
      en: 'ABOVE is preferred when locating a subject at a higher vertical plane relative to a reference landmark or on an altitude scale, especially when there is physical separation and no traversing path.',
      vi: 'ABOVE được ưu tiên sử dụng khi định vị một vật thể ở cao hơn mốc tham chiếu theo phương thẳng đứng hoặc trên một thước đo độ cao, đặc biệt khi có khoảng cách tách rời và không có hành trình bay vắt ngang.'
    },
    ieltsBridge: {
      metaphorTitle: 'Exceeding Benchmarks & Statistical Superiority (Vượt mốc chỉ số)',
      academicExplanation: 'Trong IELTS Academic Writing Task 1, ABOVE là giới từ chủ đạo mô tả số liệu vượt qua mức trung bình ("above average"), vượt chuẩn ngưỡng ("above the 50% threshold") hoặc vượt đường cơ sở ("above baseline").',
      collocationPills: ['above average', 'above the threshold', 'above baseline', 'rank above peers', 'place quality above speed'],
      writingExample: {
        band: 'IELTS Writing Task 1',
        sentence: 'Renewable energy consumption remained consistently above the 40% threshold throughout the decade.',
        targetPreposition: 'above'
      },
      microChallenge: {
        prompt: 'In developing academic integrity, institutions must prioritize factual rigorous research ______ short-term popularity.',
        options: ['above', 'over', 'under', 'on'],
        correctAnswer: 'above',
        explanation: 'Thành ngữ học thuật: "prioritize X ABOVE Y" / "place X ABOVE Y" (đặt giá trị này cao hơn giá trị khác trên thang đo đạo đức/tiêu chí).'
      }
    },
    options: [
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'canonical',
        explanation: {
          en: 'Correct. ABOVE precisely specifies that the cloud is at a higher elevation on the vertical coordinate without contact or a crossing trajectory.',
          vi: 'Chính xác. ABOVE chỉ rõ đám mây ở cao hơn đỉnh núi trên phương thẳng đứng, có khoảng cách ngăn cách rõ ràng và không vắt qua.'
        },
        simulationEffect: 'The altitude scale indicator aligns with the cloud, demonstrating a higher elevation reading.'
      },
      {
        id: 'over',
        label: 'OVER',
        fit: 'nuanced',
        explanation: {
          en: 'Acceptable in general English if conceptualized as being positioned vertically atop, but ABOVE is more precise for static altitude and distance separation.',
          vi: 'Có thể chấp nhận trong văn cảnh thông thường nếu coi là ở ngay phía trên đỉnh đầu, nhưng ABOVE chuẩn xác hơn khi nhấn mạnh độ cao tách biệt.'
        },
        simulationEffect: 'The cloud drifts horizontally across the mountain summit.'
      },
      {
        id: 'on',
        label: 'ON',
        fit: 'misconception',
        explanation: {
          en: 'Incorrect. ON denotes direct physical resting contact. Clouds do not rest physically on the solid summit.',
          vi: 'Sai lệch. ON đòi hỏi tiếp xúc cơ học trực tiếp tì lên bề mặt tuyết đá của đỉnh núi.'
        },
        simulationEffect: 'The cloud compresses flat onto the snow, behaving like ground fog rather than a hovering cloud.'
      }
    ]
  },
  {
    id: 'p3-3-blanket-and-sleeper',
    order: 3,
    title: 'The Blanket & The Sleeper',
    subtitle: 'Surface Coverage vs Spatial Support',
    sourceReference: {
      chapter: 9,
      printedPages: '124–128',
      topic: 'Over indicating coverage across an expanse (Lindstromberg Ch. 9 §4: Coverage and envelopment)'
    },
    sentencePrompt: {
      lead: 'She pulled a warm woollen blanket',
      targetLandmark: 'the sleeping child.',
      exampleFullSentence: 'She pulled a warm woollen blanket over the sleeping child.'
    },
    subjectName: 'blanket',
    landmarkName: 'child',
    hint: {
      en: 'Notice the dual spatial relations: the child rests ON the sofa, while the blanket drapes and spreads OVER the child for warmth.',
      vi: 'Chú ý hai mối quan hệ không gian song song: em bé nằm tựa ON chiếc sofa, trong khi tấm chăn phủ trải rộng OVER em bé để che ấm.'
    },
    pedagogicalTakeaway: {
      principleName: 'Complete Coverage & Envelopment (Extended Spreading)',
      principleNameVi: 'Bao phủ & Che chở trải rộng trên bề mặt',
      en: 'OVER is uniquely used when a flexible entity extends across and blankets a landmark, even with physical contact. In contrast, the person contacting and supported by the sofa is ON the sofa.',
      vi: 'OVER được dùng đặc thù khi một vật thể mềm mại trải rộng và che phủ kín mốc bên dưới (dù có tiếp xúc). Ngược lại, người tiếp xúc và được nâng đỡ bởi sofa thì dùng ON the sofa.'
    },
    ieltsBridge: {
      metaphorTitle: 'Pervasive Spread & Encompassing Influence (Sự lan tỏa bao trùm)',
      academicExplanation: 'Ý niệm che phủ (coverage) của OVER tạo nền tảng cho các cụm từ học thuật diễn tả hiện tượng lan rộng khắp một địa bàn ("spread over a region"), một giai đoạn thời gian ("over a five-year period"), hoặc sự bao trùm ("a cloud of uncertainty over the economy").',
      collocationPills: ['over a prolonged period', 'spread over the continent', 'cast doubt over findings', 'all over the globe'],
      writingExample: {
        band: 'IELTS Writing Task 2',
        sentence: 'The new climate regulations will take effect over a transition period of five years.',
        targetPreposition: 'over'
      },
      microChallenge: {
        prompt: 'Rising inflation has cast a profound shadow ______ consumer confidence across the nation.',
        options: ['over', 'above', 'below', 'under'],
        correctAnswer: 'over',
        explanation: 'Thành ngữ học thuật: "cast a shadow OVER something" (phủ bóng đen che mờ / tác động tiêu cực lên điều gì).'
      }
    },
    options: [
      {
        id: 'over',
        label: 'OVER',
        fit: 'canonical',
        explanation: {
          en: 'Correct. OVER captures the wrapping, draping, and covering extension across the child.',
          vi: 'Chính xác. OVER diễn tả trọn vẹn sự trải rộng, bao bọc và che phủ kín khắp người em bé.'
        },
        simulationEffect: 'The woollen blanket smoothly unfolds and drapes across the child, wrapping them securely.'
      },
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'misconception',
        explanation: {
          en: 'Incorrect. ABOVE implies the blanket is suspended in the air higher up without touching or covering the sleeper.',
          vi: 'Không phù hợp. ABOVE gợi ý chiếc chăn lơ lửng trong không khí ở phía trên mà không hề chạm hay che ấm cho người nằm.'
        },
        simulationEffect: 'The blanket hovers rigidly in mid-air 50cm above the sofa, providing no warmth.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'misconception',
        explanation: {
          en: 'Inverted relation. The child is under the blanket, but the blanket itself is placed OVER the child.',
          vi: 'Bị đảo ngược vai trò: em bé ở dưới chiếc chăn, nhưng hành động trải chăn là phủ OVER lên người em bé.'
        },
        simulationEffect: 'The blanket slips underneath the sofa cushions instead of covering the person.'
      }
    ]
  },
  {
    id: 'p3-4-submerged-submarine',
    order: 4,
    title: 'The Submerged Submarine',
    subtitle: 'Benchmark Metric vs Physical Containment',
    sourceReference: {
      chapter: 12,
      printedPages: '156–162',
      topic: 'Under vs Below: Direct vertical covering vs comparative scale measurement'
    },
    sentencePrompt: {
      lead: 'The research vessel operates 300 meters',
      targetLandmark: 'sea level.',
      exampleFullSentence: 'The research vessel operates 300 meters below sea level.'
    },
    subjectName: 'submarine',
    landmarkName: 'sea level',
    hint: {
      en: 'Notice the difference: The submarine is submerged UNDER the water, but measured as 300 meters BELOW the baseline benchmark (sea level).',
      vi: 'Phân biệt tinh tế: Con tàu lặn ngập UNDER làn nước, nhưng vị trí độ sâu được đo lường là 300 mét BELOW mốc chuẩn 0m (mực nước biển).'
    },
    pedagogicalTakeaway: {
      principleName: 'Scale Baseline Measurement (BELOW) vs Substance Submersion (UNDER)',
      principleNameVi: 'Mốc chuẩn đo lường (BELOW) vs Ngập sâu dưới lớp che chắn (UNDER)',
      en: 'BELOW is the canonical preposition for values lower than a benchmark, baseline, or zero-mark on a vertical scale (below sea level, below freezing, below average). UNDER prototypically involves a physical ceiling or overhead covering.',
      vi: 'BELOW là giới từ chuẩn mực khi so sánh giá trị thấp hơn một mốc tham chiếu chuẩn trên thang đo thẳng đứng (dưới mực nước biển, dưới độ không, dưới mức trung bình). UNDER nguyên mẫu đòi hỏi có một vật thể/lớp che phủ cụ thể ngay bên trên.'
    },
    ieltsBridge: {
      metaphorTitle: 'Performance Deficit & Pressure Thresholds (Dưới ngưỡng chỉ số & Áp lực)',
      academicExplanation: 'Trong Writing Task 1, BELOW mô tả các số liệu sụt giảm dưới ngưỡng ("fall below the target", "plummet below expectations"). Ngược lại, UNDER mô tả trạng thái bị chịu áp lực, kiểm soát ("under pressure", "under scrutiny", "under the influence of").',
      collocationPills: ['below sea level', 'fall below projections', 'sub-zero temperatures', 'under intense pressure', 'under scrutiny'],
      writingExample: {
        band: 'IELTS Writing Task 1',
        sentence: 'Domestic manufacturing output dropped sharply to 12% below the baseline forecast.',
        targetPreposition: 'below'
      },
      microChallenge: {
        prompt: 'The medical trial had to be paused as participant adherence rates dropped ______ the required 75% standard.',
        options: ['below', 'under', 'over', 'above'],
        correctAnswer: 'below',
        explanation: 'Thành ngữ học thuật: "drop BELOW a standard/percentage" (rơi xuống thấp hơn một mốc tiêu chuẩn định lượng trên thang đo).'
      }
    },
    options: [
      {
        id: 'below',
        label: 'BELOW',
        fit: 'canonical',
        explanation: {
          en: 'Correct. Sea level acts as a mathematical zero-baseline on an elevation scale, which strictly calls for BELOW.',
          vi: 'Chính xác. Mực nước biển đóng vai trò là mốc chuẩn 0m trên thước đo cao độ, đòi hỏi sử dụng BELOW.'
        },
        simulationEffect: 'The depth gauge slides down to -300m with the baseline indicator locking at sea level.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'nuanced',
        explanation: {
          en: 'Colloquially common for "underwater", but strictly ungrammatical with standard metric scales like "sea level" or "freezing point".',
          vi: 'Có thể nói "under the sea / underwater", nhưng khi kết hợp với mốc đo lường chuẩn "sea level" hay "freezing point", dùng UNDER là thiếu chuẩn xác.'
        },
        simulationEffect: 'The water surface ripple animates, but the numerical scale flashes a calibration warning.'
      },
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'misconception',
        explanation: {
          en: 'Direct opposite. Above sea level would place the submarine in the atmosphere or on a mountain.',
          vi: 'Hoàn toàn trái ngược: Above sea level sẽ đưa con tàu lên bầu khí quyển thay vì lặn dưới lòng đại dương.'
        },
        simulationEffect: 'The submarine floats into the clouds above the water line.'
      }
    ]
  },
  {
    id: 'p3-5-radar-altitude-lock',
    order: 5,
    title: 'The Radar Altitude Lock',
    subtitle: 'The Master Vertical Matrix (OVER, ABOVE, UNDER, BELOW)',
    sourceReference: {
      chapter: 9,
      printedPages: '128–132',
      topic: 'Synthesis: Contrasting vertical line proximity, crossing trajectory, and scale benchmarks'
    },
    sentencePrompt: {
      lead: 'The rescue helicopter flew directly',
      targetLandmark: 'the gorge to reach the stranded hikers.',
      exampleFullSentence: 'The rescue helicopter flew directly over the gorge to reach the stranded hikers.'
    },
    subjectName: 'helicopter',
    landmarkName: 'gorge',
    hint: {
      en: 'The helicopter traverses across the canyon from one cliff to the other while maintaining altitude above the valley floor.',
      vi: 'Trực thăng bay vượt qua hẻm núi từ vách đá bên này sang vách đá bên kia, trong khi vẫn duy trì độ cao phía trên đáy thung lũng.'
    },
    pedagogicalTakeaway: {
      principleName: 'Traversing a Span (Crossing a Gap)',
      principleNameVi: 'Chuyển động vượt qua khoảng hở / Hẻm vực',
      en: 'When a moving subject spans or crosses a horizontal gap or valley, OVER is the canonical choice because it denotes a bridging path from one rim to the other.',
      vi: 'Khi một vật thể chuyển động bay bắc ngang qua một hẻm vực hay khoảng cách giữa hai bờ, OVER là lựa chọn chuẩn mực vì nó biểu thị hành trình bắc cầu nối từ bờ này sang bờ kia.'
    },
    ieltsBridge: {
      metaphorTitle: 'Bridging Divides & Comprehensive Jurisdiction (Cầu nối liên kết & Thẩm quyền)',
      academicExplanation: 'OVER biểu thị nhịp cầu nối vượt qua ngăn cách ("bridge over the divide") và phạm vi bao quát bao trùm. Ngược lại, ABOVE biểu thị vị thế tối thượng ("above suspicion", "above reproach"), còn UNDER phản ánh khuôn khổ điều lệ ("under the provisions of the treaty").',
      collocationPills: ['bridge over divides', 'under the provisions of', 'above suspicion', 'preside over negotiations'],
      writingExample: {
        band: 'IELTS Writing Task 2',
        sentence: 'International treaties must bridge over deep ideological divides to protect global environmental assets.',
        targetPreposition: 'over'
      },
      microChallenge: {
        prompt: 'All judicial deliberations must remain completely ______ suspicion to preserve public trust in the legal system.',
        options: ['above', 'over', 'under', 'below'],
        correctAnswer: 'above',
        explanation: 'Thành ngữ học thuật: "ABOVE suspicion" (đứng trên mọi sự nghi ngờ, hoàn toàn trong sạch và không thể bị chê trách).'
      }
    },
    options: [
      {
        id: 'over',
        label: 'OVER',
        fit: 'canonical',
        explanation: {
          en: 'Correct. Flying "over the gorge" emphasizes the traversing flight path spanning from one side of the chasm to the other.',
          vi: 'Chính xác. "Fly over the gorge" nhấn mạnh hành trình bay bắc ngang qua khoảng không giữa hai bờ hẻm núi.'
        },
        simulationEffect: 'The helicopter traverses across the canyon gap, shining a searchlight down into the gorge.'
      },
      {
        id: 'above',
        label: 'ABOVE',
        fit: 'nuanced',
        explanation: {
          en: 'Grammatically possible if purely describing the height of flight relative to the canyon floor, but lacks the dynamic sense of spanning the gap.',
          vi: 'Có thể chấp nhận nếu chỉ đơn thuần miêu tả độ cao tương đối so với đáy hẻm núi, nhưng thiếu đi sắc thái vượt qua khoảng cách giữa hai bờ.'
        },
        simulationEffect: 'The helicopter hovers stationary high in the sky directly above the canyon center.'
      },
      {
        id: 'under',
        label: 'UNDER',
        fit: 'misconception',
        explanation: {
          en: 'Catastrophic trajectory. Flying under the gorge would crash the helicopter into the cliff face or subterranean rock.',
          vi: 'Đường bay nguy hiểm: Bay "under" hẻm núi sẽ khiến trực thăng va chạm vào vách đá ngầm bên dưới.'
        },
        simulationEffect: 'The helicopter descends dangerously into the rocky cavern, triggering an obstacle alarm.'
      }
    ]
  }
];
