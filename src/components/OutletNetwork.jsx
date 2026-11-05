import React, { useState } from 'react';
import { MapPin, Phone, Clock, Store, Search, ExternalLink, CheckCircle } from 'lucide-react';
import { OUTLETS } from '../data/products';

export default function OutletNetwork() {
  const [searchCity, setSearchCity] = useState('');
  const [dealershipSubmitted, setDealershipSubmitted] = useState(false);

  const filteredOutlets = OUTLETS.filter(o =>
    o.city.toLowerCase().includes(searchCity.toLowerCase()) ||
    o.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#095835] text-xs font-bold uppercase tracking-wider mb-2">
          <Store className="w-3.5 h-3.5" />
          <span>Physical Store Network</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#03331b] tracking-tight">
          50+ Orsolum Outlets Across Gujarat
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Pick up freshly pressed G-20 Groundnut Oil directly from your nearest authorized Orsolum depot or partner store.
        </p>

        {/* Search */}
        <div className="mt-5 max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search by city (Rajkot, Ahmedabad, Surat...)"
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#095835]"
          />
        </div>
      </div>

      {/* Outlets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredOutlets.map((outlet, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-extrabold text-[#03331b] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#095835]" />
                  {outlet.city} Outlet
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Open Today
                </span>
              </div>

              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {outlet.address}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{outlet.timings}</span>
              </div>

              <a
                href={`tel:${outlet.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 font-bold text-[#095835] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{outlet.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Franchise / Dealership Inquiry Card */}
      <div className="mt-12 bg-gradient-to-r from-[#03331b] to-[#095835] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Franchise & Dealership
          </span>
          <h3 className="text-xl sm:text-2xl font-black mt-2">
            Want to open an Orsolum Outlet in your Taluka/City?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-lg">
            Join Gujarat's fastest growing pure cold-pressed oil brand. Direct factory supply, attractive distributor margins, and full local marketing support.
          </p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          {dealershipSubmitted ? (
            <div className="bg-emerald-800/80 p-4 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-200 border border-emerald-500">
              <CheckCircle className="w-5 h-5 text-emerald-300" />
              <span>Inquiry received! Our team will contact you in 24 hours.</span>
            </div>
          ) : (
            <button
              onClick={() => setDealershipSubmitted(true)}
              className="w-full md:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Apply for Dealership / Bulk Supply →
            </button>
          )}
        </div>
      </div>

    </section>
  );
}

