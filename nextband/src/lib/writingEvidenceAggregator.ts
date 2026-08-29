import { parseStructuredFeedback, SentenceFeedbackItem, ErrorCategory } from "./sentenceFeedback";

export interface WritingTagStat {
  tag: string;
  category: ErrorCategory;
  count: number;
  labelVi: string;
  tip: string;
}

export interface WritingRecoveryItem {
  tag: string;
  category: ErrorCategory;
  labelVi: string;
  initialCount: number;
  recentCount: number;
  reductionPercentage: number;
  status: "RECOVERED" | "IMPROVING";
}

export interface WritingEvidenceProfile {
  totalGradedSubmissions: number;
  totalSentencesReviewed: number;
  totalErrorsFound: number;
  totalPraisePoints: number;
  topGrammarIssues: WritingTagStat[];
  topExpressionIssues: WritingTagStat[];
  topStructureIssues: WritingTagStat[];
  topConceptIssues: WritingTagStat[];
  praiseHighlights: WritingTagStat[];
  recoveringErrors: WritingRecoveryItem[];
}

export const WRITING_TAG_METADATA: Record<string, { labelVi: string; tip: string }> = {
  // GRAMMAR
  "Subject-Verb Agreement": {
    labelVi: "Hòa hợp Chủ ngữ - Động từ",
    tip: "Chú ý chia động từ số ít (thêm -s/-es) với chủ ngữ ngôi thứ ba số ít ở thì Hiện tại đơn.",
  },
  "Tense / Aspect": {
    labelVi: "Chia thì & Thể của động từ",
    tip: "Xác định rõ mốc thời gian của ngữ cảnh trước khi chọn thì quá khứ, hiện tại hay hoàn thành.",
  },
  "Preposition / Article": {
    labelVi: "Mạo từ (a/an/the) & Giới từ",
    tip: "Danh từ đếm được số ít luôn cần mạo từ đứng trước; tra cứu giới từ đi kèm theo cụm.",
  },
  "Word Form": {
    labelVi: "Sai dạng từ (Danh / Tính / Trạng)",
    tip: "Kiểm tra vị trí ngữ pháp trong câu (sau to be là tính từ, bổ nghĩa động từ là trạng từ).",
  },
  "Punctuation / Fragment": {
    labelVi: "Chấm câu & Câu chưa hoàn chỉnh (Fragment)",
    tip: "Một câu hoàn chỉnh bắt buộc phải có đủ Chủ ngữ và Động từ vị ngữ chính.",
  },
  "Passive Voice / Inversion": {
    labelVi: "Câu bị động & Đảo ngữ",
    tip: "Đảm bảo đúng công thức be + V3/ed khi chủ ngữ là đối tượng chịu tác động của hành động.",
  },
  "Relative Clause / Pronoun": {
    labelVi: "Mệnh đề quan hệ & Đại từ thay thế",
    tip: "Dùng 'which/that' cho vật, 'who/whom' cho người; chú ý dấu phẩy ở mệnh đề không xác định.",
  },

  // EXPRESSION
  "Word Choice / Collocation": {
    labelVi: "Dùng từ chưa tự nhiên / Sai Collocation",
    tip: "Học từ vựng theo cả cụm (VD: 'make a decision', 'pose a threat') thay vì ghép từ đơn lẻ.",
  },
  "Repetition / Redundancy": {
    labelVi: "Lặp từ / Diễn đạt thừa thãi",
    tip: "Sử dụng từ đồng nghĩa hoặc cấu trúc thay thế để câu văn súc tích và linh hoạt hơn.",
  },
  "Academic Tone / Register": {
    labelVi: "Văn phong chưa chuẩn học thuật",
    tip: "Tránh dùng tiếng lóng, đại từ thân mật (you, kids) hoặc cách nói quá đời thường trong bài luận.",
  },
  "Awkward Phrasing": {
    labelVi: "Diễn đạt gượng gạo / Khó hiểu",
    tip: "Viết theo trật tự câu tiếng Anh tự nhiên (S + V + O), tránh dịch từng chữ từ tiếng Việt.",
  },
  "Idiomatic Usage": {
    labelVi: "Sử dụng thành ngữ / Thành ngữ chưa chuẩn",
    tip: "Ưu tiên diễn đạt chính xác, rõ nghĩa trước khi cố dùng thành ngữ quá hoa mỹ.",
  },
  "Spelling / Typo": {
    labelVi: "Lỗi chính tả / Gõ nhầm từ",
    tip: "Dành 2 phút cuối giờ soát lại các từ dễ nhầm như 'environment', 'government', 'accommodation'.",
  },

  // STRUCTURE
  "Missing Transition / Linking": {
    labelVi: "Thiếu liên kết câu / Chuyển ý đột ngột",
    tip: "Dùng các từ nối hợp lý (Furthermore, Consequently, On the other hand) để dẫn dắt người đọc.",
  },
  "Paragraph Organization": {
    labelVi: "Bố cục đoạn văn chưa chặt chẽ",
    tip: "Mỗi đoạn thân bài chỉ nên tập trung phát triển trọn vẹn một luận điểm trọng tâm.",
  },
  "Topic Sentence Clarity": {
    labelVi: "Câu chủ đề (Topic Sentence) chưa rõ",
    tip: "Đặt câu chủ đề nêu rõ ý chính ngay ở đầu mỗi đoạn văn để người chấm nắm bắt nhanh nhất.",
  },
  "Run-on / Choppy Flow": {
    labelVi: "Câu quá dài (Run-on) hoặc câu vụn vặt",
    tip: "Ngắt các câu ghép quá dài bằng dấu chấm hoặc liên từ thích hợp để tránh quá tải người đọc.",
  },
  "Cohesion Break": {
    labelVi: "Mạch lạc bị đứt gãy giữa các ý",
    tip: "Dùng đại từ chỉ định (This, These) hoặc danh từ thay thế để móc nối ý câu trước với câu sau.",
  },
  "Conclusion Incomplete": {
    labelVi: "Kết bài chưa trọn vẹn / Thiếu tóm tắt",
    tip: "Kết bài cần khẳng định lại quan điểm và tóm tắt ngắn gọn các luận điểm chính đã nêu.",
  },

  // CONCEPT
  "Idea Off-topic": {
    labelVi: "Ý tưởng lạc đề so với câu hỏi",
    tip: "Đọc kỹ từ khóa của đề bài (keywords, micro-keywords) trước khi lập dàn ý.",
  },
  "Unclear Stance": {
    labelVi: "Lập trường / Quan điểm chưa rõ ràng",
    tip: "Khẳng định rõ quan điểm của bạn ngay trong phần Mở bài và duy trì nhất quán đến Kết bài.",
  },
  "Insufficient Explanation": {
    labelVi: "Giải thích chưa sâu / Luận điểm còn nông",
    tip: "Đặt câu hỏi 'Tại sao điều này xảy ra?' và 'Hậu quả là gì?' để đào sâu thêm 1 tầng lập luận.",
  },
  "Weak Supporting Example": {
    labelVi: "Ví dụ minh họa chưa thuyết phục",
    tip: "Đưa ra ví dụ cụ thể, mang tính thực tế hoặc số liệu thực tế thay vì ví dụ cá nhân mơ hồ.",
  },
  "Logic Flaw / Contradiction": {
    labelVi: "Lỗi logic / Mâu thuẫn giữa các ý",
    tip: "Kiểm tra xem câu sau có đang vô tình phủ nhận luận điểm của câu trước hay không.",
  },
  "Underdeveloped Argument": {
    labelVi: "Luận điểm chưa được phát triển đầy đủ",
    tip: "Áp dụng cấu trúc PEEL (Point -> Explanation -> Example -> Link) cho mỗi ý chính.",
  },

  // PRAISE
  "Good Vocabulary / Collocation": {
    labelVi: "🌟 Vốn từ & Cụm từ (Collocations) rất hay",
    tip: "Học sinh sử dụng từ vựng phong phú và kết hợp từ chuẩn tự nhiên.",
  },
  "Advanced Structure": {
    labelVi: "🌟 Cấu trúc ngữ pháp phức tạp & Điêu luyện",
    tip: "Kiểm soát xuất sắc các cấu trúc nâng cao như đảo ngữ, câu điều kiện, mệnh đề phân từ.",
  },
  "Natural Flow": {
    labelVi: "🌟 Dòng chảy diễn đạt mượt mà, tự nhiên",
    tip: "Bài viết có nhịp điệu uyển chuyển, dễ đọc, lập luận trôi chảy.",
  },
  "Accurate Translation": {
    labelVi: "🌟 Dịch nghĩa rất sát và chuẩn ngữ cảnh",
    tip: "Chuyển ngữ mượt mà mà không bị cứng nhắc.",
  },
  "Clear Argument": {
    labelVi: "🌟 Lập luận sắc bén, logic chặt chẽ",
    tip: "Luận điểm được giải thích rõ ràng và có ví dụ thuyết phục.",
  },
  "Well-formed Sentence": {
    labelVi: "🌟 Câu văn hoàn chỉnh, chuẩn xác",
    tip: "Cấu trúc câu vững vàng, không có lỗi ngữ pháp cơ bản.",
  },
};

/**
 * Pure Aggregator: Aggregates sentence-level feedback across student writing submissions
 */
export function aggregateWritingEvidence(submissions: any[]): WritingEvidenceProfile {
  const gradedSubmissions = (submissions || []).filter(
    (s) => (s?.status === "GRADED" || s?.status === "graded") && (s?.answers || s?.feedback)
  );

  // Sort chronologically (oldest first) to measure trajectory
  const sortedSubmissions = [...gradedSubmissions].sort((a, b) => {
    const timeA = new Date(a.submittedAt || a.submitted_at || a.createdAt || 0).getTime();
    const timeB = new Date(b.submittedAt || b.submitted_at || b.createdAt || 0).getTime();
    return timeA - timeB;
  });

  const tagCounts: Record<string, { category: ErrorCategory; count: number }> = {};
  const earlyCounts: Record<string, number> = {};
  const recentCounts: Record<string, number> = {};
  let totalSentencesReviewed = 0;

  const midpoint = Math.ceil(sortedSubmissions.length / 2);

  sortedSubmissions.forEach((sub, subIdx) => {
    const isEarly = subIdx < midpoint;
    const rawAnswers = Array.isArray(sub.answers) ? sub.answers : [];

    rawAnswers.forEach((ans: any) => {
      let sentenceFeedbacks: SentenceFeedbackItem[] = [];

      // 1. Direct array if already normalized
      if (Array.isArray(ans.sentenceFeedbacks)) {
        sentenceFeedbacks = ans.sentenceFeedbacks;
      } else if (ans.feedback && typeof ans.feedback === "string" && ans.feedback.startsWith("{")) {
        const parsed = parseStructuredFeedback(ans.feedback);
        sentenceFeedbacks = parsed.sentenceFeedbacks || [];
      }

      totalSentencesReviewed += sentenceFeedbacks.length;

      sentenceFeedbacks.forEach((fb) => {
        const tag = fb.tag || "General Error";
        const cat = fb.category || "GRAMMAR";

        if (!tagCounts[tag]) {
          tagCounts[tag] = { category: cat, count: 0 };
        }
        tagCounts[tag].count++;

        if (isEarly) {
          earlyCounts[tag] = (earlyCounts[tag] || 0) + 1;
        } else {
          recentCounts[tag] = (recentCounts[tag] || 0) + 1;
        }
      });
    });
  });

  const mapTagStat = (tag: string, cat: ErrorCategory, count: number): WritingTagStat => {
    const meta = WRITING_TAG_METADATA[tag] || {
      labelVi: tag,
      tip: "Lưu ý rà soát và củng cố kiến thức ở hạng mục này.",
    };
    return {
      tag,
      category: cat,
      count,
      labelVi: meta.labelVi,
      tip: meta.tip,
    };
  };

  const allTagStats: WritingTagStat[] = Object.entries(tagCounts).map(([tag, data]) =>
    mapTagStat(tag, data.category, data.count)
  );

  const getTopTagsByCategory = (cat: ErrorCategory, limit = 4): WritingTagStat[] => {
    return allTagStats
      .filter((t) => t.category === cat)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  // Compute Recovery Trajectory
  const recoveringErrors: WritingRecoveryItem[] = [];
  if (sortedSubmissions.length >= 2) {
    Object.entries(earlyCounts).forEach(([tag, initCount]) => {
      const recCount = recentCounts[tag] || 0;
      const data = tagCounts[tag];
      if (!data || data.category === "PRAISE") return;

      // If initial was significant (>= 2) and reduced by >= 50%
      if (initCount >= 2 && recCount <= initCount * 0.5) {
        const reduction = Math.round(((initCount - recCount) / initCount) * 100);
        const meta = WRITING_TAG_METADATA[tag] || { labelVi: tag, tip: "" };

        recoveringErrors.push({
          tag,
          category: data.category,
          labelVi: meta.labelVi,
          initialCount: initCount,
          recentCount: recCount,
          reductionPercentage: reduction,
          status: recCount === 0 ? "RECOVERED" : "IMPROVING",
        });
      }
    });
  }

  // Sort recoveries by reduction percentage descending
  recoveringErrors.sort((a, b) => b.reductionPercentage - a.reductionPercentage);

  const praiseHighlights = getTopTagsByCategory("PRAISE", 6);
  const totalPraise = allTagStats
    .filter((t) => t.category === "PRAISE")
    .reduce((sum, t) => sum + t.count, 0);
  const totalErrors = allTagStats
    .filter((t) => t.category !== "PRAISE")
    .reduce((sum, t) => sum + t.count, 0);

  return {
    totalGradedSubmissions: gradedSubmissions.length,
    totalSentencesReviewed,
    totalErrorsFound: totalErrors,
    totalPraisePoints: totalPraise,
    topGrammarIssues: getTopTagsByCategory("GRAMMAR", 4),
    topExpressionIssues: getTopTagsByCategory("EXPRESSION", 4),
    topStructureIssues: getTopTagsByCategory("STRUCTURE", 4),
    topConceptIssues: getTopTagsByCategory("CONCEPT", 4),
    praiseHighlights,
    recoveringErrors: recoveringErrors.slice(0, 4),
  };
}
