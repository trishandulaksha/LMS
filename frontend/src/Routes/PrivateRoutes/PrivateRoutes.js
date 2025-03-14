import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("jwtToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("jwtToken")); // Update token state when storage changes
    };

    // Listen to sessionStorage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange); // Cleanup listener
    };
  }, []);

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
