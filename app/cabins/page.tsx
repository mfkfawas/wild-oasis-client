import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { CabinList } from "./_components/CabinList";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

// This takes no effect bcz in this page prop, we r using searchParams. This only applies to statically generated pages.(I am not removing this here for my learning)
export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

// searchParams is only available in page.ts and not in all SC
// one more thing - whenever use searchParams, the page can no longer be statically rendered bcz searchParams cannot be known in the runtime, so the above revalidate var have no effect
// Also, server components rerender whenever there is a navigation(i.e change of the searchParams is also a navigation).
// All page navigations are wrapped in transition in next, in that case, eventhough this page and child comp(CabinList) rerenders and the data fetch inside the CabinList happens, but the suspense will not rerender the fallback - the way to fix that is to pass a unique key to suspense.
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? 'all'

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>

      <div className="flex justify-end">
        <Filter />
      </div>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* Suspense need to be outside the component that do the async work */}
      {/* When you pass key={filter}, it tells React that this is a new component every time the filter changes. This forces Suspense to reset and fetch fresh data. */}
      {/* 🔹 Why? */}
      {/* Next.js wraps navigation in a transition, so React does not refresh the Suspense boundary unless something forces it. */}
      <Suspense fallback={<Spinner key={filter} />}>
        {/* In Next.js, its always good to move the data fetching to a seperate its own component like below(for granular Suspense usage)  */}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
