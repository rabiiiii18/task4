// middleware.test.js
import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

describe('Middleware', () => {
  it('should redirect unauthenticated users from /dashboard to /', () => {
    const req = {
      cookies: { get: jest.fn(() => undefined) }, // No token present
      nextUrl: { pathname: '/dashboard' },
      url: 'http://localhost:3000/dashboard',
    };

    const response = middleware(req);
    expect(response).toEqual(NextResponse.redirect(new URL('/', req.url)));
  });

  it('should allow authenticated users to access /dashboard', () => {
    const req = {
      cookies: { get: jest.fn(() => 'some-token') }, 
      nextUrl: { pathname: '/dashboard' },
      url: 'http://localhost:3000/dashboard',
    };

    const response = middleware(req);
    expect(response).toEqual(NextResponse.next());
  });
});
