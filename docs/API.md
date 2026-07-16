# API Documentation

This document describes the REST API exposed by the TaskForge backend, including request formats, response formats, validation rules, and error responses.

**Base URL (Local Development)**

```
http://localhost:5000/api
```

All requests and responses use JSON.

Authentication is intentionally not implemented because it was outside the scope of the project requirements.

---

# Task Object

Every task returned by the API follows this structure:

```json
{
  "id": 1,
  "title": "Finish backend setup",
  "description": "Wire up the frontend to the backend",
  "status": "PENDING",
  "createdAt": "2026-07-15T10:32:00.000Z",
  "updatedAt": "2026-07-15T10:32:00.000Z"
}
```

| Field         | Type                                        | Description                                      |
| ------------- | ------------------------------------------- | ------------------------------------------------ |
| `id`          | number                                      | Auto-generated primary key                       |
| `title`       | string                                      | Required (1–100 characters)                      |
| `description` | string \| null                              | Optional (maximum 500 characters)                |
| `status`      | `"PENDING" \| "IN_PROGRESS" \| "COMPLETED"` | Defaults to `PENDING`                            |
| `createdAt`   | ISO datetime string                         | Automatically generated when the task is created |
| `updatedAt`   | ISO datetime string                         | Automatically updated whenever the task changes  |

---

# Endpoints

## GET `/api/tasks`

Returns all tasks.

### Request

No request body.

### Response

**200 OK**

```json
[
  {
    "id": 1,
    "title": "Finish backend setup",
    "description": "Wire up the frontend to the backend",
    "status": "PENDING",
    "createdAt": "2026-07-15T10:32:00.000Z",
    "updatedAt": "2026-07-15T10:32:00.000Z"
  }
]
```

If no tasks exist, the endpoint returns:

```json
[]
```

---

## GET `/api/tasks/:id`

Returns a task by its ID.

### Request

```
GET /api/tasks/1
```

### Responses

**200 OK**

```json
{
  "id": 1,
  "title": "Finish backend setup",
  "description": "Wire up the frontend to the backend",
  "status": "PENDING",
  "createdAt": "2026-07-15T10:32:00.000Z",
  "updatedAt": "2026-07-15T10:32:00.000Z"
}
```

**404 Not Found**

```json
{
  "message": "Task not found"
}
```

---

## POST `/api/tasks`

Creates a new task.

### Request

```json
{
  "title": "Finish backend setup",
  "description": "Wire up the frontend to the backend",
  "status": "PENDING"
}
```

### Validation Rules

- `title` is required.
- `title` must contain between **1** and **100** characters.
- `description` is optional.
- `description` may contain up to **500** characters.
- `status` is optional.
- If `status` is omitted, it defaults to `"PENDING"`.

### Responses

**201 Created**

```json
{
  "id": 1,
  "title": "Finish backend setup",
  "description": "Wire up the frontend to the backend",
  "status": "PENDING",
  "createdAt": "2026-07-15T10:32:00.000Z",
  "updatedAt": "2026-07-15T10:32:00.000Z"
}
```

**400 Bad Request**

Validation failures are handled by the reusable Zod validation middleware before the request reaches the controller.

Example response:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "path": "title",
      "message": "Title is required"
    }
  ]
}
```

---

## PUT `/api/tasks/:id`

Updates an existing task.

### Request

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "COMPLETED"
}
```

All fields are optional.

Only the supplied fields are updated.

### Responses

**200 OK**

```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "status": "COMPLETED",
  "createdAt": "2026-07-15T10:32:00.000Z",
  "updatedAt": "2026-07-16T09:10:00.000Z"
}
```

**400 Bad Request**

Returned when validation fails.

**404 Not Found**

```json
{
  "message": "Task not found"
}
```

---

## DELETE `/api/tasks/:id`

Deletes a task.

### Request

```
DELETE /api/tasks/1
```

### Responses

**200 OK**

```json
{
  "message": "Task deleted successfully"
}
```

**404 Not Found**

```json
{
  "message": "Task not found"
}
```

---

# Validation

Request validation is implemented using **Zod**.

Validation occurs before controller execution through reusable middleware.

Examples include:

- Missing required fields
- Empty titles
- Titles longer than 100 characters
- Descriptions longer than 500 characters
- Invalid task status values

Invalid requests return a structured **400 Bad Request** response.

---

# HTTP Status Codes

| Status  | Meaning                        |
| ------- | ------------------------------ |
| **200** | Request completed successfully |
| **201** | Resource created successfully  |
| **400** | Validation failed              |
| **404** | Resource not found             |
| **500** | Internal server error          |

---

# Error Response Format

Validation errors follow this structure:

```json
{
  "message": "Validation failed",
  "errors": [
    {
      "path": "title",
      "message": "Title is required"
    }
  ]
}
```

Unexpected server errors return:

```json
{
  "message": "Internal Server Error"
}
```

---

# Testing

The API was tested using Postman throughout development, covering:

- Successful CRUD operations
- Validation failures
- Invalid task IDs
- Empty database responses
- Database connectivity
