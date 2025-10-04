"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/roberto8695",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/roberto-escalera",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://twitter.com/roberto8695",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "Email",
      url: "mailto:roberto@tegrity-soft.com",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const footerLinks = {
    company: [
      { name: "Sobre Nosotros", href: "#sobre-nosotros" },
      { name: "Proyectos", href: "#proyectos" },
      { name: "Servicios", href: "#servicios" },
      { name: "Contacto", href: "#contacto" },
    ],
    services: [
      { name: "Desarrollo Web", href: "#desarrollo-web" },
      { name: "Diseño UI/UX", href: "#diseno" },
      { name: "Optimización SEO", href: "#seo" },
      { name: "Consultoría", href: "#consultoria" },
    ],
    legal: [
      { name: "Política de Privacidad", href: "#privacidad" },
      { name: "Términos de Servicio", href: "#terminos" },
      { name: "Cookies", href: "#cookies" },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent pointer-events-none" />
      
      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 font-bebas bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Tegrity Soft
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm leading-relaxed px-4 sm:px-0">
              Creando experiencias web excepcionales con tecnología de vanguardia. Tu visión, nuestro código.
            </p>
            {/* Social links */}
            <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-indigo-400/50"
                  aria-label={social.name}
                >
                  <div className="text-gray-400 group-hover:text-indigo-400 transition-colors duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 font-bebas">
              Empresa
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-xs sm:text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 font-bebas">
              Servicios
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-xs sm:text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA section */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 font-bebas">
              Mantente Actualizado
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 px-4 sm:px-0">
              Recibe las últimas noticias y actualizaciones.
            </p>
            <div className="flex flex-col gap-2 sm:gap-3 px-4 sm:px-0">
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300 text-xs sm:text-sm"
              />
              <button className="px-3 sm:px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium font-bebas">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6 sm:mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Tegrity Soft. Todos los derechos reservados.
          </div>
          
          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {footerLinks.legal.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-xs sm:text-sm"
                >
                  {link.name}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-gray-600 hidden sm:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
      </div>
    </footer>
  );
}
