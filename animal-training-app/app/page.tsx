// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login');
  return null; // This won't render since we’re redirecting
}
