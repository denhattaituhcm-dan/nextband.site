import { describe, it, expect, beforeEach } from 'vitest';
import { createMockPrisma } from './mockPrisma.js';
import { NotificationService } from '../src/services/notification.service.js';
import { SubmissionService } from '../src/services/submission.service.js';
import { HomeworkService } from '../src/services/homework.service.js';
import { NotificationType, SubmissionStatus, EnrollmentStatus } from '@prisma/client';

describe('Notification Subsystem End-to-End Test Suite', () => {
  let mockPrisma: any;
  let notificationService: NotificationService;
  let submissionService: SubmissionService;
  let homeworkService: HomeworkService;

  const teacherId = 'teacher-uuid-1';
  const student1Id = 'student-uuid-1';
  const student2Id = 'student-uuid-2';
  const classId = 'class-uuid-1';
  const courseId = 'course-uuid-1';
  const homeworkId = 'homework-uuid-1';

  beforeEach(() => {
    mockPrisma = createMockPrisma();
    notificationService = new NotificationService(mockPrisma as any);
    submissionService = new SubmissionService(mockPrisma as any);
    homeworkService = new HomeworkService(mockPrisma as any);

    // Setup Baseline Data
    mockPrisma.users.push(
      { id: teacherId, email: 'teacher@test.com', fullName: 'Thầy Hoàng Anh', isActive: true },
      { id: student1Id, email: 'student1@test.com', fullName: 'Nguyễn Văn An', isActive: true },
      { id: student2Id, email: 'student2@test.com', fullName: 'Trần Thị Bình', isActive: true }
    );

    mockPrisma.userRoles.push(
      { id: 'ur-1', userId: teacherId, role: 'teacher' },
      { id: 'ur-2', userId: student1Id, role: 'student' },
      { id: 'ur-3', userId: student2Id, role: 'student' }
    );

    mockPrisma.courses.push({
      id: courseId,
      title: 'IELTS Intensive',
      isActive: true,
    });

    mockPrisma.classes.push({
      id: classId,
      courseId,
      name: 'IELTS 7.0 Night Class',
      teacherId,
      status: 'ACTIVE',
      isActive: true,
    });

    mockPrisma.classStudents.push(
      { id: 'cs-1', classId, studentId: student1Id, status: EnrollmentStatus.ACTIVE },
      { id: 'cs-2', classId, studentId: student2Id, status: EnrollmentStatus.ACTIVE }
    );

    mockPrisma.homeworks.push({
      id: homeworkId,
      classId,
      createdBy: teacherId,
      title: 'HW 12: IELTS Writing Task 2',
      status: 'PUBLISHED',
      deadline: new Date('2026-09-01'),
      class: {
        id: classId,
        teacherId,
      },
    });
  });

  describe('GATE N2: NotificationService Isolated Unit Tests', () => {
    it('creates single notification with unique tracking', async () => {
      await notificationService.createNotification(mockPrisma, {
        userId: teacherId,
        type: NotificationType.NEW_SUBMISSION,
        title: 'New submission',
        message: 'Student submitted',
        link: '/admin/classes/1',
        entityType: 'SUBMISSION',
        entityId: 'sub-1',
      });

      const list = await notificationService.listNotifications({ userId: teacherId });
      expect(list.items.length).toBe(1);
      expect(list.items[0].title).toBe('New submission');
      expect(list.items[0].isRead).toBe(false);

      const unread = await notificationService.getUnreadCount(teacherId);
      expect(unread).toBe(1);
    });

    it('N3-B: Idempotent - suppresses duplicate notification on retry (P2002 catch)', async () => {
      // 1st insert
      await notificationService.createNotification(mockPrisma, {
        userId: teacherId,
        type: NotificationType.NEW_SUBMISSION,
        title: 'New submission',
        message: 'Student submitted',
        entityType: 'SUBMISSION',
        entityId: 'sub-same-1',
      });

      // 2nd insert with exact same entityType + entityId + userId + type (Retry attempt)
      await notificationService.createNotification(mockPrisma, {
        userId: teacherId,
        type: NotificationType.NEW_SUBMISSION,
        title: 'New submission retry',
        message: 'Student submitted retry',
        entityType: 'SUBMISSION',
        entityId: 'sub-same-1',
      });

      const list = await notificationService.listNotifications({ userId: teacherId });
      expect(list.items.length).toBe(1); // Blocked duplicate
    });

    it('creates batch notifications in 1 operation with skipDuplicates', async () => {
      await notificationService.createBatchNotifications(mockPrisma, [
        {
          userId: student1Id,
          type: NotificationType.NEW_HOMEWORK,
          title: 'HW 1',
          message: 'New HW',
          entityType: 'HOMEWORK',
          entityId: 'hw-1',
        },
        {
          userId: student2Id,
          type: NotificationType.NEW_HOMEWORK,
          title: 'HW 1',
          message: 'New HW',
          entityType: 'HOMEWORK',
          entityId: 'hw-1',
        },
      ]);

      const s1Count = await notificationService.getUnreadCount(student1Id);
      const s2Count = await notificationService.getUnreadCount(student2Id);
      expect(s1Count).toBe(1);
      expect(s2Count).toBe(1);
    });

    it('N3-C: Object-level authorization on markAsRead', async () => {
      await notificationService.createNotification(mockPrisma, {
        userId: teacherId,
        type: NotificationType.NEW_SUBMISSION,
        title: 'Teacher notif',
        message: 'Secret for teacher',
      });

      const teacherItems = await notificationService.listNotifications({ userId: teacherId });
      const notifId = teacherItems.items[0].id;

      // Student tries to mark Teacher's notification as read -> should fail (return false)
      const hacked = await notificationService.markAsRead(notifId, student1Id);
      expect(hacked).toBe(false);

      // Teacher marks own notification as read -> should succeed
      const legitimate = await notificationService.markAsRead(notifId, teacherId);
      expect(legitimate).toBe(true);

      const unreadAfter = await notificationService.getUnreadCount(teacherId);
      expect(unreadAfter).toBe(0);
    });

    it('markAllAsRead marks all unread items for current user only', async () => {
      await notificationService.createNotification(mockPrisma, {
        userId: student1Id,
        type: NotificationType.NEW_HOMEWORK,
        title: 'HW 1',
        message: 'Desc',
      });
      await notificationService.createNotification(mockPrisma, {
        userId: student1Id,
        type: NotificationType.NEW_HOMEWORK,
        title: 'HW 2',
        message: 'Desc',
      });
      await notificationService.createNotification(mockPrisma, {
        userId: student2Id,
        type: NotificationType.NEW_HOMEWORK,
        title: 'HW for S2',
        message: 'Desc',
      });

      expect(await notificationService.getUnreadCount(student1Id)).toBe(2);
      expect(await notificationService.getUnreadCount(student2Id)).toBe(1);

      await notificationService.markAllAsRead(student1Id);

      expect(await notificationService.getUnreadCount(student1Id)).toBe(0);
      expect(await notificationService.getUnreadCount(student2Id)).toBe(1); // Unaffected
    });
  });

  describe('GATE N3: Business Events End-to-End Verification', () => {
    it('Business Event 1: Student submits homework -> Teacher receives NEW_SUBMISSION notification', async () => {
      const submission = await submissionService.submitHomework(homeworkId, student1Id);
      expect(submission.status).toBe(SubmissionStatus.SUBMITTED);

      // Verify Teacher Notification in DB
      const teacherNotifs = await notificationService.listNotifications({ userId: teacherId });
      expect(teacherNotifs.items.length).toBe(1);

      const notif = teacherNotifs.items[0];
      expect(notif.type).toBe(NotificationType.NEW_SUBMISSION);
      expect(notif.title).toContain('HW 12: IELTS Writing Task 2');
      expect(notif.message).toContain('Nguyễn Văn An');
      expect(notif.entityType).toBe('SUBMISSION');
      expect(notif.entityId).toBe(submission.id);
      expect(notif.isRead).toBe(false);

      // Student should not receive submission notification
      const studentNotifs = await notificationService.listNotifications({ userId: student1Id });
      expect(studentNotifs.items.length).toBe(0);
    });

    it('Business Event 2: Teacher grades submission -> Student receives SUBMISSION_GRADED notification', async () => {
      // First submit
      await submissionService.submitHomework(homeworkId, student1Id);

      // Teacher grades
      const graded = await submissionService.gradeSubmission(
        {
          homeworkId,
          studentId: student1Id,
          score: 8.5,
          feedback: 'Excellent coherent paragraphs and lexical resource.',
        },
        {
          userId: teacherId,
          userRoles: ['teacher'],
        }
      );

      expect(graded.status).toBe(SubmissionStatus.GRADED);

      // Verify Student Notification in DB
      const studentNotifs = await notificationService.listNotifications({ userId: student1Id });
      expect(studentNotifs.items.length).toBe(1);

      const notif = studentNotifs.items[0];
      expect(notif.type).toBe(NotificationType.SUBMISSION_GRADED);
      expect(notif.title).toContain('HW 12: IELTS Writing Task 2');
      expect(notif.message).toContain('8.5');
      expect(notif.entityType).toBe('SUBMISSION');
      expect(notif.entityId).toBe(graded.id);
      expect(notif.isRead).toBe(false);
    });

    it('Business Event 3: Teacher creates homework -> All ACTIVE students in class receive NEW_HOMEWORK notification', async () => {
      const newHomework = await homeworkService.createHomework({
        classId,
        createdBy: teacherId,
        userRoles: ['teacher'],
        title: 'HW 13: Listening Cam 18 Test 3',
        description: 'Listen and fill blanks',
        deadline: '2026-09-10',
      });

      expect(newHomework.title).toBe('HW 13: Listening Cam 18 Test 3');

      // Both active students in classId should have received NEW_HOMEWORK
      const s1Notifs = await notificationService.listNotifications({ userId: student1Id });
      const s2Notifs = await notificationService.listNotifications({ userId: student2Id });

      expect(s1Notifs.items.length).toBe(1);
      expect(s1Notifs.items[0].type).toBe(NotificationType.NEW_HOMEWORK);
      expect(s1Notifs.items[0].title).toBe('Bài tập mới: HW 13: Listening Cam 18 Test 3');
      expect(s1Notifs.items[0].entityType).toBe('HOMEWORK');
      expect(s1Notifs.items[0].entityId).toBe(newHomework.id);

      expect(s2Notifs.items.length).toBe(1);
      expect(s2Notifs.items[0].type).toBe(NotificationType.NEW_HOMEWORK);
      expect(s2Notifs.items[0].title).toBe('Bài tập mới: HW 13: Listening Cam 18 Test 3');
    });
  });
});
