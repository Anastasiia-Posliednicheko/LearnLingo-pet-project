import { useEffect } from "react";

export default function AuthRequiredModal({ onClose, onRegister }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      onClick={onBackdrop}
      role="dialog"
      aria-modal="true"
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", display:"grid", placeItems:"center", zIndex:100 }}
    >
      <div style={{ background:"#fff", borderRadius:12, padding:20, minWidth:320, position:"relative" }}>
        <button onClick={onClose} aria-label="Close" style={{ position:"absolute", top:8, right:8 }}>×</button>
        <h3>Sign in required</h3>
        <p>This feature is available only to authorized users.</p>
        <button
            onClick={() => {
              onClose?.();
              onRegister?.();
            }}
          >
            Register
          </button>
      </div>
    </div>
  );
}
