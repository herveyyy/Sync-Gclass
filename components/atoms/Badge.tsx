interface BadgeProps {
  label: string;
  className?: string;
}

export function Badge({ label, className = "" }: BadgeProps) {
  return (
    <div
      className={`px-3 py-1 bg-linear-to-r from-indigo-50 to-purple-50 text-indigo-600 text-xs font-bold rounded-full border border-indigo-100 ${className}`}
    >
      {label}
    </div>
  );
}
