import { useState } from "react";


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
    <section>
      <div>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          width="64"
          height="64"
        />
        <div>
          <div>
            <span>Languages</span>
            <span>Lessons online</span>
            <span>Lessons done: {lessons_done}</span>
            <span>Rating: {Number(rating).toFixed(1)}</span>
            <span>Price / 1 hour: ${price_per_hour}</span>
          </div>

          <h3>{name} {surname}</h3>
          <div>
            <div>Speaks: <i>{speaks}</i></div>
            {lesson_info && <div><b>Lesson Info:</b> {lesson_info}</div>}
            {!!conditions.length && (
              <div>
                <b>Conditions:</b> {conditions.join(". ")}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => onToggleFavorite?.(id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div>
        <button onClick={() => setOpen((p) => !p)}>
          {open ? "Hide" : "Read more"}
        </button>
       </div>
          

      {open && (
        <div>
          {experience && (
            <p>
              {experience}
            </p>
          )}

          {!!reviews.length && (
            <div>
              <b>Reviews:</b>
              <ul>
                {reviews.slice(0, 3).map((r, i) => (
                  <li key={i}>
                    {r.avatar && (
                      <img
                        src={r.avatar}
                        alt={r.user || r.name || "Student"}
                        width="32"
                        height="32"
                      />
                    )}
                    <div>
                      <div>
                        {r.user || r.name || "Student"} · ★ {Number(r.stars ?? r.rating ?? 0).toFixed(1)}
                      </div>
                      <div>{r.comment || r.text || ""}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!!levelsTags.length && (
            <div>
              {levelsTags.map((lvl, i) => (
                <span key={i}>#{lvl}</span>
              ))}
            </div>
                  )}
                  
          <div>
            <button type="button" onClick={() => onBookTrial?.(teacher)}>
              Book trial lesson
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
