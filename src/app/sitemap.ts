import type { MetadataRoute } from "next";
import { proyectos } from "@/data/proyectos";
import { buildAbsoluteUrl, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-13");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        buildAbsoluteUrl("/opengraph-image"),
        buildAbsoluteUrl("/media/tegrity-poster.webp"),
        ...proyectos.map((proyecto) =>
          buildAbsoluteUrl(proyecto.imagen.split("?")[0])
        ),
      ],
    },
    {
      url: buildAbsoluteUrl("/privacidad"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: buildAbsoluteUrl("/terminos"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
