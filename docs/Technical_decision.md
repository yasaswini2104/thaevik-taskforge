# Technical Decisions & Justifications

This document explains the reasoning behind the technical decisions made while building TaskForge. Rather than simply listing technologies, it focuses on why particular approaches were chosen and what trade-offs were considered.

---

# Stack Choices

### Backend — Node.js + Express + TypeScript

I considered both Flask/FastAPI and Spring Boot before deciding on Node.js. Since the frontend was already being built with React, using TypeScript across the entire project allowed me to work in a single language and share the same development workflow throughout the stack.

TypeScript was chosen over plain JavaScript because it catches many common mistakes during development, making refactoring safer and reducing runtime errors.

### Database — MySQL + Prisma

I chose MySQL over both SQLite and MongoDB.

SQLite would have been simpler to set up for a project of this size, but I wanted to work with a dedicated relational database server, including connection management, migrations.

I also considered MongoDB. However, the application's data model is highly structured and relational, consisting of well-defined entities with predictable fields. A relational database naturally enforces data integrity through a fixed schema, constraints, and strong typing, making MySQL a better fit for this use case.

Prisma complements this approach by providing a type-safe ORM with schema migrations and excellent TypeScript integration, allowing the application code and database schema to evolve together.

While integrating Prisma with MySQL, I also encountered and resolved a real authentication issue involving MySQL 8's `caching_sha2_password` authentication plugin. That experience is documented in detail in `database.md`.

### Frontend — React + TypeScript + Vite

React was the natural choice given my familiarity with the framework.

Vite was selected over Create React App because of its significantly faster development experience and because CRA is no longer actively maintained.

For styling, I chose plain CSS. The UI is relatively small, so introducing Tailwind or CSS-in-JS would have added unnecessary tooling without providing meaningful benefits.

---

# State Management

The application intentionally uses React's built-in `useState` rather than Redux, Context, Zustand, or React Query.

The application has a single page with one shared list of tasks. There is no deep component hierarchy, global application state, or complex server-state synchronization that would justify introducing additional state-management libraries.

Keeping state local makes the code easier to understand while avoiding unnecessary dependencies.

---

# API Layer

Rather than allowing components to call Axios directly, every HTTP request passes through a dedicated service layer.

```
Component
    │
    ▼
task.service.ts
    │
    ▼
api.ts (Axios)
    │
    ▼
Backend API
```

This provides a few advantages:

- Components remain focused on rendering and user interaction.
- HTTP configuration exists in one place.
- Backend changes can often be isolated to the service layer.
- Components work with domain objects instead of Axios response objects.

---

# Validation

Request validation is implemented using reusable Zod schemas.

Instead of writing manual validation logic inside controllers, each route applies the appropriate validation middleware before the request reaches the controller.

This keeps validation rules centralized, reusable, and easier to maintain while providing consistent error responses across the API.

---

# Project Structure

Both the frontend and backend follow a layered architecture.

The responsibilities are separated as follows:

- **Routes** map endpoints to controllers.
- **Middleware** performs request validation and error handling.
- **Controllers** translate HTTP requests into service calls.
- **Services** contain business logic and database operations.
- **Prisma** manages persistence.

Keeping these responsibilities separate makes each layer easier to test, modify, and reason about.

---

# Code Quality Tooling

To keep code quality and commit history consistent, the project uses:

- ESLint
- Prettier
- Husky
- lint-staged
- commitlint
- npm Workspaces

A single root ESLint Flat Config is shared between both the client and server while still applying the correct environment rules for React and Node.js.

Before each commit:

- staged files are automatically formatted,
- ESLint fixes issues where possible,
- Conventional Commit messages are enforced.

I verified the setup by intentionally attempting invalid commit messages and ensuring commitlint rejected them before allowing valid commits.

---

# Future Improvements

The current implementation focuses on delivering a clean architecture, complete CRUD functionality, validation, and maintainable project structure. If the project were to evolve further, the following enhancements would be the next priorities.

## Automated Testing

The project currently does not include automated tests.

Adding unit tests for the service layer, integration tests for the API, and component tests for the frontend would improve reliability and help prevent regressions as the application grows.

## Continuous Integration

Continuous integration is not configured for this project.

A typical next step would be to automate linting, testing, and production builds using GitHub Actions before deployment.

## Docker

The application currently runs as a standard Node.js and React project.

Containerizing the frontend, backend, and database with Docker and Docker Compose would provide a consistent development environment, simplify deployment, and make the project easier to run across different machines.

## OpenAPI / Swagger

The API is currently documented in `docs/API.md` with example requests, responses, status codes, and error formats.

For a larger project or a public API, generating interactive API documentation with Swagger/OpenAPI would improve the developer experience and keep the documentation synchronized with the implementation.

## Authentication & Authorization

Authentication was intentionally omitted because it was outside the scope of the assignment.

For a production application, the next step would be to implement user authentication (JWT or session-based authentication) along with authorization to ensure users can only access and manage their own tasks.
