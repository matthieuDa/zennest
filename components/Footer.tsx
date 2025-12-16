import React from 'react';

export default function Footer({ onHome }: { onHome: () => void }) {
  return (
    <footer className="bg-white border-t border-gray-100 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <button onClick={onHome} className="text-3xl font-bold tracking-tighter block hover:opacity-70 transition-opacity">ZenNest.</button>
              <p className="text-gray-500 font-light text-xl max-w-sm leading-relaxed">
                Nous ne vendons pas de l'immobilier. <br/>Nous défendons des propriétaires.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-gray-900 tracking-tight">Services</h4>
              <ul className="space-y-4 text-gray-500 font-light text-sm">
                <li><button className="hover:text-black transition-colors">Location & Gestion</button></li>
                <li><button className="hover:text-black transition-colors">Transaction & Vente</button></li>
                <li><button className="hover:text-black transition-colors">Fiscalité & Patrimoine</button></li>
                <li><button className="hover:text-black transition-colors">Travaux & Valorisation</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-gray-900 tracking-tight">Contact</h4>
              <p className="text-gray-500 font-light text-sm mb-4">Paris, France</p>
              <a href="mailto:bonjour@zennest.com" className="text-black text-sm font-medium hover:underline decoration-stone-300 underline-offset-4">bonjour@zennest.com</a>
              <div className="mt-8 flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-black">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 text-xs text-gray-400 font-light">
            <p>&copy; {new Date().getFullYear()} ZenNest. Tous droits réservés.</p>
            <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Opérationnel à Paris & IDF</p>
          </div>
        </div>
      </footer>
  );
}