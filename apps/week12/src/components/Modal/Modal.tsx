import { useCallback, useContext, useEffect } from "react";
import styles from "./Modal.module.css";
import useFocusTrap from "./useFocusTrap";
import ModalContext from "./ModalContext";
import useClickOutside from "../../hooks/useClickOutside";

export default function Modal() {
  const { modalQueue, removeModal } = useContext(ModalContext);
  const { containerRef } = useFocusTrap();
  useClickOutside({
    ref: containerRef,
    callback: () => {
      removeModal(modal.id);
    },
  });

  const modal = modalQueue[modalQueue.length - 1];

  const onClickClose = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener(
        "animationend",
        () => removeModal(modal.id),
        {
          once: true,
        }
      );
      containerRef.current.classList.add(styles.close);
    }
  }, [containerRef, removeModal, modal]);

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

  if (!modal) return null;

  return (
    <div
      ref={containerRef}
      key={modal.id}
      className={styles.body}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h1>{modal.title}</h1>
      <p>{modal.desc}</p>
      <div>
        <button onClick={onClickClose}>닫기</button>
        {modal.onConfirm && <button onClick={modal.onConfirm}>확인</button>}
      </div>
    </div>
  );
}
