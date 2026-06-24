# AGENTS.md

## Purpose

This file gives AI coding assistants the standing instructions for working on this React + TypeScript frontend codebase.

The repository is expected to support:

* Frontend: React + TypeScript
* Routing: React Router
* API Communication: Axios
* Forms: React Hook Form
* Validation: Zod
* Styling: Tailwind CSS
* Testing: React Testing Library

The application follows a layered architecture to keep UI, state management, and API communication separated.

```text
UI Component
  -> Custom Hook
  -> Service
  -> Axios Client
  -> Backend API
```

## Skill loading model

Load only the skill files relevant to the change. Do not load every skill by default.

| Change type                       | Required skill files                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Any non-trivial change            | `.ai/skills/architectural-guidelines.md`, `.ai/skills/coding-standards.md`, `.ai/skills/unit-testing.md` |
| UI-only change                    | `.ai/skills/ui-guidelines.md`, `.ai/skills/coding-standards.md`, `.ai/skills/unit-testing.md`            |
| Component change                  | `.ai/skills/ui-guidelines.md`, `.ai/skills/coding-standards.md`                                          |
| Hook change                       | `.ai/skills/architectural-guidelines.md`, `.ai/skills/unit-testing.md`                                   |
| Service or API integration change | `.ai/skills/architectural-guidelines.md`, `.ai/skills/coding-standards.md`, `.ai/skills/unit-testing.md` |
| Form implementation               | `.ai/skills/ui-guidelines.md`, `.ai/skills/coding-standards.md`, `.ai/skills/unit-testing.md`            |
| Accessibility improvement         | `.ai/skills/ui-guidelines.md`, `.ai/skills/unit-testing.md`                                              |

## Repository assumptions

Preferred structure:

```text
src/
  assets/

  components/
    ui/
    common/

  features/
    <feature>/
      components/
      hooks/
      services/
      types/
      pages/

  hooks/

  services/
    api-client.ts

  routes/

  types/

  utils/

  constants/
```

If the actual repository structure differs, preserve the existing structure unless the task explicitly requests restructuring.

## Architectural Rules

Application flow must follow:

```text
UI Component
  ↓
Custom Hook
  ↓
Service Layer
  ↓
Axios Client
  ↓
Backend API
```

### Allowed

```text
Component -> Hook -> Service -> Axios
```

### Not Allowed

```text
Component -> Axios
Component -> Fetch
Component -> API URL
Hook -> API URL
```

### Responsibilities

#### Components

Responsible for:

* Rendering UI
* User interactions
* Displaying loading states
* Displaying error states

Must not:

* Call APIs directly
* Contain business logic
* Contain request transformation logic

#### Hooks

Responsible for:

* State management
* Data fetching orchestration
* Loading states
* Error handling
* Mutations

#### Services

Responsible for:

* API communication
* Request mapping
* Response mapping
* Data transformation

#### Axios Client

Responsible for:

* Base configuration
* Authentication headers
* Interceptors
* Request/response handling

## API Standards

All API communication must use the shared Axios client.

Example flow:

```text
UserListPage
  ↓
useUsers()
  ↓
usersService.getUsers()
  ↓
apiClient.get('/users')
```

Do not create Axios instances inside feature folders.

Use a single shared client.

## TypeScript Standards

1. Use strict typing.
2. Do not use `any`.
3. Prefer interfaces for object contracts.
4. Use explicit return types on exported functions.
5. Avoid type assertions unless necessary.
6. Reuse shared types whenever possible.

## React Standards

1. Functional components only.
2. Use hooks instead of class components.
3. Keep components focused on a single responsibility.
4. Extract reusable logic into custom hooks.
5. Prefer composition over inheritance.
6. Avoid deeply nested component trees.

## State Management

Preferred order:

1. Local component state (`useState`)
2. Custom hooks
3. Context API (only when required)

Do not introduce global state without clear justification.

## Forms

Use:

* React Hook Form
* Zod validation

Validation should be defined outside UI components where practical.

## Accessibility

All new UI must:

* Use semantic HTML
* Support keyboard navigation
* Have accessible labels
* Have proper button types
* Have appropriate ARIA attributes when required

## Non-Negotiable Working Rules

1. Do not place API calls directly in components.
2. Do not place business logic directly in components.
3. Keep services focused on API communication.
4. Keep hooks focused on state and orchestration.
5. Write tests for all behavior changes.
6. Do not introduce duplicated logic.
7. Do not use `any`.
8. Do not hardcode API URLs.
9. Do not commit secrets, tokens, or credentials.
10. Preserve existing response contracts unless explicitly instructed otherwise.

## Preferred Implementation Sequence

For feature work:

1. Understand existing feature structure.
2. Add or update types.
3. Add or update service methods.
4. Add or update hooks.
5. Add or update UI components.
6. Add or update tests.
7. Run linting and type checking.
8. Run relevant tests.

## Common Commands

Use the package manager already configured in the repository.

Common commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:unit
npm run build
```

If a command does not exist, inspect package.json and use the closest available script.

## Definition of Done

A change is complete only when:

* Architectural guidelines are followed.
* Components do not call APIs directly.
* New or changed behavior has tests.
* TypeScript passes without suppression.
* Linting passes.
* Existing API contracts are preserved.
* Accessibility requirements are satisfied.
* The final response summarizes changed files, tests performed, and any known limitations.

```
```
