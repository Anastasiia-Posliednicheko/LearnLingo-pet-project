import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFavoriteIds } from "../../services/favorites.js";
import { fetchAllTeachers } from "../../services/teachers.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

export default function Favorites() {
  const user = useSelector((s) => s.auth.user);

  const [favTeachers, setFavTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!user) {
      setError("⚠️ Favorites are available only to authorized users.");
      setFavTeachers([]);
    }
  }, [user]);

  
  useEffect(() => {
    if (!user?.uid) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [allTeachers, favIds] = await Promise.all([
          fetchAllTeachers(),
          getFavoriteIds(user.uid),
        ]);

        const filtered = allTeachers.filter((t) => favIds.includes(t.id));
        setFavTeachers(filtered);
        if (!filtered.length) setError("You have no favorites yet.");
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.uid]);

  if (error)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>{error}</h2>
        {!user && <p>Please log in to view your favorite teachers.</p>}
      </div>
    );

  if (loading) return <div style={{ padding: 40 }}>Loading favorites...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Favorites</h1>
      {favTeachers.length > 0 ? (
        <div>
          {favTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={true}
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
