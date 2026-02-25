import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import Header from "../Header/Header.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import css from "./App.module.css";

const Home = lazy(() => import("../../pages/Home/Home.jsx"));
const Teachers = lazy(() => import("../../pages/Teachers/Teachers.jsx"));
const Favorites = lazy(() => import("../../pages/Favorites/Favorites.jsx"));

function PageLoader() {
  return <div className={css.pageLoader}>Loading...</div>;
}

export default function App() {
  return (
    <>
      <div className={css.container}>
        <Header />

        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "10px", padding: "12px 16px" },
        }}
      />
    </>
  );
}