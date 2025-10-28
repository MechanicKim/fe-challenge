import type { IPager } from '../../types';
import styles from './UserTable.module.css';

interface Props {
  total: number;
  pager: IPager;
  onChangePagerParam: (nextPager: IPager) => void;
}

export default function Pager({ total, pager, onChangePagerParam }: Props) {
  const totalPage = Math.ceil(total / pager.count);
  const pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    pageList.push(page);
  }

  return (
    <div className={styles.pager}>
      {pageList.map((page) => {
        if (page === pager.page) {
          return (
            <a key={page} className={styles.selected}>
              {page}
            </a>
          );
        }

        return (
          <a
            key={page}
            onClick={() => {
              onChangePagerParam({
                ...pager,
                page,
              });
            }}
          >
            {page}
          </a>
        );
      })}
    </div>
  );
}
