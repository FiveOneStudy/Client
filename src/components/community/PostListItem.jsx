export function PostListItem({ title, date, views }) {
  return(
    <div className="inline-flex h-[32px] px-7 justify-between items-center border-t border-[#B4B5B7]">
      <div className="w-[720px] h-full flex items-center  bg-white">
        <span className="text-black text-[14px] font-normal">{title}</span>
      </div>
      <div className="w-[160px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{date}</span>
      </div>
      <div className="w-[104px] h-full flex items-center justify-center bg-white">
        <span className="text-black text-[14px] font-normal">{views}</span>
      </div>
    </div>
  );
}