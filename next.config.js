/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    trustedHeaders: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'wang-server',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    const API_HOST = process.env.NEXT_PUBLIC_API_URL || 'http://wang-server:3001';

    return [
      {
        source: '/api/:path*',
        destination: `${API_HOST}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${API_HOST}/uploads/:path*`,
      }
    ]
  }
}

module.exports = nextConfig
