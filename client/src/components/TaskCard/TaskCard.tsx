import { Edit2, Trash2, Clock, CheckCircle2, CircleDashed, Calendar } from 'lucide-react';
import type { Task } from '../../types/task';
import { TaskStatus } from '../../types/task';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(task.createdAt));

  const StatusIcon = {
    [TaskStatus.PENDING]: CircleDashed,
    [TaskStatus.IN_PROGRESS]: Clock,
    [TaskStatus.COMPLETED]: CheckCircle2,
  }[task.status];

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button 
            className="icon-btn" 
            onClick={() => onEdit(task)}
            title="Edit Task"
            aria-label="Edit Task"
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="icon-btn icon-btn-danger" 
            onClick={() => onDelete(task)}
            title="Delete Task"
            aria-label="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-card-footer">
        <div className={`status-badge status-${task.status.toLowerCase().replace('_', '-')}`}>
          <StatusIcon size={14} />
          <span>{task.status.replace('_', ' ')}</span>
        </div>
        <div className="task-date">
          <Calendar size={12} className="date-icon" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
