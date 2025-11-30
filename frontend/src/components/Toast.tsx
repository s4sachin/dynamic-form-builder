import React from 'react';
import toast, { Toaster as HotToaster } from 'react-hot-toast';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

/**
 * Toast wrapper component using react-hot-toast
 */
export const Toaster: React.FC = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#000',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          padding: '12px 16px',
          fontSize: '14px',
        },
      }}
    />
  );
};

/**
 * Toast utility functions
 */
export const showToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <div
        className={`flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 text-green-900 transform transition-all ${
          t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
        <button onClick={() => toast.dismiss(t.id)}>
          <X className="w-4 h-4" />
        </button>
      </div>
    ));
  },

  error: (message: string) => {
    toast.custom((t) => (
      <div
        className={`flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 text-red-900 transform transition-all ${
          t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
        <button onClick={() => toast.dismiss(t.id)}>
          <X className="w-4 h-4" />
        </button>
      </div>
    ));
  },

  info: (message: string) => {
    toast.custom((t) => (
      <div
        className={`flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 transform transition-all ${
          t.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <Info className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1">{message}</p>
        <button onClick={() => toast.dismiss(t.id)}>
          <X className="w-4 h-4" />
        </button>
      </div>
    ));
  },
};
