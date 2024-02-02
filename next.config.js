const { withAxiom } = require("next-axiom")

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["aaah0mnbncqtinas.public.blob.vercel-storage.com"],
    unoptimized: true,
  },
  rewrites: async () => [
    {
      source: "/privacy",
      destination: "https://api.imaginations.sh/assets/privacy",
      basePath: false,
    },
    {
      source: "/terms",
      destination: "https://api.imaginations.sh/assets/terms",
      basePath: false,
    },
  ],
})

module.exports = nextConfig
