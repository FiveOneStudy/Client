export function Input({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-96 bg-gray-50 h-card rounded-md 
        border-2 border-gray-300 
        px-4 py-2 text-sm font-medium text-black 
        focus:outline-none focus:border-P400
      "
    />
  );
}