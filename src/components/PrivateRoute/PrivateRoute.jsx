import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { user, loading } = useSelector((s) => s.auth);
  const location = useLocation();
    
    if (loading) return null;
    if (!user) 
    return <Navigate to="/teachers" state={{ from: location }} replace />;
  

  return children;
}