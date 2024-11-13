import React from 'react';
import AnimalsDashboard from './components/AnimalsDashboard';
import Animal from './components/Animal';
import User from './components/User';
import UsersDashboard from './components/UsersDashboard';


export default function Home() {
  return (
    <main>
      <UsersDashboard/>
    </main>
  );
}
