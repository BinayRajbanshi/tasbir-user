// @type {import('next').NextConfig}
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental:{
  	    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '45.117.153.69',
      },
      {
        protocol: 'http',
        hostname: 'tasbirapi.gharbetibaa.com',
      },

      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
