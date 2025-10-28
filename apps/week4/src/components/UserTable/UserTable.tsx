import type { IPager, Sort, User } from '../../App';
import Pager from './Pager';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './UserTable.module.css';

interface Props {
  users: User[];
  total: number;
  sort?: Sort;
  pager: IPager;
  onChangeReqParam: ({ sort, pager }: { sort?: Sort; pager: IPager }) => void;
}

export default function UserTable({
  users,
  total,
  sort,
  pager,
  onChangeReqParam,
}: Props) {
  const handleChangeSortParam = (nextSort?: Sort) => {
    if (nextSort) {
      onChangeReqParam({
        sort: nextSort,
        pager,
      });
    } else {
      onChangeReqParam({
        pager,
      });
    }
  };

  const handleChangePagerParam = (nextPager: IPager) => {
    onChangeReqParam({
      sort,
      pager: nextPager,
    });
  };

  return (
    <div className={styles.container}>
      {users.length > 0 && (
        <table className={styles.table}>
          <TableHeader sort={sort} onChangeSortParam={handleChangeSortParam} />
          <TableBody users={users} />
        </table>
      )}
      <Pager
        total={total}
        pager={pager}
        onChangePagerParam={handleChangePagerParam}
      />
    </div>
  );
}
