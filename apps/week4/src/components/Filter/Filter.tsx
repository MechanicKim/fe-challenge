import type { Status } from '../../types';
import styles from './Filter.module.css';

interface Props {
  total: number;
  status: Status;
  onChangeStatus: (nextStatus: Status) => void;
}

const statusList: { name: string, value: Status }[] = [
  { name: '전체', value: 'all' },
  { name: '활성', value: 'active' },
  { name: '비활성', value: 'inactive' },
];

export default function Filter({ total, status, onChangeStatus }: Props) {
  const handleChangeStatus = (nextStatus: Status) => {
    onChangeStatus(nextStatus);
  };

  return (
    <div className={styles.container}>
      <div>총 {total}개의 결과가 있습니다.</div>
      <div>
        {statusList.map(({ name, value }) => {
          if (value === status) {
            return (
              <button
                key={value}
                className={styles.selected}
                type="button"
                onClick={() => handleChangeStatus(value)}
              >
                {name}
              </button>
            );
          }
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleChangeStatus(value)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
