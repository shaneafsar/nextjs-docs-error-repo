const { withContentlayer } = require("next-contentlayer");
const redirects = require("./redirects");
const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //output: "standalone",
  experimental: {
    nextScriptWorkers: false,
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
  skipMiddlewareUrlNormalize: true,
  sentry: {
    hideSourceMaps: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.algolia.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  async redirects() {
    const entries = [
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_BASE_PATH,
        basePath: false,
        permanent: false,
      },
    ];
    return entries;
  },
  async rewrites() {
    return [
      {
        source: "/_vercel/insights/:path*",
        destination:
          "https://project-odyssey.vercel.app/_vercel/insights/:path*",
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
