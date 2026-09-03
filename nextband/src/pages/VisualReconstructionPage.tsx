import React, { useState, useMemo } from 'react';
import { vrsMockLessons } from '@/data/vrsLessonsData';
import { VRSVisualLesson } from '@/types/vrs';
import VRSSlotSnapInteractive from '@/components/vrs/VRSSlotSnapInteractive';
import VRSVerificationScaleInteractive from '@/components/vrs/VRSVerificationScaleInteractive';
import VRSProgressiveRevealInteractive from '@/components/vrs/VRSProgressiveRevealInteractive';

export default function VisualReconstructionPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [activeLesson, setActiveLesson] = useState<VRSVisualLesson | null>(null);

  const weekLessons = useMemo(() => {
    return vrsMockLessons.filter((lesson) => lesson.week === selectedWeek);
  }, [selectedWeek]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Tái Dựng Bài Học (ARIS VRS)
        </h1>
        <p className="text-muted-foreground mt-1">
          Tái hiện cơ chế tư duy, giải phầu cỡp pháp & truy vết bằng chứng
        </p>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((wk) => {
          const isActive = selectedWeek === wk;
          return (
            <button
              key={wk}
              onClick={() => {
                selectedWeek !== wk && setSelectedWeek(wk);
                setActiveLesson(null);
              }}
              className={isActive ? 'px-4 py-2 rounded-md font-medium transition-colors bg-primary text-primary-foreground' : 'px-4 py-2 rounded-md font-medium transition-colors bg-muted text-muted-foreground hover:bg-muted/80'}
            >
              Tuần {wk}
            </button>
          );
        })}
      </div>

      {/* Content Grid or Active Labwork */}
      {!activeLesson ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weekLessons.map((lesson) => (
            <div key={lesson.id} className="border rounded-xl p-6 bg-card text-card-foreground shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {lesson.skill} • Day {lesson.day}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{lesson.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {lesson.subtitle}
                </p>
                <p className="text-sm text-muted-foreground inline-block bg-muted/40 p-3 rounded-mg mb-4">
                  {lesson.coreCompetency}
                </p>
              </div>

              <button
                onClick={() => setActiveLesson(lesson)}
                className="w-full py-2.5 rounded-mg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Khám Phá Cơ Chế »;
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-2xl p-8 bg-card shadow-md">
          {/* Labwork Focus Canvas */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase px-2.5 py-1 rounded bg-primary/10 text-primary">
                {activeLesson?.skill} • Day {activeLesson?.day}
              </span>
              <h2 className="text-2xl font-bold mt-2">{activeLesson.title}</h2>
              <p className="text-muted-foreground">{activeLesson.subtitle}</p>
            </div>
            <button
              onClick={() => setActiveLesson(null)}
              className="text-sm px-4 py-2 rounded-mg border hover:bg-muted"
            >
              ← Trở Lại Danh sách
            </button>
          </div>

          {/* Stages List */}
          <div className="space-y-8">
            {activeLesson.stages.map((stage) => (
              <div key={stage.stageNumber} className="border rounded-xl p-6 bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg">
                    Chặng {stage.stageNumber}: {stage.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {stage.pedagogicalObjective}
                </p>

                {/* Interactive Cognitive Canvas */}
                <div className="p-6 rounded-xl bg-background border shadow-xs">
                  {stage.interactionModel.type === 'slot_snap' && (
                    <VRSSlotSnapInteractive model={stage.interactionModel as any} />
                  )}
                  {stage.interactionModel.type === 'verification_scale' && (
                    <VRSVerificationScaleInteractive model={stage.interactionModel as any} />
                  )}
                  {stage.interactionModel.type === 'progressive_reveal' && (
                    <VRSProgressiveRevealInteractive model={stage.interactionModel as any} />
                  )}
                  {stage.interactionModel.type === 'transfer_test' && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                      <p className="text-sm font-semibold text-primary mb-1">
                        🎯 Nhiệm vụ chuyển giao năng lực
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stage.interactionModel.prompt}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bridge to Homework */}
          <div className="mt-8 p-6 rounded-xl bg-primary/10 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-primary">📔 Áp dụng ngay vào Bài Tập Về Nhà</h4>
              <p className="text-sm text-muted-foreground">
                {activeLesson.bridgeToHomework.promptText}
              </p>
            </div>
            <button className="py-2.5 px-5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground whitespace-nowrap">
              Bắt đầu Làm Homework Ⅲ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
