/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  reactStrictMode: true,

  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    config.resolve.alias['@'] = path.join(__dirname, 'src')

    return config
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // TODO: Fix this
    ignoreBuildErrors: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}
