import { useState } from "react";
import css from "./Teachercard.module.css";


export default function TeacherCard({
  teacher,
  isFavorite = false,
  onToggleFavorite,
  onBookTrial,
  activeLevel,
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

  const reviewsArr = Array.isArray(reviews)
  ? reviews
  : reviews && typeof reviews === "object"
    ? Object.values(reviews)
    : [];

  return (
    <section className={css.card}>
    
        <div className={css.avatar}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            width="64"
            height="64"
            className={css.image}
          />
        </div>
        <div className={css.content}>
          <div className={css.body}>
            <div className={css.metaRow}>
              <span className={css.metaLabelLanguages}>Languages</span>
              <div className={css.meta}>
              <span className={css.metaLabel}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6667 4.13333C14.6667 3.3866 14.6667 3.01323 14.5213 2.72801C14.3935 2.47713 14.1895 2.27316 13.9387 2.14532C13.6534 2 13.2801 2 12.5333 2H12.2667C10.7732 2 10.0265 2 9.45603 2.29065C8.95426 2.54631 8.54631 2.95426 8.29065 3.45603C8 4.02646 8 4.77319 8 6.26667V14L8.0667 13.8999C8.5298 13.2053 8.76135 12.858 9.06727 12.6065C9.33809 12.3839 9.65016 12.2169 9.9856 12.1151C10.3645 12 10.7819 12 11.6168 12H12.5333C13.2801 12 13.6534 12 13.9387 11.8547C14.1895 11.7268 14.3935 11.5229 14.5213 11.272C14.6667 10.9868 14.6667 10.6134 14.6667 9.86667V4.13333Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M1.33325 4.13333C1.33325 3.3866 1.33325 3.01323 1.47858 2.72801C1.60641 2.47713 1.81038 2.27316 2.06126 2.14532C2.34648 2 2.71985 2 3.46659 2H3.73325C5.22673 2 5.97346 2 6.54389 2.29065C7.04566 2.54631 7.45361 2.95426 7.70927 3.45603C7.99992 4.02646 7.99992 4.77319 7.99992 6.26667V14L7.93322 13.8999C7.47012 13.2053 7.23857 12.858 6.93265 12.6065C6.66182 12.3839 6.34976 12.2169 6.01432 12.1151C5.63542 12 5.21799 12 4.38313 12H3.46659C2.71985 12 2.34648 12 2.06126 11.8547C1.81038 11.7268 1.60641 11.5229 1.47858 11.272C1.33325 10.9868 1.33325 10.6134 1.33325 9.86667V4.13333Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Lessons online</span>
                <span className={css.metaLabel}>Lessons done: {lessons_done}</span>
              <span className={css.metaLabel}>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.88965 4.12573C9.0488 4.42725 9.33887 4.63786 9.6748 4.69604L13.4746 5.35229L10.7871 8.11987C10.5496 8.36444 10.4388 8.70526 10.4873 9.04272L11.0361 12.8601L7.5752 11.1589L7.45801 11.1091C7.21993 11.0245 6.95976 11.0245 6.72168 11.1091L6.60449 11.1589L3.14258 12.8601L3.69238 9.04272C3.74091 8.70526 3.6301 8.36444 3.39258 8.11987L0.704102 5.35229L4.50488 4.69604C4.84082 4.63786 5.13088 4.42725 5.29004 4.12573L7.08984 0.7146L8.88965 4.12573Z" fill="#FFC531" stroke="#FFC531" stroke-width="1.2" />
                </svg>
                Rating: {Number(rating).toFixed(1)}</span>
                <span className={css.metaLabel}>Price / 1 hour: <span className={css.price}>${price_per_hour}</span></span>
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
                  <span
        key={i}
        className={`${css.tag} ${
          activeLevel && lvl === activeLevel ? css.tagActive : ""
        }`}
      >
        #{lvl}
      </span>
                ))}
              </div>
                    )}
          </div>
                {open && (
          <div className={css.more}>
            {experience && (
              <p className={css.experience}>
                {experience}
              </p>
            )}
            {!!reviewsArr.length && (
  <div className={css.reviews}>
    <ul className={css.reviewList}>
      {reviewsArr.slice(0, 3).map((r, i) => (
        <li key={i} className={css.reviewItem}>
          {r.avatar ? (
            <img
              className={css.reviewAvatar}
              src={r.avatar}
              alt={r.reviewer_name || "Student"}
              width="32"
              height="32"
            />
          ) : (
            <div className={css.reviewAvatarFallback} aria-hidden="true">
              {(r.reviewer_name || "Student")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

                      <div className={css.reviewText}>
                        <div className={css.reviewHead}>
                          <div className={css.reviewName}>
                           {r.reviewer_name || "Student"}
                          </div>

                          <div className={css.reviewRating}>
                            <span className={css.star}>★</span>
                            <span>{Number(r.reviewer_rating ?? 0).toFixed(1)}</span>
                          </div>
                        </div>
                        <div className={css.reviewBody}>{r.comment || ""}</div>
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
    </section>
  );
}
