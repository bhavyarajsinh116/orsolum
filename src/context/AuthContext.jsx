import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const INITIAL_DEMO_USER = {
  id: "user-101",
  name: "Rajesh Patel",
  phone: "+91 98250 12345",
  email: "rajesh.patel@gujaratmail.com",
  city: "Rajkot",
  address: "Block B-402, Shivalik Greens, 150 Feet Ring Road, Rajkot, Gujarat - 360005",
  coins: 450,
  tier: "Gold Patron",
  joinedDate: "October 2024",
  orders: [
    {
      orderId: "ORS-89214",
      date: "02 Nov 2026",
      itemsSummary: "1x Orsolum Oil – Groundnut (G20) 15L Tin",
      total: 3345,
      status: "Delivered",
      deliveryDate: "04 Nov 2026",
      items: [
        { name: "Orsolum Oil – Groundnut (G20)", size: "15L", quantity: 1, price: 3345 }
      ]
    },
    {
      orderId: "ORS-76190",
      date: "14 Sep 2026",
      itemsSummary: "2x 5L Groundnut Jar + 1x 1L Mustard",
      total: 2808,
      status: "Delivered",
      deliveryDate: "16 Sep 2026",
      items: [
        { name: "Orsolum Groundnut Oil", size: "5L", quantity: 2, price: 1299 },
        { name: "Raw Mustard Oil", size: "1L", quantity: 1, price: 210 }
      ]
    }
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('orsolum_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('orsolum_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('orsolum_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const loginWithDemo = () => {
    setUser(INITIAL_DEMO_USER);
    setIsLoginModalOpen(false);
  };

  const loginWithCredentials = ({ name, phone, email, city, address }) => {
    const newUser = {
      id: `user-${Date.now().toString().slice(-4)}`,
      name: name || "Valued Customer",
      phone: phone || "+91 98765 43210",
      email: email || "customer@orsolum.com",
      city: city || "Gujarat",
      address: address || "Gujarat, India",
      coins: 100,
      tier: "Silver Member",
      joinedDate: "Today",
      orders: []
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const addOrderToHistory = (orderData) => {
    if (!user) return;
    const newOrder = {
      orderId: `ORS-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      itemsSummary: orderData.itemsSummary,
      total: orderData.total,
      status: "Processing (Dispatched within 24h)",
      deliveryDate: "Estimated in 2-3 days",
      items: orderData.items
    };

    const updatedUser = {
      ...user,
      coins: user.coins + Math.floor(orderData.total / 100) * 5,
      orders: [newOrder, ...(user.orders || [])]
    };

    setUser(updatedUser);
    return newOrder.orderId;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginWithDemo,
        loginWithCredentials,
        logout,
        addOrderToHistory,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

