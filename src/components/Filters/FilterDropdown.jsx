import { useState } from "react";

export default function FilterDropdown({
  label,
  options = [],
  value,
  onChange,
  visibleCount = 5,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: "10px 14px",
          minWidth: 160,
          borderRadius: 8,
          border: "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        {label}: {value || "All"}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 8,
            maxHeight: visibleCount * 36,
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: value === opt ? "#eee" : "transparent",
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
