import { useState } from "react";
import dropdownImg from "../assets/dropdown.svg";
import { useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";

const PAGE_SIZE = 4;

export default function MyStudy() {
  const navigate = useNavigate();
  const { myStudies } = useStudy();
  const [page, setPage] = useState(0);

  const uniqueStudies = Array.from(
    new Map(myStudies.map((s) => [s.name, s])).values()
  );

  const totalPages = Math.max(1, Math.ceil(uniqueStudies.length / PAGE_SIZE));
  const currentStudies = uniqueStudies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div>
      <div className="text-[16px] font-semibold mb-2">
        MY STUDY
      </div>

      <div className="relative bg-[#FFD6D6] px-6 py-5 rounded-[12px] w-[960px] h-[170px]">

        {/* 왼쪽 화살표 */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
        >
          <img
            src={dropdownImg}
            alt="left"
            className="w-8 h-8 scale-x-[-1] brightness-0 invert"
          />
        </button>

        {/* 오른쪽 화살표 */}
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
        >
          <img
            src={dropdownImg}
            alt="right"
            className="w-8 h-8 brightness-0 invert"
          />
        </button>

        {/* 카드 영역 */}
        <div className="flex gap-9 px-10 justify-center">
          {currentStudies.map((study) => (
            <div
              key={study.name}
              className="relative bg-white w-[200px] h-[135px] rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            >
              <div className="absolute top-[18px] left-1/2 -translate-x-1/2 text-[18px] font-semibold whitespace-nowrap">
                {study.name}
              </div>

              <div className="absolute top-[48px] left-1/2 -translate-x-1/2 text-[26px] font-bold">
                D-{study.dday}
              </div>

              <button
                onClick={() => navigate(`/mystudy/${study.name}`)}
                className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[70%] h-[22px] mt-1 text-[11px] bg-[#EFAAAA] text-white rounded-[6px]"
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