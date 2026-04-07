import { useState } from "react";
import OnEye from "../../assets/OnEye.png";
import OffEye from "../../assets/OffEye.png";

export function Password({children}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-96">
      <input
        type={show ? "text" : "password"}
        placeholder={children}
        className="
          w-full bg-gray-50 h-card rounded-md 
          border border-gray-400 
          px-4 py-2 text-sm font-normal text-black 
          placeholder-gray-500
          focus:outline-none focus:border-P400
          font-pretendard
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