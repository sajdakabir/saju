/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  // Optimize bundle splitting
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
  // Enable static optimization
  trailingSlash: false,
  // Optimize fonts
  optimizeFonts: true,
};

module.exports = nextConfig;
