export type ProjectDetail = {
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

export const projectsData: Record<string, ProjectDetail> = {
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
      "Um marco na paisagem urbana de São Paulo. O Edifício Horizonte redefine o conceito de espaço corporativo com fachadas de vidro de alta performance, jardins verticais e áreas de convivência.",
    description_en:
      "A landmark in São Paulo’s urban landscape. Horizon Building redefines corporate space with high-performance glass façades, vertical gardens, and shared areas.",
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
      "Equipamento cultural voltado à integração urbana, o Centro Cultural Luz conecta arte, educação e espaço público por meio de uma arquitetura aberta e permeável.",
    description_en:
      "A cultural facility focused on urban integration, the Light Cultural Center connects art, education, and public space through open and permeable architecture.",
    hero_image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80",
      "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=1200&q=80",
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
      "Projeto de interiores que valoriza materiais naturais, iluminação indireta e integração de ambientes em um loft contemporâneo no bairro Jardins.",
    description_en:
      "An interior design project that highlights natural materials, indirect lighting, and integrated spaces in a contemporary loft located in Jardins.",
    hero_image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1200&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
  },

  "praca-das-aguas": {
    title_pt: "Praça das Águas",
    title_en: "Waters Square",
    category: "Urbanismo",
    year: "2022",
    location: "Campinas, SP",
    area: "25.000m²",
    client: "Município de Campinas",
    description_pt:
      "Projeto urbano que requalifica o espaço público por meio de espelhos d’água, áreas verdes e percursos acessíveis, promovendo convivência e lazer.",
    description_en:
      "An urban project that revitalizes public space through water features, green areas, and accessible pathways, encouraging leisure and social interaction.",
    hero_image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
      "https://images.unsplash.com/photo-1496560736447-7b1a7f7a7f0b?w=1200&q=80",
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
      "Residência unifamiliar implantada em terreno inclinado, com forte relação com a paisagem serrana e soluções arquitetônicas voltadas ao conforto térmico.",
    description_en:
      "A single-family residence set on a sloped site, strongly connected to the mountainous landscape and designed with thermal comfort in mind.",
    hero_image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154014-0a48a1e3b1d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448070-c2f1b9b1b0c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585153277-15be3dff2a1c?w=1200&q=80",
    ],
  },
};
