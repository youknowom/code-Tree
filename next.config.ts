import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
    // Optimize image formats
    formats: ["image/avif", "image/webp"],
  },
  // Improve performance by enabling experimental optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // Enable strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
