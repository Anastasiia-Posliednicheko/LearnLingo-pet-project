import { useEffect, useRef } from "react";
import css from "./RegisterModal.module.css";

export default function AuthModal({ title, onClose, children }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose?.();
  };

  return (
    <div
      ref={backdropRef}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      className={css.backdrop}
    >
      <div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={css.close}
        >
          ×
        </button>

        {title && <h3 className={css.title}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
