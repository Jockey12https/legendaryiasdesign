# Vercel Deployment Guide

## 🚀 Deploying to Vercel

### **Prerequisites:**
1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Firebase Project**: Set up and configured

## 📋 Environment Variables Setup

### **Required Environment Variables for Vercel:**

Go to your Vercel project dashboard → Settings → Environment Variables and add these:

#### **1. Firebase Configuration:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### **2. Admin Configuration:**
```
NEXT_PUBLIC_ADMIN_SECRET=ADMIN_SECRET
```

#### **3. WhatsApp Configuration:**
```
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_UPI_ID=yourwebsite@upi
```

#### **4. Firebase Service Account (for server-side operations):**
```
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

## 🔧 Deployment Steps

### **Step 1: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### **Step 2: Configure Project**
1. **Framework Preset**: Next.js
2. **Root Directory**: `ias-mentor` (if your project is in a subdirectory)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`

### **Step 3: Add Environment Variables**
1. In the deployment setup, add all environment variables listed above
2. Make sure to add them to **Production**, **Preview**, and **Development** environments

### **Step 4: Deploy**
1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

## 🔐 Admin Access Setup

### **After Deployment:**

#### **1. Access Admin Panel:**
- Go to: `https://your-project.vercel.app/admin`
- You'll be redirected to `/admin/analytics`

#### **2. Admin Login:**
- Click "Admin Login" in the navbar
- Enter access code: `ADMIN_SECRET`
- Username: `admin`
- Password: `admin123`

#### **3. Admin Dashboard:**
- **Payments**: `https://your-project.vercel.app/admin/payments`
- **Analytics**: `https://your-project.vercel.app/admin/analytics`

## 🛠️ Troubleshooting

### **Common Issues:**

#### **1. Admin Not Working:**
**Problem**: Admin routes return 404 or access denied
**Solution**: 
- Check environment variables are set correctly
- Verify `NEXT_PUBLIC_ADMIN_SECRET` is set
- Clear browser cache and localStorage

#### **2. Firebase Connection Issues:**
**Problem**: "Failed to initialize payment" error
**Solution**:
- Verify all Firebase environment variables are set
- Check Firebase project settings
- Ensure Firebase project is in the correct region

#### **3. Build Errors:**
**Problem**: Build fails on Vercel
**Solution**:
- Check `package.json` has correct scripts
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

#### **4. API Routes Not Working:**
**Problem**: Admin API returns 401/403 errors
**Solution**:
- The middleware has been updated to allow admin routes
- API routes handle authentication internally
- Check Firebase service account key if using server-side operations

## 🔍 Debug Steps

### **1. Check Environment Variables:**
```bash
# In Vercel dashboard, verify these are set:
NEXT_PUBLIC_FIREBASE_API_KEY=✓
NEXT_PUBLIC_FIREBASE_PROJECT_ID=✓
NEXT_PUBLIC_ADMIN_SECRET=✓
```

### **2. Test Admin Access:**
1. Go to your deployed site
2. Click "Admin Login" in navbar
3. Enter credentials
4. Should redirect to `/admin/analytics`

### **3. Check Console Logs:**
1. Open browser developer tools
2. Go to Console tab
3. Look for any error messages
4. Check Network tab for failed requests

### **4. Verify Firebase:**
1. Go to Firebase Console
2. Check Authentication → Users
3. Check Firestore → Data
4. Verify project settings

## 📱 Testing Checklist

### **Before Going Live:**

#### **✅ Basic Functionality:**
- [ ] Homepage loads correctly
- [ ] User registration/login works
- [ ] Course enrollment works
- [ ] Payment modal opens
- [ ] WhatsApp integration works

#### **✅ Admin Functionality:**
- [ ] Admin login works
- [ ] Admin dashboard loads
- [ ] Payments page shows data
- [ ] Analytics page shows data
- [ ] Admin can confirm/reject payments

#### **✅ Payment System:**
- [ ] Payment creation works
- [ ] Payment status updates work
- [ ] Course/material access granted after payment
- [ ] Duplicate payment prevention works

## 🚨 Security Considerations

### **Production Security:**

#### **1. Change Default Credentials:**
- Update `NEXT_PUBLIC_ADMIN_SECRET` to a strong value
- Consider implementing proper admin authentication
- Use Firebase Auth for admin users

#### **2. Environment Variables:**
- Never commit `.env.local` to Git
- Use Vercel's environment variable system
- Rotate secrets regularly

#### **3. API Security:**
- Implement rate limiting
- Add proper authentication to API routes
- Validate all inputs

## 🔄 Updates and Maintenance

### **Updating the Site:**
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Check deployment logs for errors
4. Test functionality after deployment

### **Monitoring:**
1. Use Vercel Analytics
2. Monitor Firebase usage
3. Check error logs regularly
4. Monitor payment system

## 📞 Support

### **If Issues Persist:**
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test locally with same environment variables
4. Check Firebase project settings
5. Review browser console for errors

### **Useful Links:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🎉 Success Indicators

### **When Everything Works:**
- ✅ Site loads without errors
- ✅ Admin login works
- ✅ Payment system functions
- ✅ Analytics show correct data
- ✅ No console errors
- ✅ All API routes respond correctly

Your admin panel should now work correctly on Vercel! 🚀 