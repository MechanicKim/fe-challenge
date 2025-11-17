import { useState } from "react";

interface Modal {
  id?: number;
  title: string;
  desc: string;
  onClose?: () => void;
  onConfirm?: () => void;
}

export default function useModal() {
  const [modals, setModals] = useState<Modal[]>([]);

  function closeModal(id: number) {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }

  return {
    modals,
    openModal: (modal: Modal) => {
      const id = Date.now();
      setModals((prev) => [
        ...prev,
        {
          id,
          ...modal,
          onClose: () => {
            closeModal(id);
            if (modal.onClose) modal.onClose();
          },
        },
      ]);
    },
  };
}
