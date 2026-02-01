# Raise The Case

A community-driven justice platform enabling users to submit cases for public review and verdict. Built with modern React architecture, this application demonstrates clean component design, custom hooks for data management, and responsive user interfaces.

## Overview

Raise The Case bridges the gap between traditional justice systems and community participation. Users can submit cases, state their arguments, and have the public decide guilt or innocence through a verdict system. The platform features authentication, case management, and real-time judgment aggregation.

## Features

### Core Functionality
- **User Accounts**: Create an account or log in to submit and judge cases
- **Case Submission**: Submit detailed cases with titles, descriptions, and supporting images
- **Case Management**: Edit your own cases or close them once verdicts are finalised
- **Public Verdict System**: The community votes "Guilty" or "Not Guilty" with optional commentary
- **Verdict Breakdown**: See case verdicts visualised as an easy-to-read percentage bar showing guilty vs innocent votes
- **Anonymous Judging**: Submit verdicts anonymously to encourage fair assessment
- **Share on Social Media**: Share cases directly to Facebook, Twitter/X, LinkedIn, or email with a single click
- **Case Discovery**: Browse all submitted cases with full details and history

### Technical Highlights
- **Custom React Hooks**: Dedicated hooks for managing cases, verdicts, and authentication
- **Component-Based Architecture**: Reusable components with clear separation of concerns
- **API Integration**: RESTful API client with organised endpoint management
- **Fully Responsive Design**: Mobile-first CSS that works beautifully on all devices
- **Form Validation**: Smart validation with clear error messages and user guidance
- **Accessibility**: Proper semantic HTML, ARIA labels, and keyboard navigation support

## Tech Stack

**Frontend Framework**: React 19.1.1 with Hooks
**Routing**: React Router DOM 7.9.4
**Build Tool**: Vite 7.1.7
**Styling**: CSS with custom brand colours and responsive design
**Code Quality**: ESLint with React-specific rules
**Development Server**: Vite with HMR support

## Project Structure

```
src/
├── pages/                    # Route components
│   ├── HomePage.jsx         # Browse cases and verdicts
│   ├── CasePage.jsx         # View case details with verdicts
│   ├── CreateCasePage.jsx   # Submit a new case
│   ├── EditCasePage.jsx     # Edit your own cases
│   ├── LoginPage.jsx        # Sign in to your account
│   ├── SignupPage.jsx       # Create a new account
│   └── AboutPage.jsx        # Learn about the platform
├── components/              # Reusable UI components
│   ├── CaseCard.jsx         # Case preview in listings
│   ├── CreateCaseForm.jsx   # Case submission form
│   ├── JudgementForm.jsx    # Submit a verdict
│   ├── JudgementCount.jsx   # Display verdict breakdown as percentage
│   ├── LoginForm.jsx        # Sign in form
│   ├── SignupForm.jsx       # Account creation form
│   ├── ShareButtons.jsx     # Social media sharing dropdown
│   ├── NavBar.jsx           # Navigation with responsive menu
│   └── AuthProvider.jsx     # Authentication context
├── hooks/                   # Custom React hooks
│   ├── use-auth.js          # Manage authentication state
│   ├── use-case.js          # Fetch single case details
│   ├── use-cases.js         # Fetch all cases
│   ├── use-judgements.js    # Get verdicts for a case
│   ├── use-judgement.js     # Submit or manage a verdict
│   └── use-judgement-count.js # Calculate verdict statistics
├── api/                     # API client functions
│   ├── get-case.js          # Fetch individual case
│   ├── get-cases.js         # Fetch all cases
│   ├── get-judgements.js    # Fetch verdicts
│   ├── post-createcase.js   # Create a new case
│   ├── post-judgement.js    # Submit a verdict
│   ├── post-login.js        # Sign in
│   ├── post-signup.js       # Create account
│   └── put-update-case.js   # Edit case details
├── main.jsx                 # App entry point with routing
└── main.css                 # Global styles
```

## Getting Started

### What You'll Need
- Node.js (v16 or higher)
- npm or yarn

### Installation

Clone the repo and install dependencies:
```bash
git clone <repository-url>
cd crowdfunding-frontend
npm install
```

## How It Works

### Getting Started
First time here? Sign up for an account and you're ready to go. You can create cases immediately or start judging cases submitted by others.

### Submitting a Case
Fill in the case details with a title, description, and optional image. Describe the situation clearly so the community can make an informed verdict.

### Viewing Case Details
Browse any case to see the description, arguments, and current verdict breakdown. The verdict is shown as a visual percentage bar—guilty on the left, not guilty on the right.

### Submitting Your Verdict
Head to a case and vote guilty or not guilty. You can add a comment explaining your reasoning if you'd like. Your verdict counts towards the overall case verdict.

### Editing Your Cases
After you've submitted a case, you can edit it anytime before closing it. Once a case is closed, no more verdicts can be added.

### Authentication & Sessions
Your login token is saved locally so you stay signed in between visits. You can log out anytime, and your cases will remain on the platform.

## Technical Design

### Authentication
The `AuthProvider` manages user sessions globally using React Context. Tokens are saved in localStorage, so you stay logged in between visits.

### Custom Hooks
We use custom hooks to keep data fetching clean and organised:
- `use-cases.js` - Get all cases
- `use-case.js` - Get a single case
- `use-judgements.js` - Get verdicts for a case
- `use-auth.js` - Handle login/signup and current user state

This approach keeps the logic centralised and easy to test.

### Forms
All forms validate input before submission with real-time feedback:
- Character limits with counters (e.g., descriptions)
- Clear error messages
- Success confirmations
- Works great on mobile and desktop

### Responsive Design
The app adapts to every screen size:
- **Mobile (< 768px)**: Single column, touch-friendly
- **Tablet (768px–1024px)**: Two columns
- **Desktop (1024px+)**: Three columns with enhanced spacing

## Next Steps

Ideas for future versions:
- Sorting and filtering cases by status or date or creating themes
- User profiles showing your submitted cases
- Advanced search across case descriptions
- Categories or tags for cases
- Pagination for case listings
- Real-time notifications for case updates
- User reputation based on verdicts
- Delete cases
- Private cases that are sent to individuals to deal with matters as a specified group. 

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) that support ES6+ JavaScript.

## Licence

This project is proprietary software. All rights reserved.
