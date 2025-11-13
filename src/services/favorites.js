import { db } from "../services/firebase";
import { ref, get, set, remove } from "firebase/database";

export async function getFavoriteIds(uid) {
  const snap = await get(ref(db, `userFavorites/${uid}`));
  if (!snap.exists()) return [];
  return Object.keys(snap.val() || {});
}

export async function setFavorite(uid, teacherId, makeFav) {
  const node = ref(db, `userFavorites/${uid}/${teacherId}`);
  if (makeFav){ 
    await set(node, true);
  } else { 
    await remove(node);
    }
}
