export default function NeedsContent({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-dashed border-amber/50 bg-[repeating-linear-gradient(135deg,rgba(245,166,35,0.04)_0_10px,transparent_10px_20px)] flex items-center justify-center ${className}`}
    >
      <span className="absolute top-2 left-2 font-mono text-[10px] tracking-wide uppercase text-amber bg-ink/85 px-2 py-1 rounded border border-amber/40">
        {label}
      </span>
    </div>
  );
}