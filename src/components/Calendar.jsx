import { useState } from 'react';

const EVENTS = {
  '2026-03-10': '면접 준비',
  '2026-03-21': '모의고사',
};

export default function Calendar() {
  const [date, setDate] = useState(new Date(2026, 2));

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
    <div className="h-full flex flex-col w-[400px]">

      {/* 상단 월 이동 */}
      <div className="flex justify-center items-center gap-4 mb-2 text-sm">
        <button onClick={prevMonth}>&lt;</button>
        <div className="font-semibold">{month + 1}월</div>
        <button onClick={nextMonth}>&gt;</button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-[11px] text-center mb-2">
        {['일','월','화','수','목','금','토'].map((d, i) => (
          <div
            key={i}
            className={
              i === 0
                ? 'text-[#FF0000]'
                : i === 6
                ? 'text-[#0055FF]'
                : 'text-[#4E4F51]'
            }
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 gap-[4px]">
        {days.map((day, i) => {
          const key = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
          const event = EVENTS[key];

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

              {/* 🔥 이벤트 (위쪽으로 이동됨) */}
              {event && (
                <div className="absolute top-[4px] text-[9px] bg-[#FF6C6C] text-white px-1 rounded">
                  {event}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}