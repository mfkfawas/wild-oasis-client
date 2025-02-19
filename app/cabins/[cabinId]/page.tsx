import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

// 1. this nextjs convention is used to make this pages static rendered instead of dynamic(default behaviour of param eg:[cabinId] routes).
// 2. So, if in your application you have finite set of values for a dynamic segment of a url(i.e we already know the cabinIds here and this route is [cabinId]),
//    its always a good idea to tell nextjs about those using generateStaticParams.
export async function generateStaticParams() {
  const cabins = await getCabins();

  // we r converting to String bcz of nextjs convention
  // object key should match the dynamic segment/route(here cabinId)
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

// dynamic metadata(this fn also get access to the current params)
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

type Props = {
  params: { cabinId: string };
};

export default async function Page({ params }: Props) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin {...cabin}  />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve today {cabin.name}. Pay on arrival.
        </h2>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
      </div>
    </div>
  );
}
