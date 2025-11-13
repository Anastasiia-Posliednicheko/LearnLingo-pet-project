import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllTeachers } from "../../services/teachers.js";
import { getFavoriteIds, setFavorite } from "../../services/favorites.js";
import { auth } from "../../services/firebase.js";
import TeacherCard from "../../components/TeacherCard/TeacherCard.jsx";
import AuthRequiredModal from "../../components/Modals/AuthRequiredModal.jsx"; 

const PAGE_SIZE = 4;

export default function Teachers() {
  const user = useSelector((s) => s.auth.user);

  const [items, setItems] = useState([]);     
  const [offset, setOffset] = useState(0);    
  const [hasMore, setHasMore] = useState(true);

  const [favIds, setFavIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const all = await fetchAllTeachers(); 
        if (!all.length) {
          setItems([]);
          setHasMore(false);
          setError("No teachers found.");
          return;
        }

        const firstSlice = all.slice(0, PAGE_SIZE);
        setItems(firstSlice);
        setOffset(firstSlice.length);
        setHasMore(firstSlice.length < all.length);
      } catch {
        setError("Failed to load teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

 
useEffect(() => {
  (async () => {
    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) {
      setFavIds([]);
      return;
    }
    try {
      const ids = await getFavoriteIds(uid);
      setFavIds(ids);
    } catch(err) {
     console.error("Failed to fetch favorites ids:", err);
    }
  })();
}, [user]);


  
  const onLoadMore = async () => {
    try {
      setBtnLoading(true);
      const all = await fetchAllTeachers(); 
      const next = all.slice(offset, offset + PAGE_SIZE);
      setItems(prev => [...prev, ...next]);
      const newOffset = offset + next.length;
      setOffset(newOffset);
      setHasMore(newOffset < all.length);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleToggleFavorite = async (teacherId) => {
  const uid = user?.uid || auth.currentUser?.uid;

  if (!uid) { 
    setShowAuthModal(true); 
    return; 
  }
  
  const teacherIdStr = String(teacherId);
  const makeFav = !favIds.includes(teacherIdStr);
  try {
    await setFavorite(uid, teacherIdStr, makeFav);
    const ids = await getFavoriteIds(uid);
    setFavIds(ids);
  } catch  {
    //console.error("Failed to toggle favorite:", e);
  }
};

  if (loading) return <div>Loading...</div>;
  if (error)   return <div style={{ color: "crimson" }}>{error}</div>;

  return (
    <div>
      <h1>Teachers</h1>

      <div>
        {items.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite={favIds.includes(String(teacher.id))}
            onToggleFavorite={handleToggleFavorite}
            onBookTrial={() => {}}
          />
        ))}
        
      </div>

      {hasMore && (
        <div>
          <button onClick={onLoadMore} disabled={btnLoading}>
            {btnLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
