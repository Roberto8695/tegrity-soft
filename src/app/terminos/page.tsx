import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { BRAND_NAME, buildAlternates, buildSubPageSchema } from "@/lib/seo";

const TERMS_TITLE = "Términos de Servicio";
const TERMS_DESCRIPTION =
  "Condiciones generales de desarrollo web, entregables, tiempos y garantía técnica de Tegrity-Soft.";

export const metadata: Metadata = {
  title: TERMS_TITLE,
  description: TERMS_DESCRIPTION,
  alternates: buildAlternates("/terminos"),
  openGraph: {
    title: `${TERMS_TITLE} | ${BRAND_NAME}`,
    description: TERMS_DESCRIPTION,
    url: "/terminos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TERMS_TITLE} | ${BRAND_NAME}`,
    description: TERMS_DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export default function TerminosPage() {
  return (
    <>
      <JsonLd
        data={buildSubPageSchema({
          path: "/terminos",
          title: `${TERMS_TITLE} | ${BRAND_NAME}`,
          description: TERMS_DESCRIPTION,
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
            Términos de Servicio
          </h1>
          <p className="mt-3 font-mono-tech text-xs text-[var(--ink-muted)]">
            Tegrity-Soft · Condiciones generales
          </p>

          <div className="mt-8 space-y-8 text-base leading-relaxed text-[var(--ink-secondary)]">
            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                1. Alcance y cotización de proyectos
              </h2>
              <p>
                Los paquetes publicados (Básico, Profesional y Enterprise) sirven
                como referencia base de características y alcances técnicos. Todo
                proyecto se cotiza y formaliza tras revisar los requisitos
                específicos del cliente mediante una propuesta detallada.
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                2. Tiempos de entrega y revisiones
              </h2>
              <p>
                Un sitio web básico requiere habitualmente entre 2 y 3 semanas,
                mientras que plataformas a medida o aplicaciones web complejas
                pueden requerir entre 2 y 3 meses. El cumplimiento del cronograma
                depende de la entrega oportuna de contenidos, accesos y
                aprobaciones por parte del cliente.
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                3. Garantía técnica y soporte post-lanzamiento
              </h2>
              <p>
                Todos los proyectos entregados por Tegrity-Soft cuentan con 30 días
                de garantía posteriores al lanzamiento para corregir incidencias
                técnicas relacionadas con la implementación acordada, además del
                soporte incluido según el paquete contratado (3, 6 o 12 meses).
              </p>
            </article>

            <article className="space-y-2.5">
              <h2 className="font-display text-xl font-semibold text-[var(--ink-primary)]">
                4. Contacto directo
              </h2>
              <p>
                Para aclarar cualquier punto sobre propuestas, propiedad del
                código o soporte continuo, puedes escribir a{" "}
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
