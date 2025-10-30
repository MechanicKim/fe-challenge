import type { Dispatch, SetStateAction } from 'react';
import type { Filter } from '../App';

import styles from './ChartFilter.module.css';

interface Props {
  onChange: Dispatch<SetStateAction<Filter>>;
}

export default function ChartFilter({ onChange }: Props) {
  return (
    <div className={styles.container}>
      <select
        onChange={(e) => {
          onChange((prev) => {
            return {
              ...prev,
              period: +e.target.value,
            };
          });
        }}
      >
        <option value={1}>오늘</option>
        <option value={7}>7일</option>
        <option value={30}>30일</option>
        <option value={0}>전체</option>
      </select>
    </div>
  );
}
