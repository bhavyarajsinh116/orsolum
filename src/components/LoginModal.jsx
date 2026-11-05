import React, { useState } from 'react';
import { X, User, Phone, Mail, ShieldCheck, ArrowRight, Zap, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose, onSuccess }) {
  const { loginWithDemo, loginWithCredentials } = useAuth();
  
  const [mode, setMode] = useState('otp'); // 'otp', 'email', 'register'
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  
  // Custom register state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Rajkot');
  const [regAddress, setRegAddress] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    loginWithCredentials({
      name: "Valued Customer",
      phone: `+91 ${phone}`,
      city: "Rajkot, Gujarat",
      address: "Gujarat, India"
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    loginWithCredentials({
      name: regName || "New Patron",
      phone: regPhone || "+91 98250 00000",
      city: regCity,
      address: regAddress
    });
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleDemo = () => {
    loginWithDemo();
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10 border border-emerald-900/10 animate-scaleUp">
        
        {/* Header */}
        <div className="bg-[#03331b] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <img 
            src="/images/Orsolumlogo.png" 
            alt="Orsolum" 
            className="h-12 w-auto mx-auto mb-2 bg-white rounded-full p-1"
          />

          <h3 className="text-xl font-extrabold tracking-tight">
            Customer Portal & Store
          </h3>
          <p className="text-xs text-amber-200 mt-1">
            Access Member Pricing & Direct Saurashtra Farm Dispatches
          </p>
        </div>

        {/* Quick Demo Login Banner */}
        <div className="p-4 bg-amber-50 border-b border-amber-200/60">
          <button
            onClick={handleDemo}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>⚡ 1-Click Instant Demo Login (Rajesh Patel)</span>
          </button>
          <p className="text-[10px] text-amber-800 text-center mt-1.5 font-medium">
            Instantly view Customer Dashboard, past orders, and add oil to cart!
          </p>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-2 bg-gray-100/80 border-b border-gray-200 text-xs font-bold">
          <button
            onClick={() => setMode('otp')}
            className={`py-2 rounded-xl transition-all ${
              mode === 'otp' ? 'bg-white text-[#095835] shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Mobile OTP Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-[#095835] shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            New Customer Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {mode === 'otp' && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98250 12345"
                        className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835] font-semibold"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      We will send a 4-digit verification code.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#095835] hover:bg-[#03331b] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <span>Send Login OTP</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center mb-2">
                    <p className="text-xs text-gray-600">
                      OTP sent to <strong>+91 {phone}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-emerald-700 font-bold hover:underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1 text-center">
                      Enter 4-Digit Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={otpVal}
                      onChange={(e) => setOtpVal(e.target.value)}
                      placeholder="1 2 3 4"
                      className="w-40 mx-auto block py-2 text-center text-xl tracking-[0.5em] font-extrabold bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
                    />
                    <span className="text-[10px] text-gray-400 mt-1 block text-center">
                      (Enter any 4 digits to proceed)
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#095835] hover:bg-[#03331b] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Verify & Enter Dashboard</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Bhavesh Patel"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="e.g. 98251 23456"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City in Gujarat</label>
                <select
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
                >
                  <option value="Rajkot">Rajkot</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Junagadh">Junagadh</option>
                  <option value="Jamnagar">Jamnagar</option>
                  <option value="Bhavnagar">Bhavnagar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Flat No, Society, Landmark"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#095835]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#095835] hover:bg-[#03331b] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>Complete Customer Registration</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Guaranteed 100% data privacy & zero spam</span>
          </div>
        </div>

      </div>
    </div>
  );
}

