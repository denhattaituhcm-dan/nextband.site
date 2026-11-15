import type { VocabInUseUnit } from "./types";

export const VOCAB_IN_USE_UNITS_10_TO_12: VocabInUseUnit[] = [
  // =========================================================================
  // UNIT 10: BUSINESS 2
  // =========================================================================
  {
    unitId: 10,
    chapterTitle: "Work and Study",
    titleEn: "Business 2",
    titleVi: "Hợp đồng Thương mại, Quản trị Nhân lực & Collocations Lãnh đạo",
    cefr: "C1 – C2",
    estimatedMinutes: 10,
    summaryVi:
      "Làm chủ thuật ngữ hợp đồng và thanh toán (submit a tender, penalty clause, outstanding account, default on payment, acknowledge receipt, expire), từ vựng quản trị (morale, flaw, human resources) và các collocation C1 (a square deal, amass a fortune, turn your hand to, the human factor).",
    passageTitle: "Contracts, Clauses, and the Human Factor in Enterprise",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 20 mục từ trọng tâm Unit 10",
    passageParagraphs: [
      [
        {
          text: "Sound corporate governance rests on unambiguous commercial agreements. Before an engineering consortium can ",
        },
        { text: "win a tender", lexiconId: "win-a-tender" },
        { text: ", procurement teams must carefully ", },
        { text: "submit a tender", lexiconId: "submit-a-tender" },
        { text: " detailing schedules and fixed pricing. Once signed, suppliers race to ", },
        { text: "meet deadlines", lexiconId: "meet-a-deadline-biz" },
        { text: " because any delay triggers a steep ", },
        { text: "penalty clause", lexiconId: "penalty-clause" },
        { text: ". Logistics teams must ", },
        { text: "ship orders", lexiconId: "ship-an-order" },
        { text: " swiftly and ", },
        { text: "acknowledge receipt", lexiconId: "acknowledge-receipt" },
        { text: " digitally, while finance controllers monitor every ", },
        { text: "outstanding account", lexiconId: "outstanding-account" },
        { text: " before contracts ", },
        { text: "expire", lexiconId: "expire" },
        { text: " or clients ", },
        { text: "default on a payment", lexiconId: "default-on-payment" },
        { text: "." }
      ],
      [
        {
          text: "Internally, satirical handbooks warn against mistaking endless meetings for genuine progress. When directors ignore structural ",
        },
        { text: "flaws", lexiconId: "flaw" },
        { text: " or dismiss ", },
        { text: "Human Resources", lexiconId: "resources" },
        { text: ", staff ", },
        { text: "morale", lexiconId: "morale" },
        { text: " erodes rapidly. Clear delegation and honest ", },
        { text: "teamwork", lexiconId: "teamwork" },
        { text: " ensure that no single department shoulders the entire workload alone." }
      ],
      [
        {
          text: "Classic thinkers also debated whether commercial ethics can survive fierce rivalry. While sceptics joke about ",
        },
        { text: "the survival of the fittest", lexiconId: "survival-of-the-fittest" },
        { text: " or question how a ", },
        { text: "chief executive", lexiconId: "chief-executive" },
        { text: " can ", },
        { text: "amass a fortune", lexiconId: "amass-a-fortune" },
        { text: " ethically, admired leaders strive to ", },
        { text: "conduct business", lexiconId: "conduct-business" },
        { text: " transparently. The wisest managers ", },
        { text: "turn their hand to", lexiconId: "turn-your-hand-to" },
        { text: " practical problem-solving, offer employees ", },
        { text: "a square deal", lexiconId: "square-deal" },
        { text: ", and never underestimate ", },
        { text: "the human factor", lexiconId: "human-factor" },
        { text: " even after winning ", },
        { text: "an award for achievement", lexiconId: "award-for-achievement" },
        { text: " via ", },
        { text: "a personal gesture", lexiconId: "personal-gesture" },
        { text: "." }
      ]
    ],
    lexicon: [
      {
        id: "submit-a-tender",
        word: "put in / submit a tender",
        ipa: "/səbˈmɪt ə ˈten.dər/",
        pos: "verb phrase",
        meaningEn: "deliver a formal written proposal stating the price and terms under which your firm offers to perform a contract.",
        meaningVi: "Nộp hồ sơ dự thầu / báo giá chính thức để xin nhận dự án.",
        registerNote: "Formal Business & Procurement",
        nuanceTip: "Trang trọng hơn 'send a proposal'; đối tác chiến thắng gọi là 'win a tender'.",
        example: "Twelve civil engineering firms were invited to submit tenders for the harbour bridge."
      },
      {
        id: "win-a-tender",
        word: "win a tender",
        ipa: "/wɪn ə ˈten.dər/",
        pos: "verb phrase",
        meaningEn: "be selected and awarded a commercial or public contract following a competitive bidding process.",
        meaningVi: "Trúng thầu (được giao thực hiện dự án sau khi đấu thầu).",
        nuanceTip: "Collocation chuẩn: submit a tender -> win a tender.",
        example: "Our logistics partner won the regional tender on reliability rather than rock-bottom pricing."
      },
      {
        id: "meet-a-deadline-biz",
        word: "meet / miss a deadline",
        ipa: "/miːt ə ˈded.laɪn/",
        pos: "verb phrase",
        meaningEn: "deliver contracted goods or milestones strictly on schedule (or fail to do so).",
        meaningVi: "Đáp ứng đúng hạn / trễ hạn giao kết hợp đồng.",
        nuanceTip: "Key 10.1.4 dùng trực tiếp 'meet the deadline' thay cho 'complete work by the agreed time'.",
        example: "Subcontractors risk losing repeat orders whenever they miss a critical deadline."
      },
      {
        id: "penalty-clause",
        word: "a penalty clause",
        ipa: "/ˈpen.əl.ti klɔːz/",
        pos: "noun phrase",
        meaningEn: "a legally binding contract provision specifying financial fines or remedies if terms are breached.",
        meaningVi: "Điều khoản phạt vi phạm hợp đồng.",
        nuanceTip: "Danh từ chỉ một điều mục trong hợp đồng là 'clause' (khác với từ chỉ bộ móng 'claws').",
        example: "The infrastructure agreement contains a strict penalty clause for late delivery."
      },
      {
        id: "outstanding-account",
        word: "an outstanding account",
        ipa: "/ˌaʊtˈstæn.dɪŋ əˈkaʊnt/",
        pos: "noun phrase",
        meaningEn: "an unpaid invoice, debt, or customer balance that still remains due.",
        meaningVi: "Khoản công nợ / hóa đơn tồn đọng chưa thanh toán.",
        nuanceTip: "Chú ý bẫy polysemy! Ngoài nghĩa 'xuất sắc', 'outstanding' trong tài chính nghĩa là 'chưa trả xong'.",
        example: "Accountants sent final reminders regarding all outstanding accounts overdue by sixty days."
      },
      {
        id: "default-on-payment",
        word: "default on a payment",
        ipa: "/dɪˈfɒlt ɒn ə ˈpeɪ.mənt/",
        pos: "verb phrase",
        meaningEn: "fail to fulfil a contractual obligation to pay a debt or instalment by the agreed date.",
        meaningVi: "Vỡ nợ / không trả được khoản thanh toán đúng cam kết.",
        nuanceTip: "Giới từ cố định đi với động từ này là 'on': default on payment / default on a loan.",
        example: "Banks initiate recovery proceedings when corporate borrowers repeatedly default on payments."
      },
      {
        id: "acknowledge-receipt",
        word: "acknowledge receipt",
        ipa: "/əkˈnɒl.ɪdʒ rɪˈsiːt/",
        pos: "verb phrase (formal)",
        meaningEn: "formally confirm to a sender that documents, goods, or funds have safely arrived.",
        meaningVi: "Xác nhận đã nhận được (hàng hóa, tiền thanh toán hoặc hồ sơ).",
        nuanceTip: "Key 10.1.3 thay 'let us know when you receive our payment' bằng 'acknowledge receipt of our payment'.",
        example: "Please acknowledge receipt of the signed contract by returning a stamped PDF."
      },
      {
        id: "ship-an-order",
        word: "ship an order / shipment",
        ipa: "/ʃɪp ən ˈɔː.dər/",
        pos: "verb phrase & noun",
        meaningEn: "dispatch ordered merchandise to a buyer—by road, rail, air, or sea.",
        meaningVi: "Xuất kho giao đơn hàng / lô hàng vận chuyển ('shipment').",
        nuanceTip: "Động từ 'ship' trong thương mại dùng cho mọi phương thức vận tải, không chỉ bằng tàu thủy.",
        example: "Warehouses automatically notify clients the instant each shipment leaves the depot."
      },
      {
        id: "expire",
        word: "expire / expiry",
        ipa: "/ɪkˈspaɪər/",
        pos: "verb & noun",
        meaningEn: "come to the end of a fixed period of legal validity.",
        meaningVi: "Hết hạn hiệu lực (hợp đồng, thị thực, giấy phép) / sự hết hạn.",
        nuanceTip: "Danh từ là 'expiry' (hoặc 'expiration' trong Anh-Mỹ); Key 10.1.2: 'When does your contract expire?'.",
        example: "Renew the software licence two weeks before current credentials expire."
      },
      {
        id: "resources",
        word: "(Human) Resources",
        ipa: "/rɪˈzɔː.sɪz/",
        pos: "noun (plural)",
        meaningEn: "available assets, personnel, or the corporate department formerly known as Personnel.",
        meaningVi: "Nguồn lực / Phòng Nhân sự (Human Resources).",
        nuanceTip: "Key 10.2.3 lưu ý viết hoa 'Human Resources' để chỉ bộ phận nhân sự.",
        example: "Human Resources coordinated onboarding workshops for forty graduate trainees."
      },
      {
        id: "morale",
        word: "morale",
        ipa: "/məˈrɑːl/",
        pos: "noun (uncountable)",
        meaningEn: "the shared level of confidence, enthusiasm, and motivation within a team or workforce.",
        meaningVi: "Tinh thần làm việc, nhuệ khí tập thể.",
        nuanceTip: "Đừng nhầm chính tả với 'moral' (đạo đức)! Collocation chuẩn: raise / boost / erode morale.",
        example: "Transparent communication from senior managers quickly lifted office morale."
      },
      {
        id: "flaw",
        word: "flaw",
        ipa: "/flɔː/",
        pos: "noun",
        meaningEn: "a structural mistake, weakness, or defect in an argument, system, or character.",
        meaningVi: "Lỗ hổng, khiếm khuyết (trong lập luận, kế hoạch hoặc tính cách).",
        nuanceTip: "Key 10.2.2: 'a flaw in your reasoning'; Section B dùng 'character flaws'.",
        example: "External auditors detected a critical flaw in the quarterly forecasting model."
      },
      {
        id: "teamwork",
        word: "teamwork",
        ipa: "/ˈtiːm.wɜːk/",
        pos: "noun (uncountable)",
        meaningEn: "coordinated effort by individuals working collaboratively toward a shared goal.",
        meaningVi: "Tinh thần làm việc nhóm, hiệp đồng tập thể.",
        nuanceTip: "Danh từ không đếm được.",
        example: "Cross-functional teamwork cut product debugging cycles in half."
      },
      {
        id: "square-deal",
        word: "a square deal",
        ipa: "/ə skweər diːl/",
        pos: "noun phrase (idiom)",
        meaningEn: "fair, honest, and equitable treatment or commercial terms for all parties.",
        meaningVi: "Sự đối xử công bằng, sòng phẳng, đôi bên cùng có lợi.",
        nuanceTip: "Trích từ tuyên ngôn nổi tiếng của Tổng thống Theodore Roosevelt về đạo đức kinh doanh.",
        example: "Long-term suppliers stay loyal when buyers consistently give them a square deal."
      },
      {
        id: "conduct-business",
        word: "conduct business",
        ipa: "/kənˈdʌkt ˈbɪz.nəs/",
        pos: "verb phrase (formal)",
        meaningEn: "carry out commercial trade, negotiations, or operations.",
        meaningVi: "Tiến hành kinh doanh, giao thương (trang trọng hơn 'do business').",
        nuanceTip: "Key 10.4.9 & 10.5.6: 'conduct business successfully'.",
        example: "Multinationals must conduct business transparently across differing regulatory regimes."
      },
      {
        id: "amass-a-fortune",
        word: "amass a fortune",
        ipa: "/əˈmæs ə ˈfɔː.tʃən/",
        pos: "verb phrase",
        meaningEn: "accumulate vast financial wealth over time.",
        meaningVi: "Tích lũy khối tài sản kếch xù, gây dựng gia sản lớn.",
        nuanceTip: "Trích dẫn Mahatma Gandhi trong Unit 10C dùng cụm danh từ hóa 'the amassing of a large fortune'.",
        example: "Early semiconductor pioneers managed to amass a fortune through global licensing."
      },
      {
        id: "survival-of-the-fittest",
        word: "the survival of the fittest",
        ipa: "/səˈvaɪ.vəl əv ðə ˈfɪt.ɪst/",
        pos: "noun phrase",
        meaningEn: "intense Darwinian competition where only the most adaptable or strongest enterprises endure.",
        meaningVi: "Quy luật chọn lọc tự nhiên / kẻ mạnh nhất mới tồn tại trên thương trường.",
        nuanceTip: "Dùng để bình luận về cạnh tranh khốc liệt trong IELTS Writing Task 2.",
        example: "Deregulated e-commerce often resembles the survival of the fittest."
      },
      {
        id: "chief-executive",
        word: "a chief executive",
        ipa: "/ˌtʃiːf ɪɡˈzek.jə.tɪv/",
        pos: "noun",
        meaningEn: "the highest-ranking operational leader responsible for an entire corporation (CEO).",
        meaningVi: "Giám đốc điều hành cấp cao nhất (CEO).",
        nuanceTip: "Xuất hiện trong trích dẫn của nhà kinh tế học J. K. Galbraith và Ex 10.5.",
        example: "The board appointed a veteran engineer as chief executive of the aerospace group."
      },
      {
        id: "award-for-achievement",
        word: "an award for achievement",
        ipa: "/ən əˈwɔːd fər əˈtʃiːv.mənt/",
        pos: "noun phrase",
        meaningEn: "formal recognition or prize honouring outstanding professional results.",
        meaningVi: "Giải thưởng vinh danh thành tựu xuất sắc.",
        nuanceTip: "Giới từ chuẩn theo Key 10.4.5: 'an award FOR achievement'.",
        example: "Last year her fintech start-up won a national award for achievement in inclusion."
      },
      {
        id: "personal-gesture",
        word: "a personal gesture",
        ipa: "/ə ˈpɜː.sən.əl ˈdʒes.tʃər/",
        pos: "noun phrase",
        meaningEn: "a spontaneous or thoughtful individual act conveying goodwill, generosity, or appreciation.",
        meaningVi: "Cử chỉ chân thành mang tính cá nhân (biểu thị thiện chí hoặc tri ân).",
        nuanceTip: "Key 10.5.8: 'In a remarkable personal gesture, he gave his prize money away to his employees.'",
        example: "Handwriting thank-you notes to night-shift staff was a deeply appreciated personal gesture."
      },
      {
        id: "turn-your-hand-to",
        word: "turn your hand to",
        ipa: "/tɜːn jɔː hænd tuː/",
        pos: "idiom",
        meaningEn: "apply yourself competently to any practical task or unfamiliar challenge that arises.",
        meaningVi: "Xắn tay làm được bất cứ việc gì một cách khéo léo, đa năng.",
        nuanceTip: "Key 10.5.3: 'prepared to turn his hand to any job that needs doing'.",
        example: "Early founders must be willing to turn their hand to sales, support, and bookkeeping."
      },
      {
        id: "human-factor",
        word: "the human factor",
        ipa: "/ðə ˈhjuː.mən ˈfæk.tər/",
        pos: "noun phrase",
        meaningEn: "the vital influence of human emotions, judgment, well-being, and morale on workplace outcomes.",
        meaningVi: "Yếu tố con người (tâm lý, phúc lợi và động lực của nhân sự).",
        nuanceTip: "Cực kỳ hữu ích cho IELTS Writing về tự động hóa / AI vs lao động con người.",
        example: "Algorithmic efficiency fails whenever executives ignore the human factor."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Contracts, Tenders & Payments",
        subtitle: "Từ vựng chuyên ngành hợp đồng, đấu thầu và công nợ",
        items: [
          {
            label: "submit / win a tender · penalty clause · meet a deadline",
            detail:
              "Nộp hồ sơ dự thầu là 'put in / submit a tender'; trúng thầu là 'win a tender'. Điều khoản phạt vi phạm là 'a penalty clause'; giao hàng/hoàn thành đúng hẹn cam kết là 'meet a deadline'.",
            example:
              "To win a public tender, firms must meet every deadline or trigger the penalty clause."
          },
          {
            label: "outstanding account · default on payment · acknowledge receipt · ship · expire",
            detail:
              "Hóa đơn còn nợ chưa trả là 'an outstanding account'; quỵt/không trả đúng hạn là 'default on a payment'. Báo đã nhận hàng/tiền là 'acknowledge receipt'; gửi hàng là 'ship an order (shipment)'; hết hạn là 'expire (expiry)'.",
            example:
              "Please acknowledge receipt of the shipment before our contract expires."
          }
        ]
      },
      {
        key: "B",
        title: "Management Satire & Organisational Vocabulary",
        subtitle: "Từ vựng quản trị và nhân sự cốt lõi (Section B & Ex 10.2)",
        items: [
          {
            label: "Human Resources · morale · flaw · lack · project · employee",
            detail:
              "Bộ phận Nhân sự là 'Human Resources'; sĩ khí tập thể là 'morale' (khác moral); lỗi trong lập luận/tính cách là 'a flaw'; sự thiếu hụt là 'a lack of...'.",
            example:
              "A subtle flaw in management communication can erode employee morale."
          }
        ]
      },
      {
        key: "C",
        title: "Business Quotes & C1 Collocations (Sections C, Ex 10.4–10.5)",
        subtitle: "9 cụm collocation lãnh đạo kinh điển cần thuộc nằm lòng",
        items: [
          {
            label: "chief executive · conduct business · amass a fortune · survival of the fittest",
            detail:
              "Tổng giám đốc điều hành = 'chief executive'; điều hành kinh doanh = 'conduct business'; tích lũy gia sản lớn = 'amass a fortune'; cạnh tranh sinh tồn = 'the survival of the fittest'.",
            example:
              "Even in a survival-of-the-fittest market, ethical chief executives conduct business fairly."
          },
          {
            label: "square deal · human factor · turn one's hand to · award for achievement · personal gesture",
            detail:
              "Đối xử công bằng = 'a square deal'; yếu tố con người = 'the human factor'; đa năng làm mọi việc = 'turn one's hand to'; giải thưởng thành tựu = 'an award for achievement'; nghĩa cử cá nhân = 'a personal gesture'.",
            example:
              "Giving workers a square deal reflects respect for the human factor."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-10-1",
        kind: "sentence_upgrade",
        title: "Bài tập 10.1 · Chuẩn hóa Văn bản Hợp đồng & Thư tín Thương mại",
        instruction:
          "Chọn câu viết lại chuẩn xác nhất sử dụng đúng từ khóa trong ngoặc từ Section A (Đáp án chuẩn theo Key 10.1).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 10 (EX 10.1)",
        questions: [
          {
            id: "10-1-1",
            originalSentence: "1. Do you have many accounts which have yet to be paid? (outstanding)",
            promptCue: "Dùng tính từ 'outstanding' ở Section A",
            options: [
              "Do you have many outstanding accounts?",
              "Do you have many accounts on approval?",
              "Do you have many penalty accounts?"
            ],
            correctOption: "Do you have many outstanding accounts?",
            explanationVi: "Key 10.1.1: 'outstanding accounts' = các khoản công nợ còn chưa được thanh toán."
          },
          {
            id: "10-1-2",
            originalSentence: "2. Until what date is your contract valid? (expire)",
            promptCue: "Diễn đạt lại ngắn gọn bằng động từ 'expire'",
            options: [
              "When does your contract expire?",
              "When does your contract default?",
              "When does your contract acknowledge?"
            ],
            correctOption: "When does your contract expire?",
            explanationVi: "Key 10.1.2: 'When does your contract expire?'"
          },
          {
            id: "10-1-3",
            originalSentence: "3. Please let us know when you receive our payment. (acknowledge)",
            promptCue: "Dùng cụm trang trọng 'acknowledge receipt'",
            options: [
              "Please acknowledge receipt of our payment.",
              "Please ship receipt of our payment.",
              "Please submit our payment receipt."
            ],
            correctOption: "Please acknowledge receipt of our payment.",
            explanationVi: "Key 10.1.3: 'Please acknowledge receipt of our payment.'"
          },
          {
            id: "10-1-4",
            originalSentence: "4. It is very important that you complete your work by the agreed time. (meet)",
            promptCue: "Dùng collocation 'meet + deadline'",
            options: [
              "It is very important that you meet the deadline.",
              "It is very important that you win the tender.",
              "It is very important that you avoid the expiry."
            ],
            correctOption: "It is very important that you meet the deadline.",
            explanationVi: "Key 10.1.4: 'It is very important that you meet the deadline.'"
          },
          {
            id: "10-1-5",
            originalSentence:
              "5. We would like to invite companies to send us proposals as to how they would do the job and what they would charge for it. (submit)",
            promptCue: "Dùng cụm 'submit tenders'",
            options: [
              "We would like to invite companies to submit tenders for the job.",
              "We would like to invite companies to hammer out tenders for the job.",
              "We would like to invite companies to default tenders for the job."
            ],
            correctOption: "We would like to invite companies to submit tenders for the job.",
            explanationVi: "Key 10.1.5: 'submit tenders for the job' (nộp hồ sơ dự thầu)."
          },
          {
            id: "10-1-6",
            originalSentence:
              "6. It is company policy to take legal action against customers who fail to pay their accounts. (default)",
            promptCue: "Dùng động từ 'default' + giới từ chuẩn",
            options: [
              "It is company policy to take legal action against customers who default on payment.",
              "It is company policy to take legal action against customers who expire on payment.",
              "It is company policy to take legal action against customers who lack in payment."
            ],
            correctOption:
              "It is company policy to take legal action against customers who default on payment.",
            explanationVi: "Key 10.1.6: 'customers who default on payment' (nhớ giới từ 'on')."
          }
        ]
      },
      {
        id: "ex-10-2",
        kind: "gap_fill",
        title: "Bài tập 10.2 · Từ vựng Quản trị & Nhân sự (Section B)",
        instruction:
          "Điền đúng 1 từ từ ngân hàng từ để hoàn thành 6 câu quản trị doanh nghiệp (Chấm theo Key 10.2).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 10 (EX 10.2)",
        wordBank: ["project", "flaw", "Resources", "morale", "lack", "employee"],
        questions: [
          {
            id: "10-2-1",
            promptBefore: "Joanna is working on a very interesting ",
            promptAfter: " at the moment.",
            answer: "project",
            hint: "Dự án công việc",
            explanationVi: "Key 10.2.1: 'project'."
          },
          {
            id: "10-2-2",
            promptBefore: "Unfortunately, there's a ",
            promptAfter: " in your reasoning.",
            answer: "flaw",
            hint: "Điểm yếu / lỗ hổng trong lập luận",
            explanationVi: "Key 10.2.2: 'a flaw in your reasoning'."
          },
          {
            id: "10-2-3",
            promptBefore: "What used to be called Personnel is now called Human ",
            promptAfter: ".",
            answer: "Resources",
            acceptedAnswers: ["resources"],
            hint: "Phòng Nhân sự (chữ cái đầu viết hoa theo cụm tên bộ phận)",
            explanationVi: "Key 10.2.3: 'Human Resources'."
          },
          {
            id: "10-2-4",
            promptBefore: "The new manager is doing his best to raise ",
            promptAfter: " in the office.",
            answer: "morale",
            hint: "Tinh thần / nhuệ khí làm việc của tập thể",
            explanationVi: "Key 10.2.4: 'raise morale' (nâng cao tinh thần nhân viên)."
          },
          {
            id: "10-2-5",
            promptBefore: "Sadly our new product has met with a total ",
            promptAfter: " of consumer interest.",
            answer: "lack",
            hint: "Sự thiếu vắng hoàn toàn ('a total ... of')",
            explanationVi: "Key 10.2.5: 'a total lack of consumer interest'."
          },
          {
            id: "10-2-6",
            promptBefore: "We are extremely sorry to lose Matt as an ",
            promptAfter: ".",
            answer: "employee",
            hint: "Nhân viên thuộc biên chế công ty",
            explanationVi: "Key 10.2.6: 'employee'."
          }
        ]
      },
      {
        id: "ex-10-5",
        kind: "gap_fill",
        title: "Bài tập 10.4 & 10.5 · Collocations Lãnh đạo qua Câu chuyện của Jack",
        instruction:
          "Vận dụng 8 cụm collocation kinh điển từ Ex 10.4 vào câu chuyện sự nghiệp của Jack (Đáp án chuẩn theo Key 10.5).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 10 (EX 10.4 & 10.5)",
        wordBank: [
          "chief executive",
          "amass a fortune",
          "turn his hand to",
          "a square deal",
          "the human factor",
          "to conduct business",
          "an award for achievement",
          "personal gesture"
        ],
        questions: [
          {
            id: "10-5-1",
            promptBefore: "Jack is now the ",
            promptAfter: " of a large company.",
            answer: "chief executive",
            acceptedAnswers: ["a chief executive"],
            hint: "Người đứng đầu điều hành công ty (CEO)",
            explanationVi: "Key 10.5.1: 'chief executive'."
          },
          {
            id: "10-5-2",
            promptBefore: "He managed to ",
            promptAfter: " by designing some computer software which sold all over the world.",
            answer: "amass a fortune",
            hint: "Tích lũy khối gia sản kếch xù",
            explanationVi: "Key 10.5.2: 'amass a fortune'."
          },
          {
            id: "10-5-3",
            promptBefore: "He's a talented man, prepared to ",
            promptAfter: " any job that needs doing.",
            answer: "turn his hand to",
            hint: "Sẵn sàng xắn tay làm mọi việc",
            explanationVi: "Key 10.5.3: 'turn his hand to'."
          },
          {
            id: "10-5-4",
            promptBefore: "He is good to his employees, always giving them ",
            promptAfter: ".",
            answer: "a square deal",
            hint: "Sự đãi ngộ công bằng, sòng phẳng",
            explanationVi: "Key 10.5.4: 'a square deal'."
          },
          {
            id: "10-5-5",
            promptBefore: "...because he knows how important ",
            promptAfter: " is in keeping staff committed.",
            answer: "the human factor",
            hint: "Yếu tố con người",
            explanationVi: "Key 10.5.5: 'the human factor'."
          },
          {
            id: "10-5-6",
            promptBefore: "...if you want ",
            promptAfter: " successfully.",
            answer: "to conduct business",
            acceptedAnswers: ["conduct business"],
            hint: "Điều hành kinh doanh (động từ nguyên mẫu có 'to')",
            explanationVi: "Key 10.5.6: 'to conduct business'."
          },
          {
            id: "10-5-7",
            promptBefore: "Last year he won ",
            promptAfter: " in business.",
            answer: "an award for achievement",
            hint: "Giải thưởng ghi nhận thành tích",
            explanationVi: "Key 10.5.7: 'an award for achievement'."
          },
          {
            id: "10-5-8",
            promptBefore: "In a remarkable ",
            promptAfter: ", he gave his prize money away to his employees.",
            answer: "personal gesture",
            acceptedAnswers: ["a personal gesture"],
            hint: "Nghĩa cử cá nhân đầy ấn tượng",
            explanationVi: "Key 10.5.8: 'personal gesture'."
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNIT 11: CRAMMING FOR SUCCESS: STUDY AND ACADEMIC WORK
  // =========================================================================
  {
    unitId: 11,
    chapterTitle: "Work and Study",
    titleEn: "Cramming for success: study and academic work",
    titleVi: "Ôn thi, Viết luận Học thuật & Nghiên cứu Đại học",
    cefr: "C1 – C2",
    estimatedMinutes: 11,
    summaryVi:
      "Phân biệt chuẩn xác 7 cấp độ bài viết học thuật (composition, essay, assignment, project, portfolio, dissertation, thesis), chiến lược ôn thi (cram, past papers, rote-learning, mnemonics, mind-map) và quy trình nghiên cứu đại học (plagiarism, submit, assess, academic journals, inter-library loan, drop out).",
    passageTitle: "Inside the Seminar Room: From First Draft to Doctoral Thesis",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 24 mục từ trọng tâm Unit 11",
    passageParagraphs: [
      [
        {
          text: "University success rarely comes from last-minute ",
        },
        { text: "cramming", lexiconId: "cram" },
        { text: " the night before ", },
        { text: "finals", lexiconId: "finals" },
        { text: ". Top scholars ", },
        { text: "revise", lexiconId: "revise" },
        { text: " steadily, analyse ", },
        { text: "past papers", lexiconId: "past-papers" },
        { text: ", and sketch a visual ", },
        { text: "mind-map", lexiconId: "mind-map" },
        { text: " rather than relying blindly on ", },
        { text: "rote-learning", lexiconId: "rote-learning" },
        { text: " or clever ", },
        { text: "mnemonics", lexiconId: "mnemonics" },
        { text: ". Ultimately, candidates still have to ", },
        { text: "bury themselves in their books", lexiconId: "bury-in-books" },
        { text: " until they ", },
        { text: "know the subject inside out", lexiconId: "inside-out" },
        { text: "." }
      ],
      [
        {
          text: "Academic prose also obeys precise genre boundaries. Schoolchildren begin with a short ",
        },
        { text: "composition", lexiconId: "composition" },
        { text: ", whereas undergraduates progress to a structured ", },
        { text: "essay", lexiconId: "essay" },
        { text: ", a semester-long ", },
        { text: "assignment", lexiconId: "assignment" },
        { text: ", an independent research ", },
        { text: "project", lexiconId: "project" },
        { text: ", or a curated ", },
        { text: "portfolio", lexiconId: "portfolio" },
        { text: ". At postgraduate level, an MSc ", },
        { text: "dissertation", lexiconId: "dissertation" },
        { text: " spans ten to fifteen thousand words, dwarfed only by a 90,000-word doctoral ", },
        { text: "thesis", lexiconId: "thesis" },
        { text: "." }
      ],
      [
        {
          text: "Every serious scholar drafts a rough ",
        },
        { text: "first draft", lexiconId: "first-draft" },
        { text: " before polishing the text—guarding ruthlessly against ", },
        { text: "plagiarism", lexiconId: "plagiarism" },
        { text: "—so they can ", },
        { text: "submit", lexiconId: "submit" },
        { text: " work ahead of the ", },
        { text: "deadline", lexiconId: "deadline" },
        { text: ", have it fairly ", },
        { text: "assessed", lexiconId: "assess" },
        { text: ", and act on constructive ", },
        { text: "feedback", lexiconId: "feedback" },
        { text: ". Researchers ", },
        { text: "carry out research", lexiconId: "carry-out-research" },
        { text: " across specialist ", },
        { text: "academic journals", lexiconId: "academic-journals" },
        { text: ", borrowing rare ", },
        { text: "papers", lexiconId: "paper" },
        { text: " via ", },
        { text: "inter-library loan", lexiconId: "inter-library-loan" },
        { text: " so fewer students burn out and ", },
        { text: "drop out", lexiconId: "drop-out" },
        { text: " mid-degree." }
      ]
    ],
    lexicon: [
      {
        id: "revise",
        word: "revise",
        ipa: "/rɪˈvaɪz/",
        pos: "verb",
        meaningEn: "re-read, review, and consolidate previously studied material systematically before an examination.",
        meaningVi: "Ôn tập hệ thống lại kiến thức đã học.",
        nuanceTip: "Ở Anh-Mỹ hay nói 'review', nhưng tiếng Anh học thuật chuẩn Cambridge/IELTS luôn dùng 'revise for an exam'.",
        example: "Dividing topics across six weeks is far healthier than revising everything overnight."
      },
      {
        id: "cram",
        word: "cram (for an exam)",
        ipa: "/kræm/",
        pos: "verb",
        meaningEn: "study intensively in a very short, frantic period right before an examination.",
        meaningVi: "Học nhồi nhét cấp tốc sát ngày thi.",
        nuanceTip: "Có sắc thái vội vã, đối lập với 'steady revision'.",
        example: "Cramming formulas before dawn rarely transfers into long-term analytical fluency."
      },
      {
        id: "past-papers",
        word: "past papers",
        ipa: "/pɑːst ˈpeɪ.pəz/",
        pos: "noun (plural)",
        meaningEn: "actual examination question sheets preserved from previous years for practice.",
        meaningVi: "Đề thi các năm trước (bộ đề luyện thi).",
        nuanceTip: "Collocation chuẩn: look at / practise / work through past papers.",
        example: "Analysing five years of past papers reveals how examiners structure tricky timing."
      },
      {
        id: "rote-learning",
        word: "rote-learning",
        ipa: "/ˈrəʊt ˌlɜː.nɪŋ/",
        pos: "noun (uncountable)",
        meaningEn: "memorising information strictly through mechanical repetition rather than deep comprehension.",
        meaningVi: "Học vẹt / học thuộc máy móc qua lặp đi lặp lại.",
        nuanceTip: "Từ khóa vàng trong IELTS Writing Task 2 chủ đề Giáo dục (so sánh với critical thinking).",
        example: "Pure rote-learning leaves candidates unprepared when questions rephrase familiar ideas."
      },
      {
        id: "mnemonics",
        word: "mnemonics",
        ipa: "/nɪˈmɒn.ɪks/",
        pos: "noun (plural, silent 'm')",
        meaningEn: "rhymes, acronyms, or mental association tricks devised to aid memory retrieval.",
        meaningVi: "Mẹo ghi nhớ (câu vần, chữ cái đầu giúp nhớ quy tắc chính tả/kiến thức).",
        nuanceTip: "Chữ 'm' đầu tiên bị câm khi phát âm (/nɪˈmɒn.ɪks/).",
        example: "'I before E except after C' remains one of the best-known English spelling mnemonics."
      },
      {
        id: "bury-in-books",
        word: "bury yourself in your books",
        ipa: "/ˈber.i jɔːˈself ɪn jɔː bʊks/",
        pos: "idiom",
        meaningEn: "devote your maximum time and focus exclusively to reading and studying deeply.",
        meaningVi: "Vùi đầu vào sách vở, tập trung học hết sức.",
        nuanceTip: "Thay thế sinh động cho 'spend huge amounts of time reading'.",
        example: "During May revision weeks, final-year students bury themselves in their books."
      },
      {
        id: "inside-out",
        word: "know (a subject) inside out",
        ipa: "/ˌɪn.saɪd ˈaʊt/",
        pos: "idiom",
        meaningEn: "understand every detail, edge case, and nuance of a topic completely.",
        meaningVi: "Nắm chắc như lòng bàn tay, hiểu tường tận 100% vấn đề.",
        nuanceTip: "Key 11.2 thay 'know the subject 100 per cent' bằng 'know the subject inside out'.",
        example: "Top advocates prepare until they know every statute in the brief inside out."
      },
      {
        id: "composition",
        word: "composition",
        ipa: "/ˌkɒm.pəˈzɪʃ.ən/",
        pos: "noun",
        meaningEn: "a short piece of school writing (often 50–100 words), typically written by young learners.",
        meaningVi: "Bài tập làm văn ngắn (thường 50–100 từ ở bậc tiểu học/phổ thông).",
        nuanceTip: "Không dùng 'composition' để chỉ luận văn thạc sĩ 12,000 từ (dùng 'dissertation').",
        example: "Little Martha proudly handed in her first 80-word composition titled 'My Family'."
      },
      {
        id: "essay",
        word: "essay",
        ipa: "/ˈes.eɪ/",
        pos: "noun",
        meaningEn: "a formal, structured analytical text ranging from several hundred to a few thousand words.",
        meaningVi: "Bài tiểu luận học thuật (thường vài trăm tới vài nghìn từ).",
        nuanceTip: "Key 11.1.4: bài viết 1,000 từ hằng tuần gọi chuẩn là 'essay', không gọi là 'project'.",
        example: "Weekly 1,200-word essays sharpen argument flow before timed exams."
      },
      {
        id: "assignment",
        word: "assignment",
        ipa: "/əˈsaɪn.mənt/",
        pos: "noun",
        meaningEn: "a substantial assessed piece of coursework, often thousands of words long.",
        meaningVi: "Bài tập lớn / đồ án học phần được chấm lấy điểm môn học.",
        nuanceTip: "Key 11.1.5: '5,000-word assignment' (không gọi là thesis vì thesis tới 80–100k từ).",
        example: "Each semester concludes with a 4,000-word assessed assignment."
      },
      {
        id: "project",
        word: "project",
        ipa: "/ˈprɒdʒ.ekt/",
        pos: "noun",
        meaningEn: "a major coursework task emphasising independent student-chosen material, data, or creative investigation.",
        meaningVi: "Đồ án nghiên cứu cá nhân (học viên tự chọn đề tài & tư liệu).",
        nuanceTip: "Key 11.1.7 nhấn mạnh điểm cốt lõi của 'project' là tính tự chủ chọn chủ đề nghiên cứu cá nhân.",
        example: "She opted for an empirical project instead of written exams to explore urban acoustics."
      },
      {
        id: "portfolio",
        word: "portfolio",
        ipa: "/pɔːtˈfəʊ.li.əʊ/",
        pos: "noun",
        meaningEn: "an assessed collection containing multiple separate items of work (written, visual, or practical).",
        meaningVi: "Hồ sơ tổng hợp nhiều sản phẩm học tập khác nhau (có thể gồm ảnh, bản vẽ, bài viết).",
        nuanceTip: "Key 11.1.3: một tập hợp gồm nhiều tác phẩm riêng lẻ gọi là 'portfolio'.",
        example: "Architecture applicants submit a digital portfolio showcasing five distinct studio models."
      },
      {
        id: "dissertation",
        word: "dissertation",
        ipa: "/ˌdɪs.əˈteɪ.ʃən/",
        pos: "noun",
        meaningEn: "an extended, research-driven academic work of roughly 10,000–15,000 words for a bachelor's or master's degree.",
        meaningVi: "Khóa luận tốt nghiệp / luận văn thạc sĩ (khoảng 10.000–15.000 từ).",
        nuanceTip: "Ở Anh-Anh: Dissertation = Cử nhân/Thạc sĩ (~12k từ); Thesis = Tiến sĩ (~90k từ).",
        example: "His MSc dissertation surveyed consumer privacy habits across 12,000 words."
      },
      {
        id: "thesis",
        word: "thesis",
        ipa: "/ˈθiː.sɪs/",
        pos: "noun (plural: theses)",
        meaningEn: "a massive, original research monograph (typically 80,000–100,000 words) required for a PhD.",
        meaningVi: "Luận án Tiến sĩ gốc (thường 80.000–100.000 từ).",
        nuanceTip: "Key 11.1.1: 'His PhD thesis was 90,000 words long...'.",
        example: "After four years of archival fieldwork, she defended her 90,000-word PhD thesis."
      },
      {
        id: "mind-map",
        word: "mind-map",
        ipa: "/ˈmaɪnd mæp/",
        pos: "noun",
        meaningEn: "a branching visual diagram mapping how sub-ideas connect around a central concept.",
        meaningVi: "Sơ đồ tư duy (trực quan hóa liên kết ý tưởng trước khi viết).",
        nuanceTip: "Công cụ hữu ích để lập dàn ý IELTS Writing Task 2 & Reading summary.",
        example: "Sketching a mind-map prevents rambling paragraphs during essay planning."
      },
      {
        id: "first-draft",
        word: "a first draft",
        ipa: "/fɜːst drɑːft/",
        pos: "noun phrase",
        meaningEn: "the initial, unpolished version of an essay or report written prior to editing.",
        meaningVi: "Bản thảo đầu tiên (trước khi chỉnh sửa và hoàn thiện 'write up').",
        nuanceTip: "Key 11.4.1: 'the first attempt at writing something'.",
        example: "Write your first draft boldly, then refine structure and cohesion separately."
      },
      {
        id: "plagiarism",
        word: "plagiarism",
        ipa: "/ˈpleɪ.dʒər.ɪ.zəm/",
        pos: "noun (uncountable)",
        meaningEn: "dishonestly presenting another author's words, data, or ideas as your own without citation.",
        meaningVi: "Hành vi đạo văn (vi phạm nghiêm trọng liêm chính học thuật).",
        nuanceTip: "Phát âm /ˈpleɪdʒərɪzəm/; người đạo văn là 'plagiarist'.",
        example: "Universities treat unattributed copying as serious plagiarism regardless of intent."
      },
      {
        id: "deadline",
        word: "deadline",
        ipa: "/ˈded.laɪn/",
        pos: "noun",
        meaningEn: "the strict final date or hour by which coursework must be submitted.",
        meaningVi: "Hạn chót nộp bài.",
        nuanceTip: "Meet a deadline / miss a deadline / extend a deadline.",
        example: "Late submissions beyond the Friday deadline incur an automatic penalty."
      },
      {
        id: "submit",
        word: "submit",
        ipa: "/səbˈmɪt/",
        pos: "verb (formal)",
        meaningEn: "hand in or upload formal coursework for evaluation (more formal than 'hand in').",
        meaningVi: "Nộp bài chính thức (trang trọng hơn 'hand in').",
        nuanceTip: "Key 11.4.4 ghép đôi: submit = hand in; assess = mark.",
        example: "Candidates must submit electronic dissertations by noon."
      },
      {
        id: "assess",
        word: "assess",
        ipa: "/əˈses/",
        pos: "verb (formal)",
        meaningEn: "evaluate quality formally and assign an official grade (more formal than 'mark').",
        meaningVi: "Đánh giá và chấm điểm học thuật (trang trọng hơn 'mark').",
        nuanceTip: "Danh từ tương ứng: assessment.",
        example: "Two independent examiners assess each doctoral portfolio."
      },
      {
        id: "feedback",
        word: "feedback",
        ipa: "/ˈfiːd.bæk/",
        pos: "noun (uncountable)",
        meaningEn: "diagnostic comments and guidance from a tutor regarding strengths and flaws in a student's work.",
        meaningVi: "Nhận xét góp ý chuyên môn từ giảng viên (danh từ không đếm được!).",
        nuanceTip: "Tuyệt đối KHÔNG thêm 's' thành 'feedbacks' trong tiếng Anh!",
        example: "Detailed written feedback helps learners pinpoint recurring grammar errors."
      },
      {
        id: "carry-out-research",
        word: "carry out research",
        ipa: "/ˈkær.i aʊt rɪˈsɜːtʃ/",
        pos: "verb phrase",
        meaningEn: "plan and execute systematic scholarly investigation (also 'conduct research').",
        meaningVi: "Tiến hành nghiên cứu khoa học.",
        nuanceTip: "Không dùng 'do a research' hoặc số nhiều 'researches' — research là danh từ không đếm được.",
        example: "Marine biologists carry out research along shifting tidal estuaries."
      },
      {
        id: "academic-journals",
        word: "academic journals",
        ipa: "/ˌæk.əˈdem.ɪk ˈdʒɜː.nəlz/",
        pos: "noun (plural)",
        meaningEn: "peer-reviewed specialist periodicals publishing scholarly papers (distinct from commercial magazines).",
        meaningVi: "Tạp chí khoa học chuyên ngành có bình duyệt (không gọi là 'magazines').",
        nuanceTip: "Một bài nghiên cứu đăng trong đó gọi là 'a paper' (Key 11.4.6).",
        example: "Cite peer-reviewed academic journals rather than unverified blogs in your literature review."
      },
      {
        id: "paper",
        word: "a paper",
        ipa: "/ˈpeɪ.pər/",
        pos: "noun (countable)",
        meaningEn: "an individual scholarly research article published in an academic journal or presented at a conference.",
        meaningVi: "Bài báo / công trình nghiên cứu khoa học (đếm được).",
        nuanceTip: "Phân biệt: 'paper' (giấy — không đếm được) vs 'a paper' (bài báo khoa học — đếm được).",
        example: "She published three landmark papers on bilingual phonology before finishing her fellowship."
      },
      {
        id: "inter-library-loan",
        word: "inter-library loan",
        ipa: "/ˌɪn.təˈlaɪ.brər.i ləʊn/",
        pos: "noun phrase",
        meaningEn: "an exchange system enabling a library to borrow rare books or journal articles from another institution.",
        meaningVi: "Dịch vụ mượn tài liệu liên thư viện.",
        nuanceTip: "Key 11.4.7: thuật ngữ thực tế hữu ích khi tìm tài liệu hiếm tại đại học Anh.",
        example: "If an archival monograph is out of print, request it via inter-library loan."
      },
      {
        id: "drop-out",
        word: "drop out",
        ipa: "/drɒp aʊt/",
        pos: "phrasal verb",
        meaningEn: "withdraw permanently from a school, degree, or course before completion due to difficulty or personal strain.",
        meaningVi: "Bỏ học giữa chừng (chưa hoàn thành khóa học).",
        nuanceTip: "Danh từ chỉ người bỏ học là 'a dropout' (viết liền); động từ 'drop out' viết tách.",
        example: "Targeted mentoring lowers first-year dropout rates among engineering undergraduates."
      },
      {
        id: "finals",
        word: "finals",
        ipa: "/ˈfaɪ.nəlz/",
        pos: "noun (plural)",
        meaningEn: "the concluding set of university examinations determining a student's final degree classification.",
        meaningVi: "Kỳ thi tốt nghiệp cuối khóa đại học.",
        nuanceTip: "Thường luôn dùng ở dạng số nhiều 'finals'.",
        example: "The majority of students survive intensive seminars and sit their finals in June."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Study Habits & Exam Preparation",
        subtitle: "Từ vựng ôn thi và chiến lược ghi nhớ (Sections A & Ex 11.3)",
        items: [
          {
            label: "revise vs cram · past papers · rote-learning · mnemonics",
            detail:
              "Ôn tập bài bản là 'revise', học nhồi cấp tốc sát giờ là 'cram'. Đề thi năm trước là 'past papers'; học vẹt lặp đi lặp lại là 'rote-learning'; mẹo ghi nhớ là 'mnemonics' (âm /m/ câm).",
            example:
              "Instead of relying purely on rote-learning, combine mind-maps with timed past papers."
          },
          {
            label: "Idioms ôn thi: bury yourself in books · inside out · breeze through · go blank",
            detail:
              "• 'bury yourself in your books' = vùi đầu đọc sâu; 'know inside out' = nắm chắc 100%.\n• 'fall behind with studies' = tụt lại; 'breeze through exams' = vượt qua nhẹ nhàng; 'get the hang of' = hiểu cách vận hành; 'mind goes blank' = đầu óc trống rỗng.",
            example:
              "Students who fall behind rarely breeze through finals without panic."
          }
        ]
      },
      {
        key: "B",
        title: "Written Work Scale: Từ 50 từ tới 100.000 từ",
        subtitle: "Thang phân cấp 7 loại bài viết học thuật chuẩn Cambridge (Section B)",
        items: [
          {
            label: "composition (50–100w) < essay (hundreds–thousands) < assignment / project < portfolio",
            detail:
              "1) 'composition': bài tập làm văn ngắn trẻ em (50–100 từ). 2) 'essay': tiểu luận học thuật nghiêm túc. 3) 'assignment': bài tập lớn lấy điểm môn học (~vài nghìn từ). 4) 'project': đồ án tự chọn đề tài & tư liệu. 5) 'portfolio': tập hợp nhiều sản phẩm học tập khác nhau.",
            example:
              "An art portfolio contains five pieces, while a history essay builds one sustained argument."
          },
          {
            label: "dissertation (10–15,000 words) vs thesis (80–100,000 words)",
            detail:
              "6) 'dissertation': khóa luận tốt nghiệp cử nhân hoặc thạc sĩ (~10–15,000 từ). 7) 'thesis': luận án tiến sĩ nghiên cứu độc lập quy mô lớn (~80–100,000 từ, e.g. PhD thesis).",
            example:
              "He completed a 12,000-word MSc dissertation before embarking on a 90,000-word PhD thesis."
          }
        ]
      },
      {
        key: "C",
        title: "Academic Writing Process & Higher Research (Sections C & D)",
        subtitle: "Từ bản nháp đầu tiên đến tạp chí bình duyệt đại học",
        items: [
          {
            label: "mind-map · first draft · write up · plagiarism · deadline · submit · assess · feedback",
            detail:
              "Lập 'mind-map' -> viết 'first draft' -> hoàn thiện ('write up'). Tuyệt đối tránh đạo văn ('plagiarism'). Nộp ('submit') đúng 'deadline' để giảng viên chấm ('assess') và trả nhận xét ('feedback' — không đếm được).",
            example:
              "After submitting my first draft before the deadline, I received helpful feedback."
          },
          {
            label: "carry out research · academic journals · papers · inter-library loan · drop out · finals",
            detail:
              "Làm nghiên cứu dùng 'carry out research'; tạp chí khoa học chuyên ngành là 'academic journals' (không dùng magazines) đăng các bài nghiên cứu ('papers'). Mượn tài liệu từ thư viện khác là 'inter-library loan'; bỏ học giữa chừng là 'drop out'.",
            example:
              "Scholars read specialist academic journals and request rare papers through inter-library loan."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-11-1",
        kind: "gap_fill",
        title: "Bài tập 11.1 · Phân biệt 7 Loại Bài viết Học thuật (Từ Composition đến PhD Thesis)",
        instruction:
          "7 câu trong Ex 11.1 cố tình dùng sai cấp độ bài viết. Điền danh từ CHUẨN từ Section B tương ứng với độ dài và cấp học mô tả (Chấm theo Key 11.1).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 11 (EX 11.1)",
        wordBank: [
          "thesis",
          "composition",
          "portfolio",
          "essay",
          "assignment",
          "dissertation",
          "project"
        ],
        questions: [
          {
            id: "11-1-1",
            promptBefore: "His PhD ",
            promptAfter: " was 90,000 words long and was on the history of US place names. (Sửa lỗi: 'assignment')",
            answer: "thesis",
            hint: "Công trình nghiên cứu Tiến sĩ ~80–100,000 từ",
            explanationVi: "Key 11.1.1: 'PhD thesis' (luận án tiến sĩ gốc dài hàng chục nghìn từ)."
          },
          {
            id: "11-1-2",
            promptBefore: "Little Martha did her first ",
            promptAfter: " in school today. It was called 'My family'. (Sửa lỗi: 'dissertation')",
            answer: "composition",
            hint: "Bài tập viết ngắn 50–100 từ của học sinh nhỏ",
            explanationVi: "Key 11.1.2: 'composition' (bài tập làm văn ngắn ở tiểu học)."
          },
          {
            id: "11-1-3",
            promptBefore: "We have to hand in a ",
            promptAfter: " at the end of the course. It can consist of up to five different pieces of work. (Sửa lỗi: 'essay')",
            answer: "portfolio",
            hint: "Tập hợp nhiều tác phẩm/bài tập riêng lẻ",
            explanationVi: "Key 11.1.3: 'portfolio' (bộ hồ sơ gồm nhiều tác phẩm gộp lại)."
          },
          {
            id: "11-1-4",
            promptBefore: "The teacher gave us the title of this week's ",
            promptAfter: " today. We have to write 1,000 words on 'If I ruled the world'. (Sửa lỗi: 'project')",
            answer: "essay",
            hint: "Bài tiểu luận hằng tuần ~1,000 từ",
            explanationVi: "Key 11.1.4: 'essay' (bài tiểu luận khoảng vài trăm đến vài nghìn từ)."
          },
          {
            id: "11-1-5",
            promptBefore: "At the end of this course you have to do a 5,000-word ",
            promptAfter: " which will be assessed for your final degree. (Sửa lỗi: 'thesis')",
            answer: "assignment",
            hint: "Bài tập lớn đánh giá cuối môn học (~vài nghìn từ)",
            explanationVi: "Key 11.1.5: '5,000-word assignment' (bài tiểu luận/đồ án dài của một khóa học)."
          },
          {
            id: "11-1-6",
            promptBefore: "I think I'll do a study of people's personal banking habits for my MSc ",
            promptAfter: ". It has to be about 12,000 words. (Sửa lỗi: 'composition')",
            answer: "dissertation",
            hint: "Luận văn bậc Thạc sĩ/Cử nhân dài ~10–15,000 từ",
            explanationVi: "Key 11.1.6: 'MSc dissertation' (luận văn thạc sĩ khoảng 12,000 từ)."
          },
          {
            id: "11-1-7",
            promptBefore: "I've chosen to do the ",
            promptAfter: " instead of the two exams, because I like to research something that interests me personally. (Sửa lỗi: 'portfolio')",
            answer: "project",
            hint: "Một đề tài nghiên cứu độc lập chọn theo sở thích cá nhân",
            explanationVi: "Key 11.1.7: 'the project' (một công trình duy nhất nhấn mạnh tự chọn đề tài & tư liệu)."
          }
        ]
      },
      {
        id: "ex-11-2",
        kind: "gap_fill",
        title: "Bài tập 11.2 · Chiến lược Ôn thi Bậc cao (Section A)",
        instruction:
          "Thay thế các cách diễn đạt dài dòng trong ngoặc bằng cụm từ vựng ôn thi chuẩn xác từ Section A (Chấm theo Key 11.2).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 11 (EX 11.2)",
        wordBank: [
          "cramming",
          "past papers",
          "by heart",
          "mnemonics",
          "revising",
          "mind-map",
          "rote-learning",
          "bury yourself in your books",
          "inside out"
        ],
        questions: [
          {
            id: "11-2-1",
            promptBefore: "When I'm ",
            promptAfter: " for an exam... (= 'preparing intensively')",
            answer: "cramming",
            hint: "Học nhồi cấp tốc trước ngày thi (V-ing)",
            explanationVi: "Key 11.2.1: 'cramming' (cram for an exam = ôn gấp rút trong thời gian ngắn)."
          },
          {
            id: "11-2-2",
            promptBefore: "...I don't see any point in looking up ",
            promptAfter: ", (= 'exam papers from previous years')",
            answer: "past papers",
            hint: "Đề thi các năm cũ",
            explanationVi: "Key 11.2.2: 'past papers'."
          },
          {
            id: "11-2-3",
            promptBefore: "...nor is there any point in just learning things (off) ",
            promptAfter: ". (= 'by memory')",
            answer: "by heart",
            acceptedAnswers: ["off by heart"],
            hint: "Học thuộc lòng",
            explanationVi: "Key 11.2.3: '(off) by heart'."
          },
          {
            id: "11-2-4",
            promptBefore: "I know some people develop very clever ",
            promptAfter: " to help them remember the material... (= 'memory tricks')",
            answer: "mnemonics",
            hint: "Mẹo ghi nhớ (bắt đầu bằng 'mn-')",
            explanationVi: "Key 11.2.4: 'mnemonics'."
          },
          {
            id: "11-2-5",
            promptBefore: "...but there's no real substitute for ",
            promptAfter: " the term's work. (= 're-reading and going over')",
            answer: "revising",
            hint: "Ôn tập hệ thống lại bài cả học kỳ (V-ing)",
            explanationVi: "Key 11.2.5: 'revising'."
          },
          {
            id: "11-2-6",
            promptBefore: "It's a good idea to have some sort of ",
            promptAfter: ", (= 'diagram to organise your ideas')",
            answer: "mind-map",
            acceptedAnswers: ["mind map"],
            hint: "Sơ đồ tư duy",
            explanationVi: "Key 11.2.6: 'mind-map'."
          },
          {
            id: "11-2-7",
            promptBefore: "...and ",
            promptAfter: " is useful, but in a limited way. (= 'memory-learning')",
            answer: "rote-learning",
            acceptedAnswers: ["rote learning"],
            hint: "Học vẹt qua lặp lại máy móc",
            explanationVi: "Key 11.2.7: 'rote-learning'."
          },
          {
            id: "11-2-8",
            promptBefore: "At the end of the day, you just have to ",
            promptAfter: " (= 'read a huge amount')",
            answer: "bury yourself in your books",
            hint: "Vùi đầu vào sách vở",
            explanationVi: "Key 11.2.8: 'bury yourself in your books'."
          },
          {
            id: "11-2-9",
            promptBefore: "...until you feel you know the subject ",
            promptAfter: ". (= '100 per cent')",
            answer: "inside out",
            hint: "Nắm chắc mọi ngóc ngách như lòng bàn tay",
            explanationVi: "Key 11.2.9: 'know the subject inside out'."
          }
        ]
      },
      {
        id: "ex-11-3",
        kind: "sentence_upgrade",
        title: "Bài tập 11.3 · Giải mã 4 Thành ngữ Học tập trong Ngữ cảnh",
        instruction:
          "Đọc ngữ cảnh từng câu và chọn nghĩa chính xác nhất của cụm thành ngữ được in nổi bật (Đáp án chuẩn theo Key 11.3).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 11 (EX 11.3)",
        questions: [
          {
            id: "11-3-1",
            originalSentence:
              "1. It's very easy to [fall behind with] your studies if you miss even just a few classes.",
            promptCue: "'fall behind with' trong ngữ cảnh nghỉ vài buổi học mang nghĩa gì?",
            options: [
              "find yourself far behind other students",
              "stay close behind other students",
              "get ahead of other students"
            ],
            correctOption: "find yourself far behind other students",
            explanationVi: "Key 11.3.1 (b): 'fall behind with studies' = bị tụt lại phía sau so với tiến độ lớp."
          },
          {
            id: "11-3-2",
            originalSentence:
              "2. She seemed to just [breeze through] the exams. Everyone else was in such a panic and almost had nervous breakdowns.",
            promptCue: "'breeze through' (đối lập với hoảng loạn) mang nghĩa gì?",
            options: [
              "do them calmly and efficiently",
              "not take them seriously",
              "cheat in them"
            ],
            correctOption: "do them calmly and efficiently",
            explanationVi: "Key 11.3.2 (a): 'breeze through' = vượt qua kỳ thi một cách nhẹ nhàng, bình tĩnh và hiệu quả."
          },
          {
            id: "11-3-3",
            originalSentence:
              "3. I just can't seem to [get the hang of] English prepositions. Just when I think I've learnt them I make new mistakes.",
            promptCue: "'get the hang of' khi học điểm ngữ pháp khó mang nghĩa gì?",
            options: [
              "understand",
              "memorise",
              "enjoy"
            ],
            correctOption: "understand",
            explanationVi: "Key 11.3.3 (b): 'get the hang of something' = nắm bắt được cách thức / hiểu thấu quy luật."
          },
          {
            id: "11-3-4",
            originalSentence:
              "4. When I sat down and looked at the exam paper my mind just [went blank]. Everyone else seemed to be writing away quite happily.",
            promptCue: "'went blank' khi vừa mở đề thi mang nghĩa gì?",
            options: [
              "became empty",
              "became confused",
              "became very focused"
            ],
            correctOption: "became empty",
            explanationVi: "Key 11.3.4 (c): 'one's mind goes blank' = đầu óc bỗng chốc trống rỗng, quên sạch chữ."
          }
        ]
      },
      {
        id: "ex-11-4",
        kind: "gap_fill",
        title: "Bài tập 11.4 · Quy trình Viết luận & Nghiên cứu Đại học",
        instruction:
          "Trả lời nhanh 6 câu định nghĩa chuẩn về quy trình học thuật ở Section C & D (Chấm theo Key 11.4).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 11 (EX 11.4)",
        wordBank: [
          "a first draft",
          "a deadline",
          "plagiarism",
          "submit; assess",
          "drop out",
          "inter-library loan",
          "feedback"
        ],
        questions: [
          {
            id: "11-4-1",
            promptBefore: "What do we call the first attempt at writing something, e.g. an essay? → ",
            promptAfter: "",
            answer: "a first draft",
            acceptedAnswers: ["first draft"],
            hint: "Bản thảo sơ khai đầu tiên",
            explanationVi: "Key 11.4.1: 'a first draft'."
          },
          {
            id: "11-4-2",
            promptBefore: "What word means 'the date by which you must do something'? → ",
            promptAfter: "",
            answer: "a deadline",
            acceptedAnswers: ["deadline"],
            hint: "Hạn chót",
            explanationVi: "Key 11.4.2: 'a deadline'."
          },
          {
            id: "11-4-3",
            promptBefore: "What word means 'using someone else's ideas as if they were yours'? → ",
            promptAfter: "",
            answer: "plagiarism",
            hint: "Tội đạo văn học thuật",
            explanationVi: "Key 11.4.3: 'plagiarism'."
          },
          {
            id: "11-4-4",
            promptBefore: "What are more formal words for 'to hand in' and for 'to mark'? → ",
            promptAfter: "",
            answer: "submit; assess",
            acceptedAnswers: ["submit, assess", "submit / assess", "submit and assess"],
            hint: "Hai động từ học thuật (cách nhau dấu chấm phẩy)",
            explanationVi: "Key 11.4.4: 'submit; assess'."
          },
          {
            id: "11-4-5",
            promptBefore: "What verb do we use when someone doesn't complete their course? → ",
            promptAfter: "",
            answer: "drop out",
            hint: "Cụm động từ nghĩa là bỏ học giữa chừng",
            explanationVi: "Key 11.4.5: 'drop out'."
          },
          {
            id: "11-4-6",
            promptBefore: "What is the name of the system for getting books from other libraries? → ",
            promptAfter: "",
            answer: "inter-library loan",
            hint: "Hệ thống mượn liên thư viện",
            explanationVi: "Key 11.4.7: 'inter-library loan'."
          },
          {
            id: "11-4-7",
            promptBefore: "What word means 'the comments you get back from the teacher about your work'? → ",
            promptAfter: "",
            answer: "feedback",
            hint: "Nhận xét phản hồi (không có -s)",
            explanationVi: "Key 11.4.8: 'feedback'."
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNIT 12: EDUCATION: DEBATES AND ISSUES
  // =========================================================================
  {
    unitId: 12,
    chapterTitle: "Work and Study",
    titleEn: "Education: debates and issues",
    titleVi: "Tranh luận Chính sách Giáo dục & Công bằng Cơ hội",
    cefr: "C1 – C2",
    estimatedMinutes: 10,
    summaryVi:
      "Bộ từ vựng đắt giá nhất cho IELTS Writing Task 2 chủ đề Education: equality of opportunity, selective vs comprehensive schooling, elitism, league tables, perpetuate inequalities, two-tier system, well-endowed, the three Rs, literacy & numeracy, curriculum reform và lifelong education.",
    passageTitle: "Bridging the Divide: Equity, League Tables, and Lifelong Learning",
    passageSubtitle: "ARIS Curated Passage · Tích hợp 22 mục từ trọng tâm Unit 12",
    passageParagraphs: [
      [
        {
          text: "Public policy on ",
        },
        { text: "schooling", lexiconId: "schooling" },
        { text: " hinges on whether systems uphold true ", },
        { text: "equality of opportunity", lexiconId: "equality-of-opportunity" },
        { text: " or quietly reward privilege. The longstanding clash between ", },
        { text: "selective", lexiconId: "selective" },
        { text: " entrance exams and open ", },
        { text: "comprehensive", lexiconId: "comprehensive" },
        { text: " academies raises fears that academic ", },
        { text: "elitism", lexiconId: "elitism" },
        { text: " remains ", },
        { text: "inherent in", lexiconId: "inherent-in" },
        { text: " national rankings. Critics argue that published school ", },
        { text: "league tables", lexiconId: "league-tables" },
        { text: " unintentionally ", },
        { text: "perpetuate", lexiconId: "perpetuate" },
        { text: " social gaps and entrench a ", },
        { text: "two-tier system", lexiconId: "two-tier-system" },
        { text: "." }
      ],
      [
        {
          text: "Families naturally ",
        },
        { text: "perceive", lexiconId: "perceive" },
        { text: " elite rankings as decisive, enabling ", },
        { text: "better-off", lexiconId: "better-off" },
        { text: " households and historically ", },
        { text: "well-endowed", lexiconId: "well-endowed" },
        { text: " colleges to attract top applicants. Over decades, this sorting mechanism risks ", },
        { text: "depressing", lexiconId: "depress" },
        { text: " mobility for ", },
        { text: "less well-off", lexiconId: "less-well-off" },
        { text: " students who possess every capacity to ", },
        { text: "excel", lexiconId: "excel" },
        { text: " once given fair mentorship." }
      ],
      [
        {
          text: "Meanwhile, debates over daily classroom priorities swing between ",
        },
        { text: "curriculum reform", lexiconId: "curriculum-reform" },
        { text: " and renewed focus on ", },
        { text: "the three Rs", lexiconId: "three-rs" },
        { text: "—core ", },
        { text: "literacy", lexiconId: "literacy" },
        { text: " and ", },
        { text: "numeracy", lexiconId: "numeracy" },
        { text: " foundations. Forward-looking universities champion ", },
        { text: "lifelong education", lexiconId: "lifelong-education" },
        { text: " for ", },
        { text: "mature students", lexiconId: "mature-students" },
        { text: ", fund targeted ", },
        { text: "special needs education", lexiconId: "special-needs" },
        { text: " featuring ", },
        { text: "one-to-one", lexiconId: "one-to-one" },
        { text: " tuition, and enforce zero-tolerance policies against school ", },
        { text: "bullying", lexiconId: "bullying" },
        { text: "." }
      ]
    ],
    lexicon: [
      {
        id: "equality-of-opportunity",
        word: "equality of opportunity",
        ipa: "/ɪˈkwɒl.ə.ti əv ˌɒp.əˈtʃuː.nə.ti/",
        pos: "noun phrase",
        meaningEn: "a fair social principle where every learner receives equal chances to progress regardless of wealth or background.",
        meaningVi: "Sự bình đẳng về cơ hội học tập (cho mọi học sinh không phân biệt xuất thân).",
        nuanceTip: "Cụm danh từ học thuật kinh điển mở đầu đoạn văn IELTS Writing Task 2 về bình đẳng giáo dục.",
        example: "State scholarships are designed to protect equality of opportunity across rural regions."
      },
      {
        id: "selective",
        word: "selective (education / schooling)",
        ipa: "/sɪˈlek.tɪv/",
        pos: "adjective",
        meaningEn: "an educational admission policy in which pupils must pass competitive entrance exams to gain entry.",
        meaningVi: "Hệ thống tuyển chọn qua thi đầu vào (trường chuyên / lớp chọn).",
        nuanceTip: "Đối lập trực tiếp với 'comprehensive' (nhận học sinh đại trà không thi tuyển).",
        example: "Defenders of selective schools argue that gifted learners flourish alongside academic peers."
      },
      {
        id: "comprehensive",
        word: "comprehensive (schooling)",
        ipa: "/ˌkɒm.prɪˈhen.sɪv/",
        pos: "adjective",
        meaningEn: "public education open to pupils of all academic abilities without selective entrance examinations.",
        meaningVi: "Giáo dục phổ thông tổng hợp không phân biệt/thi tuyển đầu vào.",
        nuanceTip: "Ở Anh Quốc hay dùng cụm 'comprehensive schools' / 'comprehensive education'.",
        example: "Comprehensive education remains a cornerstone ideal for promoting social cohesion."
      },
      {
        id: "schooling",
        word: "schooling",
        ipa: "/ˈskuː.lɪŋ/",
        pos: "noun (uncountable)",
        meaningEn: "formal education received by children at school.",
        meaningVi: "Quá trình giáo dục phổ thông ở nhà trường.",
        nuanceTip: "Hay đi trong cụm 'compulsory schooling' (giáo dục bắt buộc).",
        example: "Early years schooling lays the cognitive bedrock for lifelong curiosity."
      },
      {
        id: "elitism",
        word: "elitism",
        ipa: "/ɪˈliː.tɪ.zəm/",
        pos: "noun (uncountable, negative)",
        meaningEn: "a system or attitude favouring a small, socially privileged minority over the broader public.",
        meaningVi: "Chủ nghĩa tinh hoa đặc quyền (ưu ái nhóm nhỏ có điều kiện).",
        nuanceTip: "Key 12.2.2: 'Elitism is bad for the country in the long term.'",
        example: "Critics warn that unchecked private tutoring reinforces academic elitism."
      },
      {
        id: "inherent-in",
        word: "inherent in",
        ipa: "/ɪnˈher.ənt ɪn/",
        pos: "adjective + preposition",
        meaningEn: "existing permanently as a fundamental, inseparable part of a system or situation.",
        meaningVi: "Cố hữu, vốn gắn sẵn bên trong một hệ thống (nâng cấp cho 'built into').",
        nuanceTip: "Giới từ chuẩn là 'in': 'inherent IN the education system' (Key 12.2.1).",
        example: "Funding disparities are often inherent in locally financed school districts."
      },
      {
        id: "league-tables",
        word: "league tables",
        ipa: "/ˈliːɡ ˌteɪ.bəlz/",
        pos: "noun (plural)",
        meaningEn: "published annual rankings ordering schools, hospitals, or universities from highest to lowest exam scores.",
        meaningVi: "Bảng xếp hạng thứ bậc các trường học/đại học từ cao xuống thấp.",
        nuanceTip: "Từ khóa cực đặc trưng của truyền thông giáo dục Anh Quốc & IELTS Reading.",
        example: "Obsessing over national league tables can tempt schools to narrow their syllabus."
      },
      {
        id: "perpetuate",
        word: "perpetuate",
        ipa: "/pəˈpetʃ.u.eɪt/",
        pos: "verb (formal)",
        meaningEn: "cause an undesirable condition, belief, or inequality to continue indefinitely.",
        meaningVi: "Làm kéo dài mãi, duy trì dai dẳng (thường đi với vấn đề tiêu cực).",
        nuanceTip: "Collocation vàng C2: 'perpetuate inequalities' / 'perpetuate stereotypes'.",
        example: "Unpaid internships risk perpetuating socioeconomic barriers in journalism."
      },
      {
        id: "two-tier-system",
        word: "two-tier system",
        ipa: "/ˌtuːˈtɪər ˈsɪs.təm/",
        pos: "noun phrase",
        meaningEn: "an unfair structure divided into two starkly unequal levels—one well-resourced, the other under-funded.",
        meaningVi: "Hệ thống phân tầng hai hạng (một tầng chất lượng cao, tầng kia yếu kém).",
        nuanceTip: "Key 12.2.4 dùng thay thế gọn cho 'a system where there are two levels of schools'.",
        example: "Analysts fear that soaring fees could cement a two-tier system in higher education."
      },
      {
        id: "perceive",
        word: "perceive",
        ipa: "/pəˈsiːv/",
        pos: "verb (formal)",
        meaningEn: "regard, view, or interpret something in a particular way (often subjectively).",
        meaningVi: "Nhìn nhận, đánh giá (trang trọng hơn 'consider' hoặc 'see as').",
        nuanceTip: "Key 12.2.7: 'is perceived by parents to be the key to success'.",
        example: "Vocational degrees are wrongly perceived by some employers as less rigorous."
      },
      {
        id: "better-off",
        word: "better-off",
        ipa: "/ˌbet.ərˈɒf/",
        pos: "adjective",
        meaningEn: "wealthier and enjoying stronger financial resources than average households.",
        meaningVi: "Khá giả hơn, có điều kiện kinh tế tốt hơn (lịch sự hơn 'richer').",
        nuanceTip: "Cặp đối xứng văn minh cho IELTS: better-off families vs less well-off families.",
        example: "Better-off parents frequently relocate inside catchment areas of top-ranked schools."
      },
      {
        id: "less-well-off",
        word: "less well-off",
        ipa: "/les ˌwelˈɒf/",
        pos: "adjective",
        meaningEn: "having significantly lower income and fewer financial advantages (diplomatic alternative to 'poorer').",
        meaningVi: "Kém khá giả hơn / có hoàn cảnh khó khăn hơn (diễn đạt lịch sự thay 'poorer').",
        nuanceTip: "Cách dùng học thuật tinh tế hơn 'poor people' trong bài luận chính sách.",
        example: "Targeted grants open university labs to bright students from less well-off communities."
      },
      {
        id: "well-endowed",
        word: "well-endowed",
        ipa: "/ˌwel.ɪnˈdaʊd/",
        pos: "adjective",
        meaningEn: "(of an institution) richly funded through substantial grants, endowments, legacies, and donations.",
        meaningVi: "Được tài trợ dồi dào, giàu quỹ hiến tặng và nguồn lực (nói về trường học/quỹ).",
        nuanceTip: "Key 12.2.5: thay thế chuẩn C2 cho 'have lots of wealth and receive gifts of money'.",
        example: "Well-endowed independent colleges invest heavily in robotics labs and libraries."
      },
      {
        id: "depress",
        word: "depressing (opportunity)",
        ipa: "/dɪˈpres/",
        pos: "verb",
        meaningEn: "reduce, push down, or restrict opportunities, wages, or economic outcomes.",
        meaningVi: "Làm suy giảm, kìm hãm (cơ hội, mức sống — nghĩa động từ khác với 'làm buồn').",
        nuanceTip: "Key 12.2.4: '...depresses the opportunities for children from less well-off families'.",
        example: "Regional underinvestment systematically depresses youth employment prospects."
      },
      {
        id: "excel",
        word: "excel (at)",
        ipa: "/ɪkˈsel/",
        pos: "verb",
        meaningEn: "perform exceptionally well and reach the highest standard in a subject or craft.",
        meaningVi: "Đạt thành tích xuất sắc vượt trội (giới từ chuẩn: excel AT / excel IN).",
        nuanceTip: "Key 12.2.6: 'excel at school' thay cho 'achieve the best possible results'.",
        example: "Supportive mentorship empowers introverted pupils to excel at laboratory sciences."
      },
      {
        id: "three-rs",
        word: "the three Rs",
        ipa: "/ðə θriː ɑːz/",
        pos: "noun phrase (idiom)",
        meaningEn: "foundational basic skills traditionally summarised as Reading, (w)Riting, and (a)Rithmetic.",
        meaningVi: "Ba kỹ năng nền tảng cổ điển: Đọc – Viết – Tính toán.",
        nuanceTip: "Gọi vui theo âm đầu /r/ dù 'writing' bắt đầu bằng 'w' và 'arithmetic' bằng 'a'.",
        example: "Every curriculum debate eventually circles back to mastering the three Rs first."
      },
      {
        id: "literacy",
        word: "literacy",
        ipa: "/ˈlɪt.ər.ə.si/",
        pos: "noun (uncountable)",
        meaningEn: "the essential ability to read and write competently (also digital/media literacy).",
        meaningVi: "Năng lực đọc viết (trái nghĩa: illiteracy).",
        nuanceTip: "Thường đi cặp song hành 'literacy and numeracy'.",
        example: "Early childhood storytelling boosts primary literacy far beyond drills alone."
      },
      {
        id: "numeracy",
        word: "numeracy",
        ipa: "/ˈnjuː.mə.rə.si/",
        pos: "noun (uncountable)",
        meaningEn: "the practical ability to count, reason quantitatively, and perform basic mathematics.",
        meaningVi: "Năng lực tính toán và tư duy con số cơ bản.",
        nuanceTip: "Cặp thuật ngữ chủ chốt trong báo cáo giáo dục OECD & IELTS Writing.",
        example: "Everyday financial decisions depend as much on numeracy as on advanced calculus."
      },
      {
        id: "curriculum-reform",
        word: "curriculum reform",
        ipa: "/kəˈrɪk.jə.ləm rɪˈfɔːm/",
        pos: "noun phrase",
        meaningEn: "systematic revisions to official school programmes, subjects, and national syllabuses.",
        meaningVi: "Cải cách chương trình giảng dạy quốc gia.",
        nuanceTip: "Collocation chuẩn: implement / oppose / politicise curriculum reform.",
        example: "Effective curriculum reform balances coding skills with critical civic literacy."
      },
      {
        id: "lifelong-education",
        word: "lifelong / continuing education",
        ipa: "/ˈlaɪf.lɒŋ ˌedʒ.ʊˈkeɪ.ʃən/",
        pos: "noun phrase",
        meaningEn: "ongoing learning opportunities designed for adults and citizens across every stage of life.",
        meaningVi: "Giáo dục suốt đời / học tập thường xuyên cho mọi lứa tuổi.",
        nuanceTip: "Ý tưởng phản biện siêu mạnh cho IELTS Task 2 khi bàn về tái đào tạo giữa kỷ nguyên AI.",
        example: "Subsidised evening colleges turn lifelong education into economic resilience."
      },
      {
        id: "mature-students",
        word: "mature students",
        ipa: "/məˈtʃʊər ˈstjuː.dənts/",
        pos: "noun (plural)",
        meaningEn: "adult university students who enter degree study noticeably older than typical school-leavers.",
        meaningVi: "Sinh viên trưởng thành / người lớn tuổi quay lại học đại học.",
        nuanceTip: "Key 12.3.5: đừng nhầm thành 'chín chắn tính cách', đây là thuật ngữ chỉ sinh viên lớn tuổi đi học lại.",
        example: "Universities increasingly design flexible seminars tailored for working mature students."
      },
      {
        id: "special-needs",
        word: "special needs education",
        ipa: "/ˌspeʃ.əl ˈniːdz ˌedʒ.ʊˈkeɪ.ʃən/",
        pos: "noun phrase",
        meaningEn: "tailored teaching methods, small classes, and resources for children with physical or learning disabilities.",
        meaningVi: "Giáo dục chuyên biệt cho học sinh có nhu cầu đặc biệt / khuyết tật học tập.",
        nuanceTip: "Thường đi kèm mô hình lớp nhỏ hoặc 'one-to-one teaching' (1 thầy – 1 trò).",
        example: "Inclusive budgets protect specialist assistants in special needs education."
      },
      {
        id: "one-to-one",
        word: "one-to-one (teaching)",
        ipa: "/ˌwʌn.təˈwʌn/",
        pos: "adjective / adverb phrase",
        meaningEn: "individualised instruction with a single teacher working directly with one pupil.",
        meaningVi: "Dạy kèm 1 thầy – 1 trò (cá nhân hóa hoàn toàn).",
        nuanceTip: "Trong Anh-Mỹ hay gặp biến thể 'one-on-one', chuẩn Cambridge dùng 'one-to-one'.",
        example: "Targeted one-to-one coaching accelerates pronunciation recovery."
      },
      {
        id: "bullying",
        word: "bullying",
        ipa: "/ˈbʊl.i.ɪŋ/",
        pos: "noun (uncountable)",
        meaningEn: "repeated aggressive behaviour intimidating, frightening, or isolating weaker peers at school.",
        meaningVi: "Nạn bắt nạt học đường.",
        nuanceTip: "Cụm liên quan: cyberbullying (bắt nạt qua mạng), anti-bullying policy.",
        example: "Whole-school empathy programmes significantly reduce playground bullying."
      }
    ],
    theorySections: [
      {
        key: "A",
        title: "Equity, Rankings & Systemic Debates",
        subtitle: "Từ vựng tranh luận bình đẳng giáo dục chuẩn Band 8.0+ (Section A)",
        items: [
          {
            label: "equality of opportunity · selective vs comprehensive · elitism · league tables",
            detail:
              "Bình đẳng cơ hội là 'equality of opportunity'. Trường tuyển đầu vào bằng thi cử là 'selective', trường công nhận tất cả không thi là 'comprehensive'. Thói ưu ái nhóm đặc quyền là 'elitism'; bảng xếp hạng trường học là 'league tables'.",
            example:
              "Debates over selective versus comprehensive schooling ask whether league tables promote elitism."
          },
          {
            label: "inherent in · perpetuate · two-tier system · well-endowed · less well-off · depress · excel",
            detail:
              "Vốn gắn sẵn trong hệ thống = 'inherent in'; duy trì bất bình đẳng kéo dài = 'perpetuate inequalities'. Hệ thống phân 2 hạng = 'two-tier system'. Giàu có / khó khăn hơn nói lịch sự là 'better-off' vs 'less well-off'; trường giàu quỹ = 'well-endowed'. Làm giảm cơ hội = 'depress opportunities'; học xuất sắc = 'excel at school'.",
            example:
              "A two-tier system perpetuates inequalities and depresses opportunities for less well-off pupils."
          }
        ]
      },
      {
        key: "B",
        title: "Core Skills, Reform & Lifelong Learning (Section B)",
        subtitle: "Các chủ đề cải cách giáo dục và giáo dục suốt đời",
        items: [
          {
            label: "the three Rs · literacy · numeracy · curriculum reform",
            detail:
              "'The three Rs' viết tắt hài hước cho 3 kỹ năng nền tảng (Reading, wRiting, aRithmetic). Năng lực đọc là 'literacy', năng lực tính toán là 'numeracy'; đổi mới chương trình quốc gia là 'curriculum reform'.",
            example:
              "Curriculum reform must strengthen core literacy and numeracy rather than diluting the three Rs."
          },
          {
            label: "lifelong education · mature students · special needs · one-to-one · bullying",
            detail:
              "Học tập suốt đời là 'lifelong / continuing education'; học viên trưởng thành học muộn là 'mature students'. Giáo dục khuyết tật là 'special needs education', dạy kèm 1-1 là 'one-to-one', bắt nạt học đường là 'bullying'.",
            example:
              "Mature students thrive under continuing education, just as special needs learners benefit from one-to-one support."
          }
        ]
      },
      {
        key: "C",
        title: "School Roles & Governance Vocabulary (Ex 12.5)",
        subtitle: "4 chức danh và tổ chức trường học hay gặp trong Reading Anh Quốc",
        items: [
          {
            label: "PTA · school governors · supply teacher · peripatetic teacher",
            detail:
              "• 'PTA' (Parent–Teacher Association): Hội phụ huynh – giáo viên họp định kỳ.\n• 'school governors': Hội đồng quản trị giám sát điều hành toàn bộ nhà trường.\n• 'supply teacher': Giáo viên dạy thay khi giáo viên chính nghỉ ốm.\n• 'peripatetic teacher' (/ˌperɪpəˈtetɪk/): Giáo viên thỉnh giảng di chuyển giảng dạy giữa nhiều trường (ví dụ dạy nhạc cụ).",
            example:
              "When the music specialist fell ill, a supply teacher stepped in while the peripatetic teacher covered three regional schools."
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex-12-1",
        kind: "gap_fill",
        title: "Bài tập 12.1 & 12.3 · Collocation Chính sách & Khái niệm Giáo dục",
        instruction:
          "Hoàn thiện 10 collocation và thuật ngữ giáo dục trọng tâm từ Ex 12.1 và Ex 12.3 (Đáp án chuẩn theo Key 12.1 & 12.3).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 12 (EX 12.1 & 12.3)",
        wordBank: [
          "league",
          "selective",
          "opportunity",
          "perpetuating",
          "literacy",
          "numeracy",
          "curriculum reform",
          "the three Rs",
          "a mature student",
          "one-to-one teaching"
        ],
        questions: [
          {
            id: "12-1-1",
            promptBefore: "",
            promptAfter: " tables (lists of schools from best to worst)",
            answer: "league",
            acceptedAnswers: ["League"],
            hint: "Bảng xếp hạng thứ bậc các trường",
            explanationVi: "Key 12.1.1: 'league tables'."
          },
          {
            id: "12-1-2",
            promptBefore: "",
            promptAfter: " education (entry to schools is decided by exam results)",
            answer: "selective",
            acceptedAnswers: ["Selective"],
            hint: "Giáo dục có thi tuyển chọn lọc đầu vào",
            explanationVi: "Key 12.1.2: 'selective education'."
          },
          {
            id: "12-1-3",
            promptBefore: "equality of ",
            promptAfter: " (when everyone has the same chances)",
            answer: "opportunity",
            hint: "Bình đẳng về cơ hội",
            explanationVi: "Key 12.1.3: 'equality of opportunity'."
          },
          {
            id: "12-1-4",
            promptBefore: "",
            promptAfter: " inequalities (making inequalities continue forever)",
            answer: "perpetuating",
            acceptedAnswers: ["perpetuate", "Perpetuating"],
            hint: "Động từ V-ing nghĩa là làm bất bình đẳng kéo dài mãi",
            explanationVi: "Key 12.1.4: 'perpetuating inequalities'."
          },
          {
            id: "12-3-1",
            promptBefore: "The ability to read → ",
            promptAfter: "",
            answer: "literacy",
            hint: "Kỹ năng đọc viết (năng lực chữ viết)",
            explanationVi: "Key 12.3.1: 'literacy'."
          },
          {
            id: "12-3-2",
            promptBefore: "The ability to count and do basic maths → ",
            promptAfter: "",
            answer: "numeracy",
            hint: "Năng lực tính toán cơ bản",
            explanationVi: "Key 12.3.2: 'numeracy'."
          },
          {
            id: "12-3-3",
            promptBefore: "Changes made to the official programme of education in a country → ",
            promptAfter: "",
            answer: "curriculum reform",
            hint: "Cải cách chương trình giảng dạy",
            explanationVi: "Key 12.3.3: 'curriculum reform'."
          },
          {
            id: "12-3-4",
            promptBefore: "The traditional basic skills of reading, writing and maths → ",
            promptAfter: "",
            answer: "the three Rs",
            acceptedAnswers: ["three Rs"],
            hint: "Cụm cố định chỉ 3 kỹ năng nền tảng",
            explanationVi: "Key 12.3.4: 'the three Rs'."
          },
          {
            id: "12-3-5",
            promptBefore: "A student who is older than the typical age, for example, in a university → ",
            promptAfter: "",
            answer: "a mature student",
            acceptedAnswers: ["mature student", "mature students"],
            hint: "Sinh viên trưởng thành quay lại giảng đường",
            explanationVi: "Key 12.3.5: 'a mature student'."
          },
          {
            id: "12-3-6",
            promptBefore: "Teaching with one teacher and just one pupil → ",
            promptAfter: "",
            answer: "one-to-one teaching",
            acceptedAnswers: ["one-to-one"],
            hint: "Phương pháp dạy 1 kèm 1",
            explanationVi: "Key 12.3.6: 'one-to-one teaching'."
          }
        ]
      },
      {
        id: "ex-12-2",
        kind: "sentence_upgrade",
        title: "Bài tập 12.2 · Nâng cấp Luận điểm Giáo dục lên chuẩn IELTS Band 8.0+",
        instruction:
          "Biến đổi 7 câu văn thông thường thành văn phong học thuật C1–C2 sử dụng đúng từ vựng Section A (Đáp án nguyên bản Key 12.2).",
        sourceNote: "TUYỂN CHỌN NGUYÊN BẢN · UNIT 12 (EX 12.2)",
        questions: [
          {
            id: "12-2-1",
            originalSentence: "1. Inequality is [built into] the education system.",
            promptCue: "Thay '[built into]' bằng tính từ + giới từ C1 ở Section A",
            options: [
              "Inequality is inherent in the education system.",
              "Inequality is selective at the education system.",
              "Inequality is perceived for the education system."
            ],
            correctOption: "Inequality is inherent in the education system.",
            explanationVi: "Key 12.2.1: 'inherent in' (vốn gắn sẵn bên trong một hệ thống)."
          },
          {
            id: "12-2-2",
            originalSentence: "2. [Giving access only to privileged groups] is bad for the country in the long term.",
            promptCue: "Gom cụm mô tả bằng danh từ trừu tượng C1",
            options: [
              "Elitism is bad for the country in the long term.",
              "Numeracy is bad for the country in the long term.",
              "Schooling is bad for the country in the long term."
            ],
            correctOption: "Elitism is bad for the country in the long term.",
            explanationVi: "Key 12.2.2: 'Elitism is bad for the country in the long term.'"
          },
          {
            id: "12-2-3",
            originalSentence:
              "3. [Education where everyone gets into the same type of school without exams] is a basic political ideal in many countries.",
            promptCue: "Thay toàn bộ định nghĩa bằng cụm 2 từ C1",
            options: [
              "Comprehensive education is a basic political ideal in many countries.",
              "Selective education is a basic political ideal in many countries.",
              "Special needs education is a basic political ideal in many countries."
            ],
            correctOption: "Comprehensive education is a basic political ideal in many countries.",
            explanationVi: "Key 12.2.3: 'Comprehensive education' (hệ thống phổ thông không thi tuyển chọn lọc)."
          },
          {
            id: "12-2-4",
            originalSentence:
              "4. A [system where there are two levels] of schools [reduces] the opportunities for children from [poorer] families and favours those from [richer] families.",
            promptCue: "Thay đồng bộ 4 cụm: two-tier system / depresses / less well-off / better-off",
            options: [
              "A two-tier system of schools depresses the opportunities for children from less well-off families and favours those from better-off families.",
              "A league-table system of schools perpetuates the opportunities for children from well-endowed families and favours poorer families.",
              "A selective system of schools excels the opportunities for children from mature families and favours poorer families."
            ],
            correctOption:
              "A two-tier system of schools depresses the opportunities for children from less well-off families and favours those from better-off families.",
            explanationVi:
              "Key 12.2.4: 'two-tier system' + 'depresses' + 'less well-off' + 'better-off' — câu mẫu chuẩn Band 8.5 cho IELTS Task 2!"
          },
          {
            id: "12-2-5",
            originalSentence:
              "5. Some private schools [have lots of wealth and receive gifts of money], and this means they can have better resources.",
            promptCue: "Thay cụm mô tả sự giàu quỹ hiến tặng bằng 1 tính từ ghép C2",
            options: [
              "Some private schools are well-endowed, and this means they can have better resources.",
              "Some private schools are selective, and this means they can have better resources.",
              "Some private schools are one-to-one, and this means they can have better resources."
            ],
            correctOption:
              "Some private schools are well-endowed, and this means they can have better resources.",
            explanationVi: "Key 12.2.5: 'Some private schools are well-endowed...'"
          },
          {
            id: "12-2-6",
            originalSentence: "6. All parents want their children to [achieve the best possible results] at school.",
            promptCue: "Thay '[achieve the best possible results]' bằng 1 động từ C1",
            options: [
              "All parents want their children to excel at school.",
              "All parents want their children to depress at school.",
              "All parents want their children to perpetuate at school."
            ],
            correctOption: "All parents want their children to excel at school.",
            explanationVi: "Key 12.2.6: 'excel at school' (đạt kết quả xuất sắc)."
          },
          {
            id: "12-2-7",
            originalSentence: "7. Emphasis on the three Rs is [considered] by parents to be the key to success.",
            promptCue: "Thay '[considered]' bằng động từ trang trọng hơn ở Section A",
            options: [
              "Emphasis on the three Rs is perceived by parents to be the key to success.",
              "Emphasis on the three Rs is endowed by parents to be the key to success.",
              "Emphasis on the three Rs is bullied by parents to be the key to success."
            ],
            correctOption:
              "Emphasis on the three Rs is perceived by parents to be the key to success.",
            explanationVi: "Key 12.2.7: 'is perceived by parents to be...'."
          }
        ]
      },
      {
        id: "ex-12-5",
        kind: "classifier",
        title: "Bài tập 12.5 · Phân loại Nhân sự Nhà trường & Mô hình Đào tạo",
        instruction:
          "Phân loại 4 chức danh đặc thù từ Ex 12.5 cùng 3 khái niệm hệ thống ở Unit 12 vào đúng vai trò trong hệ sinh thái giáo dục (Theo sát Key 12.5).",
        sourceNote: "CẢI BIÊN TƯƠNG TÁC · UNIT 12 (EX 12.5)",
        categories: [
          {
            key: "governance_community",
            label: "Governance & Community (Quản trị & Phụ huynh)",
            description: "Các hội đồng giám sát vận hành và kết nối gia đình – nhà trường"
          },
          {
            key: "specialist_teachers",
            label: "Specialist Teaching Roles (Nhân sự Giảng dạy Đặc thù)",
            description: "Các vai trò giáo viên linh hoạt, thỉnh giảng hoặc kèm cá nhân"
          },
          {
            key: "system_equity",
            label: "Policy & System Structure (Mô hình & Công bằng Hệ thống)",
            description: "Cơ chế tuyển chọn đầu vào và chương trình quốc gia"
          }
        ],
        questions: [
          {
            id: "12-5-1",
            highlightWord: "PTA (Parent–Teacher Association)",
            prompt: "Nhóm gồm phụ huynh và giáo viên họp định kỳ trao đổi về trường lớp",
            correctCategory: "governance_community",
            explanationVi: "Key 12.5.1: Group consisting of teachers and parents who meet regularly."
          },
          {
            id: "12-5-2",
            highlightWord: "school governors",
            prompt: "Hội đồng giám sát toàn bộ hoạt động hành chính, tài chính của trường",
            correctCategory: "governance_community",
            explanationVi: "Key 12.5.2: Group which oversees all the business of the school."
          },
          {
            id: "12-5-3",
            highlightWord: "supply teacher",
            prompt: "Giáo viên dạy thay khi giáo viên cơ hữu nghỉ ốm hoặc vắng mặt",
            correctCategory: "specialist_teachers",
            explanationVi: "Key 12.5.3: Teacher who works in a school when needed (e.g. if someone is sick)."
          },
          {
            id: "12-5-4",
            highlightWord: "peripatetic teacher",
            prompt: "Giáo viên lưu động di chuyển giảng dạy giữa nhiều trường khác nhau",
            correctCategory: "specialist_teachers",
            explanationVi: "Key 12.5.4: Teacher who works in different schools and travels between them."
          },
          {
            id: "12-5-5",
            highlightWord: "special needs & one-to-one teaching",
            prompt: "Giáo dục chuyên biệt kết hợp dạy kèm cá nhân hóa 1 thầy – 1 trò",
            correctCategory: "specialist_teachers",
            explanationVi: "Section B: Hỗ trợ người học khuyết tật hoặc cần kèm cặp sát sao từng cá nhân."
          },
          {
            id: "12-5-6",
            highlightWord: "selective vs comprehensive schooling",
            prompt: "Tranh luận tuyển đầu vào bằng thi cử hay mở cửa đại trà không thi",
            correctCategory: "system_equity",
            explanationVi: "Section A: Hai mô hình cấu trúc trường phổ thông cốt lõi gắn với bình đẳng cơ hội."
          }
        ]
      }
    ]
  }
];
