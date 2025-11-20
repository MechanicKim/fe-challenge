import { useState } from "react";

export interface ToastQueue {
  id: number;
  message: string;
  type: string;
  buttonText?: string;
  callback?: () => void;
}

export default function useToast() {
  const [toastQueue, setToastQueue] = useState<ToastQueue[]>([]);

  const removeToast = (id: number) => {
    setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: Omit<ToastQueue, "id">) => {
    setToastQueue((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          message: toast.message,
          type: toast.type,
          buttonText: toast.buttonText,
          callback: toast.callback,
        },
      ];
    });
  };

  return {
    toastQueue,
    addToast,
    removeToast,
  };
}
