# Project Overview

Frontend React application built using React, TypeScript and Tailwind CSS.

## Goals

- Maintainable codebase
- Reusable components
- Responsive design
- Accessibility compliance
- High test coverage

---

# Technology Stack

Framework
- React

Language
- TypeScript

Styling
- Tailwind CSS

Routing
- React Router

Forms
- React Hook Form

Validation
- Zod

Testing
- React Testing Library
- Jest

State Management
- Valtio

---

# Folder Structure

src/
├── assets/
├── components/
├── features/
├── hooks/
├── routes/
├── services/
├── types/
├── utils/
├── tests/
├── styles/

Feature-first architecture preferred.

---

# Architecture Principles

- Feature-based architecture
- Atomic design for UI components
- Separation of concerns
- Reusable hooks
- Reusable services
- No business logic in UI components
- Unit testing

---

# State Management

- useState for local state
- useReducer for complex state
- Context only when necessary

Avoid unnecessary global state.

---

# Data Flow

Page
  ↓
Feature Component
  ↓
Custom Hook
  ↓
Service Layer
  ↓
Axios Client
  ↓
API

Never call APIs directly from components.

---

# Performance

- Lazy loading for routes
- Memoization only when needed
- Code splitting
- Avoid unnecessary re-renders

# Standardized request and response

## API Standards

### Request Format

GET
/api/users?page=1&pageSize=20

POST
{
  "name": "John Doe",
  "email": "john@example.com"
}

### Success Response

{
  "success": true,
  "data": {},
  "message": "Optional message"
}

### Error Response

{
  "success": false,
  "message": "Error description",
  "errors": {}
}

### Pagination Response

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

# Frontend Type Definitions

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string
  errors?: Record<string, string[]>;
}

# Axios Service Example

interface User {
  id: string;
  name: string;
  email: string;
}

export async function getUsers() {
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

# Flow

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