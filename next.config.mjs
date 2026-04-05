/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "assets.pokemon.com",
      "images.pokemontcg.io",
      "raw.githubusercontent.com",
      "images.scrydex.com",
    ],
  },
};

export default nextConfig;
