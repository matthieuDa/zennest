'use client'

import React, { useState } from 'react'
import { Mail, Phone, MessageSquare, Send } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    propertyType: '',
    honeypot: '' // Anti-spam
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '', propertyType: '', honeypot: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-32 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Parlons de votre projet
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-12 font-light">
              Nos experts immobiliers analysent votre situation gratuitement. 
              Aucun engagement, juste une discussion transparente sur vos objectifs patrimoniaux.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <a href="mailto:contact@zennest.fr" className="text-stone-400 hover:text-white transition-colors">
                    contact@zennest.fr
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold mb-1">Téléphone</p>
                  <a href="tel:+33123456789" className="text-stone-400 hover:text-white transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 animate-fade-in-up delay-200">
            <form onSubmit={handleSubmit} className="bg-white text-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl">
              
              {/* Honeypot (hidden) */}
              <input 
                type="text" 
                name="honeypot" 
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }} 
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Nom complet *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors outline-none"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Email *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors outline-none"
                    placeholder="jean@exemple.fr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Téléphone</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors outline-none"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-900">Type de bien</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors outline-none appearance-none bg-white"
                  >
                    <option value="">Sélectionnez</option>
                    <option value="appartement">Appartement</option>
                    <option value="maison">Maison</option>
                    <option value="immeuble">Immeuble</option>
                    <option value="commercial">Local commercial</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2 text-gray-900">Message *</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-black focus:ring-2 focus:ring-black/5 transition-colors outline-none resize-none"
                  placeholder="Décrivez votre projet immobilier..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : status === 'success' ? (
                  '✓ Message envoyé !'
                ) : status === 'error' ? (
                  '✗ Erreur, réessayez'
                ) : (
                  <>
                    Envoyer le message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="mt-4 text-center text-emerald-600 font-medium">
                  Merci ! Nous vous recontacterons sous 24h.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
