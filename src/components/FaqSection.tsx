"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede tomar de 2-3 semanas, mientras que una aplicación web compleja puede tomar de 2-3 meses. Te proporcionaremos un cronograma detallado después de analizar tus requisitos específicos."
  },
  {
    question: "¿Cuál es el costo de crear un sitio web?",
    answer: "Ofrecemos diferentes paquetes adaptados a tus necesidades. Nuestro paquete Básico comienza en $499, el Pro en $899 y el Enterprise en $1499. Cada paquete incluye diferentes características y niveles de personalización. Podemos crear una cotización personalizada basada en tus requisitos específicos."
  },
  {
    question: "¿El sitio web será responsive (adaptable a móviles)?",
    answer: "¡Absolutamente! Todos nuestros sitios web están diseñados con un enfoque 'mobile-first', lo que significa que funcionan perfectamente en todos los dispositivos: móviles, tablets y computadoras de escritorio. Probamos exhaustivamente en diferentes tamaños de pantalla para garantizar una experiencia óptima."
  },
  {
    question: "¿Puedo actualizar el contenido de mi sitio web yo mismo?",
    answer: "Sí, implementamos sistemas de gestión de contenido (CMS) como WordPress o paneles de administración personalizados que te permiten actualizar textos, imágenes y otros contenidos fácilmente sin necesidad de conocimientos técnicos. También proporcionamos capacitación completa."
  },
  {
    question: "¿Qué incluye el mantenimiento del sitio web?",
    answer: "El mantenimiento incluye actualizaciones de seguridad, backups regulares, monitoreo de rendimiento, corrección de errores, actualizaciones de contenido menores y soporte técnico. Ofrecemos diferentes planes de mantenimiento según tus necesidades."
  },
  {
    question: "¿Mi sitio web será optimizado para motores de búsqueda (SEO)?",
    answer: "Sí, todos nuestros sitios incluyen optimización SEO básica: meta tags apropiados, estructura de URLs amigables, velocidad de carga optimizada, sitemap XML y diseño responsive. Para estrategias SEO más avanzadas, ofrecemos servicios adicionales especializados."
  },
  {
    question: "¿Qué tecnologías utilizan para desarrollar sitios web?",
    answer: "Utilizamos tecnologías modernas y probadas como React, Next.js, TypeScript, Tailwind CSS, Node.js y bases de datos como PostgreSQL o MongoDB. Seleccionamos las tecnologías más adecuadas según las necesidades específicas de cada proyecto."
  },
  {
    question: "¿Proporcionan hosting y dominio?",
    answer: "Podemos ayudarte con la configuración del hosting y dominio. Trabajamos con proveedores confiables y te guiamos en el proceso de registro. También podemos gestionar la configuración técnica completa si lo prefieres, incluido en nuestros paquetes Pro y Enterprise."
  },
  {
    question: "¿Ofrecen garantía en su trabajo?",
    answer: "Sí, ofrecemos 30 días de garantía después del lanzamiento para corregir cualquier error o problema técnico. Además, proporcionamos soporte continuo y estamos disponibles para resolver cualquier duda o realizar ajustes necesarios."
  },
  {
    question: "¿Cómo es el proceso de desarrollo?",
    answer: "Nuestro proceso incluye: 1) Consulta inicial y análisis de requisitos, 2) Diseño y wireframes para tu aprobación, 3) Desarrollo del sitio, 4) Revisiones y ajustes, 5) Pruebas exhaustivas, 6) Lanzamiento y capacitación. Mantenemos comunicación constante durante todo el proceso."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-bebas">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestros servicios de desarrollo web
          </p>
        </motion.div>

        {/* Acordeón de preguntas */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className={`
                  bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden
                  border border-slate-700/50 transition-all duration-300
                  hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10
                  ${openIndex === index ? 'border-purple-500/70 shadow-xl shadow-purple-500/20' : ''}
                `}
              >
                {/* Pregunta */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-white pr-8 group-hover:text-purple-300 transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className={`w-6 h-6 transition-colors ${
                        openIndex === index ? 'text-purple-400' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Respuesta */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-4"></div>
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-300 mb-6 text-lg">
            ¿Tienes alguna otra pregunta?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105"
          >
            Contáctanos
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
