import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseSection() {
  const navigate = useNavigate();

  const courses = [
    {
      image: "images/Group 338.png",
      category: "Веб-Розробка",
      title: "Основи веб-розробки",
      price: "1 899 грн",
      time: "10 годин",
      videos: "10 відео",
      students: "1,200 учнів",
    },
    {
      image: "images/Group 337.png",
      category: "Python",
      title: "Python для початківців",
      price: "1 299 грн",
      time: "15 годин",
      videos: "10 відео",
      students: "2,000 учнів",
    },
    {
      image: "images/Group 339.png",
      category: "UI/UX Дизайн2",
      title: "UI/UX Дизайн",
      price: "1 999 грн",
      time: "8 годин",
      videos: "10 відео",
      students: "900 учнів",
    },
  ];

  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("myCourses")) || [];
    setMyCourses(storedCourses);
  }, []);

  const handleJoin = (course) => {
    const title = course.title;
    const isAlreadyAdded = myCourses.some((c) => c.title === title);
    const progress = parseInt(localStorage.getItem(`progress_${title}`)) || 0;
    const isCompleted = localStorage.getItem(`completed_${title}`) === "true";

    if (isAlreadyAdded || progress > 0 || isCompleted) {
      navigate(`/course?title=${encodeURIComponent(title)}`);
    } else {
      const newCourse = {
        title: course.title,
        price: course.price,
        duration: course.time,
        videos: course.videos,
        students: course.students,
        image: course.image,
      };
      const updatedCourses = [...myCourses, newCourse];
      localStorage.setItem("myCourses", JSON.stringify(updatedCourses));
      setMyCourses(updatedCourses);
    }
  };

  const getButtonState = (courseTitle) => {
    const isAdded = myCourses.some((c) => c.title === courseTitle);
    const progress = parseInt(localStorage.getItem(`progress_${courseTitle}`)) || 0;
    const isCompleted = localStorage.getItem(`completed_${courseTitle}`) === "true";

    if (isCompleted) {
      return { text: "Завершено", background: "#2ecc71", disabled: true };
    } else if (isAdded || progress > 0) {
      return { text: "Переглянути", background: "#3498db", disabled: false };
    } else {
      return { text: "Приєднатися", background: "#e67e22", disabled: false };
    }
  };

  return (
    <section className="course-section" id="courses">
      <div className="courses-head">
        <h2>Наші курси</h2>
        <p className="intro-text">Обирайте якісне навчання для свого майбутнього!</p>
      </div>
      <div className="courses">
        {courses.map((course, index) => {
          const buttonState = getButtonState(course.title);

          return (
            <article className="course" key={index}>
              <img src={course.image} alt={course.title} />
              <div className="course-info">
                <p className="category">{course.category}</p>
                <div className="rating">
                  <img src="images/Group 345.png" alt="Star" />
                </div>
              </div>
              <h3>{course.title}</h3>
              <p className="price">{course.price}</p>
              <div className="details">
                <div className="detail-item">
                  <img src="images/Group.png" alt="Time" />
                  <p>{course.time}</p>
                </div>
                <div className="detail-item">
                  <img src="images/video-svgrepo-com 1.png" alt="Videos" />
                  <p>{course.videos}</p>
                </div>
                <div className="detail-item">
                  <img src="images/download-svgrepo-com 1.png" alt="Students" />
                  <p>{course.students}</p>
                </div>
              </div>
              <button
                className="join-btn"
                style={{
                  background: buttonState.background,
                  cursor: buttonState.disabled ? "not-allowed" : "pointer",
                }}
                disabled={buttonState.disabled}
                onClick={() => handleJoin(course)}
              >
                {buttonState.text}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CourseSection;
