export default function CheckItem({ text, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-2 cursor-pointer"
    >
      {/* 체크박스 */}
      <div className="w-4 h-4 border rounded-sm flex items-center justify-center bg-[#FCF8F8] border-pink-200">
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 text-[#F5AFAF]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 4L9 19L2 12" />
          </svg>
        )}
      </div>

      {/* 텍스트 */}
      <span
        className={`text-sm ${
          checked
            ? "line-through text-gray-400"
            : "text-gray-700"
        }`}
      >
        {text}
      </span>
    </div>
  );
}