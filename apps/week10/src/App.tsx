import { useState } from "react";
import styles from "./App.module.css";
import useToast from "./components/Toast/useToast";
import ToastContainer from "./components/Toast/ToastContainer";

export default function App() {
  const [toast, setToast] = useState({ message: "Test", type: "success" });
  const { toastQueue, addToast, removeToast } = useToast();

  return (
    <>
      <form className={styles.container}>
        <h2>Toast 컴포넌트 테스트</h2>
        <div className={styles.form}>
          <label htmlFor="toast-text">
            <span>문구</span>
            <input
              id="toast-text"
              type="text"
              value={toast.message}
              onChange={(e) =>
                setToast((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </label>
          <label htmlFor="toast-type">
            <span>타입</span>
            <select
              id="toast-type"
              value={toast.type}
              onChange={(e) =>
                setToast((prev) => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="success">성공</option>
              <option value="warning">경고</option>
              <option value="error">에러</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              if (toast.message) addToast(toast);
            }}
          >
            알림!
          </button>
        </div>
      </form>
      <ToastContainer
        toastQueue={toastQueue}
        removeToast={removeToast}
        duration={3000}
      />
    </>
  );
}
