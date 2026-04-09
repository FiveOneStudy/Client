import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import bellIcon from '../assets/bell.png';

const NAV_LINKS = [
  { to: '/main', label: 'MAIN' },
  { to: '/study', label: 'STUDY' },
  { to: '/plan', label: 'PLAN' },
  { to: '/community', label: 'COMMUNITY' },
  { to: '/my', label: 'MY' },
];

const linkStyle = ({ isActive }) =>
  isActive
    ? 'text-[#F5AFAF] bg-white rounded-[12px] px-5 py-3 transition duration-200'
    : 'text-white px-5 py-3 transition duration-200';

const handleBell = () => console.log('알림 클릭');

export function Nav() {
  return (
    <nav className="w-full h-[70px] bg-[#F5AFAF] border-b border-[#B88383] flex justify-center sticky top-0 z-50 overflow-hidden">
      <div className="w-full max-w-[1360px] flex items-center justify-between px-6 text-base font-semibold">
        {/* 왼쪽: 로고 + 검색창 */}
        <div className="flex items-center gap-16 mr-12 shrink-0">
          <Link to="/main">
            <img
              src={logo}
              alt="logo"
              className="h-[50px] object-contain shrink-0"
            />
          </Link>
          <SearchBar />
        </div>

        {/* 오른쪽: 메뉴 + 알림 */}
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} className={linkStyle}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={handleBell}
            className="hover:opacity-80 transition shrink-0 ml-4"
          >
            <img src={bellIcon} alt="bell" className="w-6 h-6 object-contain" />
          </button>
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
