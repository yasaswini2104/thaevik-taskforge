import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="toast-container">
      <div className="toast animate-slide-up">
        <CheckCircle2 size={18} className="toast-icon" />
        <span className="toast-message">{message}</span>
        <button onClick={onClose} className="toast-close" aria-label="Close notification">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
