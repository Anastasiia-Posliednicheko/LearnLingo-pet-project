import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/operations";
import { logout } from "../../redux/auth/slice";
import { selectAuthUser, selectAuthPending } from "../../redux/auth/selectors";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

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
    <header style={{
      display:"flex", justifyContent:"space-between", alignItems:"center",
      padding:"20px 40px", borderBottom:"1px solid #eee", background:"#fff", position:"sticky", top:0, zIndex:50,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:32, height:32, background:"#ff6b6b", borderRadius:"50%" }} />
        <span style={{ fontWeight:700, fontSize:20 }}>LearnLingo</span>
      </div>

      <nav style={{ display:"flex", gap:24 }}>
        <NavLink to="/" style={{ textDecoration:"none" }}>Home</NavLink>
        <NavLink to="/teachers" style={{ textDecoration: "none" }}>Teachers</NavLink>
        {user && (
          <NavLink to="/favorites" style={{ textDecoration: "none" }}>Favorites</NavLink>
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
  );
}
