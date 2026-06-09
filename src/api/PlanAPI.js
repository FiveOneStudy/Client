
const BASE_URL = 'https://port-0-server-m1ed5avw1d3364c3.sel4.cloudtype.app';
const getToken = () => localStorage.getItem('accessToken');

const headers = () => ({
   'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
}); 

const BASE = `${BASE_URL}/plan`;

// ──────────────────────────────────────────
// 날짜에 따른 전체 데이터 조회 (POST /)
// ──────────────────────────────────────────
export const fetchPlanByDate = async (date) => {
  const res = await fetch(`${BASE}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ date }),
  });
  return res.json();
};

// ──────────────────────────────────────────
// 캘린더 일정 CRUD
// ──────────────────────────────────────────
export const insertMonth = async (date, content) => {
  const res = await fetch(`${BASE}/month/insert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ date, content }),
  });
  return res.json();
};

export const updateMonth = async (date, oldContent, newContent) => {
  const res = await fetch(`${BASE}/month/update`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ date, oldContent, newContent }),
  });
  return res.json();
};

export const deleteMonth = async (date, content) => {
  const res = await fetch(`${BASE}/month/delete`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ date, content }),
  });
  return res.json();
};

// ──────────────────────────────────────────
// 체크리스트 CRUD
// ──────────────────────────────────────────
export const insertCheck = async (date, content) => {
  const res = await fetch(`${BASE}/check/insert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ date, content }),
  });
  return res.json();
};

export const modifyCheck = async (date, oldContent, newContent) => {
  const res = await fetch(`${BASE}/check/modify`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify({ date, oldContent, newContent }),
  });
  return res.json();
};

export const completeCheck = async (date, content) => {
  const res = await fetch(`${BASE}/check/complete`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({ date, content }),
  });
  return res.json();
};

export const deleteCheck = async (date, content) => {
  const res = await fetch(`${BASE}/check/delete`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ date, content }),
  });
  return res.json();
};