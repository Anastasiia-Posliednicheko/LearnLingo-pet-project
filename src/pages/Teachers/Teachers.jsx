import React from "react";
import { fetchAllTeachers } from "../../services/teachers.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";

const PAGE_SIZE = 4;

export default function Teachers() {
  const [all, setAll] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await fetchAllTeachers();
      setAll(list);
      setLoading(false);
    })();
  }, []);

  const visible = all.slice(0, PAGE_SIZE * page);
  const hasMore = visible.length < all.length;

  if (loading) return <div style={{ padding:24 }}>Loading…</div>;

  return (
    <div style={{ padding:24 }}>
      <h1>Teachers</h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(2, minmax(0, 1fr))",
          gap:16,
        }}
      >
        {visible.map((teacher) => (
       <TeacherCard
          key={teacher.id}
          teacher={teacher}
          //isFavorite={favIds.includes(teacher.id)}           
          // onToggleFavorite={(id) => toggleFavoriteHandler(id)}
          //onBookTrial={(t) => openTrialModal(t)}
  />
))}
      </div>

      {hasMore && (
        <div style={{ marginTop:16 }}>
          <button onClick={() => setPage(p => p + 1)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
