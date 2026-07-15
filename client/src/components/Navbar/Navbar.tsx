import { CheckSquare, Plus } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onAddTask: () => void;
}

export function Navbar({ onAddTask }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container app-container">
        <div className="navbar-brand">
          <div className="logo-icon">
            <CheckSquare size={24} />
          </div>
          <h1>TaskForge</h1>
        </div>
        <div className="navbar-actions">
          <button className="btn-primary" onClick={onAddTask}>
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
