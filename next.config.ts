/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:5217/:path*',
      },
      {
        source: '/auth/:path*',
        destination: 'http://localhost:5217/:path*',
      },
      {
        source: '/:path*',
        destination: 'https://play.google.com/:path*',
      },
    ]
  },
    experimental: {
      serverActions: true,
      serverComponentsExternalPackages:["mongoose"],
    }
  }
  
  export default nextConfig;