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
            <span className={css.metaLabel}>Languages</span>
            <span className={css.metaLabel}>Lessons online</span>
            <span className={css.metaLabel}>Lessons done: {lessons_done}</span>
            <span className={css.metaLabel}>Rating: {Number(rating).toFixed(1)}</span>
            <span className={css.metaLabel}>Price / 1 hour: ${price_per_hour}</span>
          </div>

          <h3 className={css.name}>{name} {surname}</h3>
          <div className={css.details}>
            <div className={css.line}>Speaks: <i>{speaks}</i></div>
            {lesson_info && <div className={css.line}><b>Lesson Info:</b> {lesson_info}</div>}
            {!!conditions.length && (
              <div className={css.line}>
                <b>Conditions:</b> {conditions.join(". ")}
              </div>
            )}
          </div>
        </div>

        <button
          className={css.buttonFav}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => onToggleFavorite?.(id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div>
        <button  className={css.buttonFav} onClick={() => setOpen((p) => !p)}>
          {open ? "Hide" : "Read more"}
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
          {!!levelsTags.length && (
            <div className={css.tags}>
              {levelsTags.map((lvl, i) => (
                <span key={i} className={css.tag}>#{lvl}</span>
              ))}
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
