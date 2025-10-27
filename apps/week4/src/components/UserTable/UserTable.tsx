import { Pager, Sort, User } from '../../App';
import styles from './UserTable.module.css';

interface Props {
  users: User[];
  total: number;
  sort?: Sort;
  pager: Pager;
  onChangeReqParam: ({ sort, pager }: { sort?: Sort; pager: Pager }) => void;
}

export default function UserTable({
  users,
  total,
  sort,
  pager,
  onChangeReqParam,
}: Props) {
  const totalPage = Math.ceil(total / pager.count);
  const pageList = [];
  for (let page = 1; page <= totalPage; page++) {
    pageList.push(page);
  }

  function onChangeSort(field: Sort['field']) {
    if (!sort || field !== sort.field) {
      onChangeReqParam({
        sort: {
          field,
          type: 'asc',
        },
        pager,
      });
    } else {
      onChangeReqParam({
        sort: {
          field,
          type: sort.type === 'asc' ? 'desc' : 'asc',
        },
        pager,
      });
    }
  }

  function getSortedIcon(field: string) {
    return !!sort && sort.field === field && (sort.type === 'asc' ? '▲' : '▼');
  }

  return (
    <div className={styles.container}>
      <div className={styles.total}>총 {total}개의 결과가 있습니다.</div>
      {users.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => onChangeSort('id')}>
                번호
                {getSortedIcon('id')}
              </th>
              <th onClick={() => onChangeSort('name')}>
                이름
                {getSortedIcon('name')}
              </th>
              <th onClick={() => onChangeSort('email')}>
                메일
                {getSortedIcon('email')}
              </th>
              <th onClick={() => onChangeSort('joined_date')}>
                가입일
                {getSortedIcon('joined_date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const statusClass =
                user.status === '활성' ? 'active' : 'inactive';
              return (
                <tr key={user.id} className={styles[statusClass]}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.joined_date.substring(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className={styles.pager}>
        {pageList.map((page) => {
          if (page === pager.page) {
            return <a key={page} className={styles.selected}>{page}</a>;
          }

          return (
            <a
              key={page}
              onClick={() => {
                onChangeReqParam({
                  sort,
                  pager: {
                    ...pager,
                    page,
                  },
                });
              }}
            >
              {page}
            </a>
          );
        })}
      </div>
    </div>
  );
}
