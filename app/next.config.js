/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
    optimizeImages: true,
    optimizeCss: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
