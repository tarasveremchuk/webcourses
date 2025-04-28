import { db, doc, getDoc, setDoc, updateDoc } from './firebase'; // Імпортуємо методи з Firebase

// Функція для отримання інформації про курс
export const getCourseByTitle = async (title) => {
  try {
    const courseRef = doc(db, "courses", title); // Використовуємо title як ідентифікатор документа
    const docSnap = await getDoc(courseRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Повертаємо дані курсу
    } else {
      console.log("Курс не знайдено");
      return null;
    }
  } catch (error) {
    console.error("Помилка при отриманні курсу:", error);
    return null;
  }
};

// Функція для додавання відгуку
export const addFeedback = async (courseTitle, feedback) => {
  try {
    const courseRef = doc(db, "courses", courseTitle);
    const docSnap = await getDoc(courseRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      const updatedReviews = existingData.reviews ? [feedback, ...existingData.reviews] : [feedback]; // Якщо reviews існують, додаємо новий відгук, якщо ні - ініціалізуємо як масив

      // Оновлюємо лише поле reviews
      await updateDoc(courseRef, { reviews: updatedReviews });
      console.log('Відгук додано!');
    }
  } catch (error) {
    console.error("Помилка при додаванні відгуку:", error);
  }
};
