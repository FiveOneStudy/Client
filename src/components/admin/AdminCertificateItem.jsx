// components/admin/AdminCertificateItem.jsx
import { useState } from 'react';
import { BASE_URL, getToken } from '../../api/index';
import RejectReasonModal from './RejectReasonModal';
import { PopUp } from '../PopUp'; // 기존 PopUp 컴포넌트 경로에 맞게 수정

export default function AdminCertificateItem({ id, name, issuer, onProcessed }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // 승인 처리
  const handleApprove = async () => {
    try {
      const res = await fetch(`${BASE_URL}/certifications/${id}/approve`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setPopupMessage('승인 처리가 완료되었습니다.');
        onProcessed?.(id);
      } else {
        setPopupMessage(data.error?.message || '승인 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('승인 처리 에러:', err);
      setPopupMessage('서버 오류가 발생했습니다.');
    }
  };

  // 거절 사유 제출 -> API 호출
  const handleRejectSubmit = async (reason) => {
    try {
      const res = await fetch(`${BASE_URL}/certifications/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();

      if (data.success) {
        setPopupMessage('승인 거절 처리가 완료되었습니다.');
        onProcessed?.(id);
      } else {
        setPopupMessage(data.error?.message || '거절 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('거절 처리 에러:', err);
      setPopupMessage('서버 오류가 발생했습니다.');
    } finally {
      setShowRejectModal(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <div className="flex items-center gap-4">
        <div className="text-[16px] font-semibold">{name}</div>
        <div className="text-[12px] text-gray-500">{issuer}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleApprove}
          className="text-[13px] px-3 py-1 rounded-md border border-green-500 text-green-500 hover:bg-green-50"
        >
          승인
        </button>
        <button
          onClick={() => setShowRejectModal(true)}
          className="text-[13px] px-3 py-1 rounded-md border border-red-500 text-red-500 hover:bg-red-50"
        >
          거절
        </button>
      </div>

      {showRejectModal && (
        <RejectReasonModal
          onSubmit={handleRejectSubmit}
          onClose={() => setShowRejectModal(false)}
        />
      )}

      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}