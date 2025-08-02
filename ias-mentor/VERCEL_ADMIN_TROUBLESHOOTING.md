# Vercel Admin Troubleshooting Guide

## 🚨 Common Admin Issues on Vercel

### **Issue 1: Admin Routes Return 404**

#### **Symptoms:**
- `/admin` returns 404 error
- `/admin/payments` not accessible
- `/admin/analytics` shows "Page not found"

#### **Causes:**
1. **Middleware blocking routes** ✅ **FIXED**
2. **Missing environment variables**
3. **Build configuration issues**

#### **Solutions:**
1. **Check Environment Variables:**
   ```bash
   # In Vercel dashboard, verify:
   NEXT_PUBLIC_ADMIN_SECRET=ADMIN_SECRET
   ```

2. **Clear Browser Cache:**
   - Open Developer Tools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

3. **Check Vercel Build Logs:**
   - Go to Vercel dashboard
   - Click on your project
   - Go to "Deployments" tab
   - Check build logs for errors

### **Issue 2: Admin Login Not Working**

#### **Symptoms:**
- Admin login modal opens but login fails
- "Invalid access code" error
- "Invalid username or password" error

#### **Causes:**
1. **Environment variable not set**
2. **Environment variable not accessible**
3. **Browser localStorage issues**

#### **Solutions:**
1. **Verify Environment Variable:**
   ```bash
   # In Vercel dashboard:
   NEXT_PUBLIC_ADMIN_SECRET=ADMIN_SECRET
   ```

2. **Test Environment Variable:**
   - Open browser console
   - Type: `console.log(process.env.NEXT_PUBLIC_ADMIN_SECRET)`
   - Should show "ADMIN_SECRET"

3. **Clear localStorage:**
   ```javascript
   // In browser console:
   localStorage.clear();
   // Then try admin login again
   ```

### **Issue 3: Admin Dashboard Shows No Data**

#### **Symptoms:**
- Admin dashboard loads but shows empty data
- "No payments found" message
- Analytics showing 0 values

#### **Causes:**
1. **Firebase connection issues**
2. **Missing Firebase environment variables**
3. **Firebase project configuration**

#### **Solutions:**
1. **Check Firebase Environment Variables:**
   ```bash
   # In Vercel dashboard, verify all are set:
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

2. **Check Firebase Project:**
   - Go to Firebase Console
   - Verify project is active
   - Check Firestore rules allow read access
   - Verify Authentication is enabled

3. **Test Firebase Connection:**
   - Open browser console
   - Look for Firebase initialization errors
   - Check Network tab for failed requests

### **Issue 4: API Routes Return 401/403**

#### **Symptoms:**
- Admin API calls fail
- "Unauthorized" errors in console
- Payment data not loading

#### **Causes:**
1. **Middleware blocking API routes** ✅ **FIXED**
2. **Missing authentication headers**
3. **CORS issues**

#### **Solutions:**
1. **The middleware has been updated** to allow admin routes
2. **Check API route logs:**
   - Go to Vercel dashboard
   - Check Function logs for errors
   - Look for 401/403 responses

3. **Test API directly:**
   ```bash
   # Test admin payments API
   curl https://your-project.vercel.app/api/admin/payments
   ```

### **Issue 5: Build Fails on Vercel**

#### **Symptoms:**
- Deployment fails
- Build errors in Vercel logs
- TypeScript compilation errors

#### **Causes:**
1. **Missing dependencies**
2. **TypeScript errors**
3. **Environment variable issues**

#### **Solutions:**
1. **Check package.json:**
   ```json
   {
     "scripts": {
       "build": "next build",
       "dev": "next dev"
     }
   }
   ```

2. **Fix TypeScript errors:**
   - Run `npm run build` locally
   - Fix any TypeScript errors
   - Commit and push changes

3. **Check dependencies:**
   ```bash
   # Ensure all dependencies are in package.json
   npm install
   npm run build
   ```

## 🔧 Quick Fixes

### **Emergency Admin Access:**

#### **Method 1: Direct URL Access**
```
https://your-project.vercel.app/admin/analytics
https://your-project.vercel.app/admin/payments
```

#### **Method 2: Environment Variable Override**
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add/update: `NEXT_PUBLIC_ADMIN_SECRET=ADMIN_SECRET`
4. Redeploy

#### **Method 3: Local Testing**
1. Clone repository locally
2. Create `.env.local` with same variables as Vercel
3. Run `npm run dev`
4. Test admin functionality locally

### **Debug Steps:**

#### **Step 1: Check Environment Variables**
```bash
# In Vercel dashboard, verify these exist:
NEXT_PUBLIC_FIREBASE_API_KEY=✓
NEXT_PUBLIC_FIREBASE_PROJECT_ID=✓
NEXT_PUBLIC_ADMIN_SECRET=✓
```

#### **Step 2: Test Admin Login**
1. Go to your deployed site
2. Click "Admin Login"
3. Enter: `ADMIN_SECRET`
4. Username: `admin`
5. Password: `admin123`

#### **Step 3: Check Console Logs**
1. Open browser developer tools
2. Go to Console tab
3. Look for error messages
4. Check for "Admin secret check" log

#### **Step 4: Verify Firebase**
1. Go to Firebase Console
2. Check Authentication → Users
3. Check Firestore → Data
4. Verify project settings

## 🚀 Deployment Checklist

### **Before Deploying:**
- [ ] All environment variables set in Vercel
- [ ] Firebase project configured correctly
- [ ] No TypeScript errors locally
- [ ] `npm run build` works locally

### **After Deploying:**
- [ ] Site loads without errors
- [ ] Admin login works
- [ ] Admin dashboard shows data
- [ ] Payment system functions
- [ ] No console errors

### **If Issues Persist:**
1. **Check Vercel logs** for build/deployment errors
2. **Verify environment variables** are set correctly
3. **Test locally** with same environment variables
4. **Check Firebase project** settings and rules
5. **Clear browser cache** and localStorage

## 📞 Support

### **Debug Information to Collect:**
1. **Vercel deployment URL**
2. **Browser console errors**
3. **Network tab failed requests**
4. **Environment variables status**
5. **Firebase project ID**

### **Common Solutions:**
- **Admin not working**: Check `NEXT_PUBLIC_ADMIN_SECRET`
- **No data showing**: Check Firebase environment variables
- **Build failing**: Fix TypeScript errors locally first
- **API errors**: Check Vercel function logs

The admin panel should now work correctly on Vercel! 🎉 