import type { MetadataRoute } from "next";
import { BRAND_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} | Desarrollo web y software a medida`,
    short_name: BRAND_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#030305",
    theme_color: "#030305",
    lang: "es",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.jpeg",
        sizes: "192x192",
        type: "image/jpeg",
      },
    ],
  };
}
