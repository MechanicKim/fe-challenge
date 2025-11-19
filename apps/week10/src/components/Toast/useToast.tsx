import { useState } from "react";

export interface ToastQueue {
  id: number;
  text: string;
  type: string;
}

export default function useToast() {
  const [toastQueue, setToastQueue] = useState<ToastQueue[]>([]);

  const removeToast = (id: number) => {
    setToastQueue((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (toast: { text: string; type: string }) => {
    setToastQueue((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          text: toast.text,
          type: toast.type,
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
