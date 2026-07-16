# Database

## What I Used

The application uses **MySQL 8** with **Prisma ORM**.

A relational database was chosen because the application's data model is structured and benefits from schema enforcement, strong typing, and relational integrity.

---

## Schema

The application currently contains a single model, `Task`, defined in `server/prisma/schema.prisma`.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}

model Task {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  status      TaskStatus @default(PENDING)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

### Design Decisions

#### Auto-increment Integer IDs

`Task.id` is an auto-incrementing integer rather than a UUID.

For a simple CRUD application, globally unique identifiers provide little practical benefit while making debugging less convenient. Integer IDs are easier to inspect in logs and API responses and integrate naturally with MySQL.

During development, the frontend initially used string IDs while working with mock data. Integrating Prisma exposed this mismatch, requiring the frontend model to be updated to `number`, ensuring consistency across the application.

---

#### Enum-Based Status

Task status is represented using a Prisma enum instead of a free-text string.

This guarantees that only valid values (`PENDING`, `IN_PROGRESS`, `COMPLETED`) can exist in the database, providing an additional layer of validation beyond the API's Zod schemas.

---

#### Automatic Timestamps

The application relies on Prisma's built-in timestamp support.

- `createdAt` uses `@default(now())`
- `updatedAt` uses `@updatedAt`

This keeps timestamp management centralized in the ORM rather than requiring manual updates inside controllers or services.

---

## Migrations

Database migrations are stored under:

```
server/prisma/migrations/
```

The initial migration creates the `Task` table shown above.

To apply migrations locally:

```bash
cd server
npx prisma migrate dev
```

For production deployments, the appropriate command would be:

```bash
npx prisma migrate deploy
```

This ensures the database schema remains synchronized with the application during deployments.

---

## Runtime Database Connection

The backend connects to MySQL using Prisma 7's **MariaDB Driver Adapter** instead of Prisma's traditional connection-string-based runtime.

`server/src/config/prisma.ts`

```ts
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({
  adapter,
});
```

An important implementation detail is that the Prisma CLI and the runtime adapter use different configuration sources.

| Environment Variable                                      | Purpose                                                                             |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `DATABASE_URL`                                            | Used by the Prisma CLI (`prisma generate`, `prisma migrate`) via `prisma.config.ts` |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Used by the MariaDB runtime adapter in `src/config/prisma.ts`                       |

Because of this separation, changes made to `DATABASE_URL` affect Prisma CLI commands only. Runtime database connections are configured exclusively through the adapter's constructor.

---

## Authentication Issue Encountered

While integrating Prisma with MySQL 8, the application encountered a connection timeout caused by MySQL's default authentication plugin (`caching_sha2_password`).

The Node.js MariaDB driver requires explicit permission to retrieve the server's RSA public key during authentication. Without enabling this option, every database request failed with connection pool timeout errors similar to:

```text
DriverAdapterError: pool timeout: failed to retrieve a connection from pool after 10013ms

cause:
RSA public key is not available client side...
```

The solution was to enable:

```ts
allowPublicKeyRetrieval: true;
```

inside the MariaDB adapter configuration.

This option belongs to the runtime adapter configuration and **not** to `DATABASE_URL`, since the runtime adapter does not read the connection string.

---

## Environment Variables

Example configuration (`server/.env.example`):

```env
DATABASE_URL="mysql://username:password@localhost:3306/taskforge_db"

PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=taskforge_db
```
