import type { Dispatch, SetStateAction } from "react";
import type { Filter } from "../App";

import styles from "./ChartFilter.module.css";

interface Props {
  period: number;
  onChange: Dispatch<SetStateAction<Filter>>;
}

const periods = [
  { label: "오늘", value: 1 },
  { label: "7일", value: 7 },
  { label: "30일", value: 30 },
  { label: "전체", value: 0 },
];

export default function ChartFilter({ period, onChange }: Props) {
  return (
    <div className={styles.container}>
      {periods.map(({ label, value }) => (
        <button
          key={value}
          className={period === value ? styles.selected : ''}
          onClick={() => {
            onChange((prev) => {
              return {
                ...prev,
                period: value,
              };
            });
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
