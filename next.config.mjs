/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Additional Next.js configurations
};

// Import the CommonJS module using dynamic import
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

// Wrap your Next.js config with the withPWA function
export default withPWA(nextConfig);