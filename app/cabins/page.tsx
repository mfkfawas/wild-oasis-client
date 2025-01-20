import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import { CabinList } from "./CabinList";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* Suspense need to be outside the component that do the async work */}
      <Suspense fallback={<Spinner />}>
        {/* In Next.js, its always good to move the data fetching to a seperate its own component like below(for granular Suspense usage)  */}
        <CabinList />
      </Suspense>
    </div>
  );
}
