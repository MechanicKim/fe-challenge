import type { Sort } from '../../types';

interface Props {
  sort?: Sort;
  onChangeSortParam: (nextSort?: Sort) => void;
}

export default function TableHeader({ sort, onChangeSortParam }: Props) {
  function onChangeSort(field: Sort['field']) {
    if (!sort || field !== sort.field) {
      onChangeSortParam({
        field,
        type: 'asc',
      });
      return;
    }

    if (sort.type === 'asc') {
      onChangeSortParam({
        field,
        type: 'desc',
      });
    }

    if (sort.type === 'desc') {
      onChangeSortParam();
    }
  }

  function getSortedIcon(field: string) {
    return !!sort && sort.field === field && (sort.type === 'asc' ? '▲' : '▼');
  }

  return (
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
  );
}
