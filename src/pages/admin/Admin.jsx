// pages/admin/Admin.jsx
import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import ApprovalTable from "../../components/admin/ApprovalTable";
import RejectReasonModal from "../../components/admin/RejectReasonModal";
import { PopUp } from "../../components/PopUp";

const certColumns = [
  { key: "id", label: "ID" },
  { key: "certName", label: "자격증명" },
  { key: "issuer", label: "발급기관" },
  { key: "acquiredDate", label: "취득일" },
  { key: "status", label: "상태" },
  { key: "submittedAt", label: "신청일" },
];

const postColumns = [
  { key: "id", label: "ID" },
  { key: "title", label: "제목" },
  { key: "content", label: "내용" },
  { key: "status", label: "상태" },
  { key: "submittedAt", label: "작성일" },
];

const commentColumns = [
  { key: "id", label: "ID" },
  { key: "title", label: "게시글 제목" },
  { key: "content", label: "내용" },
  { key: "status", label: "상태" },
  { key: "submittedAt", label: "작성일" },
];

// 임시 목업 데이터 (나중에 API 연동 시 이 부분만 교체)
const mockCertList = [
  {
    id: 1,
    certName: "SQLD",
    issuer: "한국산업인력공단",
    acquiredDate: "2026.03.25",
    status: "PENDING",
    submittedAt: "2026.07.06",
  },
  {
    id: 2,
    certName: "SQLD",
    issuer: "한국산업인력공단",
    acquiredDate: "2026.03.25",
    status: "PENDING",
    submittedAt: "2026.07.06",
  },
  {
    id: 3,
    certName: "SQLD",
    issuer: "한국산업인력공단",
    acquiredDate: "2026.03.25",
    status: "PENDING",
    submittedAt: "2026.07.06",
  },
  {
    id: 4,
    certName: "컴활 2급",
    issuer: "대한상공회의소",
    acquiredDate: "2026.04.10",
    status: "PENDING",
    submittedAt: "2026.07.05",
  },
];

const mockPostList = [
  {
    id: 1,
    title: "SQLD 합격 후기",
    content: "3개월 준비해서 한번에 합격했습니다.",
    status: "PENDING",
    submittedAt: "2026.07.06",
  },
  {
    id: 2,
    title: "한능검 공부 꿀팁",
    content: "시대별 흐름을 표로 정리하면 훨씬 쉬워요.",
    status: "PENDING",
    submittedAt: "2026.07.05",
  },
];

const mockCommentList = [
  {
    id: 1,
    title: "SQLD 합격 후기",
    content: "저도 이렇게 준비했어요!",
    status: "PENDING",
    submittedAt: "2026.07.06",
  },
  {
    id: 2,
    title: "한능검 공부 꿀팁",
    content: "정보 감사합니다.",
    status: "PENDING",
    submittedAt: "2026.07.05",
  },
];

export default function AdminApprovalPage() {
  const [certList, setCertList] = useState(mockCertList);
  const [postList, setPostList] = useState(mockPostList);
  const [commentList, setCommentList] = useState(mockCommentList);
  const [popupMessage, setPopupMessage] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null); // { row, setList, label }

  const certPagination = usePagination(certList, 3);
  const postPagination = usePagination(postList, 3);
  const commentPagination = usePagination(commentList, 3);

  const handleApprove = (setList) => (row) => {
    if (!window.confirm("승인하시겠습니까?")) return;
    // 승인은 자리만 비움 (위치 유지)
    setList((prev) =>
      prev.map((item) => (item && item.id === row.id ? null : item)),
    );
    setPopupMessage("승인되었습니다.");
  };

  // 거절/삭제 버튼 클릭 시 확인창 대신 사유 입력 모달을 연다
  const handleRejectClick =
    (setList, label = "거절") =>
    (row) => {
      setRejectTarget({ row, setList, label });
    };

  const handleRejectSubmit = (reason) => {
    const { row, setList, label } = rejectTarget;
    console.log(`${label} 사유:`, reason);
    // 거절은 완전히 제거 (아래 항목이 위로 당겨짐)
    setList((prev) => prev.filter((item) => item && item.id !== row.id));
    setRejectTarget(null);
    setPopupMessage(`${label}되었습니다.`);
  };

  return (
    <>
      <div className="font-semibold text-3xl mt-11 ml-28">관리자 승인 대기</div>
      <div className="min-h-screen flex flex-col items-center pt-16 px-6 gap-16">
        <ApprovalTable
          title="자격증 검증 대기"
          columns={certColumns}
          data={certPagination.pagedData}
          page={certPagination.page}
          totalPages={certPagination.totalPages}
          onPageChange={certPagination.setPage}
          onApprove={handleApprove(setCertList)}
          onReject={handleRejectClick(setCertList)}
        />
        <ApprovalTable
          title="게시글 승인 대기"
          columns={postColumns}
          data={postPagination.pagedData}
          page={postPagination.page}
          totalPages={postPagination.totalPages}
          onPageChange={postPagination.setPage}
          onApprove={handleApprove(setPostList)}
          onReject={handleRejectClick(setPostList, "삭제")}
          rejectLabel="삭제"
        />
        <ApprovalTable
          title="댓글 승인 대기"
          columns={commentColumns}
          data={commentPagination.pagedData}
          page={commentPagination.page}
          totalPages={commentPagination.totalPages}
          onPageChange={commentPagination.setPage}
          onApprove={handleApprove(setCommentList)}
          onReject={handleRejectClick(setCommentList, "삭제")}
          rejectLabel="삭제"
        />
        <div></div>
      </div>

      {rejectTarget && (
        <RejectReasonModal
          title={rejectTarget.label === "삭제" ? "삭제 사유" : "승인 거절 사유"}
          onSubmit={handleRejectSubmit}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {popupMessage && (
        <PopUp message={popupMessage} onClose={() => setPopupMessage(null)} />
      )}
    </>
  );
}
