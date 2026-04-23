export default function CheckItem({ text, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="flex items-center gap-2 cursor-pointer"
    >
      {/* 체크박스 */}
<<<<<<< feature/main-ui
      <div className="w-4 h-4 border rounded-sm flex items-center justify-center bg-[#FCF8F8] border-pink-200">
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 text-[#F5AFAF]"
=======
      <div className="w-6 h-6 border rounded-sm flex items-center justify-center bg-P100 border-P300">
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-P400"
>>>>>>> master
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
<<<<<<< feature/main-ui
        className={`text-sm ${
          checked
            ? "line-through text-gray-400"
            : "text-gray-700"
=======
        className={`font-medium text-base ${
          checked ? "line-through text-G200" : "text-gray-700"
>>>>>>> master
        }`}
      >
        {text}
      </span>
    </div>
  );
}