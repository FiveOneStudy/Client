export const BASE_URL = 'https://port-0-server-m1ed5avw1d3364c3.sel4.cloudtype.app';

const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTc4MDkwOTUxNSwiZW1haWwiOiJzMjQwMjZAZ3NtLmhzLmtyIn0.ebZAKNSt31mTffoZ_MxyLPXa0JAmYEZmoBXcIh5NWL6BHHio4GV2ZmtSd54fIbhFjU4XNKm2PJhU6VVLAEZXPQ';

export const getToken = () => localStorage.getItem('accessToken'); // 'token' → 'accessToken'