import type { ToastQueue } from "./useToast";
import styles from "./Toast.module.css";
import Toast from "./Toast";

interface ToastContainerProps {
  toastQueue: ToastQueue[];
  removeToast: (id: number) => void;
  duration: number;
}

export default function ToastContainer({
  toastQueue,
  removeToast,
  duration,
}: ToastContainerProps) {
  return (
    <div className={styles.toastContainer}>
      {toastQueue.map(({ id, message, type }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
          duration={duration}
          close={removeToast}
        />
      ))}
    </div>
  );
}
