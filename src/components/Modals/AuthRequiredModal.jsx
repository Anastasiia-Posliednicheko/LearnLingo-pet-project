import AuthModal from "./AuthModal";
import css from "./RegisterModal.module.css";

export default function AuthRequiredModal({ onClose, onRegister }) {
  return (
    <AuthModal>
      <div className={css.modal}>
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Close"
        >
         ×
       </button>
        <h2 className={css.title}>Sign in required</h2>
        <p className={css.text}>
          This feature is available only to authorized users.
        </p>
        <button
          type="button"
          className={css.submit}
          onClick={() => {
            onRegister?.();
          }}
        >
          Register
        </button>
      </div>
    </AuthModal>
  );
}