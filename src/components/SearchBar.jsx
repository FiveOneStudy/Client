import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search.png';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState('study');

  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    if (!value.trim()) return;

    setQuery(value);
    setSearched(true);
    setShowDropdown(true);
    setActiveTab('study');

    if (!recent.includes(value)) {
      setRecent([value, ...recent]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(query);
  };

  const removeItem = (item) => {
    setRecent(recent.filter((r) => r !== item));
  };

  const handleRecentClick = (item) => {
    handleSearch(item);
  };

  return (
    <div className="relative w-[440px]" ref={ref}>
      {/* 검색창 */}
      <div className="w-full h-11 bg-white rounded-full flex items-center px-5 border">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearched(false);
          }}
          onFocus={() => {
            setShowDropdown(true);
            setSearched(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="flex-1 outline-none"
        />

        <button onClick={() => handleSearch(query)}>
          <img src={searchIcon} alt="search" className="w-6 h-6" />
        </button>
      </div>

      {/* 드롭다운 */}
      {showDropdown && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-md border px-4 py-3 z-50">

          {!searched ? (
            <>
              <div className="text-sm text-gray-400 mb-2">최근 검색어</div>

              {recent.length === 0 ? (
                <div className="text-sm text-gray-400 py-4 text-center">
                  최근 검색어 내역이 없습니다.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {recent.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span
                        onClick={() => handleRecentClick(item)}
                        className="cursor-pointer hover:underline"
                      >
                        {item}
                      </span>
                      <button onClick={() => removeItem(item)}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* 🔥 탭 (전체 영역 + 3:7 비율) */}
              <div className="flex w-full text-sm mb-3 border-b">
                <span
                  onClick={() => setActiveTab('study')}
                  className={`flex justify-center w-[30%] pb-2 cursor-pointer ${
                    activeTab === 'study'
                      ? 'text-[#F5AFAF] border-b-2 border-[#F5AFAF]'
                      : 'text-gray-400'
                  }`}
                >
                  스터디
                </span>

                <span
                  onClick={() => setActiveTab('community')}
                  className={`flex justify-center w-[70%] pb-2 cursor-pointer ${
                    activeTab === 'community'
                      ? 'text-[#F5AFAF] border-b-2 border-[#F5AFAF]'
                      : 'text-gray-400'
                  }`}
                >
                  커뮤니티
                </span>
              </div>

              {/* 🔥 스터디 (건드리지 않음) */}
              {activeTab === 'study' && (
                <>
                  <div className="border rounded-xl p-4 mb-4 shadow-sm">
                    <div className="font-semibold mb-2">
                      {query}능력
                    </div>
                    <button
                      onClick={() => navigate('/study')}
                      className="bg-[#F5AFAF] text-white text-sm px-3 py-1 rounded"
                    >
                      입장하기
                    </button>
                  </div>

                  <div className="text-xs text-[#F5AFAF] mb-2">
                    합격자 후기 & TIP
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 cursor-pointer hover:underline">
                      <img src={searchIcon} className="w-4 h-4" />
                      {query} 1급 합격 후기
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:underline">
                      <img src={searchIcon} className="w-4 h-4" />
                      {query} 일주일 독학 공부법
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:underline">
                      <img src={searchIcon} className="w-4 h-4" />
                      {query} 2급 후기
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:underline">
                      <img src={searchIcon} className="w-4 h-4" />
                      {query} 단기간 합격 방법
                    </div>
                  </div>
                </>
              )}

              {/* 🔥 커뮤니티 */}
              {activeTab === 'community' && (
                <div className="flex flex-col gap-3 text-sm">
                  {[
                    `${query}능력 1급 공부법`,
                    `${query} 일주일 독학`,
                    `${query} 2급 공부법`,
                    `${query} 나도 어려워`
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center cursor-pointer hover:underline"
                    >
                      <div className="flex items-center gap-2">
                        <img src={searchIcon} className="w-4 h-4" />
                        {item}
                      </div>
                      <span className="text-gray-400 text-xs">
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}