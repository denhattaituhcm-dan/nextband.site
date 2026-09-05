import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Award,
  Sparkles,
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface StudentAttendanceTimelineProps {
  classId: string;
  className?: string;
  studentId?: string;
}

export const StudentAttendanceTimeline: React.FC<StudentAttendanceTimelineProps> = ({
  classId,
  className,
}) => {
  const { data: matrixRes, isLoading, isError } = useQuery({
    queryKey: ['class-attendance-matrix-student', classId],
    queryFn: () => attendanceApi.getAttendanceMatrix(classId),
    enabled: !!classId,
    staleTime: 1000 * 60 * 2,
  });

  const matrixData = matrixRes?.success && matrixRes?.data ? matrixRes.data : null;
  const myRecord = matrixData?.students?.[0] || null;
  const sessions = matrixData?.sessions || [];
  const mySessions = myRecord?.sessions || [];

  const totalSessions = matrixData?.totalSessions || sessions.length || 27;
  const completedSessions = matrixData?.completedSessions || 0;
  const attendanceRate = myRecord?.attendanceRate ?? 100;
  const isTargetMet = attendanceRate >= 85;

  const getAttendanceBadge = (
    status?: 'UNMARKED' | 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED',
    isPast?: boolean
  ) => {
    switch (status) {
      case 'PRESENT':
        return (
          <Badge variant='outline' className='bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 font-bold gap-1 text-xs'>
            <CheckCircle2 className='w-3 h-3 text-emerald-600' />
            Có mặt
          </Badge>
        );
      case 'LATE':
        return (
          <Badge variant='outline' className='bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 font-bold gap-1 text-xs'>
            <Clock className='w-3 h-3 text-amber-600' />
            Đi muộn
          </Badge>
        );
      case 'EXCUSED':
        return (
          <Badge variant='outline' className='bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 font-bold gap-1 text-xs'>
            <Info className='w-3 h-3 text-purple-600' />
            Vắng có phép
          </Badge>
        );
      case 'ABSENT':
        return (
          <Badge variant='outline' className='bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 font-bold gap-1 text-xs'>
            <AlertCircle className='w-3 h-3 text-rose-600' />
            Vắng mặt
          </Badge>
        );
      case 'UNMARKED':
      default:
        if (isPast) {
          return (
            <Badge variant='outline' className='bg-slate-100 text-slate-600 border-slate-200 text-xs font-medium'>
              Chưa chốt sổ
            </Badge>
          );
        }
        return (
          <Badge variant='outline' className='bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-900 text-xs font-normal'>
            Chưa diễn ra
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-32 w-full rounded-2xl' />
        <Skeleton className='h-64 w-full rounded-2xl' />
      </div>
    );
  }

  if (isError || !matrixData) {
    return (
      <Card className='p-8 text-center border-dashed rounded-2xl bg-muted/20'>
        <AlertCircle className='w-8 h-8 text-muted-foreground mx-auto mb-2' />
        <p className='text-sm font-semibold text-foreground'>Không thể tải dữ liệu lịch học & điểm danh</p>
        <p className='text-xs text-muted-foreground mt-1'>Vui lòng thử lại sau giây lát hoặc liên hệ quản trị viên.</p>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* 1. ATTENDANCE KPI BANNER */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
        {/* Left Card: Attendance rate & Commitment Check */}
        <Card className='md:col-span-8 p-5 sm:p-6 rounded-2xl border bg-card shadow-xs flex flex-col justify-between'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <Calendar className='h-5 w-5 text-primary' />
                <h3 className='font-bold text-base text-foreground'>Quá Trình Điểm Danh & Chuyên Cần</h3>
              </div>
              <p className='text-xs text-muted-foreground'>
                Lớp học: <strong className='text-foreground'>{className || matrixData.className}</strong> · Lộ trình chuẩn 27 buổi
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <span className='text-xs font-semibold text-muted-foreground'>Chuẩn cam kết đầu ra:</span>
              <Badge variant='outline' className={isTargetMet ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' : 'bg-amber-50 text-amber-800 border-amber-300 font-bold'}>
                {isTargetMet ? '✓ Đạt chuẩn (≥ 85%)' : '⚠ Cần cải thiện (< 85%)'}
              </Badge>
            </div>
          </div>

          <div className='pt-4 space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-muted-foreground'>Tỉ lệ tham gia học tập:</span>
              <span className='text-xl font-extrabold text-primary tabular-nums'>{attendanceRate}%</span>
            </div>
            <Progress value={attendanceRate} className='h-2.5 bg-muted' />

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center text-xs'>
              <div className='p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-200 dark:border-emerald-800'>
                <span className='text-muted-foreground block text-[11px]'>Có mặt</span>
                <span className='text-base font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block'>{myRecord?.presentCount || 0} buổi</span>
              </div>
              <div className='p-2.5 rounded-xl bg-amber-500/10 border border-amber-200 dark:border-amber-800'>
                <span className='text-muted-foreground block text-[11px]'>Đi muộn</span>
                <span className='text-base font-bold text-amber-800 dark:text-amber-300 mt-0.5 block'>{myRecord?.lateCount || 0} buổi</span>
              </div>
              <div className='p-2.5 rounded-xl bg-purple-500/10 border border-purple-200 dark:border-purple-800'>
                <span className='text-muted-foreground block text-[11px]'>Có phép</span>
                <span className='text-base font-bold text-purple-800 dark:text-purple-300 mt-0.5 block'>{myRecord?.excusedCount || 0} buổi</span>
              </div>
              <div className='p-2.5 rounded-xl bg-rose-500/10 border border-rose-200 dark:border-rose-800'>
                <span className='text-muted-foreground block text-[11px]'>Vắng mặt</span>
                <span className='text-base font-bold text-rose-700 dark:text-rose-400 mt-0.5 block'>{myRecord?.absentCount || 0} buổi</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Card: Next / Active Class Indicator */}
        <Card className='md:col-span-4 p-5 sm:p-6 rounded-2xl border bg-primary/5 border-primary/20 shadow-xs flex flex-col justify-between'>
          <div className='space-y-2'>
            <span className='text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5'>
              <Sparkles className='h-3.5 w-3.5' />
              Tiến Độ Khóa Học
            </span>
            <h4 className='text-2xl font-black text-foreground'>
              {completedSessions} <span className='text-sm font-normal text-muted-foreground'>/ {totalSessions} buổi</span>
            </h4>
            <p className='text-xs text-muted-foreground leading-relaxed'>
              Các buổi học được thiết kế theo cấu trúc bài giảng thực chiến, gắn liền với bài tập thực hành trên hệ thống.
            </p>
          </div>

          <div className='pt-4 border-t border-primary/10'>
            <div className='flex items-center gap-2 text-xs font-semibold text-primary'>
              <Award className='h-4 w-4 shrink-0' />
              <span>Duy trì chuyên cần để đảm bảo kết quả đầu ra cao nhất</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 2. 27-SESSION TIMELINE LIST */}
      <Card className='rounded-2xl border bg-card shadow-xs overflow-hidden'>
        <CardHeader className='p-5 border-b bg-muted/20'>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle className='text-base font-bold text-foreground'>
                Lịch Chi Tiết 27 Buổi Học & Điểm Danh Cá Nhân
              </CardTitle>
              <CardDescription className='text-xs text-muted-foreground mt-0.5'>
                Theo dõi ngày học, khung giờ và xác nhận điểm danh từng buổi từ giáo viên
              </CardDescription>
            </div>
            <span className='text-xs font-bold text-muted-foreground'>27 Buổi học</span>
          </div>
        </CardHeader>

        <CardContent className='p-0 divide-y divide-border'>
          {sessions.map((sess) => {
            const myAtt = mySessions.find((s) => s.sessionId === sess.id);
            const isCompleted = sess.status === 'COMPLETED';
            const sessionDate = sess.sessionDate ? new Date(sess.sessionDate) : null;
            const isPast = sessionDate ? sessionDate < new Date() : false;

            return (
              <div
                key={sess.id}
                className={'p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:bg-muted/30 ' + (isCompleted ? 'bg-card' : 'bg-card/60')}
              >
                <div className='flex items-start sm:items-center gap-3.5'>
                  <div className={'h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ' + (isCompleted ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted text-muted-foreground')}>
                    {String(sess.sessionNumber).padStart(2, '0')}
                  </div>

                  <div className='space-y-0.5'>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <h4 className='font-bold text-sm text-foreground'>
                        {sess.lessonTitle || ('Buổi học số ' + sess.sessionNumber)}
                      </h4>
                      {isCompleted && (
                        <span className='text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded'>
                          Đã hoàn thành
                        </span>
                      )}
                    </div>

                    <div className='flex items-center gap-3 text-xs text-muted-foreground flex-wrap'>
                      {sessionDate && (
                        <span className='flex items-center gap-1'>
                          <Calendar className='w-3.5 h-3.5 text-muted-foreground/70' />
                          {format(sessionDate, 'EEEE, dd/MM/yyyy', { locale: vi })}
                        </span>
                      )}
                      {myAtt?.note && (
                        <span className='text-amber-700 dark:text-amber-400 font-medium'>
                          Ghi chú: {myAtt.note}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className='flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center'>
                  {getAttendanceBadge(myAtt?.attendanceStatus, isPast)}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
