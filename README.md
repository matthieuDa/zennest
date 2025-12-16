# ZenNest - Gestion Immobilière de Prestige

## 🏗️ Architecture

Application Next.js 15+ (App Router) avec React 19, TypeScript, et Tailwind CSS.

### Structure du projet

```
/app                    # Pages et layouts Next.js (Server Components par défaut)
  /api/contact         # API routes pour les formulaires
  /blog/[slug]         # Pages de blog dynamiques
  /services/[slug]     # Pages de services dynamiques
  layout.tsx           # Layout racine avec metadata SEO
  page.tsx             # Page d'accueil
  
/components
  /layout              # Navbar, Footer, MegaMenu
  /sections            # Hero, Services, Blog sections
  /ui                  # Composants atomiques réutilisables
  
/lib                   # Utilitaires et accès aux données
  data.ts              # Fonctions d'accès aux services et articles
  schema.ts            # Générateurs de JSON-LD pour le SEO
  
/types.ts              # Définitions TypeScript
/blog-content.ts       # Contenu des articles de blog
```

## 🚀 Développement local

**Prérequis:** Node.js 18+

### Installation

```bash
npm install
```

### Lancement du serveur de développement

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm start
```

## 🎨 Design System

- **Couleurs:** Palette stone (50-950) pour un design "Silent Luxury"
- **Typographie:** Inter via Google Fonts
- **Animations:** CSS natives + Tailwind pour les transitions
- **Responsive:** Mobile-first, breakpoints Tailwind standard

## 📄 Pages

- `/` - Page d'accueil (Hero + Services + Philosophie)
- `/services/[slug]` - Pages de services individuels (9 services)
- `/blog/[slug]` - Articles de blog (5 articles)
- `/api/contact` - Endpoint API pour le formulaire de contact

## 🔍 SEO

- Metadata API Next.js pour tous les titres/descriptions
- Sitemap.xml généré automatiquement
- Robots.txt configuré
- JSON-LD structured data (Article, Service, Organization)
- Images optimisées avec next/image

## 🛠️ Technologies

- **Framework:** Next.js 15+ (App Router, React Server Components)
- **UI:** React 19, Tailwind CSS, Lucide Icons
- **Validation:** Zod + React Hook Form (préparé)
- **Animations:** Framer Motion (installé, prêt à utiliser)
- **Graphiques:** Recharts (pour futurs calculateurs)

## 📦 Scripts disponibles

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm start        # Serveur de production
npm run lint     # Linting (si configuré)
```

## 🌐 Déploiement

L'application est prête pour être déployée sur:
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- Tout hébergeur supportant Node.js

### Variables d'environnement

Créer un fichier `.env.local`:

```env
# Pour l'envoi d'emails (optionnel)
RESEND_API_KEY=your_api_key_here

# Pour les webhooks (optionnel)
SLACK_WEBHOOK_URL=your_webhook_url_here
```

## 📝 Prochaines étapes

- [ ] Implémenter le FunnelModal avec React Hook Form + Zod
- [ ] Créer la page blog index avec recherche
- [ ] Développer les calculateurs (RentabilitySimulator, NotaryFeesCalculator)
- [ ] Intégrer Framer Motion pour les transitions de page
- [ ] Connecter l'API contact à un service d'email (Resend/SendGrid)
- [ ] Tests d'accessibilité et optimisation Lighthouse

## 📄 License

© 2025 ZenNest. Tous droits réservés.

