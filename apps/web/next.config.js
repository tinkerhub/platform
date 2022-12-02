const withPwa = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
/** @type {import('next').NextConfig} */
const nextConfig = withPwa({
  reactStrictMode: true,
  swcMinify: true,
  target: 'serverless',
  pwa: {
    dest: 'public',
    scope: '/',
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
});

module.exports = nextConfig;
