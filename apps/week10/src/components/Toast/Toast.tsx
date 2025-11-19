import { useCallback, useEffect, useRef } from "react";
import Close from "./Close";
import styles from "./Toast.module.css";
import SuccessIcon from "./SuccessIcon";
import WarningIcon from "./WarningIcon";
import ErrorIcon from "./ErrorIcon";

export interface ToastProps {
  id: number;
  message: string;
  type: string;
  duration: number;
  close: (id: number) => void;
}

export default function Toast({
  id,
  message,
  type,
  duration,
  close,
}: ToastProps) {
  const fromRef = useRef<number>(Date.now());
  const timeRef = useRef<number>(duration);
  const timerRef = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function clearTimeout() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  const closeToast = useCallback(() => {
    if (ref.current) {
      clearTimeout();
      ref.current.classList.add(styles.fadeOut);
      ref.current.addEventListener(
        "animationend",
        () => {
          close(id);
        },
        { once: true }
      );
    }
  }, [id, close]);

  useEffect(() => {
    timerRef.current = setTimeout(() => closeToast(), timeRef.current);
  }, [closeToast]);

  const backgroundColor = {
    success: "#43A047",
    warning: "#FBBC05",
    error: "#EF5350",
  }[type];

  return (
    <div
      ref={ref}
      className={styles.toast}
      style={{ backgroundColor }}
      onMouseEnter={() => {
        timeRef.current = duration - (Date.now() - fromRef.current);
        clearTimeout();
      }}
      onMouseLeave={() => {
        fromRef.current = Date.now();
        timerRef.current = setTimeout(() => closeToast(), timeRef.current);
      }}
    >
      {type === "success" && <SuccessIcon />}
      {type === "warning" && <WarningIcon />}
      {type === "error" && <ErrorIcon />}
      <span>{message}</span>
      <Close onClick={() => closeToast()} />
    </div>
  );
}
