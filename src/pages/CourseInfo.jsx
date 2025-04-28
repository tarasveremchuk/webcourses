import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseByTitle, addFeedback } from "../services/courses";
import { loadProgress } from "../services/progress"; // <-- додай імпорт
import { useAuthState } from "react-firebase-hooks/auth"; // <-- додай імпорт
import { auth } from "../services/firebase"; // <-- додай імпорт
import 'boxicons';
import Pagination from "../components/Pagination";

function CourseInfo() {
  const { title } = useParams();
  const [user] = useAuthState(auth); // <-- отримуємо юзера
  const [course, setCourse] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasProgress, setHasProgress] = useState(false); // <-- новий стейт
  const pageSize = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getCourseByTitle(title);
      if (courseData) {
        setCourse(courseData);
        setFeedbacks(courseData.reviews || []);
      }
    };

    fetchCourseData();
  }, [title]);

  useEffect(() => {
    const checkProgress = async () => {
      if (user && title) {
        const progress = await loadProgress(user.uid, title);
        if (progress) {
          setHasProgress(true); // якщо є прогрес
        }
      }
    };

    checkProgress();
  }, [user, title]);

  if (!course) return <div>Курс не знайдено</div>;

  const handleEnroll = () => {
    navigate(`/course?title=${encodeURIComponent(title)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      const newFeedback = { name, text };
      await addFeedback(title, newFeedback);
      setFeedbacks(prev => [newFeedback, ...prev]);
      setName("");
      setText("");
      setCurrentPage(1);
    }
  };

  const totalPages = Math.ceil(feedbacks.length / pageSize);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIdx = (currentPage - 1) * pageSize;
  const displayedFeedbacks = feedbacks.slice(startIdx, startIdx + pageSize);

  return (
    <div className="course-container">
      <h1 className="course-title">{course.title}</h1>
      <p className="course-description">{course.description}</p>

      <button className="enroll-button" onClick={handleEnroll}>
        {hasProgress ? "Продовжити" : "Записатися"}
      </button>

      <p className="students-count">{course.students}</p>

      <div className="course-details">
        <div><strong>Кількість відео:</strong> {course.videos}</div>
        <div><strong>Оцінка:</strong> {course.rating} ⭐</div>
        <div><strong>Тривалість курсу:</strong> {course.time}</div>
        <div><strong>Гнучкий графік:</strong> Навчайтеся в зручному темпі</div>
      </div>

      <div className="section-divider"></div>

      <div className="learning-outcomes">
        <h2>Чого ви навчитеся</h2>
        <ul className="learning-list">
          {course.learn.map((item, idx) => (
            <li key={idx} className="learning-item">
              <box-icon name="check" color="#4CAF50"></box-icon>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="skills-section">
        <h2>Навички, які ви здобудете</h2>
        <div className="skills-list">
          {course.skills.map((skill, idx) => (
            <span key={idx} className="skill-item">{skill}</span>
          ))}
        </div>
      </div>

      {/* Відгуки */}
      <div className="feedback-section">
        <h2>Відгуки</h2>

        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            placeholder="Ваше ім'я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="feedback-input"
            required
          />
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

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default CourseInfo;
