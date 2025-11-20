import { type ReactNode } from "react";
import ToastContext from "./ToastContext";
import useToast from "./useToast";
import ToastContainer from "./ToastContainer";

interface ToastProviderProps {
  duration: number;
  children: ReactNode;
}

export default function ToastProvider({ duration, children }: ToastProviderProps) {
  const { toastQueue, addToast, removeToast } = useToast();

  return (
    <ToastContext value={{ toastQueue, addToast, removeToast }}>
      {children}
      <ToastContainer duration={duration} />
    </ToastContext>
  );
}
