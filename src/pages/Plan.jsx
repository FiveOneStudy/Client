import { useState } from "react";
import UpIcon from "../assets/up.png";
import DownIcon from "../assets/down.png";

export function Plan() {
  return <Calendar />;
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const dates = [];

  // 이전달
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({ day: prevLastDate - i, isCurrent: false });
  }

  // 이번달
  for (let i = 1; i <= lastDate; i++) {
    dates.push({ day: i, isCurrent: true });
  }

  // 다음달
  let nextDay = 1;
  while (dates.length % 7 !== 0) {
    dates.push({ day: nextDay++, isCurrent: false });
  }

  const changeMonth = (diff) => {
    setCurrentDate(new Date(year, month + diff, 1));
  };

  // 오늘 선택 여부
  const isSelectedToday =
    selectedDate === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="w-[600px] h-[590px] ml-24 mt-9 border-2 rounded-2xl bg-white overflow-hidden">
      {/* 상단 영역 */}
      <div className="p-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {year}년 {month + 1}월
          </h2>

          <div className="flex gap-5 items-center">
            {/* today (div로 변경) */}
            <div
              onClick={() => {
                setCurrentDate(new Date());
                setSelectedDate(today.getDate());
              }}
              className={`
                px-3 py-1 border border-gray-400 rounded-lg text-base font-semibold transition cursor-pointer
                ${isSelectedToday ? "text-P400" : "text-gray-500"}
              `}
            >
              today
            </div>

            <button onClick={() => changeMonth(-1)}>
              <img className="w-6 h-3" src={UpIcon} alt="Up" />
            </button>
            <button onClick={() => changeMonth(1)}>
              <img className="w-[29px] h-7" src={DownIcon} alt="Down" />
            </button>
          </div>
        </div>

        {/* 요일 */}
        <div className="grid grid-cols-7 text-center gap-10 mb-[-17px] text-gray-400">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      </div>

      {/* 날짜 영역 */}
      <div className="border-t border-gray-300">
        <div className="grid grid-cols-7">
          {dates.map((date, idx) => {
            const isLastCol = (idx + 1) % 7 === 0;
            const isLastRow = idx >= dates.length - 7;

            const isToday =
              date.isCurrent &&
              date.day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={idx}
                onClick={() => {
                  if (date.isCurrent) {
                    setSelectedDate(date.day);
                  }
                }}
                className={`
                  h-[80px] cursor-pointer
                  border-r border-b-2 border-gray-300
                  ${isLastCol && "border-r-0"}
                  ${isLastRow && "border-b-0"}
                  ${!date.isCurrent && "text-gray-300"}
                `}
              >
                {/* 날짜 */}
                <div className="flex justify-end p-[0.15rem]">
                  <span
                    className={`
                        px-[0.57rem] py-[0.2rem] rounded-md text-sm font-bold h-7 w-7
                            ${
                              selectedDate === date.day && date.isCurrent
                                ? "bg-P400 text-black" // 선택되면 무조건 흰색
                                : ""
                            }
                            ${
                              isToday && !(selectedDate === date.day)
                                ? "text-P400" // 선택 안된 오늘만 P400
                                : ""
                            }
                      `}
                  >
                    {date.day}
                  </span>
                </div>

                {/* 일정 */}
                {date.day === 7 && date.isCurrent && (
                  <>
                    <div class="flex bg-[#6FCF8D] bg-opacity-50 font-medium text-xs items-center h-5 rounded-md border-l-4 border-[#6FCF8D]">
                      SQLD 시험
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}