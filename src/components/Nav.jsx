import { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';



import logo from '../assets/logo.png';
import bellIcon from '../assets/bell.png';
import SearchBar from '../components/SearchBar';
import searchIcon from '../assets/search.svg';
import logo from '../assets/logo.svg';
import searchIcon from '../assets/search.svg';
import bellIcon from '../assets/bell.svg';

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
  const [showAlarm, setShowAlarm] = useState(false);
  const alarmRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (alarmRef.current && !alarmRef.current.contains(e.target)) {
        setShowAlarm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full h-[70px] bg-[#F5AFAF] border-b border-[#B88383] flex justify-center sticky top-0 z-50">
      <div className="w-full max-w-[1360px] flex items-center justify-between px-6">

        {/* 왼쪽 */}
        <div className="flex items-center gap-16">
          <Link to="/main">
            <img src={logo} alt="logo" className="h-[50px]" />
          </Link>
        </div>

        {/* 오른쪽 */}
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

          {/* 알림 */}
          <div className="relative" ref={alarmRef}>
            <button onClick={() => setShowAlarm(!showAlarm)}>
              <img src={bellIcon} alt="bell" className="w-6 h-6" />
            </button>

            {showAlarm && (
              <div className="absolute right-0 mt-4 w-[420px] bg-white rounded-xl shadow-xl border">
                <div className="px-4 py-3 border-b font-bold text-sm">
                  알림
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="w-[440px] h-11 bg-white rounded-full flex items-center px-5 shadow-sm shrink-0">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="flex-1 outline-none text-base bg-transparent"
      />
      <button onClick={() => console.log(query + ' 검색')}>
        <img src={searchIcon} alt="search" className="ml-2 w-6 h-6 " />
      </button>
    </div>
  );
}