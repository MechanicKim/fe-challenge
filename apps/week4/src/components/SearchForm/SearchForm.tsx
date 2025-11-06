import { useState } from "react";
import { useRef } from "react";
import styles from "./SearchForm.module.css";

interface Props {
  onChangeFormData: (formData: { name: string }) => void;
}

export default function SearchForm({ onChangeFormData }: Props) {
  const [name, setName] = useState("");
  const timerRef = useRef<number | null>(null);

  return (
    <div className={styles.form}>
      <input
        type="text"
        name="search-keyword"
        placeholder="이름으로 검색"
        value={name}
        onChange={(e) => {
          setName(e.target.value);

          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          timerRef.current = window.setTimeout(() => {
            onChangeFormData({
              name: e.target.value,
            });
          }, 500);
        }}
      />
    </div>
  );
}
