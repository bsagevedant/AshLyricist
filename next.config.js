/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Temporarily disable webpack caching to work around the ENOENT error
    config.cache = false;
    return config;
  }
}

module.exports = nextConfig