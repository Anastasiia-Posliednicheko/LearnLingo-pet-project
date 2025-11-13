import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { setUser, setPending, setError } from "../../redux/auth/slice";
import { selectAuthPending, selectAuthError } from "../../redux/auth/selectors";
import Authmodal from "./AuthModal";

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
    <Authmodal title="Log in" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <div style={{ color: "crimson" }}>{errors.email.message}</div>}

        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <div style={{ color: "crimson" }}>{errors.password.message}</div>}

        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}

        <button type="submit" disabled={pending} style={{ marginTop: 12 }}>
          Log in
        </button>
      </form>
    </Authmodal>
  );
}
