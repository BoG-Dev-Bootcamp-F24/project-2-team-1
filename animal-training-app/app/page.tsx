// app/page.tsx
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Animal Progress App",
  description: "Project 2 BoG developer bootcamp",
};

export default function Home() {
  redirect('/login');
  return null;
}
