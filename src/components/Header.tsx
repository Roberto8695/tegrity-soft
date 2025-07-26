"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FuzzyText from "@/components/ui/FuzzyText";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efecto para detectar el scroll
  useEffect(() => {
    const handleScroll = () => {
      // Cambiamos el umbral a 50px para que el cambio no sea tan inmediato
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Registrar el evento de scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Clases personalizadas para los elementos del menú con efecto underline
  const navLinkClasses = `relative ${
    scrolled ? "text-gray-800 dark:text-gray-200" : "text-white"
  } hover:text-indigo-400 transition-colors text-lg font-medium py-2 group`;
  return (
    <header
      className={`absolute top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "fixed bg-white/90 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-2xl font-bold font-bebas ${
                scrolled
                  ? "text-gray-900 dark:text-white hover:text-indigo-600"
                  : "text-white hover:text-indigo-300"
              } transition-colors duration-300`}
            >
              <FuzzyText baseIntensity={0.1}>Tegrity-Soft</FuzzyText>
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden  font-bebas md:flex items-center space-x-8">
            <Link href="/" className={navLinkClasses}>
              Inicio
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link href="/servicios" className={navLinkClasses}>
              Servicios
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link href="/proyectos" className={navLinkClasses}>
              Proyectos
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link href="/tecnologias" className={navLinkClasses}>
              Tecnologías
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link href="/contacto" className={navLinkClasses}>
              Contacto
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </Link>
            <Link
              href="/contacto"
              className={`ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-all duration-300 ${
                scrolled
                  ? "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                  : "text-indigo-800 bg-white hover:bg-gray-100 focus:ring-white"
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              Contáctame
            </Link>
          </nav>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                  : "text-white hover:text-indigo-300"
              } focus:outline-none transition-colors duration-300`}
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono de hamburguesa */}
              <svg
                className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icono de cerrar */}
              <svg
                className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden transition-all duration-300 ease-in-out`}
        id="mobile-menu"
      >
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg ${
            scrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
              : "bg-black/80 backdrop-blur-md"
          }`}
        >
          <Link
            href="/"
            className={`relative block px-3 py-2 rounded-md text-base font-medium ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            } hover:text-indigo-400 group`}
          >
            Inicio
            <span className="absolute left-3 bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-24"></span>
          </Link>
          <Link
            href="/servicios"
            className={`relative block px-3 py-2 rounded-md text-base font-medium ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            } hover:text-indigo-400 group`}
          >
            Servicios
            <span className="absolute left-3 bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-24"></span>
          </Link>
          <Link
            href="/proyectos"
            className={`relative block px-3 py-2 rounded-md text-base font-medium ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            } hover:text-indigo-400 group`}
          >
            Proyectos
            <span className="absolute left-3 bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-24"></span>
          </Link>
          <Link
            href="/tecnologias"
            className={`relative block px-3 py-2 rounded-md text-base font-medium ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            } hover:text-indigo-400 group`}
          >
            Tecnologías
            <span className="absolute left-3 bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-24"></span>
          </Link>
          <Link
            href="/contacto"
            className={`relative block px-3 py-2 rounded-md text-base font-medium ${
              scrolled
                ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "text-white hover:bg-white/10"
            } hover:text-indigo-400 group`}
          >
            Contacto
            <span className="absolute left-3 bottom-1 h-0.5 w-0 bg-indigo-400 transition-all duration-300 ease-in-out group-hover:w-24"></span>
          </Link>
          <Link
            href="/contacto"
            className={`block px-3 py-2 mt-4 rounded-md text-base font-medium transition-colors duration-300 ${
              scrolled
                ? "text-white bg-indigo-600 hover:bg-indigo-700"
                : "text-indigo-800 bg-white hover:bg-gray-100"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Contáctame
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
