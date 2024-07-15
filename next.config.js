const path = require('path')

module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    return config
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
}