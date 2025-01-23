// error bounday component should be always a client component
"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}

// This will catch all errors in rendering and not in any callback fns(effect/handlers)
// Also It will not catch any error in the root layout
// If you want to catch the errors in RootLayout create in root the file - global-error.js
// and dont forget to add the html layout for the error boundary there as it replaces even
// the root layout(as our html and body is defined in the root layout)

// refer: https://nextjs.org/docs/app/getting-started/project-structure
