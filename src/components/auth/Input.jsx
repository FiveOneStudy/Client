export function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-96 bg-gray-50 h-card rounded-md 
        border border-gray-400 
        px-4 py-2 text-sm font-normal text-black 
         placeholder-gray-500
        focus:outline-none focus:border-P400
        font-pretendard
      "
    />
  );
}