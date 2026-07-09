import { useState } from 'react';
import { CertificateItem } from './CertificateItem';
import { PopUp } from '../PopUp'; // 실제 PopUp 경로에 맞게 수정해주세요
import { fetchRejectReason } from '../../api/admin'; // 실제 api 파일 경로에 맞게 수정해주세요

export function CertificateList({
  certifications,
  openMenu,
  onMenuClick,
  onDelete,
}) {
  const [rejectReason, setRejectReason] = useState(null);

  const handleRejectClick = async (id) => {
    try {
      const res = await fetchRejectReason(id);
      if (res.success) {
        setRejectReason(res.data.reason || '거절 사유가 등록되지 않았습니다.');
      } else {
        setRejectReason(res.error?.message || '거절 사유를 불러오지 못했습니다.');
      }
    } catch (err) {
      console.error('거절 사유 조회 실패:', err);
      setRejectReason('거절 사유를 불러오지 못했습니다.');
    }
  };

  return (
    <div className="w-[68%] flex flex-col overflow-auto">
      <div className="flex justify-center items-center px-2 py-2 border-b sticky top-0 bg-white">
        <div className="text-[16px] font-semibold">MY CERTIFICATE</div>
      </div>

      <div className="flex flex-col">
        {certifications.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-400 text-sm">
            등록된 자격증이 없습니다.
          </div>
        ) : (
          certifications.map((cert, index) => (
            <CertificateItem
              key={cert.id}
              {...cert}
              index={index}
              openMenu={openMenu}
              onMenuClick={() => onMenuClick(cert.id)}
              onDelete={onDelete}
              onRejectClick={handleRejectClick}
            />
          ))
        )}
      </div>

      {rejectReason && (
        <PopUp message={rejectReason} onClose={() => setRejectReason(null)} />
      )}
    </div>
  );
}