/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tifmndrcdtekpijptmwg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
  },
  // our site will kind of get exported completly as static assets that we can deploy anywhere.
  // If any of the route is dynamic, we would get an error while building.
  // output: "export",
};

export default nextConfig;
