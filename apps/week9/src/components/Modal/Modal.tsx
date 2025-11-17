import { useCallback, useEffect } from "react";
import styles from "./Modal.module.css";
import useFocusTrap from "./useFocusTrap";

interface Props {
  title: string;
  desc: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function Modal({ title, desc, onClose, onConfirm }: Props) {
  const { containerRef } = useFocusTrap();

  const onClickClose = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener(
        "animationend",
        () => onClose && onClose(),
        {
          once: true,
        }
      );
      containerRef.current.classList.add(styles.close);
    }
  }, [containerRef, onClose]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClickClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClickClose]);

  return (
    <div
      ref={containerRef}
      className={styles.backdrop}
      tabIndex={-1}
      onClick={onClickClose}
    >
      <div
        className={styles.body}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>{title}</h1>
        <p>{desc}</p>
        <div>
          <button onClick={onClickClose}>닫기</button>
          {onConfirm && <button onClick={onConfirm}>확인</button>}
        </div>
      </div>
    </div>
  );
}
