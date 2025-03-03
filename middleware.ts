import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  console.log({ token });
  const hasPassword = token?.hasPassword === true;
  const isAdmin = token?.role === 'admin';
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
  if (isAdminPage) {
    if (isAuth && isAdmin) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith('/login') && isAuth) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }
  if (
    req.nextUrl.pathname.startsWith('/profile') ||
    req.nextUrl.pathname.startsWith('/messages') ||
    req.nextUrl.pathname.startsWith('/events') ||
    req.nextUrl.pathname.startsWith('/communaute')
  ) {
    if (!isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (!hasPassword) {
      return NextResponse.redirect(new URL('/set-password', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/admin/:path*',
    '/profile/:path*',
    '/messages/:path*',
    '/events/:path*',
    '/communaute/:path*',
  ],
};
