// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["openweathermap.org"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/widgets",
        permanent: true, // hoặc false nếu tạm thời
      },
    ];
  },
};

module.exports = nextConfig;
