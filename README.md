# Raise The Case

A community-driven justice platform enabling users to submit cases for public review and verdict. Built with modern React architecture, this application demonstrates clean component design, custom hooks for data management, and responsive user interfaces.

## Overview

Raise The Case bridges the gap between traditional justice systems and community participation. Users can submit cases, state their arguments, and have the public decide guilt or innocence through a verdict system. The platform features authentication, case management, and real-time judgment aggregation.

## Features

### Core Functionality
- **Case Submission**: Users can create detailed cases with titles, descriptions, and supporting images
- **Public Verdict System**: Community members vote "Guilty" or "Not Guilty" with optional reasoned commentary
- **Case Management**: Edit and manage submitted cases with open/closed verdict status
- **User Authentication**: Secure login with token-based authentication
- **Case Discovery**: Browse all submitted cases with filtering and pagination support
- **Anonymous Judging**: Users can submit verdicts anonymously to encourage honest assessment

### Technical Highlights
- **Custom React Hooks**: Dedicated hooks for managing cases, judgments, and authentication state
- **Component-Based Architecture**: Reusable components with clear separation of concerns
- **API Integration**: RESTful API client with organized endpoint management
- **Responsive Design**: Mobile-first CSS approach with media query breakpoints
- **Form Validation**: Comprehensive input validation with user-friendly error messaging
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## Tech Stack

**Frontend Framework**: React 19.1.1 with Hooks
**Routing**: React Router DOM 7.9.4
**Build Tool**: Vite 7.1.7
**CSS**: Vanilla CSS with responsive design patterns
**Code Quality**: ESLint with React-specific rules
**Development Server**: Vite with HMR support

## Project Structure

```
src/
├── pages/                 # Route components
│   ├── HomePage.jsx      # Case listing and discovery
│   ├── CasePage.jsx      # Individual case details with verdicts
│   ├── CreateCasePage.jsx # Case submission interface
│   ├── EditCasePage.jsx   # Case modification
│   ├── LoginPage.jsx      # Authentication
│   └── AboutPage.jsx      # Platform information
├── components/           # Reusable UI components
│   ├── CaseCard.jsx      # Case preview card
│   ├── CreateCaseForm.jsx # Controlled form component
│   ├── JudgementForm.jsx  # Verdict submission
│   ├── JudgementCount.jsx # Verdict statistics display
│   ├── LoginForm.jsx      # Authentication form
│   ├── NavBar.jsx         # Navigation with active link tracking
│   └── AuthProvider.jsx   # Authentication context
├── hooks/                # Custom React hooks
│   ├── use-auth.js       # Authentication state management
│   ├── use-case.js       # Single case data fetching
│   ├── use-cases.js      # Multiple cases data fetching
│   ├── use-judgements.js # Verdict data management
│   ├── use-judgement.js  # Single verdict operations
│   └── use-judgement-count.js # Verdict aggregation
├── api/                  # API client functions
│   ├── get-case.js       # Fetch individual case
│   ├── get-cases.js      # Fetch all cases
│   ├── get-judgements.js # Fetch verdicts for case
│   ├── post-createcase.js # Submit new case
│   ├── post-judgement.js  # Submit verdict
│   ├── post-login.js      # User authentication
│   └── put-update-case.js # Update case details
├── main.jsx              # Application entry point with routing
└── main.css              # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd crowdfunding-frontend
npm install
```

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Code Quality

Run ESLint to check code standards:
```bash
npm run lint
```

## Key Components & Implementation Details

### Authentication Flow
The `AuthProvider` component manages user authentication state globally using React Context. Login credentials are verified against the backend, and authentication tokens are stored in localStorage for persistent sessions.

### Custom Hooks Strategy
- `use-cases.js` handles fetching all available cases
- `use-case.js` retrieves individual case details
- `use-judgements.js` aggregates verdicts for verdict counting
- `use-auth.js` manages authentication state and token lifecycle

This approach centralizes data fetching logic, making the codebase maintainable and testable.

### Form Design
CreateCaseForm and JudgementForm implement controlled components with comprehensive validation:
- Real-time character counting with maximum limits
- Input validation before submission
- Accessible form controls with ARIA attributes
- Responsive design with mobile optimization

### Responsive UI
CSS media queries create distinct experiences:
- **Mobile (< 768px)**: Single-column layout, adjusted font sizes, touch-friendly spacing
- **Desktop (≥ 1024px)**: Enhanced shadows, larger typography, optimized whitespace

## Performance Considerations

- Components utilize React hooks for optimal re-render efficiency
- API calls are centralized in custom hooks with error handling
- CSS transitions provide smooth visual feedback without compromising performance
- Vite's code splitting ensures efficient bundle loading

## Accessibility Features

- Semantic HTML structure with proper heading hierarchy
- ARIA labels and descriptions for form inputs
- Keyboard navigation support with visible focus states
- Color contrast ratios meet WCAG AA standards
- Form validation feedback visible to all users

## Future Enhancements

- Case sorting and filtering mechanisms
- User profile pages with case history
- Advanced search with full-text indexing
- Case categories and tagging system
- Pagination for large case datasets
- Real-time notification system
- User reputation and rating system

## Browser Support

Supports all modern browsers (Chrome, Firefox, Safari, Edge) with ES6+ JavaScript support.

## License

This project is proprietary software. All rights reserved.
