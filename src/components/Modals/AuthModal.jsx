import React from "react";

export default function ModalShell({ title, onClose, children }) {
  const backdropRef = React.useRef(null);

  React.useEffect(() => {
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
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.5)",
        display: "grid", placeItems: "center", zIndex: 100,
      }}
    >
      <div
        style={{
          background: "#fff", borderRadius: 12, padding: 20, minWidth: 360,
          position: "relative", boxShadow: "0 8px 30px rgba(0,0,0,.15)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 8, right: 8,
            background: "transparent", border: "none",
            fontSize: 20, cursor: "pointer", lineHeight: 1,
          }}
        >
          ×
        </button>

        {title && <h3 style={{ marginBottom: 12 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
