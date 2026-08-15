# Testing and Quality

## Current State

Backend:

- `npm run build` passes.
- `npm run test` currently fails because no test files exist.

Frontend:

- `npm run build` passes.
- `npm run test` passes with only a placeholder test.
- `npm run lint` fails with existing lint debt.

## Commands

Backend:

```bash
cd ielts-api
npm run build
npm run test
```

Frontend:

```bash
cd nextband
npm run build
npm run test
npm run lint
```

## Lint Notes

Frontend ESLint currently flags many errors, mostly:

- `@typescript-eslint/no-explicit-any`
- empty blocks
- empty interfaces equivalent to parent types
- `require()` usage in `tailwind.config.ts`
- React hooks dependency warnings

Recommended cleanup order:

1. Fix small deterministic errors first: empty blocks, `prefer-const`, empty interfaces, Tailwind import style.
2. Decide whether `no-explicit-any` should be temporarily relaxed.
3. Add shared API/domain types.
4. Replace `any` by feature area: auth, course, exam, submission, class.

## Suggested Backend Tests

Prioritize route-level tests around business risk:

1. Auth:
   - register creates student role
   - login rejects inactive users
   - `/auth/me` requires token

2. Course/exam access:
   - student sees only enrolled courses
   - student cannot access unpublished exam
   - open exam can be accessed without enrollment

3. Submission start:
   - returns existing in-progress attempt
   - enforces 3-attempt limit
   - increments open exam participants once per student

4. Submission submit:
   - saves/upserts answers
   - auto-grades objective questions
   - leaves manual exams as `submitted`
   - updates enrollment progress

5. Teacher scope:
   - teacher cannot read submissions outside their classes
   - teacher can grade own class submissions

## Suggested Frontend Tests

Prioritize components and pages with high behavioral complexity:

1. `useAuth`:
   - loads stored token and user
   - clears invalid token
   - role booleans are correct

2. Protected routes:
   - unauthenticated redirect
   - role-based redirect

3. Course detail:
   - displays attempt status
   - disables exam after attempt limit
   - shows open exam slot info

4. Exam interface:
   - restores saved answers
   - serializes answers correctly
   - handles time-up submit once

5. Question renderers:
   - fill blank answer shape
   - matching answer shape
   - speaking audio upload callback

## Manual Test Checklist

Minimum smoke test before release:

1. Login as admin.
2. Create course.
3. Create exam.
4. Edit each default section.
5. Add at least one question group and question.
6. Publish course and exam.
7. Add/enroll a student.
8. Login as student.
9. Start exam.
10. Submit answers.
11. Confirm auto-graded objective score.
12. For writing/speaking, login as admin/teacher and grade submission.
13. Confirm student can view result.
14. Confirm course progress updates.
15. Upload image/audio and verify rendered URL.

## Build Warnings

Frontend production build currently warns that the main JS chunk is large. Route-level dynamic imports are the highest-impact fix.

Suggested split points:

- admin routes
- exam interface route
- rich text editor
- charts/dashboard

