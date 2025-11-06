import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AuthBootstrap from "./services/AuthBootstrap";

import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Home from "./pages/Home/Home.jsx";
import Teachers from "./pages/Teachers/Teachers.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthBootstrap>
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
        </AuthBootstrap>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
