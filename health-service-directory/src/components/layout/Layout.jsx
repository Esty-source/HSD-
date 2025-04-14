import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full max-w-none">
      <Header />
      <main className="flex-grow w-full max-w-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
