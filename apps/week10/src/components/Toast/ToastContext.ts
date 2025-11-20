import { createContext } from 'react';
import type { ToastQueue } from './useToast';

interface ToastContextProps {
  toastQueue: ToastQueue[];
  addToast: (toast: Omit<ToastQueue, "id">) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toastQueue: [],
  addToast: (toast: Omit<ToastQueue, "id">) => { console.log(toast); },
  removeToast: (id: number) => { console.log(id); },
});

export default ToastContext;
