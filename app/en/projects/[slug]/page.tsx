import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

type ProjectDetail = {
  title_pt: string;
  title_en: string;
  category: string;
  year: string;
  location: string;
  area: string;
  client: string;
  description_pt: string;
  description_en: string;
  hero_image: string;
  gallery: string[];
};

const projectsData: Record<string, ProjectDetail> = {
  "casa-mirante": {
    title_pt: "Casa Mirante",
    title_en: "Viewpoint House",
    category: "Residencial",
    year: "2024",
    location: "Campos do Jordão, SP",
    area: "480m²",
    client: "Privado",
    description_pt:
      "Uma residência que se abre para a paisagem montanhosa, criando uma simbiose entre arquitetura e natureza. O projeto explora a relação entre interior e exterior através de grandes panos de vidro e terraços suspensos.",
    description_en:
      "A residence that opens to the mountain landscape, creating a symbiosis between architecture and nature. The project explores the relationship between interior and exterior through large glass panels and suspended terraces.",
    hero_image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    ],
  },

  "edificio-horizonte": {
    title_pt: "Edifício Horizonte",
    title_en: "Horizon Building",
    category: "Comercial",
    year: "2023",
    location: "São Paulo, SP",
    area: "12.000m²",
    client: "Horizonte Incorporadora",
    description_pt:
      "Um marco na paisagem urbana de São Paulo, o Edifício Horizonte redefine o conceito de espaço corporativo, integrando tecnologia, sustentabilidade e bem-estar.",
    description_en:
      "A landmark in São Paulo’s urban landscape, Horizon Building redefines the concept of corporate space, integrating technology, sustainability and well-being.",
    hero_image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    ],
  },

  "centro-cultural-luz": {
    title_pt: "Centro Cultural Luz",
    title_en: "Light Cultural Center",
    category: "Institucional",
    year: "2023",
    location: "São Paulo, SP",
    area: "8.500m²",
    client: "Prefeitura Municipal",
    description_pt:
      "Projeto cultural voltado à integração urbana e democratização do acesso à arte, com espaços flexíveis, áreas abertas e forte relação com o entorno.",
    description_en:
      "A cultural project focused on urban integration and democratizing access to art, featuring flexible spaces, open areas and a strong relationship with its surroundings.",
    hero_image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
    ],
  },

  "loft-jardins": {
    title_pt: "Loft Jardins",
    title_en: "Jardins Loft",
    category: "Interiores",
    year: "2024",
    location: "São Paulo, SP",
    area: "180m²",
    client: "Privado",
    description_pt:
      "Reforma de loft urbano com foco em iluminação natural, integração de ambientes e materiais nobres em uma linguagem contemporânea.",
    description_en:
      "An urban loft renovation focused on natural lighting, integrated spaces and noble materials within a contemporary language.",
    hero_image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=80",
    ],
  },

  "praca-das-aguas": {
    title_pt: "Praça das Águas",
    title_en: "Waters Square",
    category: "Urbanismo",
    year: "2022",
    location: "Campinas, SP",
    area: "25.000m²",
    client: "Prefeitura Municipal",
    description_pt:
      "Projeto urbano que revitaliza o espaço público através de espelhos d’água, áreas verdes e percursos de convivência.",
    description_en:
      "An urban project that revitalizes public space through water features, green areas and social pathways.",
    hero_image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
    ],
  },

  "residencia-serra": {
    title_pt: "Residência Serra",
    title_en: "Serra Residence",
    category: "Residencial",
    year: "2023",
    location: "Gramado, RS",
    area: "620m²",
    client: "Privado",
    description_pt:
      "Residência de alto padrão integrada à topografia da serra, utilizando materiais naturais e grandes aberturas para a paisagem.",
    description_en:
      "A high-end residence integrated into the mountain landscape, using natural materials and large openings to the surroundings.",
    hero_image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154207-7a06d3bdbf08?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ aqui resolve o erro do Next 16
  const project = projectsData[slug];

  if (!project) return notFound();

  return <ProjectDetailClient project={project} />;
}
