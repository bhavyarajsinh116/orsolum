import React, { useState } from 'react';
import { X, CheckCircle, MapPin, CreditCard, ShieldCheck, Truck, Sparkles, ArrowRight, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal({ isOpen, onClose, onViewOrders }) {
  const { items, finalTotal, subtotal, discountAmount, deliveryCharge, directSavings, clearCart } = useCart();
  const { user, isLoggedIn, addOrderToHistory } = useAuth();

  const [step, setStep] = useState('details'); // 'details', 'confirmation'
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'upi', 'card'
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Form details
  const [formData, setFormData] = useState({
    name: user ? user.name : 'Rajesh Patel',
    phone: user ? user.phone : '+91 98250 12345',
    city: user ? user.city : 'Rajkot',
    pincode: '360005',
    address: user ? user.address : 'Block B-402, Shivalik Greens, 150 Feet Ring Road, Rajkot, Gujarat'
  });

  if (!isOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    const itemsSummary = items.map(i => `${i.quantity}x ${i.shortName} (${i.size})`).join(', ');

    const orderId = addOrderToHistory({
      itemsSummary,
      total: finalTotal,
      items: items.map(i => ({
        name: i.name,
        size: i.size,
        quantity: i.quantity,
        price: i.price
      }))
    }) || `ORS-${Math.floor(10000 + Math.random() * 90000)}`;

    setConfirmedOrderId(orderId);
    clearCart();
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden z-10 border border-emerald-900/10 max-h-[90vh] flex flex-col animate-scaleUp">
        
        {/* Header */}
        <div className="bg-[#03331b] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                {step === 'details' ? 'Fast Express Checkout' : 'Order Placed Successfully!'}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {step === 'details' ? 'Direct Farm Mill Dispatch Across Gujarat' : 'Your oil is being packaged for dispatch'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Order items preview strip */}
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 text-xs text-[#03331b]">
                <p className="font-bold mb-1">Items to Deliver ({items.length} items):</p>
                <div className="space-y-1">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-gray-700">
                      <span>{item.quantity}x {item.shortName} ({item.size})</span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-emerald-200/80 mt-2 pt-1.5 flex justify-between font-extrabold text-[#03331b]">
                  <span>Total Payable</span>
                  <span className="text-sm">₹{finalTotal}</span>
                </div>
              </div>

              {/* Delivery Details Fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#095835]" />
                  Shipping Address
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Customer Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-0.5">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-0.5">Full Address (Society/Street/Landmark)</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#095835]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-2">
                  <CreditCard className="w-3.5 h-3.5 text-[#095835]" />
                  Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      paymentMethod === 'cod'
                        ? 'border-[#095835] bg-emerald-50 text-[#095835] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs">💵 Cash On</span>
                    <span className="text-[10px] font-semibold">Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      paymentMethod === 'upi'
                        ? 'border-[#095835] bg-emerald-50 text-[#095835] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs">📱 UPI / QR</span>
                    <span className="text-[10px] font-semibold">GPay / PhonePe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      paymentMethod === 'card'
                        ? 'border-[#095835] bg-emerald-50 text-[#095835] font-bold shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs">💳 Cards / Net</span>
                    <span className="text-[10px] font-semibold">Banking</span>
                  </button>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#095835] hover:bg-[#03331b] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-95 transition-all mt-4"
              >
                <span>Confirm & Place Order (₹{finalTotal})</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Confirmed Order #{confirmedOrderId}
                </span>
                <h3 className="text-xl font-black text-[#03331b] mt-2">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-gray-600 mt-1 max-w-xs mx-auto">
                  We have dispatched your order details to our central mill dispatch in Rajkot. 
                  You will receive an SMS and WhatsApp confirmation shortly.
                </p>
              </div>

              <div className="bg-[#fbfaf6] p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between text-gray-600">
                  <span>Recipient:</span>
                  <span className="font-bold text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Destination:</span>
                  <span className="font-bold text-gray-900">{formData.city}, Gujarat</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">Within 48 Hours</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Payment Mode:</span>
                  <span className="font-bold uppercase text-gray-900">{paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2 max-w-sm mx-auto">
                <button
                  onClick={() => {
                    onClose();
                    if (onViewOrders) onViewOrders();
                  }}
                  className="flex-1 py-3 bg-[#095835] hover:bg-[#03331b] text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  View in Customer Dashboard
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-[11px] text-gray-400">
                Direct Helpdesk: <strong>+91 7820 280 700</strong>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

