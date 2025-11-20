import type { ToastQueue } from "./useToast";
import styles from "./Toast.module.css";
import Toast from "./Toast";

interface ToastContainerProps {
  toastQueue: ToastQueue[];
  removeToast: (id: number) => void;
  duration: number;
  pos?: "leftBottom" | "leftTop" | "rightBottom" | "rightTop";
}

export default function ToastContainer({
  toastQueue,
  removeToast,
  duration,
  pos = "leftBottom",
}: ToastContainerProps) {
  const posStyle = {
    leftBottom: { left: "16px", bottom: "16px" },
    leftTop: { left: "16px", top: "16px" },
    rightBottom: { right: "16px", bottom: "16px" },
    rightTop: { right: "16px", top: "16px" },
  }[pos];

  return (
    <div className={styles.toastContainer} style={posStyle}>
      {toastQueue.map(({ id, message, type, buttonText, callback }) => (
        <Toast
          key={id}
          id={id}
          message={message}
          type={type}
          duration={duration}
          close={removeToast}
          buttonText={buttonText}
          callback={callback}
        />
      ))}
    </div>
  );
}
