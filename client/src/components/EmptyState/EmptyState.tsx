import { LayoutList } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  onAddTask: () => void;
}

export function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <LayoutList size={48} strokeWidth={1.5} />
      </div>
      <h3 className="empty-state-title">No tasks available</h3>
      <p className="empty-state-description">
        Get started by creating your first task to keep track of your work.
      </p>
      <button className="btn-primary" onClick={onAddTask}>
        Create your first task
      </button>
    </div>
  );
}
