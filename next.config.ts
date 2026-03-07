/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig