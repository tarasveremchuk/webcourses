// src/services/progress.js
import { db, doc, getDoc, setDoc } from "./firebase";

export async function saveProgress(uid, courseTitle, progressIndex, completed) {
  try {
    const courseRef = doc(db, "progress", uid);
    const docSnap = await getDoc(courseRef);
    const existingData = docSnap.exists() ? docSnap.data() : {};

    await setDoc(courseRef, {
      ...existingData,
      [courseTitle]: { progressIndex, completed }
    });
  } catch (error) {
    console.error("Помилка збереження прогресу:", error);
  }
}

export async function loadProgress(uid, courseTitle) {
  try {
    const courseRef = doc(db, "progress", uid);
    const docSnap = await getDoc(courseRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data[courseTitle] || null;
    }
    return null;
  } catch (error) {
    console.error("Помилка зчитування прогресу:", error);
    return null;
  }
}

export async function loadAllProgress(uid) {
  try {
    const courseRef = doc(db, "progress", uid);
    const docSnap = await getDoc(courseRef);
    return docSnap.exists() ? docSnap.data() : {};
  } catch (error) {
    console.error("Помилка зчитування всіх прогресів:", error);
    return {};
  }
}
