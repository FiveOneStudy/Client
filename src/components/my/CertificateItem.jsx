// components/my/CertificateItem.jsx
import menuIcon from '../../assets/menu.svg';

const BADGE_COLORS = [
  'text-red-500 border-red-500',
  'text-green-500 border-green-500',
  'text-blue-500 border-blue-500',
  'text-purple-500 border-purple-500',
  'text-orange-500 border-orange-500',
];

export function CertificateItem({
  id,
  name,
  issuer,
  status,
  title,
  index,
  openMenu,
  onMenuClick,
  onDelete,
  onRejectClick,
}) {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-b relative">
      {/* 왼쪽: 자격증명 + 발급기관 */}
      <div className="flex items-center gap-4">
        <div className="text-[16px] font-semibold">{name}</div>
        <div className="text-[12px] text-gray-500">{issuer}</div>
      </div>

      {/* 오른쪽: 상태 배지 + 메뉴 */}
      <div className="flex items-center gap-3 relative">
        {status === 'APPROVED' && title && (
          <span
            className={`text-[12px] border px-2 py-0.5 rounded-[4px] ${BADGE_COLORS[index % BADGE_COLORS.length]}`}
          >
            {title}
          </span>
        )}
        {status === 'PENDING' && (
          <span className="text-[12px] border px-2 py-0.5 rounded-[4px] text-yellow-500 border-yellow-500">
            승인 대기 중
          </span>
        )}
        {status === 'REJECTED' && (
          <button
            onClick={() => onRejectClick(id)}
            className="text-[12px] border px-2 py-0.5 rounded-[4px] text-gray-400 border-gray-400 hover:bg-gray-50"
          >
            승인 거절
          </button>
        )}

        <div className="relative">
          <button onClick={onMenuClick}>
            <img src={menuIcon} alt="menu" className="w-3 h-3 object-contain" />
          </button>

          {openMenu === id && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-[8px] shadow-lg z-50 min-w-[82px]">
              <button
                onClick={() => onDelete(id)}
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