import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dropdownImg from "../assets/dropdown.svg";
import { useStudy } from "../context/StudyContext";
import { requestStudy } from "../api/StudyAPI";

const PAGE_SIZE = 6;

export function MyStudy() {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  const { allStudies, myStudies, joinStudy, isJoined } = useStudy();

  const uniqueMyStudies = Array.from(
    new Map(myStudies.map((s) => [s.name, s])).values()
  );

  const totalPages = Math.max(1, Math.ceil(uniqueMyStudies.length / PAGE_SIZE));
  const currentStudies = uniqueMyStudies.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const handleRequest = async () => {
    if (!input.trim()) return;
    await requestStudy(input.trim());
    setInput("");
    setOpen(false);
    setComplete(true);
  };

  // ESC로 모달 닫기
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="flex justify-center px-10 pt-16 pb-10">
      <div className="flex gap-10 items-stretch">

        {/* ================= MY STUDY ================= */}
        <div className="w-[524px]">
          <div className="text-[15px] font-semibold mb-2">MY STUDY</div>

          <div className="relative bg-[#FFD6D6] px-8 py-7 rounded-[8px] w-[524px] h-[498px] overflow-hidden">

            <button
              onClick={goPrev}
              className="absolute -left-1 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
            >
              <img src={dropdownImg} alt="left" className="w-8 h-8 scale-x-[-1] brightness-0 invert" />
            </button>

            <button
              onClick={goNext}
              className="absolute -right-1 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
            >
              <img src={dropdownImg} alt="right" className="w-8 h-8 brightness-0 invert" />
            </button>

          <div className="flex justify-center items-start h-full pt-2">
  {uniqueMyStudies.length === 0 ? (
    <div className="flex items-center justify-center h-full text-white text-[13px]">
      참가 중인 스터디가 없습니다
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-6">
      {currentStudies.map((study) => (
        <div
          key={study.name}
          className="relative bg-[#FFFFFF] w-[200px] h-[135px] rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
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
  )}
</div>
          </div>
        </div>

        {/* ================= ALL STUDY ================= */}
        <div className="flex flex-col">
          <div className="text-[15px] font-semibold mb-2">ALL STUDY</div>

          <div className="bg-[#FFD6D6] rounded-[8px] w-[350px] h-[498px] flex flex-col">

            <div className="bg-white mx-[6px] mt-[4px] px-4 py-3 rounded-t-[6px] flex justify-between items-center">
              <span className="text-[12px] text-gray-500">원하는 STUDY가 없다면</span>
              <button
                onClick={() => setOpen(true)}
                className="border border-gray-300 text-[11px] px-3 py-1 rounded-[6px]"
              >
                STUDY 추가 요청
              </button>
            </div>

            <div className="mx-[10px] mb-[8px] flex flex-col gap-[12px] flex-1 pt-[14px] overflow-y-auto">
              {allStudies.map((studyName) => (
                <div
                  key={studyName}
                  className="h-[46px] flex-shrink-0 flex items-center justify-between bg-[#FFFFFF] px-4 rounded-[6px]"
                >
                  <span className="text-[12px] font-bold text-gray-700">{studyName}</span>

                  <button
                    disabled={isJoined(studyName)}
                    onClick={() => joinStudy(studyName)}
                    className={`px-3 py-[4px] text-[9px] rounded-[6px] text-white transition-colors
                      ${isJoined(studyName)
                        ? "bg-gray-300 cursor-default"
                        : "bg-[#EFAAAA] hover:bg-[#e89999]"
                      }`}
                  >
                    {isJoined(studyName) ? "참여중" : "참여하기"}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] pb-3">&lt; &nbsp; 1 &nbsp; &gt;</div>
          </div>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[380px] bg-[#FFFFFF] rounded-[20px] px-8 py-7 shadow-xl"
          >
            <div className="text-center text-[20px] font-semibold mb-6">STUDY 추가 요청</div>
            <div className="w-[85%] mx-auto">
              <div className="text-[12px] text-gray-500 mb-2">자격증 이름</div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRequest()}
                className="w-full h-[44px] rounded-[8px] border border-gray-300 px-3 mb-6 bg-white"
              />
              <button onClick={handleRequest} className="w-full h-[44px] rounded-[10px] bg-[#EFAAAA] text-white">
                요청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {complete && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="w-[380px] bg-[#F3F3F3] rounded-[20px] px-8 py-7 shadow-xl">
            <div className="text-center text-[20px] font-semibold mb-6">STUDY 추가 요청</div>
            <div className="text-center text-[14px] text-gray-600 mb-8">
              스터디 추가 후 알림으로 알려드리겠습니다.
            </div>
            <div className="w-[85%] mx-auto">
              <button onClick={() => setComplete(false)} className="w-full h-[44px] rounded-[10px] bg-[#EFAAAA] text-white">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}