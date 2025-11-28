import { useContext } from "react";
import ModalContext from "../Modal/ModalContext";

export default function Header() {
  const { addModal } = useContext(ModalContext);

  const onClickOpenModal = () => {
    addModal({
      title: "첫 번째 모달",
      desc: "반갑습니다.",
      onConfirm: () => {
        addModal({
          title: "두 번째 모달",
          desc: "반갑습니다.",
        });
      },
    });
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
    </>
  );
}
