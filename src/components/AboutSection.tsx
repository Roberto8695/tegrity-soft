"use client";

import ProfileCard from './ProfileCard';

export function AboutSection() {
  return (
    <section className="py-20 bg-slate-900 relative min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-bebas">
            Sobre <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Nosotros</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce al desarrollador detrás de los proyectos
          </p>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            <ProfileCard
              name="Roberto C. Escalera"
              title="Software Engineer"
              handle="roberto8695"
              status="Disponible"
              contactText="Contáctame"
              avatarUrl="/img-about/menew.webp"
              miniAvatarUrl="/img-about/menew.webp"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              className="w-full"
              onContactClick={() => {
                // Aquí puedes agregar la lógica para contacto
                window.open('mailto:roberto@tegrity-soft.com', '_blank');
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
