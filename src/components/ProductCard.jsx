import React, { useState } from 'react';
import { Star, ShoppingCart, Zap, Check, Eye, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || "15L");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const activeVariant = product.variants.find(v => v.size === selectedSize) || product.variants[0];

  const handleAdd = () => {
    addToCart(product, activeVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addToCart(product, activeVariant, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      {/* Top Media / Image Area */}
      <div className="relative bg-gradient-to-b from-[#f5f2ea] to-white p-6 flex items-center justify-center min-h-[220px]">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="bg-[#095835] text-amber-300 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
          {activeVariant.popular && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              🔥 MOST ORDERED
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-gray-700 hover:text-[#095835] rounded-full shadow-sm border border-gray-200 opacity-90 hover:opacity-100 transition-opacity"
          title="Quick Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-44 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/oil.jpg";
          }}
        />

        {/* Bottom Purity Tag */}
        <div className="absolute bottom-2 left-4 right-4 flex items-center justify-between text-[11px] text-gray-600 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-gray-200">
          <span className="font-semibold text-emerald-800">100% Wood Pressed</span>
          <span className="font-bold text-amber-700">{activeVariant.weight}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#03331b] leading-tight group-hover:text-[#095835] transition-colors">
            {product.name}
          </h3>

          {/* Gujarati Subtitle */}
          <p className="text-xs font-semibold text-emerald-800 mt-1">
            {product.gujaratiTitle}
          </p>

          <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
            {product.tagline}
          </p>

          {/* Variant Selector Pills */}
          <div className="mt-4">
            <span className="text-[11px] uppercase font-bold text-gray-500 block mb-1.5">
              Select Quantity / Size:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v) => {
                const isSelected = selectedSize === v.size;
                return (
                  <button
                    key={v.size}
                    onClick={() => setSelectedSize(v.size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#095835] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {v.size}
                    <span className="ml-1 text-[10px] opacity-80">
                      (₹{v.price})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart Area */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#03331b]">
                  ₹{activeVariant.price}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{activeVariant.mrp}
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-700">
                You Save ₹{activeVariant.save}
              </span>
            </div>

            {/* In stock badge */}
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Fresh Batch
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {/* Quantity selector */}
            <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 px-1.5 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
              >
                -
              </button>
              <span className="w-6 text-center font-extrabold text-xs text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#095835] hover:bg-[#03331b] text-white active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 text-amber-300" /> Add to Cart
                </>
              )}
            </button>

            {/* Quick Buy */}
            <button
              onClick={handleBuyNow}
              className="py-2.5 px-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-500 text-slate-950 transition-colors shadow-sm"
              title="Buy Now"
            >
              <Zap className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

