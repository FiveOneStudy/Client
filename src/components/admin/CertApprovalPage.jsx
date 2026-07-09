// pages/admin/CertApprovalPage.jsx
import { useState, useEffect } from 'react';
import ApprovalTable from '../../components/admin/ApprovalTable';
import RejectReasonModal from '../../components/admin/RejectReasonModal';
import { PopUp } from '../../components/PopUp';
import { fetchPendingCerts, approveCert, rejectCert } from '../../api/admin';

const ROWS_PER_PAGE = 3;

const columns = [
  { key: 'name', label: '자격증명' },
  { key: 'issuer', label: '발급기관' },
  { key: 'userName', label: '신청자' },
  { key: 'pdf', label: '증빙파일' },
  { key: 'status', label: '상태' },
];

export default function CertApprovalPage() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      setLoading(true);
      const res = await fetchPendingCerts();
      if (res.data.success) {
        setCerts(res.data.data);
      }
    } catch (err) {
      console.error('자격증 목록 조회 실패:', err);
      setPopupMessage('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (row) => {
    try {
      const res = await approveCert(row.id);
      if (res.data.success) {
        setPopupMessage('승인 처리가 완료되었습니다.');
        setCerts((prev) => prev.filter((c) => c.id !== row.id));
      } else {
        setPopupMessage(res.data.error?.message || '승인 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('승인 처리 에러:', err);
      setPopupMessage('서버 오류가 발생했습니다.');
    }
  };

  const handleRejectClick = (row) => {
    setRejectTarget(row);
  };

  const handleRejectSubmit = async (reason) => {
    if (!rejectTarget) return;
    try {
      const res = await rejectCert(rejectTarget.id, reason);
      if (res.data.success) {
        setPopupMessage('승인 거절 처리가 완료되었습니다.');
        setCerts((prev) => prev.filter((c) => c.id !== rejectTarget.id));
      } else {
        setPopupMessage(res.data.error?.message || '거절 처리에 실패했습니다.');
      }
    } catch (err) {
      console.error('거절 처리 에러:', err);
      setPopupMessage('서버 오류가 발생했습니다.');
    } finally {
      setRejectTarget(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(certs.length / ROWS_PER_PAGE));
  const pagedData = certs.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE,
  );

  if (loading) {
    return <div className="py-10 text-center text-gray-400 text-sm">불러오는 중...</div>;
  }

  return (
    <div className="py-10">
      <ApprovalTable
        title="자격증 승인 관리"
        columns={columns}
        data={pagedData}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onApprove={handleApprove}
        onReject={handleRejectClick}
        rejectLabel="거절"
        rowsPerPage={ROWS_PER_PAGE}
      />

      {rejectTarget && (
        <RejectReasonModal
          onSubmit={handleRejectSubmit}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
    </div>
  );
}