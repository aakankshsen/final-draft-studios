const bar = "bg-white/5 animate-pulse";

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="bg-card border border-white/10 p-4 h-[90px]">
          <div className={`${bar} h-3 w-16`} />
          <div className={`${bar} h-8 w-10 mt-3`} />
        </div>
      ))}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <ul className="flex flex-col gap-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <li key={i} className="bg-card border border-white/10 p-4 h-[112px]">
          <div className={`${bar} h-4 w-1/3`} />
          <div className={`${bar} h-3 w-1/2 mt-2`} />
          <div className={`${bar} h-3 w-full mt-4`} />
        </li>
      ))}
    </ul>
  );
}

export function DetailSkeleton() {
  return (
    <div className="max-w-2xl">
      <div className={`${bar} h-3 w-32`} />
      <div className={`${bar} h-9 w-2/3 mt-6`} />
      <div className={`${bar} h-4 w-1/2 mt-3`} />
      <div className={`${bar} h-24 w-full mt-8`} />
      <div className={`${bar} h-32 w-full mt-6`} />
    </div>
  );
}
