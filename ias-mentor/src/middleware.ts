import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In development, allow access to admin routes
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    
    // For now, we'll use a simple check
    // In production, implement proper admin authentication
    const isAdmin = checkAdminAuth(request);
    
    if (!isAdmin) {
      // Redirect to login page or show access denied
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
    }
  }

  // Protect API routes that require authentication
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    // In development, allow access with admin parameter
    if (process.env.NODE_ENV === 'development') {
      const adminParam = request.nextUrl.searchParams.get('admin');
      if (adminParam === 'true') {
        return NextResponse.next();
      }
    }
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Simple admin check - replace with proper authentication
function checkAdminAuth(request: NextRequest): boolean {
  // Option 1: Check for admin query parameter (for development)
  const adminParam = request.nextUrl.searchParams.get('admin');
  if (adminParam === 'true' && process.env.NODE_ENV === 'development') {
    return true;
  }

  // Option 2: Check for admin cookie (legacy)
  const adminCookie = request.cookies.get('admin_token');
  if (adminCookie?.value === process.env.ADMIN_SECRET) {
    return true;
  }

  // Option 3: Check Firebase auth token
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Verify Firebase token here
    // This would require Firebase Admin SDK
    return true;
  }

  return false;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}; 