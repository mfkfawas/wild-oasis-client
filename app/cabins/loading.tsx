import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading Cabin data....</p>
    </div>
  );
}
