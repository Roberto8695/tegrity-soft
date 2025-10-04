"use client";
import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function ServiceSection() {
  return (
    <section className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-bebas">
            Nuestros <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Paquetes</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones digitales escalables que se adaptan a las necesidades de tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Paquete Básico */}
          <CardSpotlight className="h-auto p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-bebas mb-2">
                BÁSICO
              </h3>
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                $499
              </div>
              <p className="text-gray-400 text-sm">Perfecto para empezar</p>
            </div>
            
            <div className="text-neutral-200 relative z-20">
              <p className="text-white font-semibold mb-4">Incluye:</p>
              <ul className="list-none space-y-3">
                <Step title="Sitio web responsivo (hasta 5 páginas)" />
                <Step title="Diseño moderno y profesional" />
                <Step title="Optimización SEO básica" />
                <Step title="Formulario de contacto" />
                <Step title="Integración redes sociales" />
                <Step title="Hosting gratuito por 1 año" />
                <Step title="Soporte técnico 3 meses" />
              </ul>
            </div>
            
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 font-bebas text-lg">
              Elegir Básico
            </button>
          </CardSpotlight>

          {/* Paquete Pro */}
          <CardSpotlight className="h-auto p-8 border-2 border-indigo-500">
            <div className="text-center mb-6">
              <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3 inline-block">
                MÁS POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white font-bebas mb-2">
                PROFESIONAL
              </h3>
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                $899
              </div>
              <p className="text-gray-400 text-sm">Para negocios en crecimiento</p>
            </div>
            
            <div className="text-neutral-200 relative z-20">
              <p className="text-white font-semibold mb-4">Todo lo básico +</p>
              <ul className="list-none space-y-3">
                <Step title="Sitio web hasta 10 páginas" />
                <Step title="Panel de administración" />
                <Step title="Blog integrado" />
                <Step title="Galería de productos/servicios" />
                <Step title="Optimización avanzada SEO" />
                <Step title="Analytics y métricas" />
                <Step title="Integración con WhatsApp" />
                <Step title="Soporte técnico 6 meses" />
              </ul>
            </div>
            
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 font-bebas text-lg">
              Elegir Pro
            </button>
          </CardSpotlight>

          {/* Paquete Enterprise */}
          <CardSpotlight className="h-auto p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white font-bebas mb-2">
                ENTERPRISE
              </h3>
              <div className="text-4xl font-bold text-indigo-400 mb-2">
                $1,499
              </div>
              <p className="text-gray-400 text-sm">Solución completa</p>
            </div>
            
            <div className="text-neutral-200 relative z-20">
              <p className="text-white font-semibold mb-4">Todo lo pro +</p>
              <ul className="list-none space-y-3">
                <Step title="Sitio web ilimitado" />
                <Step title="E-commerce completo" />
                <Step title="Sistema de usuarios" />
                <Step title="API personalizada" />
                <Step title="Integración con CRM" />
                <Step title="Certificado SSL premium" />
                <Step title="Backup automático diario" />
                <Step title="Soporte técnico 1 año" />
              </ul>
            </div>
            
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 font-bebas text-lg">
              Elegir Enterprise
            </button>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}
 
const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-3 items-start">
      <CheckIcon />
      <p className="text-gray-300">{title}</p>
    </li>
  );
};
 
const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-indigo-400 mt-0.5 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};