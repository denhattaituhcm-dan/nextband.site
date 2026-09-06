import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info, BookOpen } from "lucide-react";

interface WritingBandDescriptor {
  band: string;
  badgeColor: string;
  tr: string[];
  cc: string[];
  lr: string[];
  gra: string[];
}

const WRITING_TASK2_DESCRIPTORS: WritingBandDescriptor[] = [
  {
    band: "8.0",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    tr: [
      "The prompt is appropriately and sufficiently addressed.",
      "A clear and well-developed position is presented in response to the question/s.",
      "Ideas are relevant, well extended and supported.",
      "There may be occasional omissions or lapses in content.",
    ],
    cc: [
      "The message can be followed with ease.",
      "Information and ideas are logically sequenced, and cohesion is well managed.",
      "Occasional lapses in coherence and cohesion may occur.",
      "Paragraphing is used sufficiently and appropriately.",
    ],
    lr: [
      "A wide resource is fluently and flexibly used to convey precise meanings.",
      "There is skilful use of uncommon and/or idiomatic items when appropriate, despite occasional inaccuracies in word choice and collocation.",
      "Occasional errors in spelling and/or word formation may occur, but have minimal impact on communication.",
    ],
    gra: [
      "A wide range of structures is flexibly and accurately used.",
      "The majority of sentences are error-free, and punctuation is well managed.",
      "Occasional, non-systematic errors and inappropriacies occur, but have minimal impact on communication.",
    ],
  },
  {
    band: "7.0",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    tr: [
      "The main parts of the prompt are appropriately addressed.",
      "A clear and developed position is presented.",
      "Main ideas are extended and supported but there may be a tendency to over-generalise or there may be a lack of focus and precision in supporting ideas/material.",
    ],
    cc: [
      "Information and ideas are logically organised, and there is a clear progression throughout the response. (A few lapses may occur, but these are minor.)",
      "A range of cohesive devices including reference and substitution is used flexibly but with some inaccuracies or some over/under use.",
      "Paragraphing is generally used effectively to support overall coherence, and the sequencing of ideas within a paragraph is generally logical.",
    ],
    lr: [
      "The resource is sufficient to allow some flexibility and precision.",
      "There is some ability to use less common and/or idiomatic items.",
      "An awareness of style and collocation is evident, though inappropriacies occur.",
      "There are only a few errors in spelling and/or word formation and they do not detract from overall clarity.",
    ],
    gra: [
      "A variety of complex structures is used with some flexibility and accuracy.",
      "Grammar and punctuation are generally well controlled, and error-free sentences are frequent.",
      "A few errors in grammar may persist, but these do not impede communication.",
    ],
  },
  {
    band: "6.0",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    tr: [
      "The main parts of the prompt are addressed (though some may be more fully covered than others). An appropriate format is used.",
      "A position is presented that is directly relevant to the prompt, although the conclusions drawn may be unclear, unjustified or repetitive.",
      "Main ideas are relevant, but some may be insufficiently developed or may lack clarity, while some supporting arguments and evidence may be less relevant or inadequate.",
    ],
    cc: [
      "Information and ideas are generally arranged coherently and there is a clear overall progression.",
      "Cohesive devices are used to some good effect but cohesion within and/or between sentences may be faulty or mechanical due to misuse, overuse or omission.",
      "The use of reference and substitution may lack flexibility or clarity and result in some repetition or error.",
      "Paragraphing may not always be logical and/or the central topic may not always be clear.",
    ],
    lr: [
      "The resource is generally adequate and appropriate for the task.",
      "The meaning is generally clear in spite of a rather restricted range or a lack of precision in word choice.",
      "If the writer is a risk-taker, there will be a wider range of vocabulary used but higher degrees of inaccuracy or inappropriacy.",
      "There are some errors in spelling and/or word formation, but these do not impede communication.",
    ],
    gra: [
      "A mix of simple and complex sentence forms is used but flexibility is limited.",
      "Examples of more complex structures are not marked by the same level of accuracy as in simple structures.",
      "Errors in grammar and punctuation occur, but rarely impede communication.",
    ],
  },
  {
    band: "5.0",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
    tr: [
      "The main parts of the prompt are incompletely addressed. The format may be inappropriate in places.",
      "The writer expresses a position, but the development is not always clear.",
      "Some main ideas are put forward, but they are limited and are not sufficiently developed and/or there may be irrelevant detail.",
      "There may be some repetition.",
    ],
    cc: [
      "Organisation is evident but is not wholly logical and there may be a lack of overall progression. Nevertheless, there is a sense of underlying coherence to the response.",
      "The relationship of ideas can be followed but the sentences are not fluently linked to each other.",
      "There may be limited/overuse of cohesive devices with some inaccuracy.",
      "The writing may be repetitive due to inadequate and/or inaccurate use of reference and substitution.",
      "Paragraphing may be inadequate or missing.",
    ],
    lr: [
      "The resource is limited but minimally adequate for the task.",
      "Simple vocabulary may be used accurately but the range does not permit much variation in expression.",
      "There may be frequent lapses in the appropriacy of word choice and a lack of flexibility is apparent in frequent simplifications and/or repetitions.",
      "Errors in spelling and/or word formation may be noticeable and may cause some difficulty for the reader.",
    ],
    gra: [
      "The range of structures is limited and rather repetitive.",
      "Although complex sentences are attempted, they tend to be faulty, and the greatest accuracy is achieved on simple sentences.",
      "Grammatical errors may be frequent and cause some difficulty for the reader.",
      "Punctuation may be faulty.",
    ],
  },
  {
    band: "4.0",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    tr: [
      "The prompt is tackled in a minimal way, or the answer is tangential, possibly due to some misunderstanding of the prompt. The format may be inappropriate.",
      "A position is discernible, but the reader has to read carefully to find it.",
      "Main ideas are difficult to identify and such ideas that are identifiable may lack relevance, clarity and/or support.",
      "Large parts of the response may be repetitive.",
    ],
    cc: [
      "Information and ideas are evident but not arranged coherently and there is no clear progression within the response.",
      "Relationships between ideas can be unclear and/or inadequately marked. There is some use of basic cohesive devices, which may be inaccurate or repetitive.",
      "There is inaccurate use or a lack of substitution or referencing.",
      "There may be no paragraphing and/or no clear main topic within paragraphs.",
    ],
    lr: [
      "The resource is limited and inadequate for or unrelated to the task. Vocabulary is basic and may be used repetitively.",
      "There may be inappropriate use of lexical chunks (e.g. memorised phrases, formulaic language and/or language from the input material).",
      "Inappropriate word choice and/or errors in word formation and/or in spelling may impede meaning.",
    ],
    gra: [
      "A very limited range of structures is used.",
      "Subordinate clauses are rare and simple sentences predominate.",
      "Some structures are produced accurately but grammatical errors are frequent and may impede meaning.",
      "Punctuation is often faulty or inadequate.",
    ],
  },
];

interface WritingRubricModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WritingRubricModal({ open, onOpenChange }: WritingRubricModalProps) {
  const [selectedBand, setSelectedBand] = useState<string>("ALL");

  const filteredDescriptors =
    selectedBand === "ALL"
      ? WRITING_TASK2_DESCRIPTORS
      : WRITING_TASK2_DESCRIPTORS.filter((d) => d.band === selectedBand);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl! w-[94vw]! max-h-[90vh]! flex flex-col p-0 gap-0 overflow-hidden font-sans border-slate-200">
        <DialogHeader className="px-6 py-4 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Bảng mô tả tiêu chí chấm Writing Task 2 (Band Descriptors)
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 mt-0.5">
                Chuẩn chấm thi IELTS Writing Task 2 chính thức từ Cambridge / IDP / British Council (Trích xuất Band 4.0 – 8.0)
              </DialogDescription>
            </div>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 pt-3 overflow-x-auto">
            <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0">Lọc Band:</span>
            {["ALL", "8.0", "7.0", "6.0", "5.0", "4.0"].map((b) => {
              const isSelected = selectedBand === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBand(b)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
                  }`}
                >
                  {b === "ALL" ? "Tất cả (4.0 – 8.0)" : `Band ${b}`}
                </button>
              );
            })}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="p-3 w-16 text-center border-r border-slate-200">Band</th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-blue-950 bg-blue-50/50">
                    Task Response (TR)
                  </th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-indigo-950 bg-indigo-50/50">
                    Coherence & Cohesion (CC)
                  </th>
                  <th className="p-3 w-1/4 border-r border-slate-200 text-emerald-950 bg-emerald-50/50">
                    Lexical Resource (LR)
                  </th>
                  <th className="p-3 w-1/4 text-purple-950 bg-purple-50/50">
                    Grammatical Range & Accuracy (GRA)
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

                    {/* TR column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.tr.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* CC column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.cc.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* LR column */}
                    <td className="p-3 border-r border-slate-200 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.lr.map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold leading-none mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </td>

                    {/* GRA column */}
                    <td className="p-3 leading-relaxed space-y-1.5 text-slate-700">
                      {desc.gra.map((item, i) => (
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

          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-950 flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              <strong>Lưu ý chấm thi IELTS Writing:</strong> Bài viết phải thỏa mãn đầy đủ các đặc tính tích cực của một mức band để đạt band đó. Điểm Writing Task 2 được tính bằng trung bình cộng 4 tiêu chí (TR, CC, LR, GRA) và làm tròn xuống về mốc 0.5 gần nhất theo quy chế khảo thí chính thức.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
