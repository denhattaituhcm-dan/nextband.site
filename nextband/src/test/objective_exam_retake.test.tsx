import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SubmissionDetail from "../pages/SubmissionDetail";
import { submissionsApi } from "@/lib/api";
import { isObjectiveExam } from "../../../server/services/exam-submission.service";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<any>("@/lib/api");
  return {
    ...actual,
    submissionsApi: {
      ...actual.submissionsApi,
      getById: vi.fn(),
      start: vi.fn(),
      startRevision: vi.fn(),
      list: vi.fn().mockResolvedValue({ data: [], meta: {} }),
    },
    examsApi: {
      getById: vi.fn(),
    },
  };
});

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "student-1", fullName: "Test Student", roles: ["student"] },
    isAuthenticated: true,
    isAdmin: false,
    isTeacher: false,
  }),
}));

describe("🎯 Objective Exam Retake (Làm lại bài trắc nghiệm)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  });

  describe("isObjectiveExam helper", () => {
    it("identifies reading, listening, grammar, quiz as objective exams", () => {
      expect(isObjectiveExam({ examType: "reading" })).toBe(true);
      expect(isObjectiveExam({ examType: "listening" })).toBe(true);
      expect(isObjectiveExam({ examType: "quiz" })).toBe(true);
      expect(isObjectiveExam({ examType: "grammar" })).toBe(true);
      expect(isObjectiveExam({ examType: "vocabulary" })).toBe(true);
    });

    it("identifies writing and speaking as subjective exams", () => {
      expect(isObjectiveExam({ examType: "writing" })).toBe(false);
      expect(isObjectiveExam({ examType: "speaking" })).toBe(false);
    });

    it("identifies exams with only objective questions as objective", () => {
      const exam = {
        examType: "general",
        sections: [
          {
            sectionType: "reading",
            questionGroups: [
              {
                questions: [
                  { questionType: "multiple_choice" },
                  { questionType: "fill_blank" },
                ],
              },
            ],
          },
        ],
      };
      expect(isObjectiveExam(exam)).toBe(true);
    });

    it("identifies exams with essay or speaking questions as subjective", () => {
      const exam = {
        examType: "general",
        sections: [
          {
            sectionType: "writing",
            questionGroups: [
              {
                questions: [{ questionType: "essay" }],
              },
            ],
          },
        ],
      };
      expect(isObjectiveExam(exam)).toBe(false);
    });
  });

  describe("UI Retake Behavior", () => {
    it("renders 'Làm Lại Bài Này' button for objective exams and triggers retake with allowRetake: true", async () => {
      const mockObjectiveSubmission = {
        id: "sub-listening-1",
        examId: "exam-listening-1",
        studentId: "student-1",
        status: "GRADED",
        totalScore: 1,
        correctAnswers: 1,
        totalQuestions: 5,
        submittedAt: new Date().toISOString(),
        exam: {
          id: "exam-listening-1",
          title: "Listening Test 1",
          examType: "listening",
          sections: [
            {
              sectionType: "listening",
              questionGroups: [
                {
                  questions: [
                    {
                      id: "q1",
                      questionType: "short_answer",
                      questionText: "Question 1",
                      correctAnswer: "apple",
                    },
                    {
                      id: "q2",
                      questionType: "short_answer",
                      questionText: "Question 2",
                      correctAnswer: "banana",
                    },
                  ],
                },
              ],
            },
          ],
        },
        answers: [
          { questionId: "q1", answerText: "apple", score: 1 },
          { questionId: "q2", answerText: "orange", score: 0 },
        ],
      };

      (submissionsApi.getById as any).mockResolvedValue(mockObjectiveSubmission);
      (submissionsApi.start as any).mockResolvedValue({
        id: "sub-listening-2",
        status: "IN_PROGRESS",
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/submissions/sub-listening-1"]}>
            <Routes>
              <Route path="/submissions/:id" element={<SubmissionDetail />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      );

      // Wait for submission detail to load
      await waitFor(() => {
        expect(screen.getAllByText("Làm Lại Bài Này").length).toBeGreaterThan(0);
      });

      // Find retake button and click it
      const retakeBtn = screen.getAllByText("Làm Lại Bài Này")[0];
      fireEvent.click(retakeBtn);

      await waitFor(() => {
        expect(submissionsApi.start).toHaveBeenCalledWith("exam-listening-1", {
          allowRetake: true,
        });
      });
    });
  });
});
