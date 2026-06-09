import dropdownImg from "../assets/dropdown.svg";
import { useNavigate } from "react-router-dom";
import { studiesMock } from "../mocks/study.js";

export default function MyStudy() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-[16px] font-semibold mb-2">
        MY STUDY
      </div>

      <div className="relative bg-[#FFD6D6] px-6 py-5 rounded-[12px] w-[960px] h-[170px]">

        {/* 왼쪽 화살표 */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
          <img
            src={dropdownImg}
            alt="left"
            className="w-8 h-8 scale-x-[-1] brightness-0 invert"
          />
        </button>

        {/* 오른쪽 화살표 */}
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
          <img
            src={dropdownImg}
            alt="right"
            className="w-8 h-8 brightness-0 invert"
          />
        </button>

        {/* 카드 영역 */}
        <div className="flex gap-9 px-10">
          {studiesMock.map((study) => (
            <div
              key={study.id}
              className="relative bg-white w-[260px] h-[130px] rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute top-[15px] left-1/2 -translate-x-1/2 text-[14px]">
                {study.name}
              </div>

              <div className="absolute top-[40px] left-1/2 -translate-x-1/2 text-[27px] font-bold">
                D-{study.dday}
              </div>

              <button
                onClick={() => navigate(`/mystudy/${study.id}`)}
                className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-[75%] h-[22px] text-[11px] bg-[#F5AFAF] shadow-[0_0_4px_rgba(0,0,0,0.25)] text-white rounded"
              >
                입장하기
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}