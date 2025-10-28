import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import UserTable from './components/UserTable/UserTable';
import styles from './App.module.css';
import UserCard from './components/UserCard/UserCard';
import Filter from './components/Filter/Filter';

export interface Sort {
  field: 'id' | 'name' | 'email' | 'joined_date';
  type: 'asc' | 'desc';
}

export interface IPager {
  page: number;
  count: number;
}

export type Status = 'all' | 'active' | 'inactive';

interface ReqParam {
  name: string;
  status: Status;
  sort?: Sort;
  pager: IPager;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  joined_date: string;
}

function getURL(reqParam: ReqParam) {
  const { status, pager, name, sort } = reqParam;
  const url = 'http://localhost:3000/api/week4/users';
  let query = `status=${status}&page=${pager.page}&count=${pager.count}`;
  if (name) {
    query += `&name=${name}`;
  }
  if (sort) {
    query += `&sort=${sort.field},${sort.type}`;
  }
  return `${url}?${query}`;
}

export default function App() {
  const [reqParam, setReqParam] = useState<ReqParam>({
    name: '',
    status: 'all',
    pager: { page: 1, count: 10 },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetch(getURL(reqParam))
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          console.error(result.error);
          return;
        }

        setTotal(result.total);
        setUsers(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reqParam]);

  const matches = matchMedia('screen and (min-width: 768px)').matches;

  const handleChangeReqParam = ({
    sort,
    pager,
  }: {
    sort?: Sort;
    pager: IPager;
  }) => {
    setReqParam((prev) => ({
      name: prev.name,
      status: prev.status,
      sort,
      pager,
    }));
  };

  return (
    <main>
      <div className={styles.container}>
        <SearchForm
          onChangeFormData={({ name }) => {
            setReqParam((prev) => ({
              ...prev,
              name,
            }));
          }}
        />
        <Filter
          total={total}
          status={reqParam.status}
          onChangeStatus={(nextStatus: Status) => {
            setReqParam((prev) => ({
              ...prev,
              status: nextStatus,
            }));
          }}
        />
        {matches && (
          <UserTable
            users={users}
            total={total}
            sort={reqParam.sort}
            pager={reqParam.pager}
            onChangeReqParam={handleChangeReqParam}
          />
        )}
        {!matches && (
          <UserCard
            users={users}
            sort={reqParam.sort}
            pager={reqParam.pager}
            onChangeReqParam={handleChangeReqParam}
          />
        )}
      </div>
    </main>
  );
}
