import type { Metadata } from "next";
import { FAQ_DATA } from "@/data/faq";
import { proyectos } from "@/data/proyectos";
import {
  buildQuoteWhatsappUrl,
  QUOTE_WHATSAPP_URL,
  SERVICE_TIERS,
  TEAM_MEMBERS,
} from "@/data/studio";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tegrity-soft.tech"
).replace(/\/+$/, "");

export const BRAND_NAME = "Tegrity-Soft";
export const SITE_DEFAULT_TITLE =
  "Tegrity-Soft | Desarrollo web, software a medida y e-commerce en Next.js";
export const SITE_DESCRIPTION =
  "Estudio de ingeniería web y software a medida en Bolivia y EE. UU. Desarrollamos sitios Next.js, TypeScript, plataformas e-commerce y aplicaciones rápidas bajo cotización a medida.";

export const CONTACT_EMAIL = "roberto@tegrity-soft.com";
export const QUOTE_TELEPHONE = "+591-68538548";
export const SUPPORT_TELEPHONE = "+591-78452369";
export const WHATSAPP_URL = QUOTE_WHATSAPP_URL;

export const SOCIAL_URLS = [
  "https://github.com/eliascoca85",
  "https://www.linkedin.com/in/mauricio-coca85",
  "https://github.com/roberto8695",
  "https://linkedin.com/in/roberto-escalera",
  "https://twitter.com/roberto8695",
];

export function buildAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildAlternates(canonicalPath: string): Metadata["alternates"] {
  return {
    canonical: canonicalPath,
    ...(canonicalPath === "/"
      ? {
          languages: {
            "es-BO": "/",
            es: "/",
          },
        }
      : {}),
    types: {
      "text/plain": [
        {
          url: "/llms.txt",
          title: "Tegrity-Soft — Información estructurada para LLMs (llms.txt)",
        },
        {
          url: "/llms-full.txt",
          title: "Tegrity-Soft — Documentación extendida para LLMs (llms-full.txt)",
        },
      ],
    },
  };
}

/**
 * Grafo global Schema.org (Organization + ProfessionalService + WebSite)
 * incrustado en el <head> para buscadores y motores generativos (SEO + GEO).
 */
export function buildSiteGlobalSchema() {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId,
        name: BRAND_NAME,
        alternateName: "Tegrity Soft",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: buildAbsoluteUrl("/logo.svg"),
        },
        image: buildAbsoluteUrl("/opengraph-image"),
        description: SITE_DESCRIPTION,
        email: CONTACT_EMAIL,
        telephone: QUOTE_TELEPHONE,
        sameAs: [...SOCIAL_URLS, QUOTE_WHATSAPP_URL, "https://wa.me/59178452369"],
        areaServed: [
          {
            "@type": "City",
            name: "Cochabamba",
          },
          {
            "@type": "Country",
            name: "Bolivia",
          },
          {
            "@type": "Country",
            name: "Estados Unidos",
          },
        ],
        knowsAbout: [
          "Desarrollo web a medida",
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Comercio electrónico (E-commerce)",
          "Optimización SEO técnica y GEO",
          "Node.js",
          "PostgreSQL",
          "MongoDB",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: QUOTE_TELEPHONE,
            email: CONTACT_EMAIL,
            url: QUOTE_WHATSAPP_URL,
            areaServed: ["BO", "US"],
            availableLanguage: ["es"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: SUPPORT_TELEPHONE,
            email: CONTACT_EMAIL,
            url: `${SITE_URL}/#contacto`,
            areaServed: ["BO", "US"],
            availableLanguage: ["es"],
          },
        ],
        member: TEAM_MEMBERS.map((member) => ({
          "@type": "Person",
          name: member.name,
          jobTitle: member.title,
          alternateName: `@${member.handle}`,
          image: buildAbsoluteUrl(member.avatarUrl),
          ...(member.sameAs ? { sameAs: member.sameAs } : {}),
          worksFor: { "@id": orgId },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Paquetes de desarrollo web Tegrity-Soft (a cotización)",
          itemListElement: SERVICE_TIERS.map((tier) => ({
            "@type": "Offer",
            name: `Paquete ${tier.name} — Desarrollo Web`,
            description: `${tier.subtitle}. ${tier.timeline}. Incluye: ${tier.features.join(", ")}.`,
            url: buildQuoteWhatsappUrl(tier.name),
            availability: "https://schema.org/InStock",
            seller: { "@id": orgId },
            itemOffered: {
              "@type": "Service",
              name: `Desarrollo Web ${tier.name}`,
              serviceType: "Desarrollo de software y aplicaciones web",
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: BRAND_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "es",
        publisher: { "@id": orgId },
      },
    ],
  };
}

/**
 * Grafo Schema.org específico de la página principal (/):
 * WebPage + BreadcrumbList + ItemList de portafolio + FAQPage.
 */
export function buildHomePageSchema() {
  const orgId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const breadcrumbId = `${SITE_URL}/#breadcrumb`;
  const portfolioId = `${SITE_URL}/#portfolio`;
  const faqId = `${SITE_URL}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_DEFAULT_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "es",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        mainEntity: { "@id": portfolioId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: buildAbsoluteUrl("/opengraph-image"),
        },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": portfolioId,
        name: "Portafolio de proyectos web — Tegrity-Soft",
        description:
          "Plataformas digitales, sitios institucionales, landing pages y tiendas e-commerce desarrolladas para clientes en Bolivia y Estados Unidos.",
        numberOfItems: proyectos.length,
        itemListElement: proyectos.map((proyecto, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: proyecto.titulo,
            description: proyecto.descripcion,
            url: proyecto.link || `${SITE_URL}/#proyectos`,
            image: buildAbsoluteUrl(proyecto.imagen.split("?")[0]),
            dateCreated: proyecto.fechaCreacion,
            genre: proyecto.categoria,
            keywords: proyecto.tecnologias?.join(", "),
            creator: { "@id": orgId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${SITE_URL}/#faq`,
        inLanguage: "es",
        isPartOf: { "@id": websiteId },
        mainEntity: FAQ_DATA.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildSubPageSchema({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const pageUrl = buildAbsoluteUrl(path);
  const breadcrumbId = `${pageUrl}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
