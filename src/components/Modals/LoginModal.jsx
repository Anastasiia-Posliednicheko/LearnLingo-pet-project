import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { setUser, setPending, setError } from "../../redux/auth/slice";
import { selectAuthPending, selectAuthError } from "../../redux/auth/selectors";
import Authmodal from "./AuthModal";
import css from "./RegisterModal.module.css";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function LoginModal({ onClose }) {
  const dispatch = useDispatch();
  const pending = useSelector(selectAuthPending);
  const error = useSelector(selectAuthError);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    dispatch(setPending(true));
    try {
      const result = await loginUser(data); // Firebase signInWithEmailAndPassword
      dispatch(setUser(result));
      onClose?.();
    } catch (err) {
      dispatch(setError(err.message || "Auth error"));
    } finally {
      dispatch(setPending(false));
    }
  };

  return (
    <Authmodal>
      <form onSubmit={handleSubmit(onSubmit)} className={css.modal}>
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close"
        >
         ×
       </button>
        <h2 className={css.title}>Log In</h2>
      
        <p className={css.text}>
          Welcome back! Please enter your credentials to access your account and continue your search for an teacher.
        </p>
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
          Log In
        </button>
      </form>
    </Authmodal>
  );
}
