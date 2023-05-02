/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.loket.com",
      "loket-asset-production.s3.ap-southeast-1.amazonaws.com",
      "s3-ap-southeast-1.amazonaws.com",
      "media.graphassets.com",
      "apahabar.s3.ap-southeast-1.amazonaws.com",
      "pk-ent.com",
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(); battery=(self); geolocation=(); microphone=('https://a-domain.com')",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
