const BASE_URL = 'https://port-0-server-m1ed5avw1d3364c3.sel4.cloudtype.app';

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  console.log('login response:', data);
  return { data };
};