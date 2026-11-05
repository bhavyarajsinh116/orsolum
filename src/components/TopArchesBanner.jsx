import React from 'react';
import { Store, School, HeartHandshake, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function TopArchesBanner({ onNavigateToOutlets, onNavigateToCommercial }) {
  return (
    <div className="w-full bg-[#03331b] py-6 px-4 relative overflow-hidden border-b-4 border-amber-500/80">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f5b027_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Floating circular brand badge */}
        <div className="flex justify-center -mt-3 mb-4">
          <div className="bg-[#03331b] ring-4 ring-amber-400/90 rounded-full p-2.5 shadow-xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/images/Orsolumlogo.png" 
              alt="Orsolum Organic Soil" 
              className="h-16 w-16 object-contain rounded-full bg-white p-1"
            />
          </div>
        </div>

        {/* 3 Arches Grid Container */}
        <div className="relative bg-[#095835]/90 rounded-3xl p-4 sm:p-6 shadow-2xl border border-emerald-400/20 backdrop-blur-sm">
          {/* Vertical ORSOLUM brand typography markers on desktop */}
          <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-emerald-200/40 font-extrabold tracking-[0.35em] text-sm select-none pointer-events-none">
            ORSOLUM
          </div>
          <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center text-emerald-200/40 font-extrabold tracking-[0.35em] text-sm select-none pointer-events-none">
            ORSOLUM
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {/* Arch 1: Orsolum Outlet */}
            <div 
              onClick={onNavigateToOutlets}
              className="group cursor-pointer bg-gradient-to-b from-white via-amber-50/30 to-emerald-50/50 rounded-t-full rounded-b-2xl p-6 text-center border-2 border-emerald-700/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#095835] flex items-center justify-center mb-2 group-hover:bg-[#095835] group-hover:text-amber-300 transition-colors">
                <Store className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#03331b] tracking-tight">
                  Orsolum Outlet
                </h3>
                <div className="inline-block mt-2 px-3 py-1 bg-emerald-700 text-white text-xs font-bold rounded-full shadow-sm">
                  50+ Outlets
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  Across Gujarat • Fresh Direct Supply
                </p>
              </div>

              <span className="text-[11px] font-bold text-emerald-700 group-hover:underline flex items-center gap-1 mt-2">
                Find Nearest Outlet →
              </span>
            </div>

            {/* Arch 2: Thank You For Trusting (Center Feature) */}
            <div className="bg-gradient-to-b from-emerald-50 via-white to-amber-50 rounded-t-full rounded-b-2xl p-6 text-center border-2 border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-between min-h-[240px] relative overflow-hidden">
              <div className="absolute top-2 right-2 text-amber-500">
                <Sparkles className="w-4 h-4 animate-spin [animation-duration:8s]" />
              </div>

              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2 shadow-inner">
                <HeartHandshake className="w-8 h-8 text-[#095835]" />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wider text-amber-800 font-bold mb-1">
                  100% PURE & NATURAL
                </p>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#03331b] leading-tight">
                  Thank You For Trusting Orsolum Oil
                </h3>
                <p className="text-xs text-gray-700 mt-2 font-medium italic">
                  "કપાસિયા તેલ નહીં, પરંતુ ઓરસોલમ મગફળીના તેલ પર વિશ્વાસ કરો."
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#095835] text-amber-300 font-bold px-3 py-1 rounded-full shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> G-20 Grade
                </span>
                <span className="text-[11px] bg-amber-400 text-[#03331b] font-bold px-2.5 py-1 rounded-full">
                  Zero Chemicals
                </span>
              </div>
            </div>

            {/* Arch 3: Hotel & School */}
            <div 
              onClick={onNavigateToCommercial}
              className="group cursor-pointer bg-gradient-to-b from-white via-emerald-50/20 to-amber-50/40 rounded-t-full rounded-b-2xl p-6 text-center border-2 border-emerald-700/30 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between min-h-[220px]"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#095835] flex items-center justify-center mb-2 group-hover:bg-[#095835] group-hover:text-amber-300 transition-colors">
                <School className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#03331b] tracking-tight">
                  Hotel & School
                </h3>
                <div className="inline-block mt-2 px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full shadow-sm">
                  Institutional Supply
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  હોટેલો અને સ્કૂલોમાં આરોગ્યપ્રદ તેલની પહેલી પસંદ
                </p>
              </div>

              <span className="text-[11px] font-bold text-emerald-700 group-hover:underline flex items-center gap-1 mt-2">
                Bulk Wholesale Pricing →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

