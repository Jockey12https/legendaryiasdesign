# Admin Analytics Feature

## 🔄 Overview
The admin analytics dashboard provides comprehensive insights into student data, revenue statistics, and detailed student information. It shows total students, revenue, course enrollments, and allows admins to view detailed student profiles.

## 🎯 Features Added

### **Analytics Dashboard**
- **Total Students**: Count of all registered students
- **Total Revenue**: Sum of all confirmed payments
- **Course Enrollments**: Total number of course enrollments
- **Study Materials**: Total number of material purchases

### **Student Management**
- **Students List**: Complete list of all registered students
- **Student Details**: Detailed view of individual student information
- **Course History**: View all enrolled courses for each student
- **Material History**: View all purchased materials for each student

### **Data Visualization**
- **Analytics Cards**: Key metrics displayed in card format
- **Student Profiles**: Avatar, name, email, contact information
- **Enrollment Stats**: Course and material counts per student
- **Financial Data**: Revenue calculations and payment status

## 📋 Analytics Dashboard

### **Key Metrics:**

#### **1. Total Students**
- **Source**: Firebase `users` collection
- **Display**: Total count of registered users
- **Icon**: Users icon
- **Description**: "Registered students"

#### **2. Total Revenue**
- **Source**: Firebase `payments` collection (confirmed status)
- **Display**: Sum of all confirmed payment amounts
- **Icon**: DollarSign icon
- **Description**: "From confirmed payments"
- **Format**: Indian Rupees (INR)

#### **3. Course Enrollments**
- **Source**: Firebase `users/{uid}/enrolledCourses` subcollections
- **Display**: Total count across all students
- **Icon**: BookOpen icon
- **Description**: "Total course enrollments"

#### **4. Study Materials**
- **Source**: Firebase `users/{uid}/purchasedMaterials` subcollections
- **Display**: Total count across all students
- **Icon**: GraduationCap icon
- **Description**: "Material purchases"

## 🔧 Technical Implementation

### **Files Created:**
- `src/app/admin/analytics/page.tsx` - Main analytics dashboard

### **Files Modified:**
- `src/components/layout/Header.tsx` - Added Analytics link to admin dropdown

### **Data Sources:**

#### **Firebase Collections:**
```typescript
// Users collection
users/{uid} - User profile data

// Payments collection
payments/{paymentId} - Payment records

// User subcollections
users/{uid}/enrolledCourses/{courseId} - Enrolled courses
users/{uid}/purchasedMaterials/{materialId} - Purchased materials
```

#### **Key Functions:**

##### **loadAnalytics:**
```typescript
const loadAnalytics = async () => {
  // Load all users
  const usersSnapshot = await getDocs(collection(db, 'users'));
  
  // Load all payments
  const paymentsSnapshot = await getDocs(collection(db, 'payments'));
  
  // Load enrolled courses and purchased materials for each user
  const studentsWithDetails = await Promise.all(
    usersData.map(async (user) => {
      // Get enrolled courses
      const enrolledCoursesSnapshot = await getDocs(
        collection(db, 'users', user.uid, 'enrolledCourses')
      );
      
      // Get purchased materials
      const purchasedMaterialsSnapshot = await getDocs(
        collection(db, 'users', user.uid, 'purchasedMaterials')
      );
      
      return {
        ...user,
        enrolledCourses,
        purchasedMaterials
      };
    })
  );
};
```

##### **Revenue Calculation:**
```typescript
const getTotalRevenue = () => {
  return payments
    .filter(payment => payment.status === 'confirmed')
    .reduce((total, payment) => total + payment.amount, 0);
};
```

## 🎨 UI Components

### **Analytics Cards:**
- **Grid Layout**: 4 cards in responsive grid
- **Icons**: Lucide React icons for each metric
- **Typography**: Large numbers with descriptive text
- **Colors**: Consistent with design system

### **Students List:**
- **Avatar**: Student profile picture or initials
- **Name**: Display name (firstName + lastName or email)
- **Email**: Student email address
- **Stats**: Course and material counts as badges
- **Join Date**: Registration date
- **Action Button**: "View Details" button

### **Student Details Dialog:**
- **Profile Section**: Large avatar, name, email, contact info
- **Tabs**: "Enrolled Courses" and "Purchased Materials"
- **Course Details**: Title, description, category, duration, price
- **Material Details**: Title, type, purchase date, price
- **Status Badges**: Enrolled/Purchased status indicators

## 📊 Data Structure

### **Student Interface:**
```typescript
interface Student {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  enrolledCourses: Course[];
  purchasedMaterials: Material[];
}
```

### **Course Interface:**
```typescript
interface Course {
  id: string;
  title: string;
  type: string;
  price: number;
  duration: string;
  category: string;
  enrolledAt: string;
}
```

### **Material Interface:**
```typescript
interface Material {
  id: string;
  title: string;
  type: string;
  price: number;
  purchasedAt: string;
}
```

### **Payment Interface:**
```typescript
interface Payment {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  productType: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'expired';
  createdAt: string;
  confirmedAt?: string;
}
```

## 🔄 Navigation Integration

### **Admin Dropdown Menu:**
- **Desktop**: Added "Analytics" link with Users icon
- **Mobile**: Added "Analytics" button in admin section
- **Access**: Only visible when admin is authenticated

### **Route Protection:**
- **Authentication**: Requires admin authentication
- **Loading State**: Shows spinner while loading
- **Access Denied**: Redirects if not authenticated

## 🧪 Testing Scenarios

### **Test Analytics Loading:**
1. **Admin Login**: Log in as admin
2. **Navigate**: Go to Analytics page
3. **Loading**: Verify loading spinner appears
4. **Data Display**: Verify analytics cards show data
5. **Students List**: Verify students are listed

### **Test Student Details:**
1. **Click Details**: Click "View Details" on any student
2. **Dialog Open**: Verify dialog opens with student info
3. **Profile Section**: Check avatar, name, email, contact
4. **Courses Tab**: Verify enrolled courses are shown
5. **Materials Tab**: Verify purchased materials are shown

### **Test Data Accuracy:**
1. **Revenue Calculation**: Verify only confirmed payments counted
2. **Student Count**: Verify matches actual user count
3. **Enrollment Count**: Verify matches actual enrollments
4. **Material Count**: Verify matches actual purchases

### **Test Responsive Design:**
1. **Desktop**: Test analytics cards layout
2. **Tablet**: Test responsive grid
3. **Mobile**: Test mobile menu and dialog

## 🎯 Benefits

### **For Admins:**
- **Business Insights**: Clear view of revenue and student metrics
- **Student Management**: Easy access to student information
- **Performance Tracking**: Monitor enrollment and purchase trends
- **Data Analysis**: Comprehensive student and financial data

### **For Business:**
- **Revenue Tracking**: Real-time revenue calculations
- **Student Analytics**: Understanding student behavior
- **Growth Monitoring**: Track student acquisition and retention
- **Financial Planning**: Data-driven business decisions

### **For Operations:**
- **Quick Access**: Fast access to student information
- **Detailed Views**: Comprehensive student profiles
- **Payment Tracking**: Monitor payment status and revenue
- **Enrollment Management**: Track course and material popularity

## 🚀 Usage Instructions

### **For Admins:**
1. **Access Analytics**: Click "Analytics" in admin dropdown
2. **View Metrics**: Check the 4 analytics cards for key metrics
3. **Browse Students**: Scroll through the students list
4. **View Details**: Click "View Details" for any student
5. **Explore Data**: Use tabs to view courses and materials

### **For Developers:**
1. **Data Loading**: Analytics loads all Firebase data on mount
2. **Error Handling**: Graceful handling of missing data
3. **Performance**: Efficient data fetching with Promise.all
4. **UI Components**: Reusable components from shadcn/ui

## 🎉 Key Features

- **Real-time Analytics**: Live data from Firebase
- **Student Profiles**: Detailed student information
- **Revenue Tracking**: Accurate financial calculations
- **Course History**: Complete enrollment records
- **Material History**: Complete purchase records
- **Responsive Design**: Works on all devices
- **Admin Protection**: Secure access control
- **Data Visualization**: Clear metrics display
- **Interactive UI**: Clickable student details
- **Comprehensive Data**: All student and financial information 