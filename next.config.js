/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    config.resolve.alias['@'] = path.join(__dirname, 'src')

    return config
  },

  eslint: {
    // Just get the build working
    // TODO: Fix?
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
