import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="App" id="main-content" aria-hidden={isModalOpen}>
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <section className="content">
          <h2>페이지 콘텐츠</h2>
          <p>
            스크롤을 만들어 내기 위한 더미 콘텐츠입니다. 모달이 열렸을 때 이
            페이지의 스크롤이 막히는지 확인해보세요.
          </p>
          <div className="form-group">
            <label htmlFor="name-input">이름: </label>
            <input
              id="name-input"
              type="text"
              placeholder="이름을 입력하세요"
            />
            <button type="submit">제출</button>
          </div>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas
              ligula massa, varius a, semper congue, euismod non, mi. Proin
              porta tellus eget mauris.
            </p>
          ))}
          <a href="#">페이지 상단으로 이동</a>
        </section>
      </main>
    </>
  );
}
