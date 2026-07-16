# TaskForge

A full-stack task management application for creating, updating, tracking, and deleting tasks, with all data persisted in a MySQL database.

This README provides an overview of the project, setup instructions, technology choices, and implementation decisions. More detailed documentation is available in the `docs/` directory:

- [`docs/API.md`](./docs/API.md) — Complete REST API reference with request/response examples.
- [`docs/database.md`](./docs/database.md) — Database schema, Prisma configuration, and implementation notes.
- [`docs/architecture.md`](./docs/architecture.md) — Application architecture and request flow.
- [`docs/technical-decisions.md`](./docs/technical-decisions.md) — Design decisions, trade-offs, and future improvements.

---

# Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router, Axios, CSS
- **Backend:** Node.js, Express, TypeScript
- **Database:** MySQL 8, Prisma ORM
- **Validation:** Zod
- **Tooling:** ESLint, Prettier, Husky, lint-staged, Commitlint

---

# Features

- Create, update, and delete tasks
- Update task status
- Persistent task storage using MySQL and Prisma ORM
- Input validation with Zod
- **Layered backend architecture** — Request flow follows:

  `Routes → Validation Middleware → Controllers → Services → Prisma`

  Supporting modules such as `config`, `utils`, `types`, and `validators` keep concerns separated and improve maintainability.

- React frontend consuming REST APIs via Axios
- Centralized API service layer

---

## Architecture

The application follows a layered architecture:

React UI
↓
Service Layer (Axios)
↓
Express Routes
↓
Validation Middleware
↓
Controllers
↓
Services
↓
Prisma ORM
↓
MySQL

See [`docs/architecture.md`](./docs/architecture.md) for a detailed explanation.

---

# Project Structure

```text
TaskForge/
├── client/              # React frontend (Vite)
├── server/              # Express + Prisma backend
├── docs/                # Project documentation
├── eslint.config.js     # Shared ESLint configuration
├── package.json         # npm workspaces & shared tooling
└── README.md
```

---

# Setup Instructions

## Prerequisites

- Node.js 20+
- npm 10+
- MySQL 8

---

## 1. Clone the Repository

```bash
git clone https://github.com/yasaswini2104/taskforge.git
cd taskforge
npm install
```

Since the project uses **npm workspaces**, a single `npm install` installs dependencies for both the frontend and backend.

---

## 2. Configure the Database

Create a MySQL database (for example, `taskforge_db`).

Inside the `server` directory:

```bash
cd server
cp .env.example .env
```

Configure the environment variables:

```env
DATABASE_URL="mysql://username:password@localhost:3306/taskforge_db"

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=taskforge_db
```

Apply the database migration:

```bash
npx prisma migrate dev
```

> **Note:** While integrating MySQL 8 with Prisma's MariaDB adapter, an authentication configuration (`allowPublicKeyRetrieval`) was required for certain MySQL installations. This is already configured in the project, but the implementation details are documented in [`docs/database.md`](./docs/database.md).

---

## 3. Configure the Frontend

Inside the `client` directory:

```bash
cd ../client
cp .env.example .env
```

Configure:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 4. Run the Application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

Applications will be available at:

- Frontend → http://localhost:5173
- Backend → http://localhost:5000

---

# API Summary

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/tasks`     | Get all tasks           |
| GET    | `/api/tasks/:id` | Get a task by ID        |
| POST   | `/api/tasks`     | Create a new task       |
| PUT    | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task           |

Complete request/response examples, status codes, and error formats are available in [`docs/API.md`](./docs/API.md).

---

# Task Model

```ts
{
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}
```

---

# Code Quality

The project uses **npm workspaces**, allowing both applications to share a single set of development tooling.

### ESLint

```bash
npm run lint
```

```bash
npm run lint:fix
```

### Prettier

```bash
npm run format
```

```bash
npm run format:check
```

### Git Hooks

- Husky
- lint-staged
- Commitlint (Conventional Commits)

Before every commit, staged files are automatically formatted and linted, and commit messages are validated against the Conventional Commits specification.

---

# Technical Decisions

Some notable implementation decisions include:

- **React state only** — The application uses `useState` without Redux, Context, or React Query because the application complexity does not justify additional state management libraries.
- **Layered backend architecture** — The backend separates routing, validation, controllers, services, and database access into dedicated layers with clear responsibilities.
- **Centralized Axios service** — Components never call Axios directly; API communication is encapsulated within a dedicated service layer.
- **Zod validation** — Request validation is centralized using reusable schema-based middleware instead of manual validation logic.
- **MySQL instead of SQLite** — Although SQLite would have been sufficient for this assignment, MySQL was chosen to gain experience working with a dedicated relational database and a production-style development environment.

Detailed explanations of the project's architecture, implementation decisions, and future enhancements are available in [`docs/technical-decisions.md`](./docs/technical-decisions.md).

---

# Known Limitations

- Authentication is intentionally not implemented, as it was not specified in the assignment requirements.

---

# Documentation

Additional project documentation:

- [`docs/API.md`](./docs/API.md)
- [`docs/database.md`](./docs/database.md)
- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/technical-decisions.md`](./docs/technical-decisions.md)
