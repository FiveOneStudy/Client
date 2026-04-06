import { useState } from "react";
import OnEye from "../../assets/OnEye.png";
import OffEye from "../../assets/OffEye.png";

export function Password() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-96">
      <input
        type={show ? "text" : "password"}
        placeholder="비밀번호"
        className="
          w-full bg-gray-50 h-card rounded-md 
          border-2 border-gray-300 
          px-4 py-2 text-sm font-medium text-black 
          focus:outline-none focus:border-P400
        "
      />

      <img
        src={show ? OnEye : OffEye}
        alt="eye"
        onClick={() => setShow(!show)}
        className="
          absolute right-3 top-1/2 -translate-y-1/2 
          w-5 h-5 cursor-pointer
        "
      />
    </div>
  );
}