"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate } from "animejs";
import { attachSectionScrollFX } from "@/lib/anime-section-fx";
import { pulseStageFromElement } from "@/lib/stage-director";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  X,
} from "lucide-react";
import {
  SERVICE_PLAN_LABELS,
  subscribeContactIntent,
  type ServicePlanId,
} from "@/lib/contact-intent";

interface FormValues {
  name: string;
  email: string;
  plan: ServicePlanId;
  specialist: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const DIRECT_CHANNELS = [
  {
    name: "WhatsApp Cotizaciones",
    detail: "+591 68538548 · Cotización directa",
    href: "https://wa.me/59168538548",
    icon: MessageSquare,
  },
  {
    name: "WhatsApp Soporte",
    detail: "+591 78452369 · Respuesta ágil",
    href: "https://wa.me/59178452369",
    icon: MessageSquare,
  },
  {
    name: "Email directo",
    detail: "roberto@tegrity-soft.com",
    href: "mailto:roberto@tegrity-soft.com",
    icon: Mail,
  },
  {
    name: "LinkedIn — Mauricio Coca",
    detail: "linkedin.com/in/mauricio-coca85",
    href: "https://www.linkedin.com/in/mauricio-coca85",
    icon: Linkedin,
  },
  {
    name: "GitHub — Elias Coca",
    detail: "github.com/eliascoca85",
    href: "https://github.com/eliascoca85",
    icon: Github,
  },
  {
    name: "LinkedIn — Roberto Escalera",
    detail: "linkedin.com/in/roberto-escalera",
    href: "https://linkedin.com/in/roberto-escalera",
    icon: Linkedin,
  },
  {
    name: "GitHub — Roberto Escalera",
    detail: "github.com/roberto8695",
    href: "https://github.com/roberto8695",
    icon: Github,
  },
];

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    plan: "profesional",
    specialist: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const dispatchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return attachSectionScrollFX({
      root: sectionRef.current,
      traceSelector: "[data-contact-trace]",
      staggerTargets: [
        {
          selector: "[data-contact-channel]",
          containerSelector: "[data-contact-channels]",
          delayStep: 75,
          from: "first",
        },
      ],
    });
  }, []);

  useEffect(() => {
    return subscribeContactIntent((detail) => {
      setValues((prev) => ({
        ...prev,
        plan: detail.plan ?? prev.plan,
        specialist: detail.specialist ?? prev.specialist,
      }));
      setSubmitted(false);
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 350);
    });
  }, []);

  useEffect(() => {
    if (!submitted || !dispatchBoxRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anim = animate(dispatchBoxRef.current, {
      y: [12, 0],
      opacity: [0, 1],
      duration: 340,
      ease: "outExpo",
    });

    return () => {
      anim.revert();
    };
  }, [submitted]);

  const validate = (nextValues: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};
    if (nextValues.name.trim().length < 2) {
      nextErrors.name = "Ingresa tu nombre completo.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email.trim())) {
      nextErrors.email = "Ingresa un correo electrónico válido.";
    }
    if (nextValues.message.trim().length < 10) {
      nextErrors.message =
        "Cuéntanos brevemente qué necesitas construir (mínimo 10 caracteres).";
    }
    return nextErrors;
  };

  const handleFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value } as FormValues;
    setValues(updated);
    if (submitted) {
      setSubmitted(false);
    }
    if (name in errors) {
      const nextErrors = { ...errors };
      delete nextErrors[name as keyof FormErrors];
      setErrors(nextErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.email) {
        emailInputRef.current?.focus();
      } else if (validationErrors.message) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitted(true);
    setCopied(false);
    pulseStageFromElement(e.currentTarget, "#34d399");
  };

  const briefText = useMemo(() => {
    const lines = [
      "Hola equipo de Tegrity-Soft,",
      "",
      `Nombre: ${values.name.trim()}`,
      `Correo: ${values.email.trim()}`,
      `Interés: ${SERVICE_PLAN_LABELS[values.plan]}`,
    ];
    if (values.specialist) {
      lines.push(`Especialista solicitado: ${values.specialist}`);
    }
    lines.push("", "Detalles del proyecto:", values.message.trim());
    return lines.join("\n");
  }, [values]);

  const whatsappHref = useMemo(
    () => `https://wa.me/59168538548?text=${encodeURIComponent(briefText)}`,
    [briefText]
  );

  const mailtoHref = useMemo(() => {
    const subject = `Nueva consulta — ${SERVICE_PLAN_LABELS[values.plan]}`;
    return `mailto:roberto@tegrity-soft.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(briefText)}`;
  }, [briefText, values.plan]);

  const handleCopyBrief = async (event: React.MouseEvent<HTMLButtonElement>) => {
    pulseStageFromElement(event.currentTarget, "#34d399");
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contacto"
      ref={sectionRef}
      aria-labelledby="contacto-heading"
      className="section-backdrop-primary section-contain relative border-b border-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
            [CH-06 // CONTACTO]
          </p>
          <h2
            id="contacto-heading"
            className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl"
          >
            Hablemos de tu proyecto
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
            Prepara los detalles de tu plataforma y envíanos tu consulta por
            WhatsApp o correo directo sin formularios perdidos.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1200 12"
          fill="none"
          preserveAspectRatio="none"
          className="mt-7 h-3 w-full opacity-75"
        >
          <path
            data-contact-trace
            d="M 0 6 H 410 L 420 11 H 790 L 800 2 H 1200"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive Project Brief Builder */}
          <div className="lg:col-span-7">
            <div className="card-surface rounded-2xl p-6 sm:p-8">
              {values.specialist && (
                <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border border-[var(--border-strong)] bg-[var(--accent-soft)] px-4 py-2.5">
                  <p className="text-sm font-medium text-[var(--ink-primary)]">
                    Consulta dirigida a{" "}
                    <span className="font-semibold text-[var(--accent)]">
                      {values.specialist}
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setValues((prev) => ({ ...prev, specialist: "" }))
                    }
                    aria-label="Quitar especialista seleccionado"
                    className="interactive-control inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--ink-primary)]"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-[var(--ink-primary)]"
                    >
                      Nombre completo <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      placeholder="Ej. Andrea Morales"
                      className="mt-2 block min-h-[48px] w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]/70 focus:border-[var(--accent)] focus:outline-none"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 text-sm text-[#fda4af]"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-[var(--ink-primary)]"
                    >
                      Correo electrónico{" "}
                      <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleFieldChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      placeholder="nombre@empresa.com"
                      className="mt-2 block min-h-[48px] w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]/70 focus:border-[var(--accent)] focus:outline-none"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 text-sm text-[#fda4af]"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-plan"
                    className="block text-sm font-medium text-[var(--ink-primary)]"
                  >
                    Paquete o alcance de interés
                  </label>
                  <select
                    id="contact-plan"
                    name="plan"
                    value={values.plan}
                    onChange={handleFieldChange}
                    className="mt-2 block min-h-[48px] w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 text-base text-[var(--ink-primary)] focus:border-[var(--accent)] focus:outline-none"
                  >
                    {(
                      Object.entries(SERVICE_PLAN_LABELS) as [
                        ServicePlanId,
                        string,
                      ][]
                    ).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-[var(--ink-primary)]"
                  >
                    Detalles del proyecto{" "}
                    <span className="text-[var(--accent)]">*</span>
                  </label>
                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={handleFieldChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                    placeholder="Cuéntanos qué objetivo buscas, referencias o plazo estimado..."
                    className="mt-2 block w-full resize-y rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]/70 focus:border-[var(--accent)] focus:outline-none"
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 text-sm text-[#fda4af]"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="interactive-control inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-base font-bold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
                >
                  <span>Preparar solicitud para envío directo</span>
                </button>
              </form>

              {submitted && (
                <div
                  ref={dispatchBoxRef}
                  role="status"
                  aria-live="polite"
                  className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[#0b0d12] p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--status-ok)]/15 text-[var(--status-ok)]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-[var(--ink-primary)]">
                        Resumen listo — elige cómo enviarlo ahora
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ink-secondary)]">
                        Tu consulta se abrirá prellenada con el paquete y tus
                        datos para agilizar la respuesta.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-stage-target="true"
                      data-stage-accent="#34d399"
                      className="interactive-control inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[var(--status-ok)] px-4 text-sm font-bold text-[#031910]"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={mailtoHref}
                      data-stage-target="true"
                      data-stage-accent="#38bdf8"
                      className="interactive-control inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 text-sm font-semibold text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Abrir correo</span>
                    </a>

                    <button
                      type="button"
                      data-stage-target="true"
                      data-stage-accent="#34d399"
                      onClick={handleCopyBrief}
                      className="interactive-control inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 shrink-0 text-[var(--status-ok)]" aria-hidden="true" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>Copiar resumen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Direct Channels & Response Commitment */}
          <div className="space-y-6 lg:col-span-5">
            <div className="card-surface rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-[var(--ink-primary)]">
                Canales directos
              </h3>
              <p className="mt-1.5 text-sm text-[var(--ink-muted)]">
                Escríbenos directamente por el canal que te resulte más cómodo.
              </p>

              <ul data-contact-channels className="mt-6 space-y-3">
                {DIRECT_CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  const isExternal = channel.href.startsWith("http");
                  return (
                    <li
                      key={channel.name}
                      data-contact-channel
                      data-stage-accent="#818cf8"
                    >
                      <a
                        href={channel.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="interactive-control flex min-h-[60px] items-center justify-between gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3 hover:border-[var(--border-strong)]"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent)]"
                            aria-hidden="true"
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <div className="font-display text-base font-semibold text-[var(--ink-primary)]">
                              {channel.name}
                            </div>
                            <div className="truncate font-mono-tech text-xs text-[var(--ink-muted)]">
                              {channel.detail}
                            </div>
                          </div>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-[var(--ink-muted)]"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="card-surface rounded-2xl p-6">
              <div className="flex items-start gap-3.5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--accent)]"
                  aria-hidden="true"
                >
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--ink-primary)]">
                    Tiempo de respuesta
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--ink-secondary)]">
                    Respondemos todas las consultas dentro de las{" "}
                    <span className="font-mono-tech text-[var(--ink-primary)]">
                      24 horas hábiles
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
