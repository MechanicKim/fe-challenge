import type { IPager, Sort, User } from '../../App';
import styles from './UserCard.module.css';

interface Props {
  users: User[];
  sort?: Sort;
  pager: IPager;
  onChangeReqParam: ({ sort, pager }: { sort?: Sort; pager: IPager }) => void;
}

export default function UserCard({
  users,
  sort,
  pager,
  onChangeReqParam,
}: Props) {
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div className={[styles.card, user.status === '비활성' && styles.inactive].filter(Boolean).join(' ')}>
          <div className={styles.name}>{user.name}</div>
          <div>{user.email}</div>
          <div className={styles.joined}>{user.joined_date} 가입</div>
        </div>
      ))}
    </div>
  );
}
