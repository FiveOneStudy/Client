
export default function MoreMenu({
  index,
  menuIndex,
  setMenuIndex,
  setEditingIndex,
  handleDelete,
}) {
  return (
    <div className="relative">
      {/* 버튼 */}
      <button
        onClick={() =>
          setMenuIndex(menuIndex === index ? null : index)
        }
        className="px-2 text-P400 text-xl font-bold"
      >
        ···
      </button>

      {/* 메뉴 */}
      {menuIndex === index && (
        <div className="absolute right-0 top-0 -translate-y-[110%] bg-white border rounded-lg border-P400 shadow-md z-50">
          <div
            onClick={() => {
              setEditingIndex(index);
              setMenuIndex(null);
            }}
            className="w-[70px] h-[35px] flex items-center justify-center border-b border-P400 cursor-pointer text-P400"
          >
            수정
          </div>

          <div
            onClick={() => handleDelete(index)}
            className="w-[70px] h-[35px] flex items-center justify-center cursor-pointer text-P400"
          >
            삭제
          </div>
        </div>
      )}
    </div>
  );
}