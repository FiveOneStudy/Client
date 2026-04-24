export function PostTableHeader() {
  return(
    <div className="inline-flex h-[36px] px-7 justify-between items-center border-t border-[#68696C]">
      <div className="w-[720px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">제목</span>
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">작성일</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-20 font-medium">조회수</span>
      </div>
    </div>
  );
}