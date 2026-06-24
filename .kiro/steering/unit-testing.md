# Unit Testing Standards

## Framework

- Jest
- React Testing Library

## Test Philosophy

Test behavior, not implementation.

Good:
✓ User clicks Save button
✓ Form validation message displayed

Bad:
✗ Internal state value changed
✗ Specific hook implementation

## Required Coverage

Every feature should test:

- Happy path
- Error path
- Empty state
- Loading state
- Validation rules

## Component Testing

Test:

- Rendering
- User interactions
- Props behavior
- Accessibility

Example:

- Button renders
- Button click triggers callback
- Disabled button cannot be clicked

## Hook Testing

Test:

- State updates
- Async logic
- Error handling

## Service Testing

Test:

- Request formatting
- Response mapping
- Error handling

Mock external dependencies.

## Accessibility Testing

Verify:

- Labels
- Roles
- Keyboard interaction
- ARIA attributes

## Mocking Rules

Mock:

- API requests
- Browser APIs
- External libraries

Do not mock:

- Business logic under test

## Naming Convention

Button.test.tsx
UserForm.test.tsx
useUsers.test.ts

## Test Structure

Arrange
Act
Assert

Example:

describe(...)
  it(...)
    Arrange
    Act
    Assert