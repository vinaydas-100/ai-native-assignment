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

