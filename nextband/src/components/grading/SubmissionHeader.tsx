import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Clock, FileText, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { deriveSubmissionTiming } from '@/lib/homeworkStatusHelper';
import { Link } from 'react-router-dom';

interface SubmissionHeaderProps {
  student: {
    id?: string;
    userId?: string;
    studentId?: string;
    full_name?: string | null;
    fullName?: string | null;
    email?: string | null;
    avatar_url?: string | null;
    avatarUrl?: string | null;
  } | null;
  exam: {
    id?: string;
    examId?: string;
    title: string;
    exam_type?: string;
    examType?: string;
  } | null;
  status: string | null;
  submittedAt: string | null;
  deadline?: string | null;
}

export function SubmissionHeader({ student, exam, status, submittedAt, deadline }: SubmissionHeaderProps) {
  const timing = deriveSubmissionTiming(submittedAt, deadline);
  const studentName = student?.full_name || student?.fullName || 'Chưa đặt tên';
  const studentAvatar = student?.avatar_url || student?.avatarUrl || undefined;
  const examType = exam?.exam_type || exam?.examType;
  const examId = exam?.id || exam?.examId;

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'graded':
        return <Badge className="bg-emerald-600 text-white font-bold">Đã chấm</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-bold">Đã nộp</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">Đang làm</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={studentAvatar} />
          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
        </Avatar>
        <div>
          {student?.email || student?.id ? (
            <Link
              to={`/admin/users?search=${encodeURIComponent(student.email || student.id || studentName)}`}
              className="text-xl font-bold hover:text-primary hover:underline transition-colors inline-flex items-center gap-1.5"
              title="Mở hồ sơ học viên"
            >
              <span>{studentName}</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </Link>
          ) : (
            <h1 className="text-xl font-bold">{studentName}</h1>
          )}
          <p className="text-sm text-muted-foreground">{student?.email}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <FileText className="h-4 w-4 shrink-0" />
          {examId ? (
            <Link
              to={`/admin/exams/${examId}`}
              className="text-foreground font-semibold hover:text-primary hover:underline inline-flex items-center gap-1"
              title="Mở chi tiết bài tập/đề thi"
            >
              <span>{exam?.title}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </Link>
          ) : (
            <span className="text-foreground font-semibold">{exam?.title}</span>
          )}
          {examType && (
            <Badge variant="secondary" className="ml-1">{examType.toUpperCase()}</Badge>
          )}
        </div>
        {submittedAt && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{new Date(submittedAt).toLocaleString('vi-VN')}</span>
          </div>
        )}
        {submittedAt && (
          timing.isLate ? (
            <Badge variant="destructive" className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-300 font-bold gap-1">
              <AlertCircle className="h-3 w-3" />
              Nộp trễ {timing.lateDays} ngày
            </Badge>
          ) : (
            <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Nộp đúng hạn
            </Badge>
          )
        )}
        {getStatusBadge(status)}
      </div>
    </div>
  );
}

