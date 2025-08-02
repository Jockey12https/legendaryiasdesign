# Admin Login System Guide

## 🔐 Overview
A simple admin login system has been implemented with two-step authentication:
1. **Access Code Verification**: Enter the admin secret code
2. **Admin Credentials**: Username and password authentication

## 🚀 Quick Start

### Access the Admin Dashboard
```
http://localhost:3000/admin
```
This will redirect to: `http://localhost:3000/admin/analytics`

### Login Credentials
- **Access Code**: `ADMIN_SECRET` (or set via environment variable)
- **Username**: `admin`
- **Password**: `admin123`

## 🔧 Setup

### Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_ADMIN_SECRET=your_custom_secret_here
```

### Default Values
- **Access Code**: `ADMIN_SECRET` (if not set in environment)
- **Username**: `admin`
- **Password**: `admin123`

## 📋 Login Flow

### Step 1: Access Code
1. Navigate to `/admin`
2. Click "Admin Login"
3. Enter the access code: `ADMIN_SECRET`
4. Click "Continue"

### Step 2: Admin Credentials
1. Enter username: `admin`
2. Enter password: `admin123`
3. Click "Login"

### Step 3: Access Dashboard
- Successfully logged in users are redirected to the analytics dashboard
- Session lasts for 24 hours
- Logout button available in the top-right corner

## 🛡️ Security Features

### Session Management
- **Duration**: 24 hours
- **Storage**: localStorage
- **Auto-expiry**: Sessions expire automatically
- **Manual logout**: Available via logout button

### Access Control
- **Two-factor**: Access code + credentials
- **Route protection**: Middleware protects admin routes
- **Session validation**: Checks login time on each access

## 🔄 Usage

### For Admins
1. **Access**: Go to `/admin`
2. **Login**: Use the two-step authentication
3. **Manage**: Access analytics and payment management dashboards
4. **Logout**: Use logout button when done

### For Developers
1. **Test**: Use default credentials
2. **Customize**: Change environment variables
3. **Extend**: Add more admin features as needed

## 📁 File Structure

```
src/
├── components/
│   └── auth/
│       └── AdminLoginModal.tsx    # Admin login modal
├── hooks/
│   └── useAdminAuth.ts            # Admin auth hook
├── app/
│   └── admin/
│       ├── page.tsx               # Admin landing page
│       ├── analytics/
│       │   └── page.tsx           # Analytics dashboard
│       └── payments/
│           └── page.tsx           # Payment management dashboard
└── middleware.ts                  # Route protection
```

## 🎯 Features

### AdminLoginModal
- **Two-step authentication**
- **Access code verification**
- **Username/password login**
- **Error handling**
- **Loading states**
- **Password visibility toggle**

### useAdminAuth Hook
- **Session management**
- **Auto-expiry handling**
- **Login/logout functions**
- **Authentication state**

### Admin Dashboard
- **Protected routes**
- **Session validation**
- **Logout functionality**
- **Payment management**

## 🔧 Customization

### Change Access Code
```bash
# In .env.local
NEXT_PUBLIC_ADMIN_SECRET=your_new_secret
```

### Change Credentials
Edit `AdminLoginModal.tsx`:
```typescript
// Change these values
if (username === 'your_username' && password === 'your_password') {
  // Login logic
}
```

### Extend Session Duration
Edit `useAdminAuth.ts`:
```typescript
// Change from 24 hours to your preferred duration
if (hoursDiff < 48) { // 48 hours
  setIsAdminAuthenticated(true);
}
```

## 🚨 Security Notes

### Production Considerations
1. **Change default credentials** before deployment
2. **Use strong access codes** in production
3. **Consider server-side validation** for enhanced security
4. **Implement rate limiting** for login attempts
5. **Use HTTPS** in production

### Current Limitations
- **Client-side only**: No server-side validation
- **Simple storage**: Uses localStorage (not encrypted)
- **Basic auth**: No advanced security features

## 🧪 Testing

### Test Login Flow
1. Navigate to `/admin`
2. Enter access code: `ADMIN_SECRET`
3. Enter credentials: `admin` / `admin123`
4. Verify dashboard access
5. Test logout functionality

### Test Session Expiry
1. Login successfully
2. Wait 24 hours (or modify code for testing)
3. Verify session expires
4. Verify re-login required

### Test Error Handling
1. Enter wrong access code
2. Enter wrong credentials
3. Verify error messages display
4. Verify form resets properly

## 🎉 Benefits

- **Simple Setup**: Easy to implement and use
- **Two-Factor**: Access code + credentials
- **Session Management**: Automatic expiry
- **User Friendly**: Clear UI and error messages
- **Extensible**: Easy to add more features
- **Secure**: Basic protection for admin routes 