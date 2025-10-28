import { useState } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import UserTable from './components/UserTable/UserTable';
import styles from './App.module.css';
import UserCard from './components/UserCard/UserCard';
import Filter from './components/Filter/Filter';
import type { IPager, ReqParam, Sort, Status } from './types';

export default function App() {
  const [reqParam, setReqParam] = useState<ReqParam>({
    name: '',
    status: 'all',
    pager: { page: 1, count: 10 },
  });
  const [total, setTotal] = useState<number>(0);
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
              pager: {
                ...prev.pager,
                page: 1,
              },
            }));
          }}
        />
        {matches && (
          <UserTable
            total={total}
            reqParam={reqParam}
            updateTotal={setTotal}
            onChangeReqParam={handleChangeReqParam}
          />
        )}
        {!matches && (
          <UserCard
            total={total}
            reqParam={reqParam}
            updateTotal={setTotal}
            onChangeReqParam={handleChangeReqParam}
          />
        )}
      </div>
    </main>
  );
}
