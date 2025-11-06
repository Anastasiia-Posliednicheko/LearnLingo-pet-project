import { auth } from "../../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";


export const loginUser = async ({ email, password }) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return { uid: res.user.uid, email: res.user.email };
};


export const registerUser = async ({ email, password }) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  return { uid: res.user.uid, email: res.user.email };
};

export const logoutUser = async () => {
  await signOut(auth);
};
