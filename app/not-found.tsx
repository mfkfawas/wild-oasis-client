import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;

// This will be triggered when url not exist.
// In next, we can manually trigger the not-found, -
// call notFound() from next.
// eg:

// import { notFound } from "next/navigation";

// export async function getCabin(id) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     notFound();
//   }

//   return data;
// }

// we can create a more granular not-found for a specific route
// refer: [cabinId] folder
