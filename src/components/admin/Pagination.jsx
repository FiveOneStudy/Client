// components/admin/Pagination.jsx
export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-3">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="disabled:opacity-30"
      >
        {"<"}
      </button>
      <span className="text-gray-600">{page}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="disabled:opacity-30"
      >
        {">"}
      </button>
    </div>
  );
}