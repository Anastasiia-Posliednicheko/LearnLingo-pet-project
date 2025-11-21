import { useState } from "react";

export default function Filters({
  languages,
  levels,
  prices,
  langFilter,
  levelFilter,
  priceFilter,
  onLangChange,
  onLevelChange,
  onPriceChange,
}) {
  const [openLang, setOpenLang] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const ArrowUp = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="#121417"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ArrowDown = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#121417"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
      {/* LANGUAGE */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 14, marginBottom: 4 }}>Language</div>

        <div
          onClick={() => setOpenLang(!openLang)}
          style={{
            width: 160,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <span>{langFilter || languages[0]}</span>
          <span>{openLang ? ArrowUp : ArrowDown}</span>
        </div>

        {openLang && (
          <ul
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              width: 160,
              maxHeight: 140,
              overflowY: "auto",
              border: "1px solid #ccc",
              background: "#fff",
              borderRadius: 8,
              padding: 0,
              listStyle: "none",
              zIndex: 50,
            }}
          >
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => {
                  onLangChange(lang);
                  setOpenLang(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: langFilter === lang ? "#f0f0f0" : "white",
                }}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* LEVEL */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 14, marginBottom: 4 }}>Level</div>

        <div
          onClick={() => setOpenLevel(!openLevel)}
          style={{
            width: 160,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <span>{levelFilter || levels[0]}</span>
          <span>{openLevel ? ArrowUp : ArrowDown}</span>
        </div>

        {openLevel && (
          <ul
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              width: 160,
              maxHeight: 140,
              overflowY: "auto",
              border: "1px solid #ccc",
              background: "#fff",
              borderRadius: 8,
              padding: 0,
              listStyle: "none",
              zIndex: 50,
            }}
          >
            {levels.map((lvl) => (
              <li
                key={lvl}
                onClick={() => {
                  onLevelChange(lvl);
                  setOpenLevel(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: levelFilter === lvl ? "#f0f0f0" : "white",
                }}
              >
                {lvl}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* PRICE */}
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 14, marginBottom: 4 }}>Price</div>

        <div
          onClick={() => setOpenPrice(!openPrice)}
          style={{
            width: 160,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
          }}
        >
          <span>{priceFilter || prices[0]}</span>
          <span>{openPrice ? ArrowUp : ArrowDown}</span>
        </div>

        {openPrice && (
          <ul
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              width: 160,
              maxHeight: 140,
              overflowY: "auto",
              border: "1px solid #ccc",
              background: "#fff",
              borderRadius: 8,
              padding: 0,
              listStyle: "none",
              zIndex: 50,
            }}
          >
            {prices.map((p) => (
              <li
                key={p}
                onClick={() => {
                  onPriceChange(p);
                  setOpenPrice(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: priceFilter === p ? "#f0f0f0" : "white",
                }}
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
