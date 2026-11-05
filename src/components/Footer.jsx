import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03331b] text-white pt-14 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded-full shadow-md">
                <img 
                  src="/images/Orsolumlogo.png" 
                  alt="Orsolum Organic Soil" 
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white block">
                  ORSOLUM
                </span>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-widest">
                  ORGANIC SOIL • 100% PURE G20
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed max-w-sm">
              Dedicated to bringing pure, chemical-free cold pressed Saurashtra Groundnut (G20) oil 
              to Gujarati homes and institutions. Traditional wood pressed quality you can trust.
            </p>

            <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-800 text-xs text-amber-200">
              <p className="font-bold">"The Taste of Tradition, The Trust of Orsolum."</p>
              <p className="text-[11px] text-emerald-300 mt-0.5">કપાસિયા તેલ નહીં, ઓરસોલમ મગફળીના તેલ પર વિશ્વાસ કરો.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home & Hero Spotlight
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
                  Products & Pack Sizes (15L / 5L / 1L)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white text-amber-300 font-bold transition-colors">
                  Customer Dashboard & Cart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('outlets')} className="hover:text-white transition-colors">
                  50+ Outlets in Gujarat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-white transition-colors">
                  Purity vs Cottonseed Oil
                </button>
              </li>
            </ul>
          </div>

          {/* Product Series */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Our Products
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li>Groundnut (G20) 15L / 5L / 1L</li>
              <li>Eco Washroom Cleaner (Acid-Free)</li>
              <li>Herbal Citrus &amp; Neem Floor Cleaner</li>
              <li>Cold-Pressed Herbal Soaps (78% TFM)</li>
              <li>15L Insulated Canvas Waterbag</li>
              <li>Hotels &amp; School Canteens Bulk Pack</li>
            </ul>
          </div>

          {/* Contact / Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300">
              Helpdesk & Depot
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100">
              <a href="tel:7820280700" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 7820 280 700</span>
              </a>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@orsolum.com</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Marketing Yard Road, Rajkot, Saurashtra, Gujarat - 360003</span>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#095835] text-white px-2.5 py-1 rounded-full border border-emerald-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> FSSAI Certified Purity
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <p>© {new Date().getFullYear()} Orsolum Organic Soil. All rights reserved. Gujarat, India.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 font-bold transition-colors text-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

