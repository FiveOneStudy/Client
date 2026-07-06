// components/admin/StatusBadge.jsx
export default function StatusBadge({ status }) {
  const statusMap = {
    PENDING: { label: "검증 대기", className: "bg-[#FEF6EE] text-[#F7AA7A]" },
    APPROVED: { label: "승인됨", className: "bg-[#FEF6EE] text-[#F7AA7A]" },
    REJECTED: { label: "거부됨", className: "bg-[#FEF6EE] text-[#F7AA7A]" },
  };

  const { label, className } = statusMap[status] || statusMap.PENDING;

  return (
    <span className={`text-xs px-2 py-1 rounded-sm ${className}`}>
      {label}
    </span>
  );
}