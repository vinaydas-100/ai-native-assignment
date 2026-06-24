# Requirements Document

## Introduction

A women's safety awareness web application that provides safety resources, emergency contacts, live location sharing, and speed dial functionality for police and safety contacts. The application is restricted to women users via gender-based access control during registration. It features a responsive, mobile-first design with accessible UI, authentication via API with hardcoded token support, and comprehensive unit test coverage across all flows.

## Glossary

- **Application**: The Women Safety Awareness React web application
- **Auth_Service**: The service layer responsible for handling login and registration API calls
- **Auth_Guard**: The route protection mechanism that restricts access to authenticated women users
- **Navigation_Menu**: The top-level menu component providing links to Home, Emergency Contacts, Safety Tips, and other pages
- **Location_Service**: The service responsible for obtaining and sharing the user's live geolocation
- **Speed_Dial**: The floating action component providing one-tap access to police and emergency contacts
- **Registration_Form**: The form component collecting user details including gender for access control
- **Login_Form**: The form component collecting email and password credentials for authentication
- **API_Client**: The Axios-based HTTP client configured with a hardcoded token from the .env file
- **User_Store**: The Valtio-based state store managing authenticated user session data
- **Gender_Validator**: The validation logic that restricts registration to users who select "Female" as gender

## Requirements

### Requirement 1: Application Navigation

**User Story:** As a user, I want to navigate between pages using a menu, so that I can access Home, Emergency Contacts, and Safety Tips content easily.

#### Acceptance Criteria

1. THE Navigation_Menu SHALL display links to Home, Emergency Contacts, Safety Tips, and About pages
2. WHEN a user clicks a navigation link, THE Application SHALL route to the corresponding page without a full page reload
3. THE Navigation_Menu SHALL indicate the currently active page link visually
4. THE Navigation_Menu SHALL be accessible via keyboard navigation and include appropriate ARIA labels
5. WHILE the viewport width is below 768px, THE Navigation_Menu SHALL collapse into a hamburger menu icon

### Requirement 2: User Registration with Gender Restriction

**User Story:** As a woman, I want to register an account with gender validation, so that I can access the safety features restricted to women users.

#### Acceptance Criteria

1. THE Registration_Form SHALL collect name, email, password, confirm password, and gender fields
2. THE Gender_Validator SHALL restrict successful registration to users who select "Female" as their gender
3. WHEN a user selects a gender other than "Female", THE Registration_Form SHALL display a message stating the application is available to women only
4. WHEN all fields are valid and gender is "Female", THE Auth_Service SHALL send a POST request to the registration API endpoint with the user details
5. THE API_Client SHALL include the hardcoded authorization token from the .env file in request headers
6. WHEN the registration API returns a success response, THE Application SHALL redirect the user to the Login page
7. IF the registration API returns an error, THEN THE Registration_Form SHALL display the error message returned by the API
8. THE Registration_Form SHALL validate email format, minimum password length of 8 characters, and matching password confirmation using Zod schema

### Requirement 3: User Login with Dummy Credentials

**User Story:** As a registered woman, I want to log in with my credentials, so that I can access protected safety features.

#### Acceptance Criteria

1. THE Login_Form SHALL collect email and password fields
2. WHEN a user submits valid credentials, THE Auth_Service SHALL send a POST request to the login API endpoint
3. THE API_Client SHALL include the hardcoded authorization token from the .env file in request headers
4. WHEN the login API returns a success response, THE User_Store SHALL store the authenticated user session data
5. WHEN the login API returns a success response, THE Application SHALL redirect the user to the Home page
6. IF the login API returns an error, THEN THE Login_Form SHALL display the error message returned by the API
7. THE Login_Form SHALL validate that email and password fields are non-empty before submission using Zod schema

### Requirement 4: Route Protection for Authenticated Users

**User Story:** As a product owner, I want protected pages accessible only to authenticated women, so that safety features remain secure.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access a protected route, THE Auth_Guard SHALL redirect the user to the Login page
2. WHILE a user is authenticated, THE Auth_Guard SHALL allow access to protected routes including Home, Emergency Contacts, Safety Tips, Live Location, and Speed Dial
3. WHEN a user logs out, THE User_Store SHALL clear the session data and THE Application SHALL redirect to the Login page
4. THE Auth_Guard SHALL check the User_Store for valid session data on each protected route navigation

### Requirement 5: Emergency Contacts Page

**User Story:** As a woman, I want to view a list of emergency contacts, so that I can quickly find help numbers when needed.

#### Acceptance Criteria

1. THE Application SHALL display a list of emergency contacts including Police (100), Women Helpline (1091), Ambulance (102), and Fire Brigade (101)
2. THE Application SHALL display each contact with a name, phone number, and a tap-to-call action link
3. WHEN a user taps a contact number on a mobile device, THE Application SHALL initiate a phone call via the tel: protocol
4. THE Application SHALL render the emergency contacts page with accessible landmark roles and descriptive headings

### Requirement 6: Live Location Sharing

**User Story:** As a woman, I want to share my live location, so that trusted contacts can know my whereabouts in an emergency.

#### Acceptance Criteria

1. WHEN a user activates the share location feature, THE Location_Service SHALL request browser geolocation permission
2. WHEN geolocation permission is granted, THE Location_Service SHALL obtain the user's current latitude and longitude coordinates
3. WHILE location sharing is active, THE Application SHALL display the current coordinates and a timestamp of the last update
4. IF the browser does not support geolocation, THEN THE Application SHALL display an informative message stating that the feature is unavailable
5. IF the user denies geolocation permission, THEN THE Application SHALL display a message explaining that permission is required for location sharing
6. WHEN a user clicks the share button, THE Application SHALL generate a shareable link or text containing the coordinates

### Requirement 7: Speed Dial for Emergency Contacts

**User Story:** As a woman in danger, I want one-tap speed dial access to police and emergency contacts, so that I can reach help immediately.

#### Acceptance Criteria

1. THE Speed_Dial SHALL appear as a floating action button on all authenticated pages
2. WHEN a user taps the Speed_Dial button, THE Application SHALL expand to show quick-access contacts including Police (100), Women Helpline (1091), and a custom emergency contact
3. WHEN a user taps an expanded contact, THE Application SHALL initiate a phone call via the tel: protocol
4. THE Speed_Dial SHALL be accessible via keyboard and include appropriate ARIA labels for screen readers
5. WHILE the Speed_Dial is expanded, THE Application SHALL display contact names alongside the call action icons

### Requirement 8: Home Page

**User Story:** As a woman, I want a welcoming home page with safety awareness content, so that I can learn about safety measures and access features.

#### Acceptance Criteria

1. THE Application SHALL display a hero section with a safety awareness message on the Home page
2. THE Application SHALL display quick-access cards linking to Emergency Contacts, Live Location, and Safety Tips on the Home page
3. THE Application SHALL render the Home page with responsive layout using mobile-first design
4. WHEN a user clicks a quick-access card, THE Application SHALL navigate to the corresponding feature page

### Requirement 9: Safety Tips Page

**User Story:** As a woman, I want to read safety tips and awareness content, so that I can be better prepared for unsafe situations.

#### Acceptance Criteria

1. THE Application SHALL display categorized safety tips including Travel Safety, Workplace Safety, and Online Safety sections
2. THE Application SHALL render each tip with a title, description, and relevant icon
3. THE Application SHALL present safety tips in an accessible, scannable list format with proper heading hierarchy

### Requirement 10: Unit Testing Coverage

**User Story:** As a developer, I want comprehensive unit tests for all flows, so that I can ensure application reliability and catch regressions.

#### Acceptance Criteria

1. THE Application SHALL have unit tests for the Registration_Form covering happy path, validation errors, gender restriction, and API error scenarios
2. THE Application SHALL have unit tests for the Login_Form covering happy path, validation errors, and API error scenarios
3. THE Application SHALL have unit tests for the Auth_Guard covering authenticated access, unauthenticated redirect, and logout scenarios
4. THE Application SHALL have unit tests for the Location_Service covering permission granted, permission denied, and unsupported browser scenarios
5. THE Application SHALL have unit tests for the Speed_Dial covering render, expand, collapse, and call action scenarios
6. THE Application SHALL have unit tests for the Navigation_Menu covering rendering, routing, active state, and responsive behavior scenarios
7. THE Application SHALL have unit tests for the Auth_Service covering request formatting, response mapping, and error handling with mocked API calls
