import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { IPager, ReqParam, Sort, User } from '../../types';
import Pager from './Pager';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import styles from './UserTable.module.css';
import fetchUserList from '../../api';

interface Props {
  total: number;
  reqParam: ReqParam;
  updateTotal: Dispatch<SetStateAction<number>>;
  onChangeReqParam: ({ sort, pager }: { sort?: Sort; pager: IPager }) => void;
}

export default function UserTable({
  total,
  reqParam,
  updateTotal,
  onChangeReqParam,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUserList(reqParam)
      .then((result) => {
        if (result.success) {
          updateTotal(result.total);
          setUsers(result.data);
        } else {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reqParam, updateTotal]);

  const { sort, pager } = reqParam;

  const handleChangeSortParam = (nextSort?: Sort) => {
    if (nextSort) {
      onChangeReqParam({
        sort: nextSort,
        pager: {
          ...pager,
          page: 1,
        },
      });
    } else {
      onChangeReqParam({
        pager: {
          ...pager,
          page: 1,
        },
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
