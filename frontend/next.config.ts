import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // <-- autoriser les images Cloudinary
  },
};

export default nextConfig;
