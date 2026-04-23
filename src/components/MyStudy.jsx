export default function MyStudy() {
  return (
    <div>
      <div className="text-[16px] font-semibold mb-2">MY STUDY</div>

      <div className="relative bg-[#FFD6D6] px-6 py-5 rounded-[12px] h-[170px]">

        {/* 왼쪽 화살표 (그대로 유지) */}
        <button className="absolute -left-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[40px] font-extralight text-white/80">
          &lt;
        </button>

        {/* 오른쪽 화살표 (그대로 유지) */}
        <button className="absolute -right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-[40px] font-extralight text-white/80">
          &gt;
        </button>

        {/* 카드 영역 */}
        <div className="flex gap-9 px-10">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-white w-[180px] h-[130px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-center items-center"
            >
              <div className="text-[14px]">한능검</div>
              <div className="text-[27px] font-bold">D-100</div>

              <button className="mt-3 w-[75%] h-[20px] text-[11px] bg-[#F5AFAF] shadow-[0_0_4px_rgba(0,0,0,0.25)] text-white rounded flex items-center justify-center">
                입장하기
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}