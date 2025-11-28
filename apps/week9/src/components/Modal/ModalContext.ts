import { createContext } from "react";
import type { Modal } from "./useModal";

interface ModalContextProps {
  modalQueue: Modal[];
  addModal: (modal: Omit<Modal, "id">) => void;
  removeModal: (id: number) => void;
}

const ModalContext = createContext<ModalContextProps>({
  modalQueue: [],
  addModal: (toast: Omit<Modal, "id">) => {
    console.log(toast);
  },
  removeModal: (id: number) => {
    console.log(id);
  },
});

export default ModalContext;
