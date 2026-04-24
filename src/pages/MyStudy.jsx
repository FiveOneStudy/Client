export function MyStudy() {
  const studies = [
    "한능검", "SQLD", "정보처리기사",
    "한능검", "정보처리기사", "한능검"
  ];

  const allStudies = [
    "한능검", "SQLD", "정보처리기사",
    "한능검", "SQLD", "정보처리기사", "한능검"
  ];

  return (
    <div className="w-full flex justify-center py-10">
      
      <div className="w-[1000px] flex gap-10">

        {/* 🔥 MY STUDY */}
        <div>
          <div className="text-[14px] font-semibold mb-3">MY STUDY</div>

          <div className="bg-[#FADCDC] p-6 rounded-[14px] w-[500px]">
            <div className="grid grid-cols-2 gap-5">
              {studies.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[10px] shadow-md p-4 flex flex-col items-center"
                >
                  <div className="text-[12px]">{item}</div>
                  <div className="text-[22px] font-bold my-2">D-100</div>

                  <button className="bg-[#F5AFAF] text-white text-[10px] px-6 py-[3px] rounded">
                    입장하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔥 ALL STUDY */}
        <div>
          <div className="text-[14px] font-semibold mb-3">ALL STUDY</div>

          <div className="bg-[#FADCDC] p-5 rounded-[14px] w-[320px]">

            {/* 상단 */}
            <div className="flex justify-between items-center mb-3">
              <input
                placeholder="원하는 STUDY를 찾아보세요"
                className="text-[10px] px-2 py-1 rounded border w-[65%]"
              />
              <button className="text-[10px] bg-white px-2 py-1 rounded border">
                STUDY 추가 요청
              </button>
            </div>

            {/* 리스트 */}
            <div className="flex flex-col gap-2">
              {allStudies.map((item, i) => (
                <div
                  key={i}
                  className="bg-white px-3 py-2 rounded flex justify-between items-center text-[12px]"
                >
                  {item}
                  <button className="bg-[#F5AFAF] text-white text-[10px] px-2 py-[2px] rounded">
                    참가하기
                  </button>
                </div>
              ))}
            </div>

            {/* 하단 페이지 */}
            <div className="text-center text-[10px] mt-3">
              &lt; 1 &gt;
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}