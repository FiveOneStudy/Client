import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dropdownImg from "../assets/dropdown.svg";

export function MyStudy() {
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-10 pt-16 pb-10">
      <div className="flex gap-10 items-stretch">

        {/* ================= MY STUDY ================= */}
        <div className="w-[520px]">
          <div className="text-[15px] font-semibold mb-2">MY STUDY</div>

          <div className="relative bg-[#FFD6D6] px-8 py-7 rounded-[8px]">

            {/* 왼쪽 화살표 */}
            <button className="absolute -left-1 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
              <img
                src={dropdownImg}
                alt="left"
                className="w-8 h-8 scale-x-[-1] brightness-0 invert"
              />
            </button>

            {/* 오른쪽 화살표 */}
            <button className="absolute -right-1 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center">
              <img
                src={dropdownImg}
                alt="right"
                className="w-8 h-8 brightness-0 invert"
              />
            </button>

            {/* 카드 중앙 정렬 */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <div
                    key={i}
                    className="relative bg-[#FFFFFF] w-[200px] h-[135px] rounded-[6px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    <div className="absolute top-[18px] left-1/2 -translate-x-1/2 text-[18px] font-semibold">
                      한능검
                    </div>

                    <div className="absolute top-[48px] left-1/2 -translate-x-1/2 text-[26px] font-bold">
                      D-100
                    </div>

                    <button
                      onClick={() => navigate(`/mystudy/${i}`)}
                      className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[70%] h-[22px] mt-1 text-[11px] bg-[#EFAAAA] text-white rounded-[6px]"
                    >
                      입장하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= ALL STUDY ================= */}
        <div className="flex flex-col">
          <div className="text-[15px] font-semibold mb-2">ALL STUDY</div>

          <div className="bg-[#FFD6D6] rounded-[8px] w-[340px] h-full flex flex-col">

            <div className="bg-white mx-[6px] mt-[4px] px-4 py-3 rounded-t-[6px] flex justify-between items-center">
              <span className="text-[12px] text-gray-500">
                원하는 STUDY가 없다면
              </span>

              <button
                onClick={() => setOpen(true)}
                className="border border-gray-300 text-[11px] px-3 py-1 rounded-[6px]"
              >
                STUDY 추가 요청
              </button>
            </div>

            <div className="mx-[10px] mb-[8px] flex flex-col gap-[12px] flex-1 pt-[14px]">
              {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <div
                  key={i}
                  className="h-[46px] flex items-center justify-between bg-[#FFFFFF] px-4 rounded-[6px]"
                >
                  <span className="text-[12px] font-bold text-gray-700">
                    {i % 3 === 0
                      ? "한능검"
                      : i % 3 === 1
                      ? "SQLD"
                      : "정보처리기능사"}
                  </span>

                  <button className="bg-[#EFAAAA] text-white px-3 py-[4px] text-[9px] rounded-[6px]">
                    참여하기
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] pb-3">
              &lt; 1 &gt;
            </div>
          </div>
        </div>
      </div>

      {/* ================= 입력 모달 ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="w-[380px] bg-[#FFFFFF] rounded-[20px] px-8 py-7 shadow-xl">

            <div className="text-center text-[20px] font-semibold mb-6">
              STUDY 추가 요청
            </div>

            <div className="w-[85%] mx-auto">
              <div className="text-[12px] text-gray-500 mb-2">
                자격증 이름
              </div>

              <input
                type="text"
                className="w-full h-[44px] rounded-[8px] border border-gray-300 px-3 mb-6 bg-white"
              />

              <button
                onClick={() => {
                  setOpen(false);
                  setComplete(true);
                }}
                className="w-full h-[44px] rounded-[10px] bg-[#EFAAAA] text-white"
              >
                요청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 완료 모달 ================= */}
      {complete && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="w-[380px] bg-[#F3F3F3] rounded-[20px] px-8 py-7 shadow-xl">

            <div className="text-center text-[20px] font-semibold mb-6">
              STUDY 추가 요청
            </div>

            <div className="text-center text-[14px] text-gray-600 mb-8">
              스터디 추가 후 알림으로 알려드리겠습니다.
            </div>

            <div className="w-[85%] mx-auto">
              <button
                onClick={() => setComplete(false)}
                className="w-full h-[44px] rounded-[10px] bg-[#EFAAAA] text-white"
              >
                확인
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}