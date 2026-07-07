// pages/admin/Admin.jsx
import { useState, useEffect } from "react";
import { usePagination } from "../../hooks/usePagination";
import ApprovalTable from "../../components/admin/ApprovalTable";
import RejectReasonModal from "../../components/admin/RejectReasonModal";
import { PopUp } from "../../components/PopUp";
import {
  fetchPendingCerts,
  fetchPendingPosts,
  fetchPendingComments,
  approveCert,
  rejectCert,
  approvePost,
  rejectPost,
  approveComment,
  rejectComment,
} from "../../api/admin";

const certColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "자격증명" },
  { key: "issuer", label: "발급기관" },
  { key: "acquiredDate", label: "취득일" },
  { key: "status", label: "상태" },
];

const postColumns = [
  { key: "id", label: "ID" },
  { key: "title", label: "제목" },
  { key: "content", label: "내용" },
  { key: "status", label: "상태" },
];

const commentColumns = [
  { key: "id", label: "ID" },
  { key: "content", label: "내용" },
  { key: "status", label: "상태" },
];

export default function AdminApprovalPage() {
  const [certList, setCertList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null); // { row, type, setList, label }

  const certPagination = usePagination(certList, 3);
  const postPagination = usePagination(postList, 3);
  const commentPagination = usePagination(commentList, 3);

  // 최초 진입 시 목록 조회
  useEffect(() => {
    fetchPendingCerts()
      .then((res) => setCertList(res.data.data))
      .catch(() => setPopupMessage("자격증 목록을 불러오지 못했습니다."));

    fetchPendingPosts()
      .then((res) => setPostList(res.data.data))
      .catch(() => setPopupMessage("게시글 목록을 불러오지 못했습니다."));

    fetchPendingComments()
      .then((res) => setCommentList(res.data.data))
      .catch(() => setPopupMessage("댓글 목록을 불러오지 못했습니다."));
  }, []);

  const handleApprove = (type, setList) => async (row) => {
    if (!window.confirm("승인하시겠습니까?")) return;
    try {
      if (type === "cert") await approveCert(row.id);
      if (type === "post") await approvePost(row.id);
      if (type === "comment") await approveComment(row.id);

      setList((prev) => prev.filter((item) => item.id !== row.id));
      setPopupMessage("승인되었습니다.");
    } catch (err) {
      setPopupMessage(err.message || "승인 처리 중 오류가 발생했습니다.");
    }
  };

  // 거절/삭제 버튼 클릭 시 확인창 대신 사유 입력 모달을 연다
  const handleRejectClick =
    (type, setList, label = "거절") =>
    (row) => {
      setRejectTarget({ row, type, setList, label });
    };

  const handleRejectSubmit = async (reason) => {
    const { row, type, setList, label } = rejectTarget;
    try {
      if (type === "cert") await rejectCert(row.id, reason);
      if (type === "post") await rejectPost(row.id, reason);
      if (type === "comment") await rejectComment(row.id, reason);

      setList((prev) => prev.filter((item) => item.id !== row.id));
      setRejectTarget(null);
      setPopupMessage(`${label}되었습니다.`);
    } catch (err) {
      setRejectTarget(null);
      setPopupMessage(err.message || `${label} 처리 중 오류가 발생했습니다.`);
    }
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
          onApprove={handleApprove("cert", setCertList)}
          onReject={handleRejectClick("cert", setCertList)}
          rowsPerPage={3}
        />
        <ApprovalTable
          title="게시글 승인 대기"
          columns={postColumns}
          data={postPagination.pagedData}
          page={postPagination.page}
          totalPages={postPagination.totalPages}
          onPageChange={postPagination.setPage}
          onApprove={handleApprove("post", setPostList)}
          onReject={handleRejectClick("post", setPostList, "삭제")}
          rejectLabel="삭제"
          getDetailPath={(row) => `/community/post/${row.id}`}
          rowsPerPage={3}
        />
        <ApprovalTable
          title="댓글 승인 대기"
          columns={commentColumns}
          data={commentPagination.pagedData}
          page={commentPagination.page}
          totalPages={commentPagination.totalPages}
          onPageChange={commentPagination.setPage}
          onApprove={handleApprove("comment", setCommentList)}
          onReject={handleRejectClick("comment", setCommentList, "삭제")}
          rejectLabel="삭제"
          getDetailPath={(row) =>
            `/community/post/${row.postId}#comment-${row.id}`
          }
          rowsPerPage={3}
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
