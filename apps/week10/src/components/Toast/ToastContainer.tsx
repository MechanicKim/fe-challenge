import type { ToastQueue } from "./useToast";
import styles from "./Toast.module.css";
import Toast from "./Toast";

interface ToastContainerProps {
  toastQueue: ToastQueue[];
  removeToast: (id: number) => void;
}

export default function ToastContainer({
  toastQueue,
  removeToast,
}: ToastContainerProps) {
  return (
    <div className={styles.toastContainer}>
      {toastQueue.map(({ id, text, type }) => (
        <Toast key={id} id={id} text={text} type={type} close={removeToast} />
      ))}
    </div>
  );
}
