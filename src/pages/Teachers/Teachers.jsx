import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fetchAllTeachers } from "../../services/teachers";
import { getFavoriteIds, setFavorite } from "../../services/favorites";

import { auth } from "../../services/firebase";

import TeacherCard from "../../components/TeacherCard/TeacherCard";
import AuthRequiredModal from "../../components/Modals/AuthRequiredModal";
import RegisterModal from "../../components/Modals/RegisterModal";
import Filters from "../../components/Filters/Filters";
import css  from "./Teachers.module.css";

const PAGE_SIZE = 4;

export default function Teachers() {
  const user = useSelector((s) => s.auth.user);

  const [allTeachers, setAllTeachers] = useState([]);    
  const [items, setItems] = useState([]);                
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [favIds, setFavIds] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [prices, setPrices] = useState([]);

  const [langFilter, setLangFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const all = await fetchAllTeachers();
        setAllTeachers(all);

        const firstSlice = all.slice(0, PAGE_SIZE);
        setItems(firstSlice);
        setOffset(firstSlice.length);
        setHasMore(firstSlice.length < all.length);

        const langs = [...new Set(all.flatMap((t) => t.languages))];
        const levs = [...new Set(all.flatMap((t) => t.levels))];

        const allPrices = all.map((t) => t.price_per_hour);
        const min = Math.min(...allPrices);
        const max = Math.max(...allPrices);

        const priceRanges = [
          `${min}-${min + 10}`,
          `${min + 10}-${min + 20}`,
          `${min + 20}-${max}`,
        ];

        setLanguages(langs);
        setLevels(levs);
        setPrices([10, 20, 30, 40]);

      } catch {
        setError("Failed to load teachers.");
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
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    })();
  }, [user?.uid]);

 
  const onLoadMore = async () => {
    try {
      setBtnLoading(true);
      const all = allTeachers;
      const next = all.slice(offset, offset + PAGE_SIZE);
      setItems((prev) => [...prev, ...next]);

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
    } catch (e) {
      console.error("Failed to toggle favorite:", e);
    }
  };


  const filteredItems = items.filter((t) => {
    if (langFilter && !t.languages.includes(langFilter)) return false;
    if (levelFilter && !t.levels.includes(levelFilter)) return false;

    if (priceFilter) {
    if (t.price_per_hour > Number(priceFilter)) return false;
    }
    return true;
  });


  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "crimson" }}>{error}</div>;

  return (
    <div className={css.container}>

      <Filters
        languages={languages}
        levels={levels}
        prices={prices}
        langFilter={langFilter}
        levelFilter={levelFilter}
        priceFilter={priceFilter}
        onLangChange={setLangFilter}
        onLevelChange={setLevelFilter}
        onPriceChange={setPriceFilter}
      />

      <div className={css.card}>
        {filteredItems.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite={favIds.includes(String(teacher.id))}
            onToggleFavorite={handleToggleFavorite}
            onBookTrial={() => { }}
            activeLevel={levelFilter}
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

      {showAuthModal && (
        <>
         <AuthRequiredModal
           onClose={() => setShowAuthModal(false)}
           onRegister={() => setOpenRegister(true)}
          />
          {openRegister && (
            <RegisterModal onClose={() => setOpenRegister(false)} />
          )}
        </>
      )}
    </div>
  );
}
