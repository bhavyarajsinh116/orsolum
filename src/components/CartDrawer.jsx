import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    mrpTotal,
    directSavings,
    deliveryCharge,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    finalTotal,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyCoupon(inputCoupon);
    setInputCoupon('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slideLeft">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-[#03331b] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">Your Cart</h2>
                  <p className="text-[11px] text-emerald-200">{cartCount} items selected</p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-emerald-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Progress */}
            <div className="mt-3 bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-700/40">
              <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-200 mb-1.5">
                {remainingForFree === 0 ? (
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE Express Delivery Unlocked across Gujarat!
                  </span>
                ) : (
                  <span>Add ₹{remainingForFree} more for <strong>FREE Delivery</strong></span>
                )}
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-emerald-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#095835] flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-extrabold text-gray-800">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Experience pure Saurashtra cold-pressed G-20 groundnut oil for your family.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-[#095835] text-white font-bold rounded-full text-xs shadow hover:bg-[#03331b] transition-all"
                >
                  Explore Products & Sizes
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-[#fbfaf6] p-3 rounded-2xl border border-gray-200 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-gray-200 shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/oil.jpg";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#03331b] truncate">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md mt-0.5">
                      {item.sizeLabel}
                    </span>

                    <div className="flex items-baseline justify-between mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-black text-[#03331b]">
                          ₹{item.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{item.mrp * item.quantity}
                        </span>
                      </div>

                      {/* Quantity adjuster */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded text-xs"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-200 bg-white space-y-3">
              
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. ORSOLUM100)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835] uppercase font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200">
                  <span className="font-semibold">Code applied: <strong>{couponCode}</strong> (-₹{discountAmount})</span>
                  <button onClick={removeCoupon} className="text-red-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              )}

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>Cart Total (MRP)</span>
                  <span className="font-semibold text-gray-900">₹{mrpTotal}</span>
                </div>

                <div className="flex justify-between text-emerald-700">
                  <span>Farm Direct Savings</span>
                  <span className="font-bold">-₹{directSavings}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-bold">-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[#03331b]">Final Amount</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-[#03331b]">
                      ₹{finalTotal}
                    </span>
                    <span className="block text-[10px] text-gray-400">All Taxes Included</span>
                  </div>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#095835] hover:bg-[#03331b] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout • Cash on Delivery / UPI</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

