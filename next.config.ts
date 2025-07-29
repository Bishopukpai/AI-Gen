import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
     remotePatterns: [
        {
          hostname: 'res.cloudinary.com',
        }
     ]
  },
 
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },

},
};

export default nextConfig;
