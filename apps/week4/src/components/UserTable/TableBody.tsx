import type { User } from '../../types';
import styles from './UserTable.module.css';

interface Props {
  users: User[];
}

export default function TableBody({ users }: Props) {
  return (
    <tbody>
      {users.map((user) => {
        const statusClass = user.status === '활성' ? 'active' : styles.inactive;
        return (
          <tr key={user.id} className={statusClass}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.joined_date.substring(2)}</td>
          </tr>
        );
      })}
    </tbody>
  );
}
