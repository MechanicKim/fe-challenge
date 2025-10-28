import type { ReqParam } from './App';

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

export default async function fetchUserList(reqParam: ReqParam) {
  const response =  await fetch(getURL(reqParam));
  const result = await response.json();
  return result;
}
