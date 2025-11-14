const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
