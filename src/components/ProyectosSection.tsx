"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { proyectos, Proyecto } from "@/data/proyectos";
import Image from "next/image";

export function ProyectosSection() {
  return (
    <section className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-bebas">
            Nuestros <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Proyectos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre algunos de nuestros trabajos más destacados y exitosos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-18 justify-items-center">
          {proyectos.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProyectoCardProps {
  proyecto: Proyecto;
}

const ProyectoCard: React.FC<ProyectoCardProps> = ({ proyecto }) => {
  return (
    <div className="w-full max-w-sm">
      <PinContainer
        title={proyecto.link}
        href={proyecto.link}
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
          {/* Imagen del proyecto */}
          <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
            <Image
              src={proyecto.imagen}
              alt={proyecto.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Contenido del proyecto */}
          <div className="flex flex-col flex-1">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-lg text-slate-100 font-bebas">
              {proyecto.titulo}
            </h3>
            
            <div className="text-sm !m-0 !p-0 font-normal">
              <span className="text-slate-400">
                {proyecto.descripcion}
              </span>
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};
