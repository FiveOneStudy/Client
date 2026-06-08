import { useState, useEffect } from "react";

export function AuthCode({ value, onChange, active, onResend }) {
  const [time, setTime] = useState(300);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!active) return;
    setTime(300);
    setExpired(false);
  }, [active]);

  useEffect(() => {
    if (!active || expired) return;
    if (time <= 0) {
      setExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, active, expired]);

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="relative w-96">
      <input
        placeholder="인증번호"
        value={value}        // 추가
        onChange={onChange}  // 추가
        className="
          w-full bg-gray-50 h-card rounded-md 
          border border-gray-400 
          px-4 py-2 pr-20 text-sm font-normal text-black 
          placeholder-gray-500
          focus:outline-none focus:border-P400
          font-pretendard
        "
      />

      <span
        className={`
          absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium font-noto
          ${!active ? "text-gray-300" : expired ? "font-bold text-gray-500 cursor-pointer" : "text-P400"}
        `}
        onClick={() => {
          if (expired) {
            setTime(300);
            setExpired(false);
            onResend?.();
          }
        }}
      >
        {!active ? "00:00" : expired ? "재전송" : formatTime()}
      </span>
    </div>
  );
}