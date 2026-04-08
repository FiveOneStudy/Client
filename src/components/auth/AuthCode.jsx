import { useState, useEffect } from "react";

export function AuthCode() {
  const [time, setTime] = useState(180);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="relative w-96">
      <input
        placeholder="인증번호"
        className="
          w-full bg-gray-50 h-card rounded-md 
          border border-gray-400 
          px-4 py-2 pr-20 text-sm font-normal text-black 
          placeholder-gray-500
          focus:outline-none focus:border-P400
          font-pretendard
        "
      />

      {/* 오른쪽 타이머 */}
      <span
        className={`
          absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium font-noto
          ${expired ? "font-bold text-gray-500 cursor-pointer" : "text-P400"}
        `}
        onClick={() => {
          if (expired) {
            setTime(180);
            setExpired(false);
          }
        }}
      >
        {expired ? "재전송" : formatTime()}
      </span>
    </div>
  );
}