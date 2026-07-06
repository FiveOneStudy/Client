// components/admin/RejectReasonModal.jsx
import { useState, useEffect } from "react";

export default function RejectReasonModal({ title = "승인 거절 사유", onSubmit, onClose }) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onSubmit(reason.trim());
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl px-8 py-8 flex flex-col items-center gap-6 shadow-lg w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold font-pretendard text-center">{title}</h2>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="승인을 거절한 사유를 작성해주세요"
          rows={4}
          className="w-full h-12 border border-gray-300 rounded-lg px-4 py-3 text-sm font-pretendard text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-P400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-P400 text-white text-sm font-medium rounded-lg py-3 font-pretendard transition"
        >
          보내기
        </button>
      </div>
    </div>
  );
}