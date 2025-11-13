import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/operations";
import { setUser, setPending, setError } from "../../redux/auth/slice";
import { selectAuthPending, selectAuthError } from "../../redux/auth/selectors";
import { auth } from "../../services/firebase";
import { updateProfile } from "firebase/auth";
import Authmodal from "./AuthModal";

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
      onClose?.();
    } catch (err) {
      dispatch(setError(err.message || "Registration error"));
    } finally {
      dispatch(setPending(false));
    }
  };

  return (
    <Authmodal title="Registration" onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && <div style={{ color: "crimson" }}>{errors.name.message}</div>}

        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <div style={{ color: "crimson" }}>{errors.email.message}</div>}

        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <div style={{ color: "crimson" }}>{errors.password.message}</div>}

        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}

        <button type="submit" disabled={pending} style={{ marginTop: 12 }}>
          Register
        </button>
      </form>
    </Authmodal>
  );
}
