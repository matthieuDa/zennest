import { ServiceCategory, SubService, BlogPost } from '@/types';
import { BLOG_CONTENT } from '@/blog-content';

export const SERVICES: Record<ServiceCategory, SubService[]> = {
  Location: [
    { 
      id: 'loc-saisonnier', 
      label: 'Saisonnière (Conciergerie)', 
      title: 'L\'Excellence Hôtelière.', 
      description: 'Nous transformons votre propriété en une expérience 5 étoiles. Revenus maximisés, logistique invisible.',
      content: 'La location saisonnière à Paris ne s\'improvise pas. C\'est une industrie de précision. Notre conciergerie intègre un Yield Management algorithmique pour ajuster vos prix nuit après nuit, un ménage de qualité palace, et un accueil 24/7. Nous ne gérons pas des clés, nous gérons votre réputation et votre rentabilité.'
    },
    { 
      id: 'loc-mobilite', 
      label: 'Bail Mobilité', 
      title: 'Flexibilité & Cadre Légal.', 
      description: 'Louez de 1 à 10 mois sans les contraintes de la location touristique.',
      content: 'Idéal pour combler les périodes creuses ou pour les propriétaires souhaitant récupérer leur bien. Nous ciblons exclusivement une clientèle d\'affaires en mobilité.'
    },
    { 
      id: 'loc-longue', 
      label: 'Longue Durée', 
      title: 'La Sérénité du Revenu Passif.', 
      description: 'Gestion classique réinventée. Zéro impayé, zéro vacance.',
      content: 'Sélection drastique des dossiers (revenus > 3.5x loyer), gestion technique réactive, et assurance loyers impayés incluse. Dormez sur vos deux oreilles.'
    }
  ],
  Transaction: [
    { 
      id: 'trans-vendre', 
      label: 'Vendre un bien', 
      title: 'Vendez au prix haut.', 
      description: 'Stratégie de commercialisation aggressive et fichier off-market.',
      content: 'Une vente se joue dans les 7 premiers jours. Photos HD, visite virtuelle, et diffusion ciblée auprès de notre base d\'investisseurs qualifiés.'
    },
    { 
      id: 'trans-chasseur', 
      label: 'Chasseur Immobilier', 
      title: 'Accédez aux biens invisibles.', 
      description: 'Nous scannons 100% du marché pour vous.',
      content: 'Ne perdez plus votre temps. Nous pré-visitons, filtrons et négocions pour vous les meilleures opportunités de Paris.'
    }
  ],
  Fiscalité: [
    { 
      id: 'fisc-lmnp', 
      label: 'LMNP & Optimisation', 
      title: 'L\'Immobilier à 0€ d\'impôt.', 
      description: 'Passez au réel. Effacez vos revenus locatifs.',
      content: 'Le régime LMNP au réel est l\'arme fiscale ultime. Amortissement du bien, déduction des frais. Nous gérons toute la liasse fiscale.'
    },
    { 
      id: 'fisc-sci', 
      label: 'SCI & Holding', 
      title: 'Structurez votre empire.', 
      description: 'Transmission et imposition sur les sociétés.',
      content: 'SCI à l\'IS ou à l\'IR ? SARL de famille ? Nos experts juridiques modélisent le montage optimal pour votre situation patrimoniale.'
    }
  ],
  Gestion: [
    { 
      id: 'gest-travaux', 
      label: 'Travaux & Design', 
      title: 'Créez de la valeur.', 
      description: 'Rénovation énergétique et architecture d\'intérieur.',
      content: 'Un bien rénové se loue 20% plus cher. Nous pilotons vos chantiers de A à Z pour maximiser la valeur vénale et locative.'
    },
    { 
      id: 'gest-admin', 
      label: 'Administratif', 
      title: 'Zéro Papier.', 
      description: 'Nous absorbons la bureaucratie.',
      content: 'Assemblées générales, sinistres assurances, relations syndic. Nous sommes votre interface unique.'
    }
  ]
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'encadrement-loyers-paris',
    title: "Encadrement des loyers Paris : Le Complément Légal",
    excerpt: "Comment dépasser le plafond légalement grâce aux caractéristiques de votre bien.",
    category: 'Location',
    readTime: '5 min',
    date: 'Jan 2025',
    content: BLOG_CONTENT['encadrement-loyers-paris']
  },
  {
    id: 'bail-mobilite-guide',
    title: "Bail Mobilité : Le Guide Complet",
    excerpt: "Louer sans contraintes de durée (1 à 10 mois) : Mode d'emploi.",
    category: 'Location',
    readTime: '6 min',
    date: 'Fév 2025',
    content: BLOG_CONTENT['bail-mobilite-guide']
  },
  {
    id: 'location-saisonniere-reglementation',
    title: "Location Saisonnière & JO : La Règle 2025",
    excerpt: "120 jours, compensation, amendes. Ce qui change pour les propriétaires parisiens.",
    category: 'Location',
    readTime: '4 min',
    date: 'Mars 2025',
    content: BLOG_CONTENT['location-saisonniere-reglementation']
  },
  {
    id: 'bail-societe-faille',
    title: "Bail Société : La faille du système ?",
    excerpt: "Louer à une entreprise pour échapper à l'encadrement et sécuriser le paiement.",
    category: 'Location',
    readTime: '5 min',
    date: 'Avril 2025',
    content: BLOG_CONTENT['bail-societe-faille']
  },
  {
    id: 'gli-vs-garant',
    title: "Assurance Loyer Impayé vs Garant",
    excerpt: "Le comparatif définitif. Pourquoi le garant physique est risqué en 2025.",
    category: 'Location',
    readTime: '4 min',
    date: 'Mai 2025',
    content: BLOG_CONTENT['gli-vs-garant']
  }
];

// Data access functions
export function getAllServices(): Record<ServiceCategory, SubService[]> {
  return SERVICES;
}

export function getServicesByCategory(category: ServiceCategory): SubService[] {
  return SERVICES[category] || [];
}

export function getServiceBySlug(slug: string): SubService | null {
  for (const category of Object.keys(SERVICES) as ServiceCategory[]) {
    const service = SERVICES[category].find(s => s.id === slug);
    if (service) return service;
  }
  return null;
}

export function getCategoryForService(slug: string): ServiceCategory | null {
  for (const category of Object.keys(SERVICES) as ServiceCategory[]) {
    if (SERVICES[category].find(s => s.id === slug)) {
      return category;
    }
  }
  return null;
}

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.id === slug) || null;
}

export function getBlogPostsByCategory(category: ServiceCategory): BlogPost[] {
  return BLOG_POSTS.filter(post => post.category === category);
}
