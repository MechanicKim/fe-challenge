import { useContext } from "react";
import ModalContext from "../Modal/ModalContext";

export default function Header() {
  const { addModal } = useContext(ModalContext);

  const onClickOpenModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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
    <header className="App-header">
      <h1>12주차 챌린지: 클릭 아웃사이드(Click Outside) 훅</h1>
      <button onClick={onClickOpenModal} className="open-modal-button">
        모달 열기
      </button>
    </header>
  );
}
