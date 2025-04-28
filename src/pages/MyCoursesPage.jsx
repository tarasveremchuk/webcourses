import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, collection, getDocs } from "../services/firebase";
import { loadAllProgress } from "../services/progress";

function MyCoursesPage() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchCourses() {
      const progressData = await loadAllProgress(user.uid);
      const querySnapshot = await getDocs(collection(db, "courses"));
      const coursesInProgress = [];

      querySnapshot.forEach((doc) => {
        const course = doc.data();
        const title = course.title;

        if (progressData[title]) {
          const { progressIndex, completed } = progressData[title];

          const videosCount = 10; // завжди 10 відео

          const percent = Math.min(
            100,
            Math.round(((progressIndex + 1) / videosCount) * 100)
          );

          coursesInProgress.push({
            ...course,
            percent,
            completed
          });
        }
      });

      setMyCourses(coursesInProgress);
    }

    fetchCourses();
  }, [user]);

  return (
    <main className="my-courses-page">
      <h1 className="page-title">Мої курси</h1>
      {myCourses.length === 0 ? (
        <p>У вас немає активних курсів. Оберіть курс із списку для початку навчання!</p>
      ) : (
        <ul className="courses-list">
          {myCourses.map((course, index) => (
            <li key={index} className="course-card">
              <img src={course.image} alt={course.title} className="course-card-image" />
              <h2>{course.title}</h2>
              <p className="course-description">{course.description}</p>

              <div className="course-info">
                <span>⏱ {course.time}</span>
                <span>🎯 {course.students}</span>
                <span>💵 {course.price}</span>
              </div>

              <div className="progress-bar">
                <div className="progress" style={{ width: `${course.percent}%` }}></div>
              </div>
              <p className="progress-text">
                {course.percent}% {course.completed && "(Завершено)"}
              </p>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate(`/course?title=${encodeURIComponent(course.title)}`)
                }
              >
                Продовжити курс
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyCoursesPage;
