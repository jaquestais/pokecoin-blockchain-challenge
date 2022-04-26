/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['pokeapi.co', 'raw.githubusercontent.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wallet',
        permanent: true,
      },
      {
        source: '/wallet/acquisition',
        destination: '/wallet',
        permanent: true,
      },
      {
        source: '/wallet/history',
        destination: '/wallet',
        permanent: true,
      },
      {
        source: '/wallet/sale',
        destination: '/wallet',
        permanent: true,
      },
      {
        source: '/wallet/valuation',
        destination: '/wallet',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

