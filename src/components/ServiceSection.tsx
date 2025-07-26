"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function ServiceSection() {
  return (
    <section
      id="servicios"
      className="py-20 flex flex-col items-center justify-center w-full bg-gradient-to-b from-black to-gray-900"
    >      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          Nuestros Paquetes
        </h2>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
          Soluciones digitales escalables que se adaptan a las necesidades de tu negocio
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 mx-auto px-8">
        <Card
          title="Básico"
          icon={<BasicIcon />}
          features={[
            "Landing page responsiva",
            "Hasta 5 secciones",
            "Formulario de contacto",
            "Integración con redes sociales",
            "Optimización SEO básica",
            "Certificado SSL",
            "Hosting por 1 año"
          ]}
        >
          <CanvasRevealEffect
            animationSpeed={3.5}
            containerClassName="bg-indigo-900"
            colors={[[129, 140, 248], [165, 180, 252]]}
          />
        </Card>
        <Card
          title="Profesional"
          icon={<ProIcon />}
          features={[
            "Sitio web multi-página (hasta 10)",
            "Diseño personalizado premium",
            "Panel de administración",
            "Blog integrado",
            "Formularios avanzados",
            "Analítica web",
            "Optimización SEO avanzada",
            "Soporte técnico por 1 año"
          ]}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-purple-900"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
        <Card
          title="Enterprise"
          icon={<EnterpriseIcon />}
          features={[
            "Aplicación web personalizada",
            "Diseño UX/UI a medida",
            "Panel administrativo avanzado",
            "Integración con sistemas existentes",
            "E-commerce / Pasarela de pagos",
            "API personalizada",
            "Soporte técnico prioritario",
            "Mantenimiento y actualizaciones"
          ]}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-900"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  features,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  features: string[];
  children?: React.ReactNode;
}) => {
  const [hovered, setHovered] = React.useState(false);  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-white/[0.15] group/canvas-card flex items-center justify-center rounded-xl max-w-sm w-full mx-auto p-6 relative h-[32rem] backdrop-blur-sm transition-all duration-300 hover:border-white/40 shadow-lg hover:shadow-indigo-900/20"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 rounded-xl overflow-hidden z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center text-center w-full">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-white text-3xl opacity-100 relative z-20 mt-4 font-bold transition duration-300 w-full text-center group-hover/canvas-card:-translate-y-8">
          {title}
        </h2>
        
        <ul className="mt-8 text-gray-200 relative z-20 opacity-0 group-hover/canvas-card:opacity-100 transition-all duration-300 delay-100 text-left space-y-3 transform translate-y-8 group-hover/canvas-card:translate-y-0 px-4 bg-black/40 backdrop-blur-sm py-4 rounded-lg">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Iconos para los diferentes paquetes
const BasicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-indigo-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ProIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-pink-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const EnterpriseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-sky-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

// Mantener el ícono original
export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
