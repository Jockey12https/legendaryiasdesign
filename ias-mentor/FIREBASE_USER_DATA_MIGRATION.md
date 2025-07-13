# Firebase User Data Migration

## Problem
The IAS Mentor application was storing user enrollment and purchase data in localStorage, which caused data loss when users signed out or cleared their browser data. This meant that users would lose their enrolled courses and purchased materials after signing out.

## Solution
Implemented a Firebase Firestore-based solution to permanently store user data in the cloud, ensuring data persistence across sessions and devices.

## Changes Made

### 1. Created UserDataService (`src/utils/userDataService.js`)
- **Purpose**: Centralized service for managing user data in Firebase Firestore
- **Key Features**:
  - User document initialization
  - Course enrollment management
  - Material purchase tracking
  - Data migration from localStorage to Firebase
  - Recent activity tracking

### 2. Created useUserData Hook (`src/hooks/useUserData.js`)
- **Purpose**: Custom React hook for consistent user data management across components
- **Features**:
  - Automatic data loading when user changes
  - Real-time state updates
  - Error handling
  - Data refresh functionality

### 3. Updated Dashboard (`src/app/dashboard/page.tsx`)
- **Changes**:
  - Replaced localStorage data loading with Firebase service
  - Added automatic data migration from localStorage
  - Improved error handling with toast notifications
  - Used the new `useUserData` hook for cleaner code

### 4. Updated Courses Page (`src/app/courses/page.tsx`)
- **Changes**:
  - Replaced localStorage enrollment/purchase with Firebase operations
  - Added duplicate enrollment/purchase prevention
  - Improved error handling
  - Automatic data migration for existing users

### 5. Updated Book Online Page (`src/app/book-online/page.tsx`)
- **Changes**:
  - Replaced localStorage enrollment with Firebase operations
  - Added duplicate enrollment prevention
  - Automatic data migration for existing users

## Firebase Database Structure

### Users Collection
```
users/{userId}
├── uid: string
├── enrolledCourses: array
│   ├── id: string
│   ├── title: string
│   ├── type: string
│   ├── enrolledAt: timestamp
│   ├── userId: string
│   ├── price: number (optional)
│   ├── duration: string (optional)
│   ├── category: string (optional)
│   └── status: string
├── purchasedMaterials: array
│   ├── id: string
│   ├── title: string
│   ├── type: "material"
│   ├── purchasedAt: timestamp
│   ├── userId: string
│   ├── price: number (optional)
│   └── status: string
├── createdAt: timestamp
└── updatedAt: timestamp
```

## Data Migration Process

### Automatic Migration
When a user signs in, the system automatically:
1. Checks for existing data in localStorage
2. Migrates any found data to Firebase
3. Clears localStorage after successful migration
4. Loads data from Firebase for the current session

### Migration Safety
- Data is only migrated if it exists in localStorage
- Original localStorage data is preserved until successful migration
- Migration is idempotent (safe to run multiple times)

## Benefits

### For Users
- **Data Persistence**: Enrolled courses and purchased materials are permanently stored
- **Cross-Device Access**: Data is available on any device after signing in
- **No Data Loss**: Signing out and back in preserves all user data
- **Seamless Experience**: Automatic migration ensures no data is lost during the transition

### For Developers
- **Centralized Data Management**: All user data operations go through a single service
- **Consistent API**: Standardized methods for enrollment and purchase operations
- **Error Handling**: Comprehensive error handling and user feedback
- **Scalability**: Firebase Firestore provides automatic scaling and real-time updates

## Usage Examples

### Enrolling in a Course
```javascript
import useUserData from '@/hooks/useUserData';

const { enrollInCourse } = useUserData();

const handleEnrollment = async (courseData) => {
  try {
    await enrollInCourse(courseData);
    // Success - course is now enrolled
  } catch (error) {
    // Handle error
  }
};
```

### Checking Enrollment Status
```javascript
import useUserData from '@/hooks/useUserData';

const { isEnrolledInCourse } = useUserData();

const isEnrolled = isEnrolledInCourse('course-id');
```

### Loading User Data
```javascript
import useUserData from '@/hooks/useUserData';

const { 
  enrolledCourses, 
  purchasedMaterials, 
  recentActivity, 
  loading, 
  error 
} = useUserData();
```

## Security Rules

Ensure your Firebase Firestore security rules allow authenticated users to read and write their own data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Testing

To test the implementation:
1. Sign in with an existing account that has localStorage data
2. Verify that data is migrated to Firebase
3. Sign out and sign back in
4. Verify that data persists
5. Test enrollment and purchase functionality
6. Check that data appears in the Firebase console

## Future Enhancements

- Real-time data synchronization across multiple browser tabs
- Offline support with data synchronization when connection is restored
- Advanced analytics and reporting on user enrollment patterns
- Integration with payment processing for actual course purchases 