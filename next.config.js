/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['pokeapi.co', 'raw.githubusercontent.com'],
  },
}

module.exports = nextConfig

