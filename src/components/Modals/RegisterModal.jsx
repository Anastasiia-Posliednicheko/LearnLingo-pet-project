import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { setUser, setPending, setError } from "../../redux/auth/slice";
import { selectAuthPending, selectAuthError } from "../../redux/auth/selectors";
import { auth } from "../../services/firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";

import Authmodal from "./AuthModal";
import css from "./RegisterModal.module.css";

const schema = yup.object({
  name: yup.string().min(2, "Too short").max(50, "Too Long").required("Required"),
  email: yup.string().email("Invalid email").max (50, "Too Long").required("Required"),
  password: yup.string().min(8, "Minimum 8 characters").max(50, "Too Long").required("Required"),
});

export default function RegisterModal({ onClose }) {
  const dispatch = useDispatch();
  const pending = useSelector(selectAuthPending);
  const error = useSelector(selectAuthError);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    dispatch(setPending(true));
    try {
      const result = await registerUser({ email: data.email, password: data.password }); // Firebase createUserWithEmailAndPassword
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: data.name });
      }
      dispatch(setUser({ ...result, name: data.name }));
      toast.success("Registration successful!");
      onClose?.();
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("open-login"));
      }, 50);
    } catch (err) {
      dispatch(setError(err.message || "Registration error"));
      toast.error(err.message || "Registration error"); 
    } finally {
      dispatch(setPending(false));
    }
  };

  return (
    <Authmodal  onClose={onClose} >
      <form onSubmit={handleSubmit(onSubmit)} className={css.modal}>
  <h2 className={css.title}>Registration</h2>

  <p className={css.text}>
    Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
  </p>

  <div className={css.field}>
    <input
      type="text"
      {...register("name")}
      className={css.input}
      placeholder=" "
    />
    <label className={css.label}>Name</label>
    {errors.name && <div className={css.error}>{errors.name.message}</div>}
  </div>

  <div className={css.field}>
    <input
      type="email"
      {...register("email")}
      className={css.input}
      placeholder=" "
    />
    <label className={css.label}>Email</label>
    {errors.email && <div className={css.error}>{errors.email.message}</div>}
  </div>

  <div className={css.field}>
    <input
      type="password"
      {...register("password")}
      className={css.input}
      placeholder=" "
    />
    <label className={css.label}>Password</label>
    {errors.password && <div className={css.error}>{errors.password.message}</div>}
  </div>

  {error && <div className={css.error}>{error}</div>}

  <button type="submit" disabled={pending} className={css.submit}>
    Sign Up
  </button>
</form>

    </Authmodal>
  );
}
