# Coding Standards

- TypeScript strict mode
- No any types
- Functional components only
- Use hooks instead of class components
- Prefer interfaces for props
- Extract reusable logic into hooks
- Avoid duplicated code
- Follow ESLint and Prettier rules
- Follow Solid Principles
- Follow SonarQube standards

---

# ESLint & Prettier

## ESLint

The project extends `react-app` and `react-app/jest` (configured in `package.json` under `eslintConfig`).

Key rules enforced:

- `@typescript-eslint/no-explicit-any` — no `any` types
- `react-hooks/rules-of-hooks` — hooks must only be called at the top level of a function component or custom hook
- `no-console` — avoid leaving console statements in production code
- `no-unused-vars` — no declared but unused variables or imports

To run:
```bash
npm run lint
```

## Prettier

Prettier is not installed as a standalone package. The following formatting conventions must be followed manually or enforced via editor config:

- Single quotes for strings
- Semicolons required
- 2-space indentation
- Trailing commas in multi-line structures (`es5` mode)
- Print width: 100 characters
- Arrow function parentheses: always (e.g. `(x) => x`)
- Line endings: LF

> If Prettier is added in the future, configure it in `.prettierrc` and add `prettier` to the ESLint extends chain via `eslint-config-prettier` to avoid conflicts.

---

# API & Service Standards

## Request Format

GET
/api/users?page=1&pageSize=20

POST
{
  "name": "John Doe",
  "email": "john@example.com"
}

## Success Response

{
  "success": true,
  "data": {},
  "message": "Optional message"
}

## Error Response

{
  "success": false,
  "message": "Error description",
  "errors": {}
}

## Pagination Response

{
  "success": true,
  "data": {
    "items": [],
    "totalCount": 0,
    "page": 1,
    "pageSize": 20
  }
}

Error structure:
{
  "success": false,
  "message": "User already exists"
}

---

# Frontend Type Definitions

```ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
```

---

# Axios Service Example

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

export async function getUsers(): Promise<{ items: User[]; totalCount: number; page: number; pageSize: number }> {
  const response = await apiClient.get<
    ApiResponse<{
      items: User[];
      totalCount: number;
      page: number;
      pageSize: number;
    }>
  >('/users');

  return response.data.data;
}
```

---

# End-to-End Flow

User Clicks Save
       │
       ▼
Component
(CreateUserForm.tsx)
       │
       ▼
Custom Hook
(useCreateUser)
       │
       ▼
Service
(users.service.ts)
       │
       ▼
Axios Client
(api-client.ts)
       │
       ▼
POST /api/users

Response:

API Response
       │
       ▼
Axios Client
       │
       ▼
Service
       │
       ▼
Hook Updates State
       │
       ▼
Component Re-renders
       │
       ▼
Success Toast
