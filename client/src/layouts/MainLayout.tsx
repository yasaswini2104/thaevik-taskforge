import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import './MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
  onAddTask: () => void;
}

export function MainLayout({ children, onAddTask }: MainLayoutProps) {
  return (
    <div className="layout-wrapper">
      <Navbar onAddTask={onAddTask} />
      <main className="main-content app-container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
