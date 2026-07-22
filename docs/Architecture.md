# Architecture

## Overview

```
React UI
    │
    ▼
Component State (useState)
    │
    ▼
Frontend Service Layer
    │
    ▼
Axios
    │
    ▼
Express API
    │
    ▼
Routes
    │
    ▼
Validation Middleware
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Prisma ORM
    │
    ▼
MySQL
```

The application follows a layered architecture where each layer has a single responsibility and communicates only with adjacent layers. UI components never perform HTTP requests directly, Controllers remain responsible only for request handling. Database interactions are delegated to the service layer.

---

# Backend (`server/`)

```
server/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── generated/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── task.routes.ts
│   │   └── health.routes.ts
│   ├── controllers/
│   │   └── task.controller.ts
│   ├── services/
│   │   └── task.service.ts
│   ├── validators/
│   │   └── task.validator.ts
│   ├── middleware/
│   │   ├── validate.middleware.ts
│   │   └── error.middleware.ts
│   └── types/
│       └── task.types.ts
```

## Backend Request Flow

```
HTTP Request
      │
      ▼
Route
      │
      ▼
Validation Middleware (Zod)
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Prisma Client
      │
      ▼
MySQL
```

## Responsibilities

### Routes

Routes map HTTP methods and URLs to controller functions while attaching any required middleware such as request validation.

### Validation Middleware

Incoming request bodies are validated using reusable Zod schemas before reaching the controller. Invalid requests return a structured `400 Bad Request` response.

### Controllers

Controllers remain intentionally thin. They extract request parameters, invoke the appropriate service, and construct the HTTP response. Business logic and database access are delegated elsewhere.

### Services

Services contain the application's business logic and all Prisma queries. This layer is responsible for interacting with the database while remaining independent of Express request/response objects.

### Prisma Configuration

`config/prisma.ts` configures Prisma 7 with the MariaDB Driver Adapter and manages the runtime database connection.

### Error Middleware

Unhandled exceptions are centralized in a single error handler, ensuring the API consistently returns JSON error responses instead of stack traces or HTML error pages.

---

# Frontend (`client/`)

```
client/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── components/
│   │   ├── TaskList/
│   │   ├── TaskCard/
│   │   ├── TaskForm/
│   │   ├── DeleteDialog/
│   │   ├── EmptyState/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   └── AboutSection/
│   ├── services/
│   │   ├── api.ts
│   │   └── task.service.ts
│   └── types/
│       └── task.ts
```

## Frontend Flow

```
React Component
       │
       ▼
task.service.ts
       │
       ▼
Axios Instance
       │
       ▼
REST API
```

## Responsibilities

### HomePage

`HomePage.tsx` owns the application state, including the task list, loading state, error state, and modal state. Child components remain focused on rendering and user interaction.

### Service Layer

`task.service.ts` is the only layer responsible for communicating with the backend. Components consume plain JavaScript objects rather than Axios responses.

### Axios Configuration

`api.ts` exports a single configured Axios instance with the base URL loaded from `VITE_API_BASE_URL`, avoiding duplicated configuration across service functions.

---

# State Management

The application intentionally uses React's built-in `useState` instead of Redux, Context, Zustand, or React Query.

Since the application consists of a single page with one shared task list, additional state-management libraries would introduce unnecessary complexity without solving a meaningful problem. Local component state provides a simple and sufficient solution for the application's requirements.

---

# API Contract

The backend returns resources directly rather than wrapping them inside an envelope object.

Example:

```json
[
  {
    "id": 1,
    "title": "Finish README",
    "status": "IN_PROGRESS"
  }
]
```

Because of this, the frontend service layer simply returns `response.data`, keeping the API contract straightforward and avoiding unnecessary transformation logic.
