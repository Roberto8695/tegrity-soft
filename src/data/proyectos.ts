export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  link: string;
  imagen: string;
  tecnologias?: string[];
  categoria?: string;
  fechaCreacion?: string;
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    titulo: "Chequeatuvoto",
    descripcion: "Página de información sobre elecciones presidenciales Bolivia",
    link: "https://chequeatuvoto.chequeabolivia.bo/",
    imagen: "/img-projects/chequeatuvoto.webp",
    tecnologias: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    categoria: "Información Pública",
    fechaCreacion: "2024"
  },
  {
    id: 2,
    titulo: "Coalicion",
    descripcion: "Página para combatir la desinformación",
    link: "https://coalicionv3.vercel.app/",
    imagen: "/img-projects/coalicion.webp",
    tecnologias: ["Next.js", "React", "Vercel", "CSS3"],
    categoria: "Plataforma Social",
    fechaCreacion: "2024"
  },
  {
    id: 3,
    titulo: "Chiptuningbo",
    descripcion: "Ecommerce de ecutuning personalizados",
    link: "https://chiptuningbo.com/",
    imagen: "/img-projects/chiptuning.webp",
    tecnologias: ["E-commerce", "JavaScript", "PHP", "MySQL"],
    categoria: "E-commerce",
    fechaCreacion: "2023"
  },
  {
    id: 4,
    titulo: "Electrocorp",
    descripcion: "Ecommerce de herramientas de diagnóstico automotriz",
    link: "https://electrocorp.com.bo",
    imagen: "/img-projects/electrocorp.webp",
    tecnologias: ["E-commerce", "React", "Node.js", "MongoDB"],
    categoria: "E-commerce",
    fechaCreacion: "2023"
  },
  {
    id: 5,
    titulo: "CJP Trucking",
    descripcion: "Página de aterrizaje de servicios de transporte en EEUU",
    link: "https://cjptrucking.us/",
    imagen: "/img-projects/cjptruckin.webp",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    categoria: "Landing Page",
    fechaCreacion: "2024"
  },
   {
    id: 6,
    titulo: "Alcaldia municipal de Colcapirhua",
    descripcion: "Página de servicios municipales de Colcapirhua",
    link: "https://apprueba.colcapirhua.gob.bo/",
    imagen: "/img-projects/colcapirhua.webp",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    categoria: "Landing Page",
    fechaCreacion: "2024"
  }
];

// Función helper para obtener proyectos por categoría
export const getProyectosPorCategoria = (categoria: string): Proyecto[] => {
  return proyectos.filter(proyecto => proyecto.categoria === categoria);
};

// Función helper para obtener proyecto por ID
export const getProyectoPorId = (id: number): Proyecto | undefined => {
  return proyectos.find(proyecto => proyecto.id === id);
};

// Función helper para obtener todas las categorías únicas
export const getCategorias = (): string[] => {
  const categorias = proyectos.map(proyecto => proyecto.categoria).filter(Boolean) as string[];
  return [...new Set(categorias)];
};

// Función helper para obtener proyectos destacados (los 3 más recientes)
export const getProyectosDestacados = (): Proyecto[] => {
  return proyectos.slice(0, 3);
};
