// import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export async function CabinList() {
  // Right now, opting out one of the components of page out of the data cache will opt out the entire route out of the data cache.
  // So now its like revalidating the route, but once partial pre-rendering is stable this will be useful, bcz this component is wrapped using Suspense(so only
  // this component will become dynamic. So the rest of the page will be static which we call static shell and only this will be in the dynamic hole)
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
