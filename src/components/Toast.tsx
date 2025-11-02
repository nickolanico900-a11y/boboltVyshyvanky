import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3`}>
      {type === 'success' ? (
        <Check className="w-5 h-5" />
      ) : (
        <X className="w-5 h-5" />
      )}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;