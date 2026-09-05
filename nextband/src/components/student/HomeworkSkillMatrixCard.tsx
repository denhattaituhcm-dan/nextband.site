import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Filter,
  Sparkles,
  Trophy,
} from 'lucide-react';
import {
  ExamSkillType,
  detectExamSkill,
  getSkillBadgeConfig,
  formatSkillScoreDisplay,
  isObjectiveSkill,
} from '@/lib/examSkillHelper';
import { CanonicalVisualStatus } from '@/lib/homeworkStatusHelper';

export interface HomeworkSkillMatrixItem {
  id: string;
  examId: string;
  title: string;
  description?: string | null;
  lessonOrder: number;
  week: number;
  status: CanonicalVisualStatus;
  deadline?: string | Date | null;
  countdown?: { text: string; isOverdue: boolean } | null;
  submission?: any;
  sections?: any[];
}

interface HomeworkSkillMatrixCardProps {
  homeworkList: HomeworkSkillMatrixItem[];
  onOpenExam: (examId: string) => void;
  onViewSubmission?: (submissionId: string) => void;
  className?: string;
  courseTitle?: string;
}

export const HomeworkSkillMatrixCard: React.FC<HomeworkSkillMatrixCardProps> = ({
  homeworkList,
  onOpenExam,
  onViewSubmission,
  className,
  courseTitle,
}) => {
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');

  // Categorize homework with detected skill & score display
  const enrichedHomework = useMemo(() => {
    return homeworkList.map((hw) => {
      const skill = detectExamSkill({
        title: hw.title,
        sections: hw.sections,
        answers: hw.submission?.answers,
        submission: hw.submission,
      });
      const badge = getSkillBadgeConfig(skill);
      const scoreDisplay = formatSkillScoreDisplay(skill, hw.submission);
      const isObjective = isObjectiveSkill(skill);

      return {
        ...hw,
        skill,
        badge,
        scoreDisplay,
        isObjective,
      };
    });
  }, [homeworkList]);

  // Skill KPIs Breakdown
  const skillStats = useMemo(() => {
    const stats: Record<
      string,
      { total: number; completed: number; pending: number; avgScoreText: string }
    > = {
      grammar: { total: 0, completed: 0, pending: 0, avgScoreText: '—' },
      listening: { total: 0, completed: 0, pending: 0, avgScoreText: '—' },
      reading: { total: 0, completed: 0, pending: 0, avgScoreText: '—' },
      writing: { total: 0, completed: 0, pending: 0, avgScoreText: '—' },
      speaking: { total: 0, completed: 0, pending: 0, avgScoreText: '—' },
    };

    let totalPointsEarned = 0;
    let totalMaxPoints = 0;
    let totalWritingBand = 0;
    let gradedWritingCount = 0;
    let totalSpeakingBand = 0;
    let gradedSpeakingCount = 0;

    enrichedHomework.forEach((item) => {
      const s = item.skill;
      const key = s === 'reading_listening' ? 'listening' : (stats[s] ? s : 'grammar');
      if (stats[key]) {
        stats[key].total++;
        if (item.status === 'GRADED') {
          stats[key].completed++;
          if (item.isObjective && item.submission?.correctAnswers != null) {
            totalPointsEarned += Number(item.submission.correctAnswers);
            totalMaxPoints += Number(item.submission.totalQuestions || 0);
          } else if (s === 'writing' && item.submission?.totalScore != null) {
            totalWritingBand += Number(item.submission.totalScore);
            gradedWritingCount++;
          } else if (s === 'speaking' && item.submission?.totalScore != null) {
            totalSpeakingBand += Number(item.submission.totalScore);
            gradedSpeakingCount++;
          }
        } else if (item.status === 'SUBMITTED') {
          stats[key].pending++;
        }
      }
    });

    if (gradedWritingCount > 0) {
      stats.writing.avgScoreText = `Band ${(totalWritingBand / gradedWritingCount).toFixed(1)}`;
    }
    if (gradedSpeakingCount > 0) {
      stats.speaking.avgScoreText = `Band ${(totalSpeakingBand / gradedSpeakingCount).toFixed(1)}`;
    }
    if (totalMaxPoints > 0) {
      const pct = Math.round((totalPointsEarned / totalMaxPoints) * 100);
      stats.grammar.avgScoreText = `${pct}% chính xác`;
      stats.listening.avgScoreText = `${pct}% chính xác`;
      stats.reading.avgScoreText = `${pct}% chính xác`;
    }

    return stats;
  }, [enrichedHomework]);

  // Filtered list
  const filteredList = useMemo(() => {
    if (selectedSkillFilter === 'all') return enrichedHomework;
    return enrichedHomework.filter((hw) => {
      if (selectedSkillFilter === 'objective') return hw.isObjective;
      if (selectedSkillFilter === 'subjective') return !hw.isObjective;
      return hw.skill === selectedSkillFilter;
    });
  }, [enrichedHomework, selectedSkillFilter]);

  const totalCompleted = enrichedHomework.filter((h) => h.status === 'GRADED').length;
  const totalSubmitted = enrichedHomework.filter((h) => h.status === 'SUBMITTED').length;
  const totalRevision = enrichedHomework.filter((h) => h.status === 'REVISION_REQUIRED').length;
  const totalCount = enrichedHomework.length;

  return (
    <div className='space-y-6'>
      {/* 1. TOP CARDS: 5-SKILL OVERVIEW SUMMARY & SCORING MODES */}
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-base font-bold text-foreground flex items-center gap-2'>
              <Sparkles className='w-4 h-4 text-primary' />
              Khái Quát Tiến Độ Theo 5 Dạng Bài Tập
            </h3>
            <p className='text-xs text-muted-foreground'>
              Phân bổ khoa học giữa Trắc nghiệm (1 câu = 1 điểm) & Tự luận (Chấm theo chuẩn IELTS Band)
            </p>
          </div>
          <div className='text-xs font-bold text-muted-foreground'>
            Hoàn thành: <strong className='text-primary font-black'>{totalCompleted}</strong> / {totalCount} bài
          </div>
        </div>

        {/* 5 Skills Cards Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3'>
          {/* Grammar */}
          <Card
            onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'grammar' ? 'all' : 'grammar')}
            className={'p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs ' + (selectedSkillFilter === 'grammar' ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/20' : 'bg-card border-border hover:border-teal-300')}
          >
            <div className='flex items-center justify-between gap-1 mb-2'>
              <span className='inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300'>
                <CheckCircle2 className='w-3.5 h-3.5' />
                Grammar
              </span>
              <Badge variant='outline' className='text-[9px] px-1 py-0 bg-teal-50 text-teal-700 border-teal-200'>
                1đ/câu
              </Badge>
            </div>
            <div className='text-xl font-extrabold text-foreground'>
              {skillStats.grammar.completed} <span className='text-xs font-normal text-muted-foreground'>/ {skillStats.grammar.total} bài</span>
            </div>
            <p className='text-[11px] text-muted-foreground mt-1'>
              Trắc nghiệm tự động
            </p>
          </Card>

          {/* Listening */}
          <Card
            onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'listening' ? 'all' : 'listening')}
            className={'p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs ' + (selectedSkillFilter === 'listening' ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20' : 'bg-card border-border hover:border-blue-300')}
          >
            <div className='flex items-center justify-between gap-1 mb-2'>
              <span className='inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300'>
                <Headphones className='w-3.5 h-3.5' />
                Listening
              </span>
              <Badge variant='outline' className='text-[9px] px-1 py-0 bg-blue-50 text-blue-700 border-blue-200'>
                1đ/câu
              </Badge>
            </div>
            <div className='text-xl font-extrabold text-foreground'>
              {skillStats.listening.completed} <span className='text-xs font-normal text-muted-foreground'>/ {skillStats.listening.total} bài</span>
            </div>
            <p className='text-[11px] text-muted-foreground mt-1'>
              Nghe & Điền từ
            </p>
          </Card>

          {/* Reading */}
          <Card
            onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'reading' ? 'all' : 'reading')}
            className={'p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs ' + (selectedSkillFilter === 'reading' ? 'border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/20' : 'bg-card border-border hover:border-purple-300')}
          >
            <div className='flex items-center justify-between gap-1 mb-2'>
              <span className='inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-300'>
                <BookOpen className='w-3.5 h-3.5' />
                Reading
              </span>
              <Badge variant='outline' className='text-[9px] px-1 py-0 bg-purple-50 text-purple-700 border-purple-200'>
                1đ/câu
              </Badge>
            </div>
            <div className='text-xl font-extrabold text-foreground'>
              {skillStats.reading.completed} <span className='text-xs font-normal text-muted-foreground'>/ {skillStats.reading.total} bài</span>
            </div>
            <p className='text-[11px] text-muted-foreground mt-1'>
              Đọc hiểu & Trắc nghiệm
            </p>
          </Card>

          {/* Writing */}
          <Card
            onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'writing' ? 'all' : 'writing')}
            className={'p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs ' + (selectedSkillFilter === 'writing' ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/20' : 'bg-card border-border hover:border-amber-300')}
          >
            <div className='flex items-center justify-between gap-1 mb-2'>
              <span className='inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300'>
                <PenTool className='w-3.5 h-3.5' />
                Writing
              </span>
              <Badge variant='outline' className='text-[9px] px-1 py-0 bg-amber-50 text-amber-800 border-amber-200'>
                IELTS Band
              </Badge>
            </div>
            <div className='text-xl font-extrabold text-foreground'>
              {skillStats.writing.completed} <span className='text-xs font-normal text-muted-foreground'>/ {skillStats.writing.total} bài</span>
            </div>
            <p className='text-[11px] text-muted-foreground mt-1'>
              {skillStats.writing.avgScoreText !== '—' ? skillStats.writing.avgScoreText : 'Giáo viên chấm'}
            </p>
          </Card>

          {/* Speaking */}
          <Card
            onClick={() => setSelectedSkillFilter(selectedSkillFilter === 'speaking' ? 'all' : 'speaking')}
            className={'p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-xs ' + (selectedSkillFilter === 'speaking' ? 'border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20' : 'bg-card border-border hover:border-orange-300')}
          >
            <div className='flex items-center justify-between gap-1 mb-2'>
              <span className='inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 dark:text-orange-300'>
                <Mic className='w-3.5 h-3.5' />
                Speaking
              </span>
              <Badge variant='outline' className='text-[9px] px-1 py-0 bg-orange-50 text-orange-700 border-orange-200'>
                IELTS Band
              </Badge>
            </div>
            <div className='text-xl font-extrabold text-foreground'>
              {skillStats.speaking.completed} <span className='text-xs font-normal text-muted-foreground'>/ {skillStats.speaking.total} bài</span>
            </div>
            <p className='text-[11px] text-muted-foreground mt-1'>
              {skillStats.speaking.avgScoreText !== '—' ? skillStats.speaking.avgScoreText : 'Giáo viên chấm'}
            </p>
          </Card>
        </div>
      </div>

      {/* 2. FILTER & QUICK STATUS PILLS */}
      <div className='flex flex-wrap items-center justify-between gap-3 pt-2 border-t'>
        <div className='flex items-center gap-1.5 flex-wrap'>
          <span className='text-xs font-semibold text-muted-foreground flex items-center gap-1 mr-1'>
            <Filter className='w-3.5 h-3.5' /> Lọc kỹ năng:
          </span>
          {[
            { key: 'all', label: 'Tất cả (27 bài)' },
            { key: 'grammar', label: '📝 Grammar' },
            { key: 'listening', label: '🎧 Listening' },
            { key: 'reading', label: '📖 Reading' },
            { key: 'writing', label: '✍️ Writing' },
            { key: 'speaking', label: '🎙️ Speaking' },
          ].map((f) => (
            <Button
              key={f.key}
              variant={selectedSkillFilter === f.key ? 'default' : 'outline'}
              size='sm'
              onClick={() => setSelectedSkillFilter(f.key)}
              className='h-7 text-xs rounded-full font-medium px-3'
            >
              {f.label}
            </Button>
          ))}
        </div>

        {totalRevision > 0 && (
          <Badge variant='destructive' className='bg-amber-500/15 text-amber-800 border-amber-300 font-bold gap-1'>
            <AlertTriangle className='w-3 h-3 text-amber-600' />
            {totalRevision} bài cần sửa (Attempt 2)
          </Badge>
        )}
      </div>

      {/* 3. HOMEWORK MATRIX TABLE / LIST */}
      <Card className='rounded-2xl border bg-card shadow-xs overflow-hidden'>
        <CardContent className='p-0 divide-y divide-border'>
          {filteredList.length === 0 ? (
            <div className='p-8 text-center text-xs text-muted-foreground'>
              Không có bài tập nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            filteredList.map((hw) => {
              const isOverdue = hw.status === 'OVERDUE';
              const isRevision = hw.status === 'REVISION_REQUIRED';
              const isGraded = hw.status === 'GRADED';
              const isSubmitted = hw.status === 'SUBMITTED';

              return (
                <div
                  key={hw.id}
                  className='p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors'
                >
                  <div className='flex items-start sm:items-center gap-3.5 flex-1 min-w-0'>
                    <div className='h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0 text-muted-foreground'>
                      {String(hw.lessonOrder).padStart(2, '0')}
                    </div>

                    <div className='space-y-1 min-w-0 flex-1'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <Badge variant='outline' className={'text-[10px] font-bold px-2 py-0.5 ' + hw.badge.badgeClass}>
                          {hw.badge.shortLabel}
                        </Badge>
                        <h4 className='font-bold text-sm text-foreground truncate max-w-md' title={hw.title}>
                          {hw.title}
                        </h4>
                      </div>

                      <div className='flex items-center gap-3 text-xs text-muted-foreground flex-wrap'>
                        {hw.isObjective ? (
                          <span className='text-teal-700 dark:text-teal-400 font-medium'>
                            Trắc nghiệm (1đ/câu)
                          </span>
                        ) : (
                          <span className='text-amber-700 dark:text-amber-400 font-medium'>
                            Tự luận (IELTS Band)
                          </span>
                        )}
                        {hw.countdown && (
                          <span className={isOverdue ? 'text-rose-600 font-bold' : 'text-muted-foreground'}>
                            Hạn nộp: {hw.countdown.text}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side: Score & Action CTA */}
                  <div className='flex items-center justify-between sm:justify-end gap-4 shrink-0'>
                    {/* Score / Grading Status Indicator */}
                    <div className='text-right'>
                      <div className={'text-sm font-black tabular-nums ' + (isGraded ? 'text-primary' : isSubmitted ? 'text-amber-600' : 'text-muted-foreground')}>
                        {hw.scoreDisplay.scoreText}
                      </div>
                      <div className='text-[10px] text-muted-foreground'>
                        {hw.scoreDisplay.subText}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      size='sm'
                      variant={isGraded ? 'outline' : 'default'}
                      className={'h-8 text-xs font-bold rounded-xl gap-1 ' + (
                        isOverdue
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : isRevision
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : ''
                      )}
                      onClick={() => {
                        if (hw.submission?.id && (isGraded || isRevision || isSubmitted)) {
                          if (onViewSubmission) {
                            onViewSubmission(hw.submission.id);
                          } else {
                            onOpenExam(hw.examId || hw.id);
                          }
                        } else {
                          onOpenExam(hw.examId || hw.id);
                        }
                      }}
                    >
                      {isOverdue
                        ? '🚨 Làm bù'
                        : isRevision
                        ? 'Sửa bài'
                        : isGraded
                        ? 'Xem phản hồi'
                        : isSubmitted
                        ? 'Xem bài làm'
                        : 'Làm bài'}
                      <ArrowRight className='w-3 h-3' />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};
