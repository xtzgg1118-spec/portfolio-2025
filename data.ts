
import { Project, NavigationItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Paper Dimensions",
    category: "Set Design",
    year: "2024",
    client: "Orenji Studio",
    description: "A delicate exploration of paper textures and light. This series constructs ethereal bird forms and organic plant structures using only white and colored paper, playing with translucency and shadow to create depth.",
    // White Paper Birds / Cranes Art
    coverImage: "https://images.unsplash.com/photo-1578320606737-14227915520e?q=80&w=1200&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1578320606737-14227915520e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1600&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Sand & Cactus",
    category: "Art Direction",
    year: "2024",
    client: "Diptyque",
    description: "Conceptual product photography and set design featuring abstract organic forms and sand textures. A visual dialogue between the artificial and the natural.",
    // Cactus in Sand / Set Design
    coverImage: "https://images.unsplash.com/photo-1534269222346-5a896154c41d?q=80&w=1200&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1534269222346-5a896154c41d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507937747732-c6252994e637?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Paper Flora",
    category: "Installation",
    year: "2023",
    client: "Vogue",
    description: "Large scale floral installation using recycled materials. A commentary on consumption and beauty.",
    // Paper Flowers (Target Card)
    coverImage: "https://images.unsplash.com/photo-1516205651411-a42711ac5516?q=80&w=1200&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1516205651411-a42711ac5516?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1695663363372-138379ba5188?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Silent Noise",
    category: "Photography",
    year: "2022",
    client: "Personal",
    description: "Capturing the quiet moments in the busiest cities of the world. A study of isolation within the crowd.",
    coverImage: "https://images.unsplash.com/photo-1449824913929-4bba42b89567?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449824913929-4bba42b89567?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "Glass Abstract",
    category: "Digital Art",
    year: "2023",
    client: "Personal",
    description: "Exploration of refraction, dispersion, and caustic patterns in a digital environment.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    title: "Minimalist Void",
    category: "Interior",
    year: "2023",
    client: "Aesop",
    description: "The absence of objects as a design feature. Creating space for thought.",
    coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop"
    ]
  }
];

export const NAV_ITEMS: NavigationItem[] = [
  { 
    id: "workshop",
    label: "ワークショップ", 
    type: "page",
    content: {
      title: "Workshop",
      body: "Our workshops are designed to foster creativity and technical skills. From paper crafting to digital set design, we offer intensive courses for all levels.\n\nUpcoming sessions include:\n- Advanced Origami Structures\n- Lighting for Miniature Sets\n- Material Physics in 3D"
    }
  }, 
  { 
    id: "past-works",
    label: "過去の作品", 
    type: "page",
    content: {
      title: "Past Works",
      body: "An archive of our journey. Exploring different mediums, clients, and challenges over the last decade. \n\nSee our physical archives in Tokyo and New York."
    }
  }, 
  { 
    id: "teamwork",
    label: "チームワーク", 
    type: "page",
    content: {
      title: "Teamwork",
      body: "Collaboration is at the heart of everything we do. We are a collective of designers, architects, and artists working together to push boundaries."
    }
  }, 
  { 
    id: "contact",
    label: "お問い合わせ", 
    type: "link",
    href: "#contact"
  }
];

export const INDEX_PAGE: NavigationItem = {
    id: "index",
    label: "概要",
    type: "page",
    content: {
        title: "Index",
        body: "Glass Dimension is a curated portfolio exploring the intersection of physical craft and digital presentation.\n\nKey Areas:\n- Set Design\n- Art Direction\n- Photography\n\nThis platform serves as a living archive of our experiments with light, texture, and space."
    }
};
