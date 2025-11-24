import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { logout } from "../../redux/auth/slice";
import { selectAuthUser, selectAuthPending } from "../../redux/auth/selectors";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

import css from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const pending = useSelector(selectAuthPending);

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };

  useEffect(() => {
  const handleRegister = () => setOpenRegister(true);
  window.addEventListener("open-register", handleRegister);

  return () => {
    window.removeEventListener("open-register", handleRegister);
  };
}, []);

  return (
    <div className={css.container}>
      <header className={css.header}>
        <div>
          <div/>
          <p className={css.title}>LearnLingo</p>
        </div>
        <nav className={css.navigation}>
          <NavLink to="/" className={css.link}>Home</NavLink>
          <NavLink to="/teachers" className={({ isActive }) => (isActive ? `${css.link} ${css.active}` : css.link)}>Teachers</NavLink>
          {user && (
            <NavLink to="/favorites" className={css.link}>Favorites</NavLink>
            )}
      
        </nav>
        <div style={{ display:"flex", gap:12 }}>
          {user ? (
            <>
              <span>{user.displayName || user.name}</span>
              <button onClick={handleLogout} disabled={pending}>Log out</button>
            </>
          ) : (
            <>
              <button onClick={() => setOpenLogin(true)}>Log in</button>
              <button onClick={() => setOpenRegister(true)}>Register</button>
            </>
          )}
        </div>
        {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
        {openRegister && <RegisterModal onClose={() => setOpenRegister(false)} />}
      </header>
    </div>
  );
}
