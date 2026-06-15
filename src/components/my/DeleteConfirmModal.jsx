export function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] w-[360px] shadow-lg p-6 flex flex-col items-center gap-4 text-center">
        <div className="text-[18px] font-bold">자격증 삭제</div>
        <p className="text-[14px] text-gray-500">
          정말로 삭제하시겠습니까?
          <br />
          삭제 후 복구가 불가능합니다.
        </p>
        <div className="flex gap-2 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2 text-[14px] text-gray-500 border border-gray-300 rounded-[8px] hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-[14px] text-white bg-red-500 rounded-[8px] hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
