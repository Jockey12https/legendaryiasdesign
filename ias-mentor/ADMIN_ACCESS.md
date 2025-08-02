# Admin Access Guide

## 🔑 Admin Secret Key
The admin secret key is: `legendaryias_admin_2024`

## 🚀 How to Access Admin Panel

### Method 1: Development Mode (Recommended)
Simply add `?admin=true` to the URL:
```
http://localhost:3000/admin/payments?admin=true
```

### Method 2: Set Admin Cookie
Open browser console (F12) and run:
```javascript
document.cookie = "admin_token=legendaryias_admin_2024; path=/";
```
Then visit: `http://localhost:3000/admin/payments`

### Method 3: Environment Variable
Add to your `.env.local` file:
```bash
ADMIN_SECRET=legendaryias_admin_2024
```

## 📋 Admin URLs

- **Payments Dashboard**: `http://localhost:3000/admin/payments?admin=true`
- **Main Admin**: `http://localhost:3000/admin?admin=true`

## 🔧 Admin Features

1. **View All Payments** - See all payment records
2. **Filter by Status** - Pending, Confirmed, Rejected
3. **Confirm Payments** - Grant user access to courses/materials
4. **Reject Payments** - Add admin notes for rejected payments
5. **View Payment Details** - Click on any payment for full details

## 🎯 Quick Test

1. Start the server: `npm run dev`
2. Visit: `http://localhost:3000/admin/payments?admin=true`
3. You should see the admin dashboard

## 🚨 Troubleshooting

If you get "Access Denied":
- Make sure you're using `?admin=true` in the URL
- Check that the development server is running
- Try setting the admin cookie via browser console 