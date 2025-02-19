import Image from "next/image";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/app/_components/TextExpander";

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

  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today {name}. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
