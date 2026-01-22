import { useState, useRef, useEffect } from "react";
import css from "./FilterDropdown.module.css";

const ITEM_HEIGHT = 32;

export default function FilterDropdown({
  label,
  options = [],
  value,
  onChange,
  visibleCount = 5,
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const Arrow = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={css.arrow}
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="#121417"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  return (
    <div className={css.field} ref={wrapperRef}>
      <div className={css.title}>{label}</div>

      <button
        type="button"
        className={css.trigger}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value || options[0]}</span>
        <span className={`${css.icon} ${open ? css.open : ""}`} >{Arrow} </span>
      </button>

      {open && (
        <div
          className={css.dropdown}
          style={{ maxHeight: visibleCount * ITEM_HEIGHT }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className={css.option}
              onClick={() => {
                onChange(opt);
                setOpen(false);
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
