import { db } from "../services/firebase";
import { ref, get } from "firebase/database";


export async function fetchAllTeachers() {
  try {
    const snapshot = await get(ref(db, "teachers"));

    if (!snapshot.exists()) {
      console.log("⚠️ No data found in /teachers");
      return [];
    }

    const data = snapshot.val();
    return Object.entries(data).map(([firebaseId, teacherObj]) => ({
      id: String(firebaseId),
      ...teacherObj,
    }));

  } catch (error) {
    console.error("❌ Failed to fetch teachers from Firebase:", error);
    return [];
  }
}

