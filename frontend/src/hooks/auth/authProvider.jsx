//authprovider.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { authFetch } from "./authFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = async (email, password) => {
  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  const userData = {
    id: data.userId,
    token: data.token,
  };

  localStorage.setItem("user", JSON.stringify(userData));
  setUser(userData);
  navigate("/notes");
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook lives in SAME file
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
