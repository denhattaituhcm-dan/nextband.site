import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info, BookOpen } from "lucide-react";

interface BandDescriptor {
  band: string;
  badgeColor: string;
  fc: string[];
  lr: string[];
  gra: string[];
  pr: string[];
}

const SPEAKING_DESCRIPTORS: BandDescriptor[] = [
  {
    band: "8.0",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    fc: [
      "Nói lưu loát, rất hiếm khi lặp từ hoặc tự sửa lỗi.",
      "Thỉnh thoảng ngập ngừng để tìm từ hoặc cấu trúc, nhưng phần lớn là ngập ngừng vì nội dung/ý tưởng.",
      "Phát triển chủ đề mạch lạc, phù hợp và đúng trọng tâm.",
    ],
    lr: [
      "Vốn từ rộng, sử dụng linh hoạt và tự nhiên ở mọi chủ đề để truyền đạt ý nghĩa chính xác.",
      "Sử dụng thành thạo từ vựng ít phổ biến (less common) và thành ngữ (idioms), dù đôi khi có lỗi nhỏ về kết hợp từ (collocation).",
      "Sử dụng kỹ năng diễn đạt lại (paraphrase) rất hiệu quả khi cần.",
    ],
    gra: [
      "Vốn cấu trúc ngữ pháp đa dạng, linh hoạt.",
      "Phần lớn các câu hoàn toàn không có lỗi (error-free).",
      "Thỉnh thoảng có lỗi nhỏ không có tính hệ thống; một vài lỗi cơ bản có thể còn sót lại.",
    ],
    pr: [
      "Sử dụng đa dạng các đặc điểm ngữ âm để truyền tải ý nghĩa chính xác/tinh tế.",
      "Duy trì nhịp điệu phù hợp. Sử dụng linh hoạt trọng âm và ngữ điệu trên các câu dài.",
      "Người nghe dễ dàng hiểu toàn bộ bài nói. Giọng địa phương/accent hầu như không ảnh hưởng.",
    ],
  },
  {
    band: "7.0",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    fc: [
      "Duy trì nói các lượt dài một cách tự nhiên mà không tốn nhiều nỗ lực.",
      "Có thể ngập ngừng, lặp từ hoặc tự sửa lỗi giữa câu khi tìm ngôn ngữ, nhưng không ảnh hưởng đến tính mạch lạc.",
      "Sử dụng linh hoạt các từ nối, dấu hiệu chuyển ý (discourse markers) và phương tiện liên kết.",
    ],
    lr: [
      "Vốn từ đủ linh hoạt để thảo luận đa dạng các chủ đề.",
      "Có khả năng dùng từ ít phổ biến và thành ngữ; thể hiện sự nhận biết về văn phong và collocation, dù đôi khi chưa chuẩn.",
      "Diễn đạt lại (paraphrase) hiệu quả khi cần.",
    ],
    gra: [
      "Sử dụng linh hoạt nhiều cấu trúc. Các câu không có lỗi xuất hiện thường xuyên.",
      "Dùng hiệu quả cả câu đơn và câu phức dù còn mắc lỗi. Một vài lỗi cơ bản vẫn có thể tồn tại.",
    ],
    pr: [
      "Thể hiện tất cả các điểm tích cực của Band 6 và một số điểm tích cực của Band 8.",
      "Dễ hiểu xuyên suốt bài nói.",
    ],
  },
  {
    band: "6.0",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    fc: [
      "Có khả năng duy trì bài nói và sẵn sàng nói các lượt dài.",
      "Đôi lúc mất tính mạch lạc do ngập ngừng, lặp từ hoặc tự sửa lỗi.",
      "Sử dụng các từ nối và dấu hiệu chuyển ý, dù đôi chỗ dùng chưa hoàn toàn thích hợp.",
    ],
    lr: [
      "Vốn từ đủ để thảo luận chủ đề một cách kéo dài và chi tiết.",
      "Dùng từ đôi khi chưa chuẩn xác nhưng nghĩa truyền đạt vẫn rõ ràng.",
      "Nhìn chung có thể paraphrase thành công.",
    ],
    gra: [
      "Kết hợp câu ngắn và câu phức với nhiều cấu trúc nhưng độ linh hoạt còn hạn chế.",
      "Lỗi thường xảy ra ở các cấu trúc phức tạp nhưng hiếm khi cản trở việc truyền đạt thông tin.",
    ],
    pr: [
      "Sử dụng nhiều đặc điểm ngữ âm nhưng khả năng kiểm soát chưa đồng đều.",
      "Ngắt cụm (chunking) nhìn chung phù hợp, nhịp điệu có thể bị ảnh hưởng do nói quá nhanh hoặc thiếu kiểm soát trọng âm.",
      "Có lúc sử dụng ngữ điệu và trọng âm hiệu quả nhưng chưa duy trì liên tục.",
      "Người nghe nhìn chung có thể hiểu mà không cần tốn nhiều nỗ lực.",
    ],
  },
  {
    band: "5.0",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    fc: [
      "Duy trì được bài nói nhưng phụ thuộc vào việc lặp từ, tự sửa lỗi hoặc tốc độ nói chậm.",
      "Ngập ngừng thường xảy ra giữa câu để tìm từ vựng và ngữ pháp cơ bản.",
      "Lạm dụng một số từ nối và từ liên kết nhất định.",
      "Câu phức tạp thường gây ngắc ngứ, nhưng câu đơn giản có thể nói trôi chảy.",
    ],
    lr: [
      "Vốn từ đủ cho các chủ đề quen thuộc và lạ, nhưng độ linh hoạt bị hạn chế.",
      "Có cố gắng paraphrase nhưng không phải lúc nào cũng thành công.",
    ],
    gra: [
      "Kiểm soát ngữ pháp tương đối tốt ở các câu đơn giản/cơ bản.",
      "Cố gắng dùng câu phức nhưng phạm vi hạn chế, hầu như luôn có lỗi và đôi khi phải đổi cách diễn đạt.",
    ],
    pr: [
      "Thể hiện tất cả các điểm tích cực của Band 4 và một số điểm tích cực của Band 6.",
      "Có thể cần chú ý lắng nghe ở một số đoạn phát âm chưa rõ.",
    ],
  },
  {
    band: "4.0",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    fc: [
      "Không thể duy trì bài nói nếu không ngập ngừng ngắt quãng đáng kể.",
      "Tốc độ nói chậm, lặp từ thường xuyên và hay tự sửa lỗi.",
      "Nối được các câu đơn giản nhưng lặp đi lặp lại các từ nối. Thỉnh thoảng mất hẳn mạch lạc.",
    ],
    lr: [
      "Vốn từ chỉ đủ cho chủ đề quen thuộc; chủ đề lạ chỉ truyền tải được ý rất cơ bản.",
      "Thường xuyên dùng sai từ. Hiếm khi cố gắng paraphrase.",
    ],
    gra: [
      "Chỉ nói được các câu ngắn/cơ bản, một số phát ngôn ngắn không có lỗi.",
      "Hiếm khi dùng mệnh đề phụ; câu nói ngắn, cấu trúc lặp lại và lỗi ngữ pháp xuất hiện dày đặc.",
    ],
    pr: [
      "Đặc điểm ngữ âm rất hạn chế; thường xuyên ngắt nhịp và mất nhịp điệu.",
      "Thường xuyên phát âm sai từ hoặc âm đơn lẻ, gây mất rõ ràng.",
      "Người nghe phải tốn nhiều nỗ lực mới hiểu được và có những đoạn không thể hiểu được.",
    ],
  },
];

interface SpeakingRubricModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SpeakingRubricModal({ open, onOpenChange }: SpeakingRubricModalProps) {
  const [selectedBand, setSelectedBand] = useState<string>("ALL");

  const filteredDescriptors = selectedBand === "ALL" 
    ? SPEAKING_DESCRIPTORS 
    : SPEAKING_DESCRIPTORS.filter(d => d.band === selectedBand);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[88vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center justify-between pr-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  Bảng mô tả tiêu chí chấm Speaking (Band Descriptors)
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500 mt-0.5">
                  Chuẩn chấm thi IELTS Speaking chính thức — Bản dịch Tiếng Việt (Band 4.0 – 8.0)
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Band Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 mr-1">Lọc Band:</span>
            <button
              type="button"
              onClick={() => setSelectedBand("ALL")}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                selectedBand === "ALL"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              Tất cả (4.0 - 8.0)
            </button>
            {["8.0", "7.0", "6.0", "5.0", "4.0"].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBand(b)}
                className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                  selectedBand === b
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Band {b}
              </button>
            ))}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3 w-16 text-center border-r border-slate-200">Band</th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-orange-950 bg-orange-50/50">
                    Trôi chảy & Mạch lạc (FC)
                  </th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-blue-950 bg-blue-50/50">
                    Vốn từ vựng (LR)
                  </th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-emerald-950 bg-emerald-50/50">
                    Ngữ pháp & Chính xác (GRA)
                  </th>
                  <th className="p-3 w-1/4 text-purple-950 bg-purple-50/50">
                    Phát âm (PR)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredDescriptors.map((desc) => (
                  <tr key={desc.band} className="hover:bg-slate-50/70 transition-colors align-top">
                    {/* Band column */}
                    <td className="p-3 text-center border-r border-slate-200 bg-slate-50/30">
                      <span className={`inline-block px-2 py-1 rounded-md font-black text-xs border ${desc.badgeColor}`}>
                        {desc.band}
                      </span>
                    </td>

                    {/* FC column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.fc.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-orange-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* LR column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.lr.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* GRA column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.gra.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* PR column */}
                    <td className="p-3 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.pr.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-purple-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong>Lưu ý chấm thi:</strong> Thí sinh cần thỏa mãn đầy đủ các tiêu chí tích cực của một band điểm để đạt được band đó. Điểm Overall Speaking của bài thi được tính bằng trung bình cộng 4 tiêu chí (FC, LR, GRA, PR) và làm tròn xuống về mốc 0.5 gần nhất.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
