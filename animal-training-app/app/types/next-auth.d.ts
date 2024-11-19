// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add the `id` field
      email: string;
      isAdmin: boolean;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}
