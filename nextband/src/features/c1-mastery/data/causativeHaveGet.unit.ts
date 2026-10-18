import { MasteryTopicUnit } from '../types/mastery.types';

/**
 * Validated C1/C2 Academic Unit: Causative & Experiential Have/Get
 *
 * Linguistic Verification:
 * 1. Have someone DO sth: Authoritative/professional delegation or instruction.
 * 2. Get someone TO DO sth: Inducement, negotiation, persuasion or achieving compliance.
 * 3. Have/Get sth DONE: Focus on completed service; 'get' is more informal/conversational.
 * 4. Have sth DONE (Experiential/Adversity): Undergoing an external event or misfortune without agency.
 */
export const CAUSATIVE_HAVE_GET_UNIT: MasteryTopicUnit = {
  id: 'unit-c1-causative-01',
  code: 'CAUS-01',
  title: 'Causative & Experiential Have / Get',
  subtitleVi: 'Phân định Sắc thái Ủy quyền, Thuyết phục & Trải nghiệm Bất khả kháng',
  level: 'C1',
  curriculumCategory: 'Causative Structures',

  contrastivePairs: [
    {
      id: 'cp-01',
      title: 'Trục 1: Uỷ quyền chuyên môn vs. Thuyết phục đàm phán',
      sentenceA: {
        text: 'The operations director had the legal team draft the revised merger contract.',
        focus: 'had the legal team draft',
        nuanceVi: 'Uỷ quyền theo chức trách chuyên môn: Đội ngũ pháp chế làm theo chỉ đạo/phân công công việc.',
      },
      sentenceB: {
        text: 'The operations director got the commercial landlord to reduce the office rental fee.',
        focus: 'got the landlord to reduce',
        nuanceVi: 'Thuyết phục qua đàm phán: Chủ mặt bằng ban đầu không có nghĩa vụ giảm, cần nỗ lực thương thảo.',
      },
      checkQuestion: {
        promptVi: 'Trong câu B, tại sao tác giả dùng "got ... to reduce" thay vì "had ... reduce"?',
        options: [
          {
            id: 'opt-a',
            labelVi: 'Vì hành động đòi hỏi nỗ lực thuyết phục và đàm phán giữa hai bên độc lập.',
            isCorrect: true,
            rationaleVi: 'Chính xác! "Get someone to do" thường ngụ ý quá trình thuyết phục, vận động hoặc dàn xếp để người khác đồng ý.',
          },
          {
            id: 'opt-b',
            labelVi: 'Vì chủ mặt bằng là cấp dưới trực tiếp nhận lệnh từ giám đốc vận hành.',
            isCorrect: false,
            rationaleVi: 'Không đúng. Nếu là cấp dưới nhận mệnh lệnh hành chính, cấu trúc tự nhiên hơn là "have someone do".',
          },
        ],
      },
    },
    {
      id: 'cp-02',
      title: 'Trục 2: Chủ động đặt dịch vụ vs. Sự cố bất khả kháng ngoài ý muốn',
      sentenceA: {
        text: 'The enterprise had its cloud infrastructure audited by an independent cybersecurity firm.',
        focus: 'had its cloud infrastructure audited',
        nuanceVi: 'Dịch vụ chủ động: Doanh nghiệp tự liên hệ và chi trả để bên thứ ba kiểm toán an ninh mạng.',
      },
      sentenceB: {
        text: 'The enterprise had its proprietary customer records leaked onto a public forum.',
        focus: 'had its proprietary customer records leaked',
        nuanceVi: 'Trải nghiệm sự cố: Dữ liệu bị rò rỉ là tai họa ngoài ý muốn, chủ ngữ không hề ra lệnh cho việc này.',
      },
      checkQuestion: {
        promptVi: 'Trong câu B, cấu trúc "had + object + V3" mang ý nghĩa gì?',
        options: [
          {
            id: 'opt-a',
            labelVi: 'Chủ thể là nạn nhân chịu đựng một rủi ro/sự cố bất khả kháng (Experiential Adversity).',
            isCorrect: true,
            rationaleVi: 'Chính xác! Khi đi với danh từ chỉ thiệt hại hoặc sự cố, "have sth done" diễn tả tai họa xảy đến với chủ ngữ.',
          },
          {
            id: 'opt-b',
            labelVi: 'Chủ thể đã thuê diễn đàn công cộng để công khai hồ sơ khách hàng.',
            isCorrect: false,
            rationaleVi: 'Sai lệch hoàn toàn về mặt logic đời sống và ngữ nghĩa học thuật.',
          },
        ],
      },
    },
  ],

  diagnosticItems: [
    {
      id: 'diag-01',
      sentencePrompt: 'After a two-hour presentation, the research lead finally got the academic panel _____ the grant proposal.',
      options: [
        { id: 'd1-a', text: 'to approve', isCorrect: true },
        { id: 'd1-b', text: 'approve', isCorrect: false },
        { id: 'd1-c', text: 'approved', isCorrect: false },
      ],
      explanationVi: 'Quy tắc cú pháp C1: Động từ GET ở thể chủ động (khiến/thuyết phục ai làm gì) bắt buộc đi với "to-infinitive": get + person + TO do sth.',
    },
    {
      id: 'diag-02',
      sentencePrompt: 'During the international summit, the foreign diplomat had her private briefing notes _____ from her hotel suite.',
      options: [
        { id: 'd2-a', text: 'stolen', isCorrect: true },
        { id: 'd2-b', text: 'steal', isCorrect: false },
        { id: 'd2-c', text: 'to steal', isCorrect: false },
      ],
      explanationVi: 'Cấu trúc Experiential Passive: "had + sth + past participle" miêu tả tai nạn/sự cố bị mất cắp xảy ra với chủ thể.',
      whyProbe: {
        questionVi: 'Về mặt ngữ nghĩa, nhà ngoại giao trong câu trên có chủ ý yêu cầu người khác lấy tài liệu không?',
        options: [
          {
            id: 'why-a',
            labelVi: 'Không, đây là tai nạn ngoài ý muốn mà bà ấy phải gánh chịu.',
            isCorrect: true,
            feedbackVi: 'Chính xác! Đây là cấu trúc bị động chỉ trải nghiệm (Experiential / Adversity Causative).',
          },
          {
            id: 'why-b',
            labelVi: 'Có, bà ấy đã thuê ai đó đánh cắp tài liệu của chính mình.',
            isCorrect: false,
            feedbackVi: 'Không đúng. Ngữ cảnh summit và diplomat cho thấy đây là vụ xâm nhập trộm cắp bất ngờ.',
          },
        ],
      },
    },
    {
      id: 'diag-03',
      sentencePrompt: 'In executive business correspondence, writers avoid conversational phrases like "we got our tax returns verified" and prefer "we _____".',
      options: [
        { id: 'd3-a', text: 'had our tax returns verified', isCorrect: true },
        { id: 'd3-b', text: 'got to verify our tax returns', isCorrect: false },
        { id: 'd3-c', text: 'had verified our tax returns by someone', isCorrect: false },
      ],
      explanationVi: 'Về văn phong (Register): Trong giao tiếp thương mại và hành chính trang trọng (executive correspondence), cấu trúc "have something done" là chuẩn mực trung tính, tránh dùng "get something done" vốn mang sắc thái thân mật và khẩu ngữ.',
    },
  ],

  transformationItems: [
    {
      id: 'trans-01',
      title: 'Đàm phán thuyết phục chuyên gia',
      sourceSentence: 'We persuaded an external auditor to inspect our balance sheets before the deadline.',
      targetPrefix: 'We finally',
      targetSuffix: 'our balance sheets before the deadline.',
      keyword: 'GOT',
      minWords: 5,
      maxWords: 6,
      acceptedAnswers: [
        'got an external auditor to inspect',
      ],
      nearMissRules: [
        {
          pattern: /\bgot\s+an\s+external\s+auditor\s+inspect\b/i,
          feedbackVi: 'Thiếu "to". Sau cấu trúc chủ động "GET + tân ngữ người", động từ bắt buộc phải ở dạng "to-infinitive" (to inspect).',
          diagnosticCode: 'MISSING_TO',
        },
        {
          pattern: /\bhad\s+an\s+external\s+auditor\b/i,
          feedbackVi: 'Vi phạm quy tắc: Đề bài yêu cầu giữ nguyên từ khóa in hoa "GOT", không được tự ý đổi thành HAD.',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Paraphrase từ "persuaded sb to do" sang cấu trúc C1: got + an external auditor + to inspect.',
      pedagogicalNote: 'Cambridge Use of English Part 4 chuẩn: Đảm bảo đếm đúng 5 từ và giữ nguyên từ khóa GOT.',
    },
    {
      id: 'trans-02',
      title: 'Trải nghiệm tổn hại ngoài ý muốn',
      sourceSentence: 'The airline suffered severe damage to its commercial reputation during the safety scandal.',
      targetPrefix: 'The airline',
      targetSuffix: 'severely damaged during the safety scandal.',
      keyword: 'HAD',
      minWords: 3,
      maxWords: 4,
      acceptedAnswers: [
        'had its commercial reputation',
        'had its reputation',
      ],
      nearMissRules: [
        {
          pattern: /\bhad\s+damaged\s+its\b/i,
          feedbackVi: 'Sai cấu trúc ngữ nghĩa! "had damaged" biến hãng hàng không thành kẻ chủ mưu tự phá hoại danh tiếng, thay vì là bên chịu thiệt hại.',
          diagnosticCode: 'WRONG_PARTICIPLE',
        },
        {
          pattern: /\bgot\s+its\s+(commercial\s+)?reputation\b/i,
          feedbackVi: 'Vi phạm quy tắc: Bắt buộc dùng từ khóa in hoa "HAD" được cho trong đề bài.',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Cấu trúc Experiential Adversity: "had + its (commercial) reputation + severely damaged" diễn tả thiệt hại mà chủ thể phải gánh chịu.',
    },
    {
      id: 'trans-03',
      title: 'Kế hoạch bảo trì trang thiết bị',
      sourceSentence: 'An authorized contractor is going to calibrate the laboratory sensors next Monday.',
      targetPrefix: 'We are',
      targetSuffix: 'by an authorized contractor next Monday.',
      keyword: 'HAVING',
      minWords: 5,
      maxWords: 5,
      acceptedAnswers: [
        'having the laboratory sensors calibrated',
      ],
      nearMissRules: [
        {
          pattern: /\bhaving\s+the\s+laboratory\s+sensors\s+calibrate\b/i,
          feedbackVi: 'Sai dạng thức động từ. Trong cấu trúc "have sth done", động từ sau vật phải ở dạng quá khứ phân từ (calibrated), không dùng nguyên mẫu (calibrate).',
          diagnosticCode: 'WRONG_PARTICIPLE',
        },
        {
          pattern: /\bgetting\s+the\s+laboratory\s+sensors\b/i,
          feedbackVi: 'Vi phạm quy tắc: Đề bài yêu cầu sử dụng từ khóa in hoa "HAVING".',
          diagnosticCode: 'KEYWORD_MUTATED',
        },
      ],
      explanationVi: 'Biến đổi thì tương lai kế hoạch với bị động sai khiến: We are + having the laboratory sensors calibrated + by an authorized contractor.',
    },
  ],
};
