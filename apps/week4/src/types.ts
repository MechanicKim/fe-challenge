export interface Sort {
  field: 'id' | 'name' | 'email' | 'joined_date';
  type: 'asc' | 'desc';
}

export interface IPager {
  page: number;
  count: number;
}

export type Status = 'all' | 'active' | 'inactive';

export interface ReqParam {
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
