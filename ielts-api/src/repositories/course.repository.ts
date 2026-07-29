import { PrismaClient, Prisma } from '@prisma/client';

export class CourseRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          orderBy: { lessonOrder: 'asc' },
          include: { resources: true }
        }
      }
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: { slug },
      include: {
        lessons: {
          orderBy: { lessonOrder: 'asc' },
          include: { resources: true }
        }
      }
    });
  }

  async list(params: { search?: string; isPublished?: boolean }) {
    const where: Prisma.CourseWhereInput = {};
    if (params.search) {
      where.OR = [
        { title: { contains: params.search } },
        { description: { contains: params.search } }
      ];
    }
    if (params.isPublished !== undefined) {
      where.isPublished = params.isPublished;
    }
    return this.prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { lessons: { orderBy: { lessonOrder: 'asc' } } }
    });
  }

  async create(data: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data });
  }

  async createLesson(data: Prisma.LessonCreateInput) {
    return this.prisma.lesson.create({ data, include: { resources: true } });
  }

  async addLessonResource(data: Prisma.LessonResourceCreateInput) {
    return this.prisma.lessonResource.create({ data });
  }
}
