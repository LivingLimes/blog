const withMDX = require("@next/mdx")()

module.exports = withMDX({
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }

    return config
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
})
