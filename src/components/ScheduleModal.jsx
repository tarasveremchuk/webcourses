import React, { useEffect, useState } from "react";

const courses = [
  {
    name: "Web Development Basics",
    date: "April 20, 2025 10:00:00",
    description:
      "Цей курс допоможе вам освоїти основи веб-розробки, включаючи HTML, CSS та JavaScript, і ще багато цікавих фішок.",
  },
  {
    name: "Python for Beginners",
    date: "April 22, 2025 13:00:00",
    description:
      "Навчіться основам програмування на Python, включаючи синтаксис, структури даних та основні алгоритми.",
  },
  {
    name: "UI/UX Design",
    date: "May 25, 2025 15:00:00",
    description:
      "Розкрийте секрети ефективного дизайну користувацького інтерфейсу та досвіду користувача.",
  },
];

const ScheduleModal = ({ isOpen, onClose }) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const updatedTimers = courses.map((course) => {
        const total = Date.parse(course.date) - Date.parse(new Date());
        return {
          days: Math.floor(total / (1000 * 60 * 60 * 24)),
          hours: Math.floor((total / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((total / 1000 / 60) % 60),
          seconds: Math.floor((total / 1000) % 60),
        };
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal2" onClick={onClose}>
      <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn2" onClick={onClose}>
          &times;
        </span>
        <h2>Course Schedule</h2>
        <div className="schedule-container">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.name}</h3>
              <p className="course-description">{course.description}</p>
              <p>
                <strong>Закінчується:</strong>{" "}
                {timers[index] && (
                  <span>
                    {timers[index].days}d {timers[index].hours}h{" "}
                    {timers[index].minutes}m {timers[index].seconds}s
                  </span>
                )}
              </p>
              <button
                className="view-course-btn"
                onClick={() => {
                  document
                    .querySelector("#courses")
                    ?.scrollIntoView({ behavior: "smooth" });
                  onClose();
                }}
              >
                Переглянути курс
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
