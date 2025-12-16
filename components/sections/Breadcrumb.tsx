'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbProps {
  category: string
  title: string
}

export default function Breadcrumb({ category, title }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-stone-500 mb-8">
      <Link href="/" className="hover:text-black transition-colors">
        Accueil
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/blog" className="hover:text-black transition-colors">
        Blog
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-black font-medium truncate max-w-xs">{title}</span>
    </nav>
  )
}
