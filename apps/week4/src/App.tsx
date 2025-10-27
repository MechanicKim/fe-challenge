import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import UserTable from './components/UserTable/UserTable';
import styles from './App.module.css';

export interface Sort {
  field: 'id' | 'name' | 'email' | 'joined_date';
  type: 'asc' | 'desc';
}

export interface Pager {
  page: number;
  count: number;
}

interface ReqParam {
  name: string;
  sort?: Sort;
  pager: Pager;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  joined_date: string;
}

export default function App() {
  const [reqParam, setReqParam] = useState<ReqParam>({
    name: '',
    pager: { page: 1, count: 10 },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const url = 'http://localhost:3000/api/week4/users';
    let query = `page=${reqParam.pager.page}&count=${reqParam.pager.count}`;
    if (reqParam.name) {
      query += `&name=${reqParam.name}`;
    }
    if (reqParam.sort) {
      query += `&sort=${reqParam.sort.field},${reqParam.sort.type}`;
    }

    fetch(`${url}?${query}`)
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
        <UserTable
          users={users}
          total={total}
          sort={reqParam.sort}
          pager={reqParam.pager}
          onChangeReqParam={({
            sort,
            pager,
          }: {
            sort?: Sort;
            pager: Pager;
          }) => {
            setReqParam((prev) => ({
              ...prev,
              sort,
              pager,
            }));
          }}
        />
      </div>
    </main>
  );
}
