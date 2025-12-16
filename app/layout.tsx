import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ZenNest - Gestion Immobilière de Prestige à Paris',
    template: '%s | ZenNest'
  },
  description: 'Le représentant exclusif des propriétaires exigeants. Valorisation, Fiscalité, Gestion. Vos intérêts, rien d\'autre.',
  keywords: ['gestion locative Paris', 'immobilier de prestige', 'location saisonnière', 'LMNP', 'conciergerie Paris', 'chasseur immobilier'],
  authors: [{ name: 'ZenNest' }],
  creator: 'ZenNest',
  publisher: 'ZenNest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://zennest.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZenNest - Gestion Immobilière de Prestige à Paris',
    description: 'Le représentant exclusif des propriétaires exigeants. Valorisation, Fiscalité, Gestion.',
    url: 'https://zennest.fr',
    siteName: 'ZenNest',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZenNest - Gestion Immobilière de Prestige à Paris',
    description: 'Le représentant exclusif des propriétaires exigeants. Valorisation, Fiscalité, Gestion.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-screen flex flex-col selection:bg-stone-200 selection:text-black">
        {children}
      </body>
    </html>
  )
}
