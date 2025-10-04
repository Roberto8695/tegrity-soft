"use client";

import React, { useState } from "react";
import { SparklesCore } from "./ui/sparkles";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simular envío (aquí integrarías con tu backend o servicio de email)
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      label: "WhatsApp",
      href: "https://wa.me/59178452369", // Cambia por tu número
      color: "from-green-500 to-emerald-600",
      hoverColor: "group-hover:from-green-400 group-hover:to-emerald-500",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/in/roberto-escalera", // Cambia por tu perfil
      color: "from-blue-500 to-blue-700",
      hoverColor: "group-hover:from-blue-400 group-hover:to-blue-600",
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/roberto8695", // Cambia por tu usuario
      color: "from-gray-600 to-gray-800",
      hoverColor: "group-hover:from-gray-500 group-hover:to-gray-700",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-900 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background sparkles effect */}
      <div className="w-full absolute inset-0 h-full opacity-30">
        <SparklesCore
          id="contactSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#818CF8"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-bebas">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            ¿Tienes una idea? Estoy aquí para ayudarte a hacerla realidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-bebas">
              Envíame un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Message Textarea */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400 focus:bg-white/10 transition-all duration-300 resize-none group-hover:border-white/20"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-bebas text-xl shadow-lg hover:shadow-indigo-500/50 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : status === "sent" ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ¡Mensaje Enviado!
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Methods & Info */}
          <div className="space-y-6">
            {/* Quick Contact Methods */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-bebas">
                Contacto Directo
              </h3>
              <p className="text-gray-400 mb-6">
                Elige tu método de contacto preferido
              </p>

              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${method.color} ${method.hoverColor} transition-all duration-300`}>
                      <div className="text-white">
                        {method.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold group-hover:text-indigo-300 transition-colors duration-300">
                        {method.label}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Conectar vía {method.label}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-indigo-600/20 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 font-bebas text-lg">
                    Tiempo de Respuesta
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Respondo dentro de las 24 horas hábiles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 font-bebas text-lg">
                    Email Directo
                  </h4>
                  <a href="mailto:roberto@tegrity-soft.com" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors duration-300">
                    roberto@tegrity-soft.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
