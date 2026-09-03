import React, { useState } from 'react';
import { VRSBlockReadingMapInteraction } from '@/types/vrs';
import { Key, Sparkles, ArrowDownRight } from 'lucide-react';

interface Props {
  model: VRSBlockReadingMapInteraction;
}

export default function VRSBlockReadingMapInteractive({ model }: Props) {
  const [activeQuestionId, setActiveQuestionId] = useState<string>('qC');
  const [clickStage, setClickStage] = useState<1 | 2>(1);

  const activeQuestion = model.questions.find(q => q.id === activeQuestionId) || model.questions[0];

  const handleQuestionClick = (qId: string) => {
    if (activeQuestionId === qId) {
      setClickStage(prev => prev === 1 ? 2 : 1);
    } else {
      setActiveQuestionId(qId);
      setClickStage(1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-xs">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <span className="p-1 rounded bg-indigo-600 text-white font-mono text-[10px]">CÐ CHế 2-CLICK</span>
          <span>{model.prompt}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <span className={clickStage === 1 ? 'px-2 py-0.5 rounded bg-indigo-100 text-indigo-800' : 'px-2 py-0.5 rounded bg-white text-slate-400'}>
            Click 1: Hiện Keyword
          </span>
          <span>→</span>
          <span className={clickStage === 2 ? 'px-2 py-0.5 rounded bg-amber-100 text-amber-800' : 'px-2 py-0.5 rounded bg-white text-slate-400'}>
            Click 2: Khóa Tọa Độ Text
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Danh Sách Câu Hỏi Phùng Vấn (A - F)
            </span>
            <span className="text-[10px] text-slate-400 font-medium">(1 câu hỏi thừa)</span>
          </div>

          <div className="space-y-2">
            {model.questions.map(q => {
              const isSelected = q.id === activeQuestionId;
              return (
                <div
                  key={q.id}
                  onClick={() => handleQuestionClick(q.id)}
                  className={'p-3.5 rounded-xl border transition-all cursor-pointer select-none ' + (isSelected ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-400/30 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700')}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={'w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ' + (isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600')}
                    >
                      {q.code}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={'text-xs font-bold leading-snug ' + (isSelected ? 'text-indigo-950' : 'text-slate-800')}>
                        {q.questionText}
                      </p>

                      {isSelected && (
                        <div className="mt-2.5 pt-2 border-t border-indigo-100/80">
                          <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 mb-1.5">
                            <Key className="w-3 h-3" />
                            <span>TỪ KHÓA ĐỊNH HƯӒG (CLICK 1):</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {q.keywords.map((kw, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-100/80 text-indigo-900 border border-indigo-200"
                              >
                                {kw}
                              </span>
                            ))}
                          </div>

                          <div className="mt-2 text-[10px] font-bold text-amber-700 flex items-center gap-1">
                            <span>{clickStage === 2 ? '✓ Đang chiếu tọa độ sang đoạn văn' : '👉 Click lại lần nữa để bắn mũi tên sang bài đọc →'}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {activeQuestion && clickStage === 2 && (
            <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>PHÊ^ TÄCH ĐỐI CHIẾO SƯ PhẠM (CLICK 2):</span>
              </div>
              <p className="leading-relaxed">
                {activeQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bài Đọc: {model.passage.title}
            </span>
            <span className="text-[10px] text-indigo-600 font-bold">5 Đoạn Văn</span>
          </div>

          <div className="space-y-3">
            {model.passage.paragraphs.map((p) => {
              const isTargetParagraph = activeQuestion.targetParagraphId === p.id && clickStage === 2;
              return (
                <div
                  key={p.id}
                  className={'p-4 rounded-2xl border transition-all text-xs leading-relaxed ' + (isTargetParagraph ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/30 text-amber-950 shadow-md' : 'bg-white border-slate-200 text-slate-700')}
                >
                  <div className="flex items-center justify-between font-bold text-[11px] mb-1.5 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className={'w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ' + (isTargetParagraph ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600')}>
                        {p.number}
                      </span>
                      {p.label}
                    </span>

                    {isTargetParagraph && (
                      <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold flex items-center gap-1 animate-pulse">
                        <ArrowDownRight className="w-3.5 h-3.5" />
                        Tọa Độ khớp với Câu {activeQuestion.code}
                      </span>
                    )}
                  </div>

                  <p>
                    {isTargetParagraph && activeQuestion.targetSnippet ? (
                      <span>
                        {p.text.split(activeQuestion.targetSnippet)[0]}
                        <mark className="bg-amber-300 text-amber-950 font-bold px-1.5 py-0.5 rounded border-b-2 border-amber-600">
                          {activeQuestion.targetSnippet}
                        </mark>
                        {p.text.split(activeQuestion.targetSnippet)[1]}
                      </span>
                    ) : (
                      p.text
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}