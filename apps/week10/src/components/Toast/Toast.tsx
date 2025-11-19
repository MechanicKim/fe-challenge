import { useEffect, useRef } from "react";
import Close from "./Close";
import styles from "./Toast.module.css";

export interface ToastProps {
  id: number;
  text: string;
  type: string;
  close: (id: number) => void;
}

export default function Toast({ id, text, type, close }: ToastProps) {
  const ref = useRef<number | null>(null);

  useEffect(() => {
    ref.current = setTimeout(() => {
      close(id);
    }, 3000);
  }, [id, close]);

  const backgroundColor = {
    success: "#43A047",
    error: "#EF5350",
  }[type];

  return (
    <div className={styles.toast} style={{ backgroundColor }}>
      <span>{text}</span>
      <Close
        onClick={() => {
          if (ref.current) {
            clearTimeout(ref.current);
            ref.current = null;
          }
          close(id);
        }}
      />
    </div>
  );
}
