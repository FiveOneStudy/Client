import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import searchIcon from '../assets/search.svg';
import logo from '../assets/logo.svg';
import { fetchTips } from '../api/StudyAPI';

const BASE_URL = 'https://port-0-server-m1ed5avw1d3364c3.sel4.cloudtype.app';
const getToken = () => localStorage.getItem('accessToken');
const RECENT_KEY = 'recentSearches';

const getRecentSearches = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) ?? [];
  } catch {
    return [];
  }
};

const addRecentSearch = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return;
  const prev = getRecentSearches().filter((v) => v !== trimmed);
  const next = [trimmed, ...prev].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
};

const removeRecentSearch = (value) => {
  const next = getRecentSearches().filter((v) => v !== value);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
};

const NAV_LINKS = [
  { to: '/main', label: 'MAIN' },
  { to: '/study', label: 'STUDY' },
  { to: '/plan', label: 'PLAN' },
  { to: '/community', label: 'COMMUNITY' },
  { to: '/my', label: 'MY' },
];

const linkStyle = ({ isActive }) =>
  isActive
    ? 'text-[#F5AFAF] bg-white rounded-[12px] px-5 py-3'
    : 'text-white px-5 py-3';

export function Nav() {
  return (
    <nav className="w-full h-[70px] bg-P400 border-b border-[#B88383] flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1360px] flex items-center justify-between px-6">

        <div className="flex items-center gap-16">
          <Link to="/main">
            <img src={logo} alt="logo" className="h-[50px]" />
          </Link>
          <SearchBar />
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-10 font-semibold">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={linkStyle}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('스터디');
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [joinedStudies, setJoinedStudies] = useState(new Set());
  const [studyTips, setStudyTips] = useState({});
  const [tipsLoading, setTipsLoading] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setStudyTips({});
      setShowDropdown(false);
      return;
    }
    const timer = setTimeout(() => {
      const select = activeTab === '스터디' ? 'study' : 'community';
      fetchSearch(query, select);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, activeTab]);

  useEffect(() => {
    if (!results?.study?.length) return;
    results.study.forEach((studyName) => {
      if (studyTips[studyName] !== undefined) return;
      loadStudyTips(studyName);
    });
  }, [results?.study]);

  const loadStudyTips = async (studyName) => {
    setTipsLoading(prev => ({ ...prev, [studyName]: true }));
    try {
      const data = await fetchTips(studyName);
      setStudyTips(prev => ({
        ...prev,
        [studyName]: data?.tips ?? [],
      }));
    } catch {
      setStudyTips(prev => ({ ...prev, [studyName]: [] }));
    } finally {
      setTipsLoading(prev => ({ ...prev, [studyName]: false }));
    }
  };

  const fetchSearch = async (value, select) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/main/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ search: value, select }),
      });
      const data = await res.json();
      setResults(data);
      setRecentSearches(addRecentSearch(value) ?? getRecentSearches());
    } catch (err) {
      console.error('검색 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(null);
      setStudyTips({});
      setShowDropdown(true);
      setRecentSearches(getRecentSearches());
      return;
    }
    setShowDropdown(true);
  };

  const handleFocus = () => {
    if (!query.trim()) {
      setRecentSearches(getRecentSearches());
    }
    setShowDropdown(true);
  };

  const handleRecentClick = (value) => {
    setQuery(value);
    setShowDropdown(true);
  };

  const handleRemoveRecent = (value, e) => {
    e.stopPropagation();
    setRecentSearches(removeRecentSearch(value));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleJoin = (studyName, e) => {
    e.stopPropagation();
    setJoinedStudies(prev => new Set([...prev, studyName]));
    setShowDropdown(false);
    navigate(`/mystudy/${studyName}`);
  };

  return (
    <div className="relative w-[440px] shrink-0" ref={wrapperRef}>
      <div className="w-full h-11 bg-white rounded-full flex items-center px-5 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={handleFocus}
          placeholder="검색어를 입력하세요"
          className="flex-1 outline-none text-base bg-transparent"
        />
        <button onClick={() => handleSearch(query)}>
          <img src={searchIcon} alt="search" className="ml-2 w-6 h-6" />
        </button>
      </div>

      {showDropdown && !query.trim() && (
        <div className="absolute top-[52px] left-0 w-full bg-white rounded-[16px] shadow-xl border border-[#F0E0E0] z-50 overflow-hidden px-5 py-4">
          <div className="text-[13px] text-[#999] mb-3">최근 검색어</div>
          {recentSearches.length > 0 ? (
            <div className="flex flex-col gap-3">
              {recentSearches.map((value) => (
                <div
                  key={value}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleRecentClick(value)}
                >
                  <span className="text-[14px] font-medium text-[#222]">{value}</span>
                  <button
                    onClick={(e) => handleRemoveRecent(value, e)}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-[#ddd] text-white text-[11px]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-2 text-center text-[13px] text-[#999]">최근 검색어 내역이 없습니다.</div>
          )}
        </div>
      )}

      {showDropdown && query.trim() && (
        <div className="absolute top-[52px] left-0 w-full bg-white rounded-[16px] shadow-xl border border-[#F0E0E0] z-50 overflow-hidden">
          <div className="flex border-b border-[#F0E0E0]">
            {['스터디', '커뮤니티'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-2 text-[14px] font-semibold transition-all
                  ${activeTab === tab
                    ? 'text-[#F5AFAF] border-b-2 border-[#F5AFAF]'
                    : 'text-[#999]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-6 text-center text-[13px] text-[#999]">검색 중...</div>
          ) : (
            <div className="px-4 py-3 flex flex-col gap-4 max-h-[480px] overflow-y-auto">

              {activeTab === '스터디' && results?.study?.length > 0 && (
                <div className="flex flex-col gap-3">
                  {results.study.map((studyName) => {
                    const isJoined = joinedStudies.has(studyName);
                    const tips = studyTips[studyName] ?? [];
                    const isLoadingTips = tipsLoading[studyName];
                    return (
                      <div key={studyName} className="flex flex-col gap-3">
                        <div
                          className="flex flex-col items-center gap-2 px-4 py-3 w-fit rounded-[20px] border border-[#F0E0E0] shadow-[0_2px_2px_0_rgba(0,0,0,0.25)] cursor-pointer hover:bg-[#FFF5F5] transition-all"
                          onClick={(e) => !isJoined && handleJoin(studyName, e)}
                        >
                          <span className="text-[14px] font-bold whitespace-nowrap">{studyName}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); !isJoined && handleJoin(studyName, e); }}
                            className={`text-[11px] px-3 py-1 rounded-full text-white shrink-0 whitespace-nowrap transition-all
                              ${isJoined
                                ? 'bg-[#ccc] cursor-default'
                                : 'bg-[#F5AFAF] hover:bg-[#e89898]'}`}
                            disabled={isJoined}
                          >
                            {isJoined ? '입장완료' : '입장하기'}
                          </button>
                        </div>

                        {isLoadingTips ? (
                          <div className="text-[12px] text-[#ccc] px-1">TIP 불러오는 중...</div>
                        ) : tips.length > 0 && (
                          <div className="flex flex-col gap-1">
                            <div className="text-[12px] text-[#F5AFAF] font-semibold px-1 mb-1">
                              합격자 후기 &amp; TIP
                            </div>
                            {tips.map(([tipId, title], i) => (
                              <div
                                key={i}
                                className="flex items-center gap-2 px-1 py-1 rounded-[8px] hover:bg-[#FFF5F5] cursor-pointer"
                                onClick={() => { setShowDropdown(false); navigate(`/mystudy/${studyName}`); }}
                              >
                                <img src={searchIcon} alt="" className="w-4 h-4 opacity-40" />
                                <span className="text-[13px] text-[#444]">{title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === '커뮤니티' && results?.post?.length > 0 && (
                <div className="flex flex-col gap-1">
                  {results.post.map(([postId, viewCount, title]) => (
                    <div
                      key={postId}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-[10px] hover:bg-[#FFF5F5] cursor-pointer transition-all"
                      onClick={() => { setShowDropdown(false); navigate(`/community/post/${postId}`); }}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={searchIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
                        <span className="text-[13px] text-[#444] truncate">{title}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[12px] text-[#F5AFAF] shrink-0">
                        <span>👁</span>{viewCount}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === '스터디' && results && !results.study?.length && (
                <div className="py-4 text-center text-[13px] text-[#999]">검색 결과가 없습니다.</div>
              )}
              {activeTab === '커뮤니티' && results && !results.post?.length && (
                <div className="py-4 text-center text-[13px] text-[#999]">검색 결과가 없습니다.</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}