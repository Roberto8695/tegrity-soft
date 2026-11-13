import { scrollToSection } from "@/lib/scroll-telemetry";

export type ServicePlanId = "basico" | "profesional" | "enterprise" | "personalizado";

export interface ContactIntentDetail {
  plan?: ServicePlanId;
  specialist?: string;
}

const CONTACT_INTENT_EVENT = "tegrity:contact-intent";

export const SERVICE_PLAN_LABELS: Record<ServicePlanId, string> = {
  basico: "Paquete Básico (a cotización)",
  profesional: "Paquete Profesional (a cotización)",
  enterprise: "Paquete Enterprise (a cotización)",
  personalizado: "Consultoría / Proyecto a medida",
};

export function navigateToContact(detail: ContactIntentDetail) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<ContactIntentDetail>(CONTACT_INTENT_EVENT, { detail })
  );

  scrollToSection("contacto");
}

export function subscribeContactIntent(
  handler: (detail: ContactIntentDetail) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<ContactIntentDetail>;
    if (customEvent.detail) {
      handler(customEvent.detail);
    }
  };

  window.addEventListener(CONTACT_INTENT_EVENT, listener);
  return () => window.removeEventListener(CONTACT_INTENT_EVENT, listener);
}
