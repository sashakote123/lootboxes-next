import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

module.exports = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dpsoll6fq/image/upload/**'), new URL('https://cdn2.csgo.com/item/image/**')],
  },

}

export default nextConfig;
