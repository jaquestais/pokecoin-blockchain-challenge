/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['https://pokeapi.co/api/v2/'],
  },
}

module.exports = nextConfig

