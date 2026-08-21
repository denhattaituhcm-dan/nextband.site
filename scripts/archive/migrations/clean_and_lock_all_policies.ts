import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanAndLock() {
  console.log("================================================================================");
  console.log("      CLEANING UP LEGACY DUPLICATE POLICIES & ENFORCING CANONICAL RLS           ");
  console.log("================================================================================\n");

  const tables = [
    "courses",
    "classes",
    "enrollments",
    "exam_submissions",
    "answers",
    "user_roles",
    "profiles",
    "class_students",
    "class_sessions",
    "class_attendance",
    "exams",
    "exam_sections",
    "question_groups",
    "questions"
  ];

  // 1. Fetch all existing policies on these tables
  const existingPolicies: any[] = await prisma.$queryRaw`
    SELECT tablename, policyname
    FROM pg_policies
    WHERE tablename IN (${Prisma.join(tables)})
  `;

  console.log(`Found ${existingPolicies.length} total existing policies across target tables.`);

  // 2. Drop all existing policies to start with a 100% clean slate
  for (const pol of existingPolicies) {
    const dropSql = `DROP POLICY IF EXISTS "${pol.policyname}" ON public."${pol.tablename}";`;
    try {
      await prisma.$executeRawUnsafe(dropSql);
      console.log(`  - Dropped policy "${pol.policyname}" on "${pol.tablename}"`);
    } catch (e: any) {
      console.warn(`  ! Warning dropping "${pol.policyname}":`, e.message);
    }
  }

  console.log("\n>>> Applying Single Canonical, Defense-in-Depth RLS Policies...");

  const canonicalPolicies = [
    // --- 1. PROFILES ---
    `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "profiles_select_policy" ON public.profiles FOR SELECT USING (true);`, // Public view of directory
    `CREATE POLICY "profiles_insert_policy" ON public.profiles FOR INSERT WITH CHECK (
      (auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role) OR (auth.role() = 'service_role'::text)
    );`,
    `CREATE POLICY "profiles_update_policy" ON public.profiles FOR UPDATE USING (
      (auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role)
    ) WITH CHECK (
      (auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role)
    );`,
    `CREATE POLICY "profiles_delete_policy" ON public.profiles FOR DELETE USING (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 2. USER_ROLES ---
    `ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "user_roles_select_policy" ON public.user_roles FOR SELECT USING (
      (auth.uid() = user_id) OR has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'teacher'::app_role)
    );`,
    `CREATE POLICY "user_roles_admin_write_policy" ON public.user_roles FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role) OR (auth.role() = 'service_role'::text)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role) OR (auth.role() = 'service_role'::text)
    );`,

    // --- 3. COURSES ---
    `ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "courses_select_policy" ON public.courses FOR SELECT USING (
      is_published = true 
      OR has_role(auth.uid(), 'admin'::app_role) 
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR EXISTS (SELECT 1 FROM public.enrollments en WHERE en.course_id = courses.id AND en.student_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.class_students cs JOIN public.classes c ON cs.class_id = c.id WHERE c.course_id = courses.id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "courses_admin_write_policy" ON public.courses FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 4. CLASSES ---
    `ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "classes_select_policy" ON public.classes FOR SELECT USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR teacher_id = auth.uid()
      OR EXISTS (SELECT 1 FROM public.class_students cs WHERE cs.class_id = classes.id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "classes_write_policy" ON public.classes FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR (has_role(auth.uid(), 'teacher'::app_role) AND teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR (has_role(auth.uid(), 'teacher'::app_role) AND teacher_id = auth.uid())
    );`,

    // --- 5. ENROLLMENTS ---
    `ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "enrollments_select_policy" ON public.enrollments FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,
    `CREATE POLICY "enrollments_admin_write_policy" ON public.enrollments FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 6. CLASS_STUDENTS ---
    `ALTER TABLE public.class_students ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "class_students_select_policy" ON public.class_students FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    );`,
    `CREATE POLICY "class_students_write_policy" ON public.class_students FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_students.class_id AND c.teacher_id = auth.uid())
    );`,

    // --- 7. CLASS_SESSIONS & CLASS_ATTENDANCE ---
    `ALTER TABLE public.class_sessions ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "class_sessions_select_policy" ON public.class_sessions FOR SELECT USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
      OR EXISTS (SELECT 1 FROM public.class_students cs WHERE cs.class_id = class_sessions.class_id AND cs.student_id = auth.uid())
    );`,
    `CREATE POLICY "class_sessions_write_policy" ON public.class_sessions FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_sessions.class_id AND c.teacher_id = auth.uid())
    );`,

    `ALTER TABLE public.class_attendance ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "class_attendance_select_policy" ON public.class_attendance FOR SELECT USING (
      student_id = auth.uid()
      OR has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    );`,
    `CREATE POLICY "class_attendance_write_policy" ON public.class_attendance FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR EXISTS (SELECT 1 FROM public.classes c WHERE c.id = class_attendance.class_id AND c.teacher_id = auth.uid())
    );`,

    // --- 8. EXAMS & SECTIONS ---
    `ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "exams_select_policy" ON public.exams FOR SELECT USING (
      (is_published = true AND is_active = true)
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,
    `CREATE POLICY "exams_write_policy" ON public.exams FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,

    `ALTER TABLE public.exam_sections ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "exam_sections_select_policy" ON public.exam_sections FOR SELECT USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR EXISTS (SELECT 1 FROM public.exams e WHERE e.id = exam_sections.exam_id AND e.is_published = true)
    );`,
    `CREATE POLICY "exam_sections_write_policy" ON public.exam_sections FOR ALL USING (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    ) WITH CHECK (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,

    // --- 9. EXAM_SUBMISSIONS (Strict Isolation) ---
    `ALTER TABLE public.exam_submissions ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "exam_submissions_select_policy" ON public.exam_submissions FOR SELECT USING (
      (student_id = auth.uid())
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
    );`,
    `CREATE POLICY "exam_submissions_insert_policy" ON public.exam_submissions FOR INSERT WITH CHECK (
      (student_id = auth.uid() AND (status = 'in_progress'::submission_status) AND (total_score IS NULL))
      OR has_role(auth.uid(), 'admin'::app_role)
      OR (auth.role() = 'service_role'::text)
    );`,
    `CREATE POLICY "exam_submissions_update_policy" ON public.exam_submissions FOR UPDATE USING (
      ((student_id = auth.uid()) AND (status = 'in_progress'::submission_status))
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR (auth.role() = 'service_role'::text)
    ) WITH CHECK (
      ((student_id = auth.uid()) AND (status = 'in_progress'::submission_status) AND (total_score IS NULL))
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR (auth.role() = 'service_role'::text)
    );`,
    `CREATE POLICY "exam_submissions_delete_policy" ON public.exam_submissions FOR DELETE USING (
      has_role(auth.uid(), 'admin'::app_role)
    );`,

    // --- 10. ANSWERS (Strict Isolation & Lock on Graded) ---
    `ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;`,
    `CREATE POLICY "answers_select_policy" ON public.answers FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM public.exam_submissions es
        WHERE es.id = answers.submission_id
        AND (
          es.student_id = auth.uid()
          OR has_role(auth.uid(), 'admin'::app_role)
          OR has_role(auth.uid(), 'teacher'::app_role)
        )
      )
    );`,
    `CREATE POLICY "answers_student_upsert_policy" ON public.answers FOR ALL USING (
      EXISTS (
        SELECT 1 FROM public.exam_submissions es
        WHERE es.id = answers.submission_id
        AND es.student_id = auth.uid()
        AND es.status = 'in_progress'::submission_status
      )
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR (auth.role() = 'service_role'::text)
    ) WITH CHECK (
      (
        EXISTS (
          SELECT 1 FROM public.exam_submissions es
          WHERE es.id = answers.submission_id
          AND es.student_id = auth.uid()
          AND es.status = 'in_progress'::submission_status
        )
        AND score IS NULL
      )
      OR has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'teacher'::app_role)
      OR (auth.role() = 'service_role'::text)
    );`,
  ];

  for (let i = 0; i < canonicalPolicies.length; i++) {
    const stmt = canonicalPolicies[i].trim();
    await prisma.$executeRawUnsafe(stmt);
    console.log(`✓ [${i + 1}/${canonicalPolicies.length}] Applied canonical policy.`);
  }

  console.log("\n================================================================================");
  console.log("       ✅ ALL LEGACY POLICIES CLEANED & CANONICAL RLS STRICTLY APPLIED          ");
  console.log("================================================================================");
}

cleanAndLock()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
