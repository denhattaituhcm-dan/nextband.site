# Local Setup

## Requirements

- Node.js 18+
- npm
- MySQL 8+

## Backend Setup

```bash
cd ielts-api
npm install
cp .env.example .env
```

Edit `ielts-api/.env`:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/ielts_db"
JWT_SECRET="replace-with-local-secret"
JWT_EXPIRES_IN="7d"
UPLOAD_DIR="uploads"
MAX_FILE_SIZE="52428800"
FRONTEND_URL="http://localhost:8080"
APP_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
```

Create the database:

```bash
mysql -u root -p -e "CREATE DATABASE ielts_db;"
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Backend URL:

```text
http://localhost:3000/api/v1
```

Health check:

```text
GET http://localhost:3000/api/v1/health
```

## Frontend Setup

```bash
cd nextband
npm install
```

Create `nextband/.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_GOOGLE_CLIENT_ID=
```

Run the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:8080
```

## Seed Accounts

After running `npm run db:seed` in `ielts-api`:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@ielts.com` | `admin123` |
| Teacher | `teacher@ielts.com` | `teacher123` |
| Student | `student@ielts.com` | `student123` |

## Common Commands

Backend:

```bash
cd ielts-api
npm run dev
npm run build
npm run db:migrate
npm run db:deploy
npm run db:studio
npm run db:seed
```

Frontend:

```bash
cd nextband
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Current Verification State

Last verified locally:

- `ielts-api npm run build`: passes.
- `ielts-api npm run test`: fails because no test files exist.
- `nextband npm run build`: passes.
- `nextband npm run test`: passes with only `src/test/example.test.ts`.
- `nextband npm run lint`: fails due to existing lint debt.

