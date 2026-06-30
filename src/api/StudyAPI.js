  const BASE_URL = 'https://port-0-server-m1ed5avw1d3364c3.sel4.cloudtype.app';
  const getToken = () => localStorage.getItem('accessToken');
  

  const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  });

  const BASE = `${BASE_URL}/study`;

  export const fetchStudyList = async () => {
    const res = await fetch(`${BASE}`, {
      method: 'GET',
      headers: headers(),
      
    });
    if (!res.ok) {                                                                  
      console.error('fetchStudyList failed:', res.status);
      return { study: [], allStudy: [] };
    } 
    return res.json();
  };

  export const joinStudy = async (studyName) => {
    const res = await fetch(`${BASE}/in`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ studyName }),
    });
    return res.json();
  };

  export const requestStudy = async (studyName) => {
    const res = await fetch(`${BASE}/request`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ studyName }),
    });
    return res.json();
  };
  export const leaveStudy = async (studyName) => {
    const res = await fetch(`${BASE}/out`, {
      method: 'DELETE',
      headers: headers(),
      body: JSON.stringify({ studyName }),
    });
    return res.json();
  };

  // 진척도 조회
  export const fetchProgress = async (studyName) => {
    const res = await fetch(`${BASE}/progress`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ studyName }),
    });
    if (!res.ok) {
      console.error('fetchProgress failed:', res.status);
      return null;
    }
    return res.json();
  };

  // 미션 완료 체크
  export const completeProgress = async (studyName, subject) => {
    const res = await fetch(`${BASE}/progress/complete`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ studyName, subject }),
    });
    if (!res.ok) {
      console.error('completeProgress failed:', res.status);
      return null;
    }
    return res.json();
  };

  // 미션 검색
  export const searchProgress = async (studyName, search) => {
    const res = await fetch(`${BASE}/progress/search`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ studyName, search }),
    });
    if (!res.ok) {
      console.error('searchProgress failed:', res.status);
      return null;
    }
    return res.json();
  };

  // tip 목록 조회
export const fetchTips = async (studyName) => {
  const res = await fetch(`${BASE}/tip`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ studyName }),
  });
  if (!res.ok) {
    console.error('fetchTips failed:', res.status);
    return null;
  }
  return res.json();
};

// tip 내용 조회
export const fetchTipDetail = async (studyId) => {
  const res = await fetch(`${BASE}/tip/read`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ studyId }),
  });
  if (!res.ok) {
    console.error('fetchTipDetail failed:', res.status);
    return null;
  }
  return res.json();
};

// tip 작성
export const insertTip = async (studyName, title, content, url) => {
  const res = await fetch(`${BASE}/tip/insert`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ studyName, title, content, url }),
  });
  if (!res.ok) {
    console.error('insertTip failed:', res.status);
    return null;
  }
  return res.json();
};

// tip 삭제
export const deleteTip = async (studyId) => {
  const res = await fetch(`${BASE}/tip/delete`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ studyId }),
  });
  if (!res.ok) {
    console.error('deleteTip failed:', res.status);
    return null;
  }
  return res.json();
};



