import { useState } from 'react';
import profileIcone from '../assets/profile.svg';
import mailIcone from '../assets/mail.svg';
import menuIcon from '../assets/menu.svg';

const CERTIFICATES = [
  {
    id: 1,
    name: '컴퓨터활용능력 1급',
    number: '0000-000000',
    badge: '컴활 1급 마스터',
    color: 'text-red-500 border-red-500',
  },
  {
    id: 2,
    name: '한국사능력검정시험 1급',
    number: '0000-000000',
    badge: '한능검 1급 마스터',
    color: 'text-green-500 border-green-500',
  },
  {
    id: 3,
    name: 'SQLD',
    number: '0000-000000',
    badge: 'SQLD 마스터',
    color: 'text-blue-500 border-blue-500',
  },
];

function CertificateItem({
  id,
  name,
  number,
  badge,
  color,
  openMenu,
  onMenuClick,
}) {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b relative">
      {/* 왼쪽: 이름 + 번호 */}
      <div className="flex items-center gap-4">
        <div className="text-[16px] font-semibold">{name}</div>
        <div className="text-[12px] text-gray-500">자격증 번호 : {number}</div>
      </div>

      {/* 오른쪽: 배지 + 메뉴 */}
      <div className="flex items-center gap-3 relative">
        <span
          className={`text-[12px] border px-2 py-0.5 rounded-[4px] ${color}`}
        >
          {badge}
        </span>

        <div className="relative">
          <button onClick={onMenuClick}>
            <img src={menuIcon} alt="menu" className="w-3 h-3 object-contain" />
          </button>

          {openMenu === id && (
            <div className="absolute top-0 left-full ml-1 bg-white border border-gray-200 rounded-[8px] shadow-lg z-50 min-w-[82px]">
              <button
                onClick={() => console.log(`${id} 삭제`)}
                className="w-full text-center px-4 py-2 text-[14px] text-gray-500 hover:bg-gray-100 rounded-[8px]"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function My() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuClick = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#FFEEEE] flex items-center justify-center overflow-hidden">
      <div className="flex flex-col w-[900px] h-[440px] bg-white rounded-[20px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
        {/* MY PAGE 헤더 */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div className="text-[26px] font-bold">MY PAGE</div>
          <button className="border-2 border-gray-400 px-2 py-0.5 rounded-[10px] text-[16px]">
            + 추가
          </button>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-1">
          {/* 왼쪽 프로필 */}
          <div className="w-[32%] border-r flex flex-col items-center justify-center bg-[#F8F8F8] rounded-bl-[20px]">
            <img
              src={profileIcone}
              alt="profile"
              className="h-[156px] object-contain"
            />
            <div className="mt-3 text-[26px] font-semibold">이름</div>
            <div className="mt-3XGztX  mb-8 px-5 py-1 bg-gray-200 rounded-[4px] flex items-center gap-2">
              <img
                src={mailIcone}
                alt="mail"
                className="w-5 h-5 object-contain"
              />
              <span>OOOOO@gmail.com</span>
            </div>
          </div>

          {/* 오른쪽 자격증 목록 */}
          <div className="w-[68%] flex flex-col">
            <div className="flex justify-center items-center px-2 py-2 border-b">
              <div className="text-[16px] font-semibold">MY CERTIFICATE</div>
            </div>

            <div className="flex flex-col">
              {CERTIFICATES.map((cert) => (
                <CertificateItem
                  key={cert.id}
                  {...cert}
                  openMenu={openMenu}
                  onMenuClick={() => handleMenuClick(cert.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
