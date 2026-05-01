export default function Loader({ size = "md", fullPage = false }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-[3px]",
    lg: "w-16 h-16 border-4",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} rounded-full border-primary-500/20 border-t-primary-500 animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-[#0f0f1a]/80 backdrop-blur-sm z-[999] flex flex-col items-center justify-center gap-4">
        {spinner}
        <p className="text-white/50 text-sm animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}
