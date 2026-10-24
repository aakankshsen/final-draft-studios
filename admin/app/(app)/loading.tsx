import { ListSkeleton, StatsSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <>
      <StatsSkeleton />
      <ListSkeleton />
    </>
  );
}
