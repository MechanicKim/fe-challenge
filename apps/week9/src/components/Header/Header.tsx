import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export default function Header({ isModalOpen, setIsModalOpen }: Props) {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className="App-header">
        <h1>9주차 챌린지: 다기능 모달</h1>
        <a href="#main-content" className="skip-link">
          콘텐츠로 이동
        </a>
        <button onClick={openModal} className="open-modal-button">
          모달 열기
        </button>
      </header>
      {isModalOpen &&
        createPortal(
          <Modal title="안녕하세요." desc="반갑습니다." onClose={closeModal} />,
          document.body
        )}
    </>
  );
}
