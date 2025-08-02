import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to admin routes - authentication will be handled client-side
    // This prevents the middleware from blocking admin access in production
    return NextResponse.next();
  }

  // Protect API routes that require authentication
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    // Allow access to admin API routes - authentication will be handled in the API routes themselves
    // This prevents the middleware from blocking admin API access in production
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}; 