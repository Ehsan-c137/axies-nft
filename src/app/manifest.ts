import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Axies NFT Marketplace",
    short_name: "Axies",
    description:
      "An NFT marketplace where you can easily create, sell, and buy digital items.",
    start_url: "/",
    display: "standalone",
    background_color: "#14141f",
    theme_color: "#14141f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
