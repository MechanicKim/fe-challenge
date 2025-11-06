import type { Status } from "../../types";
import styles from "./Filter.module.css";

interface Props {
  total: number;
  status: Status;
  onChangeStatus: (nextStatus: Status) => void;
}

const statusList: { name: string; value: Status }[] = [
  { name: "전체", value: "all" },
  { name: "활성", value: "active" },
  { name: "비활성", value: "inactive" },
];

export default function Filter({ total, status, onChangeStatus }: Props) {
  return (
    <div className={styles.container}>
      <div>총 {total}개의 결과가 있습니다.</div>
      <div>
        {statusList.map(({ name, value }) => (
          <button
            key={value}
            className={value === status ? styles.selected : styles.common}
            type="button"
            onClick={() => onChangeStatus(value)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
