import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'; // Use NextRequest instead of default Request
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/animal-dashboard', '/api/:path*'],
};
