// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the login page as the default page
  redirect('/login');
  return null; // This won't render since we’re redirecting
}
