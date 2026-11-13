import type { ServicePlanId } from "@/lib/contact-intent";

export const QUOTE_WHATSAPP_NUMBER = "59168538548";
export const QUOTE_WHATSAPP_DISPLAY = "+591 68538548";
export const QUOTE_WHATSAPP_URL = `https://wa.me/${QUOTE_WHATSAPP_NUMBER}`;

export function buildQuoteWhatsappUrl(planName?: string): string {
  const text = planName
    ? `Hola equipo de Tegrity-Soft, quiero solicitar una cotización para el plan ${planName}.`
    : "Hola equipo de Tegrity-Soft, quiero solicitar una cotización para mi proyecto web.";
  return `${QUOTE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export interface ServiceTier {
  id: Exclude<ServicePlanId, "personalizado">;
  name: string;
  timeline: string;
  subtitle: string;
  leadIn?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: "basico",
    name: "Básico",
    timeline: "Entrega: 2–3 semanas",
    subtitle: "Perfecto para empezar",
    features: [
      "Sitio web responsivo (hasta 5 páginas)",
      "Diseño moderno y profesional",
      "Optimización SEO básica",
      "Formulario de contacto",
      "Integración con redes sociales",
      "Hosting gratuito por 1 año",
      "Soporte técnico por 3 meses",
    ],
    ctaLabel: "Solicitar cotización",
  },
  {
    id: "profesional",
    name: "Profesional",
    timeline: "Entrega: 3–6 semanas",
    subtitle: "Para negocios en crecimiento",
    leadIn: "Todo lo del plan Básico, más:",
    highlighted: true,
    features: [
      "Sitio web de hasta 10 páginas",
      "Panel de administración",
      "Blog integrado",
      "Galería de productos o servicios",
      "Optimización avanzada SEO",
      "Analytics y métricas",
      "Integración con WhatsApp",
      "Soporte técnico por 6 meses",
    ],
    ctaLabel: "Solicitar cotización",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    timeline: "Entrega: 1–3 meses",
    subtitle: "Solución completa",
    leadIn: "Todo lo del plan Profesional, más:",
    features: [
      "Sitio web sin límite de páginas",
      "E-commerce completo",
      "Sistema de usuarios",
      "API personalizada",
      "Integración con CRM",
      "Certificado SSL premium",
      "Backup automático diario",
      "Soporte técnico por 1 año",
    ],
    ctaLabel: "Solicitar cotización",
  },
];

export interface TeamMember {
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  miniAvatarUrl: string;
  sameAs?: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Brayan R. Apaza",
    title: "Software Engineer",
    handle: "brayanAplm",
    status: "Disponible",
    avatarUrl: "/img-about/rolando.webp",
    miniAvatarUrl: "/img-about/rolando.webp",
  },
  {
    name: "Elias C. Coca Rojas",
    title: "Software Engineer",
    handle: "eliascoca85",
    status: "Disponible",
    avatarUrl: "/img-about/eli.webp",
    miniAvatarUrl: "/img-about/eli.webp",
    sameAs: [
      "https://github.com/eliascoca85",
      "https://www.linkedin.com/in/mauricio-coca85",
    ],
  },
  {
    name: "Roberto C. Escalera",
    title: "Software Engineer",
    handle: "roberto8695",
    status: "Disponible",
    avatarUrl: "/img-about/menew.webp",
    miniAvatarUrl: "/img-about/menew.webp",
    sameAs: [
      "https://github.com/roberto8695",
      "https://linkedin.com/in/roberto-escalera",
      "https://twitter.com/roberto8695",
    ],
  },
];
