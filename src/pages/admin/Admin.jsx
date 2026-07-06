// pages/admin/Admin.jsx
import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import ApprovalTable from "../../components/admin/ApprovalTable";

const certColumns = [
  { key: "id", label: "ID" },
  { key: "certName", label: "자격증명" },
  { key: "issuer", label: "발급기관" },
  { key: "acquiredDate", label: "취득일" },
  { key: "status", label: "상태" },
  { key: "submittedAt", label: "신청일" },
];

// 임시 목업 데이터 (나중에 API 연동 시 이 부분만 교체)
const mockCertList = [
  { id: 1, certName: "SQLD", issuer: "한국산업인력공단", acquiredDate: "2026.03.25", status: "PENDING", submittedAt: "2026.07.06" },
  { id: 2, certName: "SQLD", issuer: "한국산업인력공단", acquiredDate: "2026.03.25", status: "PENDING", submittedAt: "2026.07.06" },
  { id: 3, certName: "SQLD", issuer: "한국산업인력공단", acquiredDate: "2026.03.25", status: "PENDING", submittedAt: "2026.07.06" },
  { id: 4, certName: "컴활 2급", issuer: "대한상공회의소", acquiredDate: "2026.04.10", status: "PENDING", submittedAt: "2026.07.05" },
];

export default function AdminApprovalPage() {
  const [certList, setCertList] = useState(mockCertList);

  const { page, setPage, totalPages, pagedData } = usePagination(certList, 3);

  const handleApprove = (row) => {
    if (!window.confirm("승인하시겠습니까?")) return;
    setCertList((prev) => prev.filter((item) => item.id !== row.id));
  };

  const handleReject = (row) => {
    if (!window.confirm("거절하시겠습니까?")) return;
    setCertList((prev) => prev.filter((item) => item.id !== row.id));
  };

  return (
    <div className="min-h-screen mt-16 flex flex-col items-center pt-16 px-6 gap-16">
      <h1 className="font-semibold text-3 xl top-12 left-28 absolute">관리자 승인 대기</h1> 
      <ApprovalTable
        title="자격증 검증 대기"
        columns={certColumns}
        data={pagedData}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalTable
        title="게시글 승인 대기"
        columns={certColumns}
        data={pagedData}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalTable
        title="댓글 승인 대기"
        columns={certColumns}
        data={pagedData}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <div></div>
    </div>
    
  );
}