import { useState } from "react";
import css from "./Teachercard.module.css";


export default function TeacherCard({
  teacher,
  isFavorite = false,
  onToggleFavorite,
  onBookTrial,
}) {
  const [open, setOpen] = useState(false);

  if (!teacher) return null;

  const {
    id,
    avatar_url = "",
    name = "",
    surname = "",
    languages = [],
    levels = [],
    rating = 0,
    reviews = [],
    price_per_hour = 0,
    lessons_done = 0,
    lesson_info = "",
    conditions = [],
    experience = "",
  } = teacher;

  const speaks = languages.join(", ");
  const levelsTags = levels; 

  return (
    <section className={css.card}>
      <div className={css.top}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          width="64"
          height="64"
          className={css.image}
        />
        <div className={css.body}>
          <div className={css.metaRow}>
            <span className={css.metaLabelLanguages}>Languages</span>
            <div className={css.meta}>
              <span className={css.metaLabel}>Lessons online</span>
              <span className={css.metaLabel}>Lessons done: {lessons_done}</span>
              <span className={css.metaLabel}>Rating: {Number(rating).toFixed(1)}</span>
              <span className={css.metaLabel}>Price / 1 hour: ${price_per_hour}</span>
            </div>
          </div>

          <h3 className={css.name}>{name} {surname}</h3>
          <div className={css.details}>
            <div className={css.line}>Speaks: <span className={css.lineSpeaks} >{speaks}</span></div>
            {lesson_info && <div className={css.line}><p>Lesson Info:</p> <span className={css.value}>{lesson_info}</span></div>}
            {!!conditions.length && (
              <div className={css.line}>
                <p>Conditions:</p> <span className={css.value}>{conditions.join(". ")}</span>
              </div>
            )}
          </div>
          <div>
        <button  className={css.readMore} onClick={() => setOpen((p) => !p)}>
          {open ? "Hide" : "Read more"}
        </button>
       </div>
          {!!levelsTags.length && (
            <div className={css.tags}>
              {levelsTags.map((lvl, i) => (
                <span key={i} className={css.tag}>#{lvl}</span>
              ))}
            </div>
                  )}
        </div>

        <button
          className={css.buttonFav}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => onToggleFavorite?.(id)}
        >
          <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill={isFavorite ? "#F4C550" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    className={css.heart}
  >
    <path
      d="M22.5767 4.99419C22.0233 4.44061 21.3664 4.00147 20.6433 3.70187C19.9202 3.40226 19.1452 3.24805 18.3625 3.24805C17.5798 3.24805 16.8048 3.40226 16.0817 3.70187C15.3586 4.00147 14.7017 4.44061 14.1483 4.99419L13 6.14252L11.8517 4.99419C10.734 3.87652 9.21812 3.24863 7.6375 3.24863C6.05688 3.24863 4.541 3.87652 3.42333 4.99419C2.30567 6.11186 1.67777 7.62774 1.67777 9.20836C1.67777 10.789 2.30567 12.3049 3.42333 13.4225L4.57167 14.5709L13 22.9992L21.4283 14.5709L22.5767 13.4225C23.1302 12.8692 23.5694 12.2122 23.869 11.4892C24.1686 10.7661 24.3228 9.99105 24.3228 9.20836C24.3228 8.42566 24.1686 7.65064 23.869 6.92756C23.5694 6.20448 23.1302 5.54751 22.5767 4.99419Z"
      stroke="#121417"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
        </button>
      </div>
      
          

      {open && (
        <div className={css.more}>
          {experience && (
            <p className={css.experience}>
              {experience}
            </p>
          )}

          {!!reviews.length && (
            <div className={css.reviews}>
              <b>Reviews:</b>
              <ul className={css.reviewList}>
                {reviews.slice(0, 3).map((r, i) => (
                  <li key={i} className={css.reviewItem}>
                    {r.avatar && (
                      <img
                        className={css.reviewAvatar}
                        src={r.avatar}
                        alt={r.user || r.name || "Student"}
                        width="32"
                        height="32"
                      />
                    )}
                    <div className={css.reviewText}>
                      <div className={css.reviewHead}>
                        {r.user || r.name || "Student"} · ★ {Number(r.stars ?? r.rating ?? 0).toFixed(1)}
                      </div>
                      <div className={css.reviewBody}>{r.comment || r.text || ""}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
                  
          <div>
            <button className={css.bookBtn} type="button" onClick={() => onBookTrial?.(teacher)}>
              Book trial lesson
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
