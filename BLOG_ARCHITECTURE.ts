// Types utilisés pour les articles de blog
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

// Structure des fichiers MDX:
// blog-posts/
// ├── encadrement-loyers-paris.mdx
// ├── bail-mobilite-guide.mdx
// ├── location-saisonniere-reglementation.mdx
// ├── bail-societe-faille.mdx
// └── gli-vs-garant.mdx

// Chaque fichier .mdx commence par du front-matter YAML:
// ---
// title: "..."
// excerpt: "..."
// category: "..." (Location, Fiscalité, Gestion, etc.)
// readTime: "5 min"
// date: "Jan 2025"
// ---

// Suivi du contenu Markdown avec les tags JSX pour les composants personnalisés

// Système de chargement:
// lib/blog.ts - Charge les fichiers .mdx avec gray-matter
// - getAllBlogPosts() - Retourne tous les articles
// - getBlogPostBySlug(slug) - Retourne un article spécifique

// Composant de rendu:
// components/sections/BlogPostContent.tsx
// - Utilise react-markdown pour convertir le Markdown en HTML
// - Support des composants personnalisés (h2, h3, ul, li, etc.)
// - Classes Tailwind appliquées automatiquement

// Avantages de cette approche:
// 1. ✅ SSG (Static Site Generation) - Pages pré-générées au build
// 2. ✅ Performance - Zéro requête API, HTML pur serveur
// 3. ✅ Maintenabilité - Chaque article est indépendant et versionné
// 4. ✅ SEO - Métadonnées uniques par article, sitemap automatique
// 5. ✅ Flexibilité - Facile d'ajouter de nouveaux articles
// 6. ✅ Aucune base de données ni serveur CMS requis
