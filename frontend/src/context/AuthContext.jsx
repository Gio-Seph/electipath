import React, { createContext, useContext, useState } from "react";
import API_BASE_URL from "../config/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [access, setAccess] = useState(localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(localStorage.getItem("refresh") || null);

  // -----------------------------------------------------------
  // LOGIN — store access & refresh tokens correctly
  // -----------------------------------------------------------
  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Login failed:", res.status, errorData);
        return null;
      }

      const data = await res.json();

      // Debug: Log what we receive from backend
      console.log("Login response data:", data);
      console.log("User data from backend:", data.user);

      // MUST STORE BOTH TOKENS AND USER DATA (including gender and first_name)
      const userData = {
        username: data.user?.username || username,
        gender: data.user?.gender || 'male',
        full_name: data.user?.full_name || '',
        first_name: data.user?.first_name || data.user?.username || username // Use first_name from backend
      };
      
      console.log("Storing user data:", userData);
      
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(userData));

      setAccess(data.access);
      setRefresh(data.refresh);
      setUser(userData);

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return null;
    }
  };

  // -----------------------------------------------------------
  // REFRESH TOKEN — get a new access token when expired
  // -----------------------------------------------------------
  const refreshAccessToken = async () => {
    if (!refresh) {
      console.warn("No refresh token available");
      return null;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) {
        console.warn("Refresh failed. Logging out...");
        logout();
        return null;
      }

      const data = await res.json();

      // Update new access token
      localStorage.setItem("access", data.access);
      setAccess(data.access);

      return data.access;
    } catch (err) {
      console.error("Refresh error:", err);
      logout();
      return null;
    }
  };

  // -----------------------------------------------------------
  // AUTH FETCH — auto-refresh + retry request
  // -----------------------------------------------------------
  const authFetch = async (url, options = {}) => {
    // 1. Include access token
    const headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: access ? `Bearer ${access}` : "",
    };

    let res = await fetch(url, { ...options, headers });

    // 2. If token is expired → try refresh
    if (res.status === 401) {
      console.warn("Access token expired. Attempting refresh...");

      const newAccess = await refreshAccessToken();

      if (!newAccess) return res;

      // 3. Retry request with new token
      const retryHeaders = {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccess}`,
      };

      res = await fetch(url, { ...options, headers: retryHeaders });
    }

    return res;
  };

  // -----------------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setAccess(null);
    setRefresh(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}
