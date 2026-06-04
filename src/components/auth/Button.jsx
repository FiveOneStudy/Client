export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-P400 text-white w-card h-card rounded-md font-black text-lg text-center ${className ?? ""}`}
    >
      {children}
    </button>
  );
}