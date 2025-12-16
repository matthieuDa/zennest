import React, { useState } from 'react';
import { X, ArrowRight, Check, MapPin, Ruler, Calendar } from 'lucide-react';

interface FunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'project' | 'details' | 'contact' | 'success';

export default function FunnelModal({ isOpen, onClose }: FunnelModalProps) {
  const [step, setStep] = useState<Step>('project');
  const [formData, setFormData] = useState({
    projectType: '',
    location: '',
    surface: '',
    timeframe: '',
    name: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 'project') setStep('details');
    else if (step === 'details') setStep('contact');
    else if (step === 'contact') {
        // Simulate API call to CRM
        setTimeout(() => setStep('success'), 500);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-zoom-in">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-stone-100">
           <div>
             <h3 className="text-xl font-bold text-gray-900">Étude de projet</h3>
             <p className="text-sm text-stone-500 font-light">Étape {step === 'project' ? '1' : step === 'details' ? '2' : '3'} sur 3</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
             <X className="w-6 h-6 text-stone-400" />
           </button>
        </div>

        {/* Body */}
        <div className="p-8 md:p-10 min-h-[400px]">
          
          {step === 'project' && (
            <div className="space-y-6 animate-fade-in-up">
               <h2 className="text-3xl font-bold tracking-tight mb-8">Quel est votre objectif ?</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Vendre un bien', 'Mise en location', 'Optimisation Fiscale', 'Recherche (Achat)'].map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => { updateField('projectType', opt); handleNext(); }}
                      className="group flex items-center justify-between p-6 rounded-2xl border border-stone-200 hover:border-black hover:bg-stone-50 transition-all text-left"
                    >
                      <span className="font-medium text-lg text-gray-900">{opt}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6 animate-fade-in-up">
               <h2 className="text-3xl font-bold tracking-tight mb-8">Dites-nous en plus.</h2>
               
               <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Localisation</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Paris, 75011..." 
                            className="w-full bg-stone-50 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                            value={formData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Surface (m²)</label>
                        <div className="relative">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                            <input 
                                type="number" 
                                placeholder="50" 
                                className="w-full bg-stone-50 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                                value={formData.surface}
                                onChange={(e) => updateField('surface', e.target.value)}
                            />
                        </div>
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Échéance</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                            <select 
                                className="w-full bg-stone-50 pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all appearance-none"
                                value={formData.timeframe}
                                onChange={(e) => updateField('timeframe', e.target.value)}
                            >
                                <option value="">Choisir...</option>
                                <option value="immediat">Immédiat</option>
                                <option value="3_months">3 mois</option>
                                <option value="6_months">6 mois +</option>
                            </select>
                        </div>
                     </div>
                  </div>
               </div>
               
               <div className="pt-6 flex justify-end">
                   <button 
                    onClick={handleNext}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold hover:opacity-80 transition-opacity"
                   >
                       Continuer
                   </button>
               </div>
            </div>
          )}

          {step === 'contact' && (
            <div className="space-y-6 animate-fade-in-up">
               <h2 className="text-3xl font-bold tracking-tight mb-2">Dernière étape.</h2>
               <p className="text-stone-500 mb-6">Où pouvons-nous vous envoyer l'analyse prévisionnelle ?</p>
               
               <div className="space-y-4">
                  <input 
                      type="text" 
                      placeholder="Nom complet" 
                      className="w-full bg-stone-50 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                  />
                  <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full bg-stone-50 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                  />
                  <input 
                      type="tel" 
                      placeholder="Téléphone" 
                      className="w-full bg-stone-50 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                  />
               </div>

               <div className="pt-6 flex justify-end">
                   <button 
                    onClick={handleNext}
                    className="bg-black text-white w-full py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg"
                   >
                       Recevoir mon étude
                   </button>
               </div>
            </div>
          )}

          {step === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center animate-zoom-in">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
                    <Check className="w-10 h-10" strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Message reçu.</h2>
                <p className="text-stone-500 max-w-sm mx-auto mb-8">
                    Un expert ZenNest dédié analyse votre demande. Vous recevrez une réponse ou une proposition de rendez-vous sous 2 heures.
                </p>
                <button onClick={onClose} className="text-black font-semibold border-b border-black pb-0.5 hover:opacity-70">
                    Retour au site
                </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}