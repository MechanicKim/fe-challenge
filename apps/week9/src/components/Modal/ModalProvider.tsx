import { type ReactNode } from "react";
import ModalContext from "./ModalContext";
import useModal from "./useModal";
import Modal from "./Modal";

interface ModalProviderProps {
  children: ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const { modalQueue, addModal, removeModal } = useModal();

  return (
    <ModalContext value={{ modalQueue, addModal, removeModal }}>
      {children}
      <Modal />
    </ModalContext>
  );
}
