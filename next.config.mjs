/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase config
      {
        protocol: "https",
        hostname: "tifmndrcdtekpijptmwg.supabase.co",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      // Google OAuth images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // our site will kind of get exported completly as static assets that we can deploy anywhere.
  // If any of the route is dynamic, we would get an error while building.
  // output: "export",
}

export default nextConfig
