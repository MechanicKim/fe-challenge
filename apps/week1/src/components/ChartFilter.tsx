import type { Dispatch, SetStateAction } from "react";
import type { Filter } from "../App";

import styles from "./ChartFilter.module.css";
import LightModeIcon from "./LightModeIcon";
import DarkModeIcon from "./DarkModeIcon";

interface Props {
  filter: Filter;
  onChange: Dispatch<SetStateAction<Filter>>;
}

const periods = [
  { label: "오늘", value: 1 },
  { label: "7일", value: 7 },
  { label: "30일", value: 30 },
  { label: "전체", value: 0 },
];

export default function ChartFilter({ filter, onChange }: Props) {
  const { period, theme } = filter;

  return (
    <div className={styles.container}>
      {periods.map(({ label, value }) => (
        <button
          key={value}
          className={period === value ? styles.selected : styles.common}
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
      <button
        className={`${styles.toggle} ${theme === "light" ? styles.common : styles.dark}`}
        onClick={() => {
          onChange((prev) => {
            return {
              ...prev,
              theme: prev.theme === "light" ? "dark" : "light",
            };
          });
        }}
      >
        {theme === "light" ? (
          <LightModeIcon width={16} height={16} />
        ) : (
          <DarkModeIcon width={16} height={16} fill="#EEEEEE" />
        )}
      </button>
    </div>
  );
}
