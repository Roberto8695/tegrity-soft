import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { BRAND_NAME, buildAlternates, buildSubPageSchema } from "@/lib/seo";

const PRIVACY_TITLE = "Política de Privacidad";
const PRIVACY_DESCRIPTION =
  "Información sobre el uso de datos de contacto y consultas comerciales enviadas a Tegrity-Soft.";

export const metadata: Metadata = {
  title: PRIVACY_TITLE,
  description: PRIVACY_DESCRIPTION,
  alternates: buildAlternates("/privacidad"),
  openGraph: {
    title: `${PRIVACY_TITLE} | ${BRAND_NAME}`,
    description: PRIVACY_DESCRIPTION,
    url: "/privacidad",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRIVACY_TITLE} | ${BRAND_NAME}`,
    description: PRIVACY_DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <JsonLd
        data={buildSubPageSchema({
          path: "/privacidad",
          title: `${PRIVACY_TITLE} | ${BRAND_NAME}`,
          description: PRIVACY_DESCRIPTION,
        })}
      />
      <section className="border-b border-transparent bg-[var(--bg-base)] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="interactive-control inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-sm font-medium text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
          >
            <ArrowLeft className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <span>Volver al inicio</span>
          </Link>

          <h1 className="mt-8 font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl">
            Política de Privacidad
          </h1>
          <p className="mt-3 font-mono-tech text-xs text-[var(--ink-muted)]">
            Tegrity-Soft · Vigencia actual
          </p>

          <div className="mt-8 space-y-8 text-base leading-relaxed text-[var(--ink-secondary)]">
            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                1. Datos que recopilamos al contactarnos
              </h2>
              <p>
                Cuando preparas una consulta comercial desde nuestro formulario de
                contacto o nos escribes mediante WhatsApp o correo electrónico,
                únicamente solicitamos tu nombre, correo electrónico, paquete de
                interés y la descripción de tu proyecto.
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                2. Finalidad del uso de la información
              </h2>
              <p>
                Tu información se utiliza exclusivamente para responder a tu
                solicitud, elaborar propuestas técnicas y coordinar el desarrollo o
                soporte de tu proyecto web. No vendemos, alquilamos ni compartimos
                tus datos con terceros con fines publicitarios.
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                3. Almacenamiento en el navegador
              </h2>
              <p>
                Este sitio web no utiliza rastreadores publicitarios ni perfiles de
                seguimiento invasivos. Los campos que completas en el asistente de
                consulta permanecen localmente en tu navegador hasta que decides
                enviarlos por WhatsApp o correo electrónico.
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                4. Contacto para consultas sobre privacidad
              </h2>
              <p>
                Si deseas actualizar o solicitar la eliminación de cualquier dato
                compartido previamente en una conversación comercial, escríbenos a{" "}
                <a
                  href="mailto:roberto@tegrity-soft.com"
                  className="font-medium text-[var(--accent)] underline"
                >
                  roberto@tegrity-soft.com
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
