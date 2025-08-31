// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request : any) {
  // 1. Get the authentication token from a cookie.
  // Replace 'auth-token' with the actual name of your cookie.
  const authToken = request.cookies.get('auth-token');
  const url = request.nextUrl.clone();

  // 2. Define the public paths that don't require authentication.
  const publicPaths = ['/login', '/register', '/'];

  // 3. Check if the user is trying to access a protected route
  //    and is not authenticated.
  if (!authToken && !publicPaths.includes(url.pathname)) {
    // Redirect the user to the login page.
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 4. Allow the request to continue if authenticated or on a public path.
  return NextResponse.next();
}

// 5. Define which paths the middleware should run on.
export const config = {
  // The matcher config runs the middleware on all paths.
  // It's crucial to exclude API routes and static files.
  // The following regex matches all paths except those that start with
  // '/api', '_next/static', or '_next/image'.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};