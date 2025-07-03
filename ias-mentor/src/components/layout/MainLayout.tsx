import type React from 'react';
//import Header from './Header';
//import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
  
      <main className="flex-grow">
        {children}
      </main>
  
    </div>
  );
};

export default MainLayout;
