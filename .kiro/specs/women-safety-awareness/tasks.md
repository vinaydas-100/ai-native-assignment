# Implementation Plan: Women Safety Awareness

## Overview

Implement a women's safety awareness SPA using React 19, TypeScript, and Tailwind CSS with feature-based architecture. The application provides safety resources, emergency contacts, live location sharing, and speed dial functionality for authenticated women users. Implementation follows incremental steps: shared infrastructure first, then feature modules, and finally integration and wiring.

## Tasks

- [x] 1. Set up project infrastructure and shared modules
  - [x] 1.1 Install dependencies and configure project
    - Install react-router-dom, react-hook-form, @hookform/resolvers, zod, valtio, axios, fast-check
    - Configure Tailwind CSS if not already set up
    - Update `.env` with REACT_APP_API_BASE_URL and REACT_APP_AUTH_TOKEN variables
    - _Requirements: 2.5, 3.3_

  - [x] 1.2 Create shared types and API client
    - Create `src/types/api.types.ts` with ApiResponse and ApiError interfaces
    - Create `src/types/auth.types.ts` with Gender, User, UserSession, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse interfaces
    - Create `src/types/location.types.ts` with GeoPosition, LocationPermissionState, LocationState interfaces
    - Create `src/services/api-client.ts` with Axios instance, request interceptor for Bearer token, and response error normalization
    - _Requirements: 2.5, 3.3_

  - [x] 1.3 Create reusable UI components
    - Create `src/components/ui/Button.tsx` with variant, size, loading, and accessibility props
    - Create `src/components/ui/Input.tsx` with label, error, and select support
    - Create `src/components/ui/Card.tsx` for content cards
    - Create `src/components/ui/Alert.tsx` with variant and role="alert" for error/success messages
    - Create `src/styles/theme.ts` with centralized Tailwind theme tokens
    - _Requirements: 10.1, 10.2, 10.3_

  - [x] 1.4 Create Valtio user store
    - Create `src/store/user.store.ts` with UserState proxy, setSession, clearSession, setLoading actions
    - _Requirements: 3.4, 4.3, 4.4_

- [x] 2. Implement authentication feature
  - [x] 2.1 Create Zod validation schemas
    - Create `src/features/auth/schemas/register.schema.ts` with name, email, password, confirmPassword, gender validation and gender="Female" refinement
    - Create `src/features/auth/schemas/login.schema.ts` with non-empty email and password validation
    - _Requirements: 2.1, 2.2, 2.3, 2.8, 3.7_

  - [x] 2.2 Write property tests for registration validation (Properties 2, 4)
    - **Property 2: Gender Restriction Rejects Non-Female** — For any gender value not "Female", the schema shall reject with appropriate error
    - **Property 4: Registration Validation Rejects Invalid Input** — For any invalid email, short password, or mismatched confirm password, the schema shall reject
    - **Validates: Requirements 2.2, 2.3, 2.8**

  - [x] 2.3 Write property test for login validation (Property 7)
    - **Property 7: Login Validation Rejects Empty Fields** — For any empty or whitespace-only email/password, the login schema shall reject
    - **Validates: Requirements 3.7**

  - [x] 2.4 Create auth service layer
    - Create `src/features/auth/services/auth.service.ts` with login() and register() methods using the shared API client
    - _Requirements: 2.4, 2.5, 3.2, 3.3_

  - [x] 2.5 Create auth custom hooks
    - Create `src/features/auth/hooks/useLogin.ts` with form submission, API call, store update, error handling, and redirect logic
    - Create `src/features/auth/hooks/useRegister.ts` with form submission, API call, error handling, and redirect to login logic
    - _Requirements: 2.4, 2.6, 2.7, 3.2, 3.4, 3.5, 3.6_

  - [x] 2.6 Create RegisterForm and LoginForm components
    - Create `src/features/auth/components/RegisterForm.tsx` with React Hook Form + Zod resolver, gender field, field-level errors, and form-level API error Alert
    - Create `src/features/auth/components/LoginForm.tsx` with React Hook Form + Zod resolver, field-level errors, and form-level API error Alert
    - _Requirements: 2.1, 2.3, 2.7, 3.1, 3.6_

  - [x] 2.7 Write property tests for auth service and store (Properties 3, 5, 6)
    - **Property 3: Valid Registration Sends Correct POST** — For any valid registration data, the service shall send a POST with exact user data
    - **Property 5: API Error Messages Displayed** — For any error message from API, the form shall render that exact message
    - **Property 6: Valid Login Stores User Data** — For any valid user/token from API, the store shall contain that exact data with isAuthenticated=true
    - **Validates: Requirements 2.4, 2.7, 3.2, 3.4, 3.6**

  - [x] 2.8 Create AuthGuard component
    - Create `src/features/auth/components/AuthGuard.tsx` that checks User_Store for valid session, redirects to /login if null, renders children if authenticated
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 2.9 Write property tests for AuthGuard (Properties 8, 9)
    - **Property 8: Auth Guard Redirects Unauthenticated Users** — For any protected route with null session, AuthGuard shall redirect to login
    - **Property 9: Auth Guard Allows Authenticated Users** — For any protected route with valid session, AuthGuard shall render content
    - **Validates: Requirements 4.1, 4.2**

  - [x] 2.10 Write unit tests for auth feature
    - Test RegisterForm: renders all fields, gender restriction error display, validation errors, API success redirect, API error display
    - Test LoginForm: renders fields, validation errors, API success with store update and redirect, API error display
    - Test AuthGuard: unauthenticated redirect, authenticated access, logout clears state
    - Test auth.service: request formatting, response mapping, error handling with mocked API
    - _Requirements: 10.1, 10.2, 10.3, 10.7_

- [x] 3. Checkpoint - Ensure auth tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement navigation feature
  - [x] 4.1 Create NavigationMenu component
    - Create `src/features/navigation/components/NavigationMenu.tsx` with links to Home, Emergency Contacts, Safety Tips, and About
    - Implement active link styling based on current route
    - Add keyboard navigation and ARIA labels
    - Implement responsive hamburger menu for viewport below 768px
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 4.2 Write property test for navigation (Property 1)
    - **Property 1: Active Navigation State** — For any valid route, the NavigationMenu shall apply active styling exclusively to the matching link
    - **Validates: Requirements 1.3**

  - [x] 4.3 Write unit tests for NavigationMenu
    - Test rendering all links, routing works, active state, ARIA labels, responsive hamburger
    - _Requirements: 10.6_

- [x] 5. Implement emergency contacts feature
  - [x] 5.1 Create emergency contacts data and components
    - Create `src/features/emergency-contacts/data/contacts.ts` with Police (100), Women Helpline (1091), Ambulance (102), Fire Brigade (101)
    - Create `src/features/emergency-contacts/components/ContactCard.tsx` with name, phone, description, and tel: link
    - Create `src/features/emergency-contacts/components/EmergencyContactsPage.tsx` with accessible landmarks and headings
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 5.2 Write property test for emergency contacts (Property 10 - contacts)
    - **Property 10: Phone Contact Rendering with tel: Protocol** — For any contact with non-empty phoneNumber, render anchor with href="tel:{phoneNumber}"
    - **Validates: Requirements 5.2, 5.3**

  - [x] 5.3 Write unit tests for EmergencyContactsPage
    - Test renders all contacts, tel: links present, accessible landmark roles
    - _Requirements: 10.1_

- [x] 6. Implement live location feature
  - [x] 6.1 Create location service and hook
    - Create `src/features/location/services/location.service.ts` with getCurrentPosition(), isGeolocationSupported(), and generateShareableLink()
    - Create `src/features/location/hooks/useGeolocation.ts` with permission state handling, position tracking, and error states
    - _Requirements: 6.1, 6.2, 6.6_

  - [x] 6.2 Create LiveLocationPage component
    - Create `src/features/location/components/LiveLocationPage.tsx` displaying coordinates, timestamp, permission denied/unsupported messages, and share button
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

  - [x] 6.3 Write property tests for location (Properties 11, 12, 13)
    - **Property 11: Location Service Returns Geolocation Coordinates** — For any lat/lng from browser API, produce correct GeoPosition with valid timestamp
    - **Property 12: Location Display Shows Coordinates and Timestamp** — For any valid GeoPosition, render latitude, longitude, and formatted timestamp
    - **Property 13: Shareable Link Contains Coordinates** — For any valid GeoPosition, the generated link contains string representations of lat and lng
    - **Validates: Requirements 6.2, 6.3, 6.6**

  - [x] 6.4 Write unit tests for location feature
    - Test LiveLocationPage: permission granted shows coords, denied message, unsupported message, share link
    - Test useGeolocation hook: state transitions, error handling
    - _Requirements: 10.4_

- [x] 7. Implement speed dial feature
  - [x] 7.1 Create speed dial data and component
    - Create `src/features/speed-dial/data/speed-dial-contacts.ts` with Police (100), Women Helpline (1091), Custom Emergency
    - Create `src/features/speed-dial/components/SpeedDial.tsx` as floating action button with expand/collapse, tel: links, keyboard access, ARIA labels
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 7.2 Write property test for speed dial (Property 10 - speed dial)
    - **Property 10: Phone Contact Rendering with tel: Protocol** — For any SpeedDialAction with non-empty phoneNumber, render anchor with href="tel:{phoneNumber}"
    - **Validates: Requirements 7.3**

  - [x] 7.3 Write unit tests for SpeedDial
    - Test FAB renders, expand/collapse behavior, tel: links, keyboard access, ARIA labels
    - _Requirements: 10.5_

- [x] 8. Checkpoint - Ensure all feature tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement home and safety tips pages
  - [x] 9.1 Create HomePage component
    - Create `src/features/home/components/HomePage.tsx` with hero section, quick-access cards for Emergency Contacts, Live Location, Safety Tips, and card navigation
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 9.2 Create safety tips data and components
    - Create `src/features/safety-tips/data/tips.ts` with Travel Safety, Workplace Safety, and Online Safety categories
    - Create `src/features/safety-tips/components/TipCard.tsx` rendering title, description, and icon
    - Create `src/features/safety-tips/components/SafetyTipsPage.tsx` with categorized layout and proper heading hierarchy
    - _Requirements: 9.1, 9.2, 9.3_

  - [x] 9.3 Write property test for safety tips (Property 14)
    - **Property 14: Safety Tip Rendering** — For any SafetyTip with title and description, the TipCard shall render both texts
    - **Validates: Requirements 9.2**

  - [x] 9.4 Write unit tests for Home and SafetyTips pages
    - Test HomePage: hero section, quick-access cards, card click navigation
    - Test SafetyTipsPage: categories render, tip structure, heading hierarchy
    - _Requirements: 10.1_

- [x] 10. Wire routing and integrate all features
  - [x] 10.1 Create AppRoutes and integrate components
    - Create `src/routes/AppRoutes.tsx` with public routes (Login, Register) and protected routes wrapped in AuthGuard
    - Update `src/App.tsx` to render AppRoutes with NavigationMenu and SpeedDial for authenticated pages
    - Wire all feature pages to their respective routes
    - _Requirements: 1.2, 4.1, 4.2, 7.1_

  - [x] 10.2 Write integration tests for routing
    - Test unauthenticated user redirected from protected routes
    - Test authenticated user can access all protected pages
    - Test navigation between pages without full reload
    - _Requirements: 1.2, 4.1, 4.2_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples, edge cases, and error conditions
- The tech stack uses React 19, TypeScript, Tailwind CSS, React Router, React Hook Form, Zod, Valtio, Axios, Jest, React Testing Library, and fast-check
- All components use functional components with hooks, no class components
- Follow feature-based folder structure as defined in the design document

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["2.1", "4.1", "5.1", "9.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "2.4", "4.2", "4.3", "5.2", "5.3", "9.2"] },
    { "id": 4, "tasks": ["2.5", "6.1", "7.1", "9.3", "9.4"] },
    { "id": 5, "tasks": ["2.6", "2.7", "6.2", "7.2", "7.3"] },
    { "id": 6, "tasks": ["2.8", "6.3", "6.4"] },
    { "id": 7, "tasks": ["2.9", "2.10", "10.1"] },
    { "id": 8, "tasks": ["10.2"] }
  ]
}
```
