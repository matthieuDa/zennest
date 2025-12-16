'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQItem } from '@/types'

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items || items.length === 0) return null

  return (
    <div className="my-16 bg-stone-50 rounded-3xl p-8 md:p-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Questions Fréquentes</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden border border-stone-200">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
              <ChevronDown 
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 pt-2">
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
