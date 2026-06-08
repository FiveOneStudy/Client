export function PostListItem({ title, createdAt, viewCount, onClick }) {
  return(
    <div
      onClick={onClick}
      className="inline-flex h-[32px] px-7 justify-between items-center border-b border-[#B4B5B7] cursor-pointer"
    >
      <div className="w-[720px] h-full flex items-center bg-white">
        <span className="text-black text-[14px] font-normal">{title}</span>
      </div>

      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{createdAt}</span>
      </div>

      <div className="w-[104px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{viewCount}</span>
      </div>
    </div>
  );
}