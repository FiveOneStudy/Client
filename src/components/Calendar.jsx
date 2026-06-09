import { useState } from "react";
import { usePlan } from "../context/Plancontext";

export default function Calendar() {
  const { monthPlans } = usePlan();

  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setDate(new Date(year, month - 1));
  const nextMonth = () => setDate(new Date(year, month + 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= lastDate; i++) days.push(i);

  return (
    <div className="h-full flex flex-col w-[420px] -mt-5">
      {/* 상단 월 이동 */}
      <div className="flex justify-center items-center gap-4 mb-2 text-sm">
        <button onClick={prevMonth}>&lt;</button>
        <div className="font-semibold">{month + 1}월</div>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-[11px] text-center mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
          <div
            key={i}
            className={
              i === 0 ? "text-[#FF0000]" : i === 6 ? "text-[#0055FF]" : "text-[#4E4F51]"
            }
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-[4px]">
        {days.map((day, i) => {
          const dayData = day
            ? monthPlans.find(
                (p) =>
                  p.date ===
                  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              )
            : null;
          const plans = dayData?.plans ?? [];

          return (
            <div
              key={i}
              className="relative border h-[40px] flex items-center justify-center"
            >
              {/* 날짜 */}
              {day && (
                <div className="absolute -top-[10px] bg-white px-[6px] py-[1px] text-[10px]">
                  {day}
                </div>
              )}

              {/* 일정 (최대 2개) */}
              <div className="absolute top-[4px] flex flex-col gap-[1px] w-full px-[2px]">
                {plans.slice(0, 2).map((plan, idx) => (
                  <div
                    key={idx}
                    className="text-[9px] bg-[#FF6C6C] text-white px-1 rounded truncate"
                  >
                    {plan}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}