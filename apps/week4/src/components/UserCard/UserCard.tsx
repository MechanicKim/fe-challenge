import type { IPager, ReqParam, Sort, User } from "../../types";
import styles from "./UserCard.module.css";
import useInfiniteScroll from "../../useInfiniteScroll";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import fetchUserList from "../../api";

interface Props {
  total: number;
  reqParam: ReqParam;
  updateTotal: Dispatch<SetStateAction<number>>;
  onChangeReqParam: ({ sort, pager }: { sort?: Sort; pager: IPager }) => void;
}

export default function UserCard({
  total,
  reqParam,
  updateTotal,
  onChangeReqParam,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    lockRef.current = true;
    fetchUserList(reqParam)
      .then((result) => {
        if (result.success) {
          updateTotal(result.total);
          if (reqParam.pager.page === 1) {
            if (containerRef.current) containerRef.current.scrollTo(0, 0);
            setUsers(result.data);
          } else {
            setUsers((prev) => [...prev, ...result.data]);
          }
        } else {
          console.error(result.error);
        }
        lockRef.current = false;
      })
      .catch((error) => {
        console.error(error);
        lockRef.current = false;
      });
  }, [reqParam, updateTotal]);

  const { sort, pager } = reqParam;
  const lastPage = Math.ceil(total / pager.count);
  const hasNextPage = pager.page < lastPage;
  const targetRef = useInfiniteScroll(() => {
    if (lockRef.current) return;
    onChangeReqParam({
      sort,
      pager: {
        ...pager,
        page: pager.page + 1,
      },
    });
  }, hasNextPage);

  return (
    <div ref={containerRef} className={styles.container}>
      {users.map((user) => {
        const classNames = [
          styles.card,
          user.status === "비활성" && styles.inactive,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div key={user.id} className={classNames}>
            <div className={styles.name}>{user.name}</div>
            <div>{user.email}</div>
            <div className={styles.joined}>{user.joined_date} 가입</div>
          </div>
        );
      })}
      {hasNextPage && (
        <div ref={targetRef} className={styles.observer}>
          로딩 중...
        </div>
      )}
    </div>
  );
}
