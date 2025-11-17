import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

interface Modal {
  title: string;
  desc: string;
  onClose: () => void;
  onConfirm?: () => void;
}

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function Header({ setIsModalOpen }: Props) {
  const { modals, openModal } = useModal();
  const modal = modals[modals.length - 1];

  const onClickOpenModal = () => {
    openModal({
      title: "첫 번째 모달",
      desc: "반갑습니다.",
      onClose: () => {
        setIsModalOpen(false);
      },
      onConfirm: () => {
        openModal({
          title: "두 번째 모달",
          desc: "반갑습니다.",
        });
      },
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="App-header">
        <h1>9주차 챌린지: 다기능 모달</h1>
        <a href="#main-content" className="skip-link">
          콘텐츠로 이동
        </a>
        <button onClick={onClickOpenModal} className="open-modal-button">
          모달 열기
        </button>
      </header>
      {modal &&
        createPortal(
          <Modal
            key={modal.id}
            title={modal.title}
            desc={modal.desc}
            onClose={modal.onClose}
            onConfirm={modal.onConfirm}
          />,
          document.body
        )}
    </>
  );
}
