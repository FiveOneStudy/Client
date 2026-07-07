export function PopUp({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col items-center gap-4 shadow-lg w-72">
        <p className="text-sm font-medium font-pretendard text-gray-700 text-center whitespace-pre-line">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-P400 text-white text-sm rounded-md py-2 font-pretendard hover:bg-P transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}