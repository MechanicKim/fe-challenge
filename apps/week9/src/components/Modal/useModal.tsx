import { useState } from "react";

interface Modal {
  id: number;
  title: string;
  desc: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function useModal() {
  const [modalQueue, setModalQueue] = useState<Modal[]>([]);

  const removeModal = (id: number) => {
    setModalQueue((prev) => prev.filter((modal) => modal.id !== id));
  };

  const addModal = (modal: Omit<Modal, "id">) => {
    const id = Date.now();
    setModalQueue((prev) => [
      ...prev,
      {
        id,
        title: modal.title,
        desc: modal.desc,
        onClose: () => {
          if (modal.onClose) modal.onClose();
          removeModal(id);
        },
        onConfirm: modal.onConfirm,
      },
    ]);
  };

  return {
    modalQueue,
    addModal,
    removeModal,
  };
}
