import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { getCourseByTitle, addFeedback } from "../services/courses"; 
import { loadProgress, saveProgress } from "../services/progress";
import Pagination from "../components/Pagination"; // пагінація
import 'boxicons'; // один раз імпортується

function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseTitle = searchParams.get("title");
  const [user] = useAuthState(auth);

  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    if (!courseTitle) return;

    const fetchCourseData = async () => {
      const courseData = await getCourseByTitle(courseTitle);
      if (courseData) {
        setCourse(courseData);
        setFeedbacks(courseData.reviews || []);
      }
    };

    fetchCourseData();
  }, [courseTitle]);

  useEffect(() => {
    if (!courseTitle || !course || !user) return;

    loadProgress(user.uid, courseTitle).then((data) => {
      if (data) {
        setCurrentIndex(data.progressIndex);
        setCompleted(data.completed);
      }
    });
  }, [courseTitle, user, course]);

  useEffect(() => {
    if (user && courseTitle && course?.videos?.length) {
      updateProgress(currentIndex);
      saveProgress(user.uid, courseTitle, currentIndex, completed);
    }
  }, [currentIndex, completed, courseTitle, user, course]);

  useEffect(() => {
    if (currentIndex === (course?.videos?.length || 0) - 1 && !completed) {
      setCompleted(true);
      if (user) {
        saveProgress(user.uid, courseTitle, currentIndex, true);
      }
    }
  }, [currentIndex, course, completed, courseTitle, user]);

  const updateProgress = (index) => {
    if (!course?.videos?.length) return;
  
    let percent;
    if (completed) {
      percent = 100;
    } else {
      percent = ((index) / (course.videos.length - 1)) * 100;
      percent = Math.min(percent, 100);
    }
  
    const circle = document.getElementById("progress-ring");
    const text = document.getElementById("progress-text");
    const dashOffset = 283 - (percent / 100) * 283;
  
    if (circle && text) {
      circle.style.strokeDashoffset = dashOffset;
      text.textContent = `${Math.round(percent)}%`;
    }
  };
  
  const nextVideo = () => {
    if (currentIndex < (course?.videos?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
      if (user) {
        saveProgress(user.uid, courseTitle, currentIndex, true);
      }
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    if (name.length <= 4) return "***@" + domain;
    const start = name.slice(0, 3);
    const end = name.slice(-2);
    return `${start}****${end}@${domain}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const name = user ? maskEmail(user.email) : "Анонім";
    const newFeedback = { name, text: text.trim() };

    await addFeedback(courseTitle, newFeedback); 
    setFeedbacks(prev => [newFeedback, ...prev]);
    setText("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(feedbacks.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const displayedFeedbacks = feedbacks.slice(startIdx, startIdx + pageSize);

  if (!course) {
    return (
      <div className="course-container">
        <h1 className="course-title">Курс не знайдено</h1>
        <p className="course-description">На жаль, цей курс не існує.</p>
      </div>
    );
  }

  return (
    <div className="course-container">
      <h1 className="course-title">{course.title}</h1>
      <p className="course-description">{course.description}</p>

      <div className="video-progress-wrapper">
        <section className="video-container">
          <iframe
            id="video-frame"
            src={`https://www.youtube.com/embed/${course.videos[currentIndex]}`}
            allowFullScreen
          ></iframe>
          <button id="next-video-btn" onClick={nextVideo} disabled={completed}>
            {completed ? "Курс завершено" : "Наступне відео"}
          </button>
        </section>

        <section className="progress-container">
          <h3>Твій успіх</h3>
          <svg width="150" height="150" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="10" fill="none" />
            <circle
              id="progress-ring"
              cx="50"
              cy="50"
              r="45"
              stroke="green"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="283"
              strokeLinecap="round"
            />
            <text
              id="progress-text"
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
            >
              0%
            </text>
          </svg>
        </section>
      </div>

      {/* Відгуки */}
      <div className="feedback-section">
        <h2>Відгуки</h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            placeholder="Ваш відгук"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="feedback-textarea"
            required
          ></textarea>
          <button type="submit" className="feedback-submit">Надіслати</button>
        </form>

        <div className="feedback-list">
          {displayedFeedbacks.length > 0 ? (
            displayedFeedbacks.map((review, idx) => (
              <div key={idx} className="feedback-card">
                <h4 className="feedback-author">{review.name}</h4>
                <p className="feedback-text">{review.text}</p>
              </div>
            ))
          ) : (
            <p>Поки що немає відгуків.</p>
          )}
        </div>

        {/* Пагінація */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CoursePage;
