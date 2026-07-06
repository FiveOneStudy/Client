// components/admin/ApprovalTable.jsx
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

export default function ApprovalTable({
  title,
  columns,
  data,
  page,
  totalPages,
  onPageChange,
  onApprove,
  onReject,
  rejectLabel = "거절",
}) {
  return (
    <div className="w-[1200px] mx-auto outline outline-1 outline-P500 rounded-lg p-4">
      <div className="text-lg font-semibold mb-3">{title}</div>

      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="bg-P300 text-black border-b">
            {columns.map((col) => (
              <th key={col.key} className="text-center font-semibold py-3 px-4">
                {col.label}
              </th>
            ))}
            <th className="text-center font-semibold py-3 px-4 w-32">관리</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) =>
            row ? (
              <tr key={row.id} className="border-b border-G200 h-14">
                {columns.map((col) => (
                  <td key={col.key} className="text-center py-3 px-4 truncate">
                    {col.key === "status" ? (
                      <StatusBadge status={row.status} />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                <td className="py-3 px-4 w-32">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onApprove(row)}
                      className="bg-P400 text-white text-xs px-4 py-1.5 rounded-md whitespace-nowrap"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => onReject(row)}
                      className="border border-P300 text-P400 text-xs px-4 py-1.5 rounded-md whitespace-nowrap"
                    >
                      {rejectLabel}
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={`empty-${idx}`} className="border-b border-G200 h-14">
                <td colSpan={columns.length + 1}></td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </div>
  );
}