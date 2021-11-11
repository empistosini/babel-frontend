const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  swcMinify: true,
  images: {
    disableStaticImages: true,
  },
}

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        optimizeImages: false,
      },
    ],
  ],
  config,
)
