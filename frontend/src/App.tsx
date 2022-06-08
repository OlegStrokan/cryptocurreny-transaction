import React from 'react';
import { Navbar } from './components/Navbar';
import { Welcome } from './components/Welcome';
import Services from './components/Services';
import { Footer } from './components/Footer';
import { Transactions } from './components/Transactions';

export const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}


