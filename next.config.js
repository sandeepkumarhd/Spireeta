// /** @type {import('next').NextConfig} */
// const nextConfig = {

//     images: {
//         unoptimized: true,
//     },
//     trailingSlash: true,
//     output: 'export',
// }

// const withVideos = require('next-videos')

// module.exports = withVideos({
//     ...nextConfig,
//     webpack(config, options) {
//         return config
//     }
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Ensures URLs have trailing slashes (optional)
};
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: false, // Ensure this is set if you are using the `pages` directory instead of App Router.
  },
};
const withVideos = require("next-videos");

module.exports = withVideos({
  ...nextConfig,
  webpack(config, options) {
    return config;
  },
});
