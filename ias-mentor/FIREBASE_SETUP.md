# Firebase Authentication & Dashboard Setup

This document provides instructions for setting up Firebase authentication and the dashboard features in the IAS Mentor application.

## Features Implemented

### Authentication System
- ✅ Email/password authentication for students
- ✅ Role-based authentication (Student, Faculty, Content Manager, Super Admin)
- ✅ User registration with profile information
- ✅ Login/logout functionality
- ✅ Password reset functionality
- ✅ Email verification
- ✅ Session management with auto-logout after inactivity

### Dashboard Features
- ✅ Role-based dashboard views
- ✅ Sidebar navigation using shadcn components
- ✅ Profile management (personal details, course history)
- ✅ Session timeout warnings
- ✅ User avatar and dropdown menu in header
- ✅ Responsive design for mobile and desktop

### User Roles & Permissions

#### Student
- Access to enrolled courses
- Progress tracking
- Payment history
- Profile management

#### Faculty
- Course management
- Student progress monitoring
- Content creation
- Profile management

#### Content Manager
- Content creation and editing
- Course management
- Student monitoring
- Profile management

#### Super Admin
- Full platform access
- User management
- Course management
- System settings
- Analytics and reporting

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules (see below)

### 2. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Firebase config from Project Settings > General > Your apps
3. Fill in the environment variables in `.env.local`

### 3. Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Super admins can read all user documents
    match /users/{userId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // Courses - read access for all authenticated users
    match /courses/{courseId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['faculty', 'content_manager', 'super_admin']);
    }
    
    // Enrollments - users can read their own enrollments
    match /enrollments/{enrollmentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Payment receipts - users can read their own receipts
    match /payments/{paymentId} {
      allow read: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

### 4. Initial User Setup

After setting up Firebase, you'll need to create your first admin user:

1. Register a new account through the application
2. Go to Firebase Console > Firestore Database
3. Find your user document in the `users` collection
4. Edit the document and change the `role` field to `super_admin`

### 5. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthModal.tsx          # Login/Register modal
│   │   ├── LoginForm.tsx          # Login form component
│   │   ├── RegisterForm.tsx       # Registration form component
│   │   ├── SessionManager.tsx     # Session timeout management
│   │   └── SessionTimeoutWarning.tsx # Timeout warning dialog
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx    # Main dashboard layout
│   │   └── DashboardSidebar.tsx   # Sidebar navigation
│   ├── layout/
│   │   └── Header.tsx             # Updated header with auth
│   └── ui/                        # shadcn UI components
├── contexts/
│   └── AuthContext.tsx            # Authentication context
├── hooks/
│   ├── use-mobile.tsx             # Mobile detection hook
│   └── useSessionTimeout.ts       # Session timeout hook
├── app/
│   ├── dashboard/
│   │   ├── page.tsx               # Main dashboard page
│   │   └── profile/
│   │       └── page.tsx           # Profile management page
│   └── layout.tsx                 # Updated with AuthProvider
└── utils/
    └── firebase.js                # Firebase configuration
```

## Usage

### Authentication Flow

1. Users can click "Log In" in the header to open the authentication modal
2. New users can register with email, password, and profile information
3. Existing users can log in with email and password
4. After login, users see their avatar in the header with a dropdown menu
5. Users are automatically logged out after 30 minutes of inactivity (with 5-minute warning)

### Dashboard Access

- Navigate to `/dashboard` after logging in
- Sidebar navigation adapts based on user role
- Profile management available at `/dashboard/profile`

### Role-Based Features

The dashboard and navigation automatically adapt based on the user's role:
- Students see course progress and learning materials
- Faculty see teaching tools and student management
- Admins see platform management and analytics

## Customization

### Session Timeout

Modify session timeout settings in `SessionManager.tsx`:
```typescript
const { extendSession, getRemainingTime } = useSessionTimeout({
  timeoutMinutes: 30, // Change timeout duration
  warningMinutes: 5,  // Change warning time
  // ...
});
```

### User Roles

Add new roles by updating the `UserRole` type in `AuthContext.tsx` and adding corresponding logic in dashboard components.

### Styling

The application uses Tailwind CSS with shadcn/ui components. Customize the theme by modifying:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles and CSS variables

## Troubleshooting

### Common Issues

1. **Firebase connection errors**: Check environment variables and Firebase project settings
2. **Authentication not working**: Verify Email/Password provider is enabled in Firebase Console
3. **Firestore permission errors**: Check security rules and user roles
4. **Session timeout not working**: Ensure SessionManager is properly imported in layout

### Debug Mode

Enable Firebase debug mode by adding to your environment:
```
NEXT_PUBLIC_FIREBASE_DEBUG=true
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Firestore Rules**: Regularly review and test security rules
3. **User Roles**: Implement proper role validation on both client and server
4. **Session Management**: Monitor session timeout settings for security vs. usability balance

## Next Steps

Consider implementing:
- Email verification enforcement
- Password strength requirements
- Two-factor authentication
- Social login providers (Google, Facebook)
- Advanced role permissions
- Audit logging
- Password policy enforcement
