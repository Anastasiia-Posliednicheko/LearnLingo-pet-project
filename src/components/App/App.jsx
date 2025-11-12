import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";

import Home from "../../pages/Home/Home.jsx";
import Teachers from "../../pages/Teachers/Teachers.jsx";
import Favorites from "../../pages/Favorites/Favorites.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
