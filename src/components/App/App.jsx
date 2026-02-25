import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "../Header/Header.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";

import Home from "../../pages/Home/Home.jsx";
import Teachers from "../../pages/Teachers/Teachers.jsx";
import Favorites from "../../pages/Favorites/Favorites.jsx";
import css from "./App.module.css";

export default function App() {
  return (
    <>
      <div className={css.container}>
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
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "10px", padding: "12px 16px" }
        }}
      />
    </>
  );
}
