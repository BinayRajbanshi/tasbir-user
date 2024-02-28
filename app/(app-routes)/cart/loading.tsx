import { Skeleton } from '@/_components/ui/skeleton';

function SkeletonDemo() {
  return (
    <section className="my-container mt-[28px] py-5 md:mt-[36px]">
      {/* <Skeleton className="mb-4 hidden h-8 w-4/12 md:block" /> */}

      <div className="grid gap-5 py-4 md:grid-cols-[0.30fr_0.55fr_0.30fr] md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-10">
        <SmallSkeleton />
        <BigSkeleton />
        <SmallSkeleton customClass="hidden md:block" />
        <SmallSkeleton customClass="hidden md:block" />
        <SmallSkeleton customClass="hidden md:block" />
      </div>

      <div className="grid-col-1  mt-16 grid gap-2 md:w-9/12 md:gap-10">
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
        <SkeletonList />
      </div>
    </section>
  );
}

const BigSkeleton = () => {
  return (
    <div className="row-span-2 hidden flex-col md:flex">
      <Skeleton className="h-[285px] w-full" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
};

const SmallSkeleton = ({ customClass }: { customClass?: string }) => {
  return (
    <div className={`flex flex-col ${customClass}`}>
      <Skeleton className="h-[148px] w-full" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

const SkeletonList = () => {
  return (
    <div className="group grid grid-cols-[0.85fr_0.30fr] gap-2 md:grid-cols-[0.35fr_0.55fr] lg:gap-4 ">
      <div className="order-2 md:order-none">
        <Skeleton className="h-[69px] w-full rounded-sm object-cover md:aspect-video md:h-full md:w-full md:rounded-lg lg:w-[380px]" />
      </div>
      <div className="flex grow flex-col gap-2">
        <div className="mt-2 hidden gap-1 md:flex"></div>
        <Skeleton className="h-6 w-full pt-2 md:line-clamp-3 md:py-0 lg:w-[500px]" />
        <Skeleton className="h-6 w-full pt-2 md:line-clamp-3 md:py-0 lg:w-[500px]" />
        <Skeleton className="h-6 w-full pt-2 md:line-clamp-3 md:py-0 lg:w-[500px]" />
      </div>
    </div>
  );
};

export default SkeletonDemo;
