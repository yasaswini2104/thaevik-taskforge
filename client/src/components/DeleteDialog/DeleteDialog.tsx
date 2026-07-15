import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import './DeleteDialog.css';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({ isOpen, onClose, onConfirm }: DeleteDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-dialog" onClick={e => e.stopPropagation()}>
        <div className="dialog-icon">
          <AlertTriangle size={24} className="danger-icon" />
        </div>
        <div className="dialog-body">
          <h3>Delete Task</h3>
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-danger" onClick={() => {
            onConfirm();
            onClose();
          }}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
