import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setPending } from "../redux/auth/slice";

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ id: user.id, email: user.email, displayName: user.displayName || null }));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setPending(false));
    });
    return () => unsub();
  }, [dispatch]);

  return children;
}
