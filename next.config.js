/** @type {import('next').NextConfig} */
const nextConfig = {
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
