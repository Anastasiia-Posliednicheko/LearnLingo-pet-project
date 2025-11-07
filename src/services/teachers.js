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
    const teachersArray = Array.isArray(data)
      ? data
      : Object.values(data || {});

    return teachersArray
      .filter(Boolean)
      .map((teacher, index) => ({
        id: teacher.id || `teacher-${index}`,
        ...teacher,
      }));
  } catch (error) {
    console.error("❌ Failed to fetch teachers from Firebase:", error);
    return [];
  }
}
