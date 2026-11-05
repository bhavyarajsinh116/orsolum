import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('orsolum_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('orsolum_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product, variant, quantity = 1) => {
    const itemId = `${product.id}-${variant.size}`;
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            shortName: product.shortName,
            image: product.image,
            size: variant.size,
            sizeLabel: variant.label,
            price: variant.price,
            mrp: variant.mrp,
            save: variant.save,
            weight: variant.weight,
            quantity: quantity
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.shortName} (${variant.size}) to cart!`);
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    showToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountAmount(0);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORSOLUM100') {
      setCouponCode('ORSOLUM100');
      setDiscountAmount(100);
      showToast("Coupon applied! ₹100 discount added", "success");
      return { success: true, message: "₹100 discount applied!" };
    } else if (clean === 'FIRST50') {
      setCouponCode('FIRST50');
      setDiscountAmount(50);
      showToast("Welcome coupon applied! ₹50 discount added", "success");
      return { success: true, message: "₹50 discount applied!" };
    } else {
      showToast("Invalid coupon code. Try ORSOLUM100", "error");
      return { success: false, message: "Invalid code" };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
    showToast("Coupon removed", "info");
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const mrpTotal = items.reduce((total, item) => total + item.mrp * item.quantity, 0);
  const directSavings = mrpTotal - subtotal;
  const deliveryCharge = subtotal >= 999 || items.length === 0 ? 0 : 70;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
        setIsCartOpen,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

