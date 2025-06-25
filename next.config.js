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
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
