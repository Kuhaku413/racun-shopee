/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['down-id.img.susercontent.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

module.exports = nextConfig;
