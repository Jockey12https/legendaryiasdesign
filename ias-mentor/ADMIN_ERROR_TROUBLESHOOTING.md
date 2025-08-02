# Admin Authentication Error Troubleshooting

## 🔍 Common Issues and Solutions

### **Issue 1: "Access Denied" or Redirect to Login**
**Cause**: Middleware blocking admin access
**Solution**: 
- Middleware now allows admin access in development mode
- If still having issues, try accessing with `?admin=true` parameter

### **Issue 2: Admin Login Modal Not Opening**
**Cause**: Component import or state management issue
**Solution**:
1. Check browser console for errors
2. Verify all imports are correct
3. Clear browser cache and reload

### **Issue 3: Admin Dashboard Not Loading**
**Cause**: Authentication state not persisting
**Solution**:
1. Check localStorage for `adminAuthenticated` and `adminLoginTime`
2. Verify session hasn't expired (24 hours)
3. Try manual login via debug page

### **Issue 4: "Failed to initialize payment" Error**
**Cause**: Firebase configuration or environment variables
**Solution**:
1. Check `.env.local` file has correct Firebase config
2. Verify Firebase project is set up correctly
3. Check browser console for specific error messages

## 🛠️ Debug Steps

### **Step 1: Check Browser Console**
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any red error messages
4. Note down specific error text

### **Step 2: Test Admin Debug Page**
1. Go to: `http://localhost:3000/admin-debug`
2. Check authentication status
3. Try manual login/logout
4. Test admin route links

### **Step 3: Check Environment Variables**
1. Verify `.env.local` file exists
2. Check for `NEXT_PUBLIC_ADMIN_SECRET` (optional)
3. Verify Firebase configuration variables

### **Step 4: Test Admin Login Flow**
1. Click "Log In" dropdown
2. Select "Admin Login"
3. Enter access code: `ADMIN_SECRET`
4. Enter credentials: `admin` / `admin123`
5. Check if redirect works

## 🔧 Quick Fixes

### **Fix 1: Clear Browser Data**
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### **Fix 2: Manual Admin Login**
```javascript
// In browser console
localStorage.setItem('adminAuthenticated', 'true');
localStorage.setItem('adminLoginTime', new Date().toISOString());
location.href = '/admin/payments';
```

### **Fix 3: Bypass Middleware (Development)**
Add `?admin=true` to any admin URL:
- `http://localhost:3000/admin?admin=true`
- `http://localhost:3000/admin/payments?admin=true`

## 📋 Environment Variables Check

### **Required for Firebase:**
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### **Optional for Admin:**
```bash
NEXT_PUBLIC_ADMIN_SECRET=your_custom_secret
```

## 🧪 Testing Checklist

### **Admin Login Test:**
- [ ] Admin login modal opens
- [ ] Access code validation works
- [ ] Username/password validation works
- [ ] Redirect to admin payments works
- [ ] Admin dashboard loads correctly

### **Navbar Test:**
- [ ] Login dropdown shows both options
- [ ] User login works
- [ ] Admin login works
- [ ] Admin dashboard link appears when authenticated

### **Admin Dashboard Test:**
- [ ] Can access `/admin/payments`
- [ ] Can see payment data
- [ ] Can approve/reject payments
- [ ] Can clean up duplicates

## 🚨 Emergency Access

If all else fails, you can temporarily disable middleware:

1. **Rename middleware file:**
   ```bash
   mv src/middleware.ts src/middleware.ts.disabled
   ```

2. **Restart development server:**
   ```bash
   npm run dev
   ```

3. **Access admin directly:**
   - Go to `http://localhost:3000/admin/payments`

4. **Re-enable middleware when done:**
   ```bash
   mv src/middleware.ts.disabled src/middleware.ts
   ```

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the debug page**: `http://localhost:3000/admin-debug`
2. **Note the exact error message**
3. **Check browser console for errors**
4. **Verify environment variables are set**
5. **Test with manual login via debug page**

## 🎯 Expected Behavior

### **Successful Admin Login:**
1. Click "Log In" → "Admin Login"
2. Enter `ADMIN_SECRET` as access code
3. Enter `admin` / `admin123` as credentials
4. Redirect to `/admin/payments`
5. See payment management dashboard
6. Admin dashboard link appears in navbar 