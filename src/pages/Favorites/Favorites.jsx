import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../services/firebase";
import { fetchAllTeachers } from "../../services/teachers.js";
import { getFavoriteIds } from "../../services/favorites.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

import css from "./Favorites.module.css";

export default function Favorites() {
  const user = useSelector((s) => s.auth.user);

  const [favTeachers, setFavTeachers] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const uid = user?.uid || auth.currentUser?.uid;

      if (!uid) {
        setError("Favorites are available only to authorized users.");
        setFavTeachers([]);
        setFavIds([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const [allTeachers, favoriteIds] = await Promise.all([
          fetchAllTeachers(),
          getFavoriteIds(uid),
        ]);

        setFavIds(favoriteIds);

        const filtered = allTeachers.filter((t) =>
          favoriteIds.includes(t.id)
        );

        setFavTeachers(filtered);

        if (!filtered.length) {
          setError("You have no favorite teachers yet.");
        }
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.uid]);

  if (loading) return <div className={css.loading}>Loading favorites...</div>;

  if (error) {
    return (
      <div className={css.error}>
        <h2>{error}</h2>
        {!user && <p>Please log in to view your favorite teachers.</p>}
      </div>
    );
  }

  return (
    <div className={css.list}>
      <h1>Favorites</h1>
      {favTeachers.length > 0 ? (
        <div>
          {favTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={favIds.includes(teacher.id)}
              onToggleFavorite={() => {}}
              onBookTrial={() => {}}
            />
          ))}
        </div>
      ) : (
        <p>You have no favorite teachers yet.</p>
      )}
    </div>
  );
}
