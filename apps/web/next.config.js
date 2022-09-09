const withPwa = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  reactStrictMode: true,
  swcMinify: true,
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  //   disable: process.env.NODE_ENV === 'development',
  // },
});

module.exports = nextConfig;
