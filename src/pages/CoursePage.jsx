import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const courseData = {
  "React.js: Побудова SPA": {
    description: "Цей курс навчить вас основам HTML, CSS та JavaScript.",
    videos: [
      "YEmdHbQBCSQ", "ESnrn1kAD4E", "nGhKIC_7Mkk", "Ez8F0nW6S",
      "ajdRvxDWH4w", "Zg4-uSjxosE", "UmRtFFSDSFo", "gFWhbjzowrM",
      "P0XMXqDGttU", "7zcXPCt8Ck0"
    ]
  },
  "Python для початківців": {
    description: "Вивчайте основи Python та створюйте свої перші програми!",
    videos: [
      "PuBadaR8qC4", "PRGkYivK2xI", "BBb_duZIusU", "2gFqUWO-AWM",
      "NvdSKgQcyuc", "HNChkuE6HyA", "UzOnFDmoJ9w", "5bwpXLHzZRo",
      "fhxByMe0mq8", "jgNB4GN1UaQ"
    ]
  },
  "UI/UX Дизайн": {
    description: "Опануйте основи UI/UX дизайну та створюйте круті інтерфейси.",
    videos: [
      "O5IXf8qB9U4", "FlwYtS4mIQw", "SKvsPh0qdQU", "h9r_UpOzajA",
      "yhqEqcWMoqs", "L1V-C5h1ZE1AhlI", "gJ6cvzZ0ewQ", "FdJz-rfMPFk",
      "O9-t0DtoobA", "pYQBvAYnL1I"
    ]
  }
};

function CoursePage() {
  const [searchParams] = useSearchParams();
  const courseTitle = searchParams.get("title");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const course = courseData[courseTitle];
  const videos = course?.videos || [];

  useEffect(() => {
    if (!courseTitle || !course) return;

    const savedIndex = parseInt(localStorage.getItem(`progress_${courseTitle}`)) || 0;
    const isCompleted = localStorage.getItem(`completed_${courseTitle}`) === "true";
    setCurrentIndex(savedIndex);
    setCompleted(isCompleted);
  }, [courseTitle]);

  useEffect(() => {
    if (courseTitle && videos.length) {
      updateProgress(currentIndex);
    }
  }, [currentIndex]);
  useEffect(() => {
    if (currentIndex === videos.length - 1 && !completed) {
      localStorage.setItem(`completed_${courseTitle}`, "true");
      setCompleted(true);
    }
  }, [currentIndex, videos.length, completed, courseTitle]);
  
  const updateProgress = (index) => {
    const percent = ((index + 1) / videos.length) * 100;
    const circle = document.getElementById("progress-ring");
    const text = document.getElementById("progress-text");
    const dashOffset = 283 - (percent / 100) * 283;
  
    if (circle && text) {
      circle.style.strokeDashoffset = dashOffset;
      text.textContent = `${Math.round(percent)}%`;
    }
  
    localStorage.setItem(`progress_${courseTitle}`, index);
  };
  

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      localStorage.setItem(`completed_${courseTitle}`, "true");
      setCompleted(true);
    }
  };

  if (!courseTitle || !course) {
    return (
      <main className="course-container">
        <section className="course-info">
          <h1 className="course-title">Курс не знайдено</h1>
          <p className="course-description">На жаль, цей курс не існує.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="course-container">
      <section className="course-info">
        <h1 className="course-title">{courseTitle}</h1>
        <p className="course-description">{course.description}</p>
      </section>

      <div className="video-progress-wrapper">
        <section className="video-container">
          <iframe
            id="video-frame"
            src={`https://www.youtube.com/embed/${videos[currentIndex]}`}
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
    </main>
  );
}

export default CoursePage;
