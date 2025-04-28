import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function CourseSection() {
  const navigate = useNavigate();

  const courses = [
    {
      image: process.env.PUBLIC_URL + "/images/Group 338.png",
      category: "Веб-Розробка",
      title: "Основи веб-розробки",
      price: "1 899 грн",
      time: "10 годин",
      videos: "10 відео",
      students: "1,200 учнів",
    },
    {
      image: process.env.PUBLIC_URL + "/images/Group 337.png",
      category: "Python",
      title: "Python для початківців",
      price: "1 299 грн",
      time: "15 годин",
      videos: "10 відео",
      students: "2,000 учнів",
    },
    {
      image: process.env.PUBLIC_URL + "/images/Group 339.png",
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
    const fetchCourses = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
  
      const db = getFirestore();
      const userCoursesRef = collection(db, "users", user.uid, "courses");
      const snapshot = await getDocs(userCoursesRef);
  
      const fetchedCourses = snapshot.docs.map((doc) => doc.data());
      setMyCourses(fetchedCourses);
    };
  
    fetchCourses();
  }, []);
  

  const handleJoin = async (course) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;
  
    const db = getFirestore();
    const courseRef = doc(db, "users", user.uid, "courses", course.title);
    const courseSnap = await getDoc(courseRef);
  
    if (courseSnap.exists()) {
      navigate(`/course?title=${encodeURIComponent(course.title)}`);
    } else {
      const newCourse = {
        title: course.title,
        price: course.price,
        duration: course.time,
        videos: course.videos,
        students: course.students,
        image: course.image,
        progress: 0,
        completed: false,
      };
  
      await setDoc(courseRef, newCourse);
      setMyCourses([...myCourses, newCourse]);
    }
  };
  

  const getButtonState = (courseTitle) => {
    const course = myCourses.find((c) => c.title === courseTitle);
    if (!course) {
      return { text: "Приєднатися", background: "#e67e22", disabled: false };
    }
  
    if (course.completed) {
      return { text: "Завершено", background: "#2ecc71", disabled: true };
    } else if (course.progress > 0) {
      return { text: "Переглянути", background: "#3498db", disabled: false };
    } else {
      return { text: "Переглянути", background: "#3498db", disabled: false };
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
                  <img src={process.env.PUBLIC_URL +"/images/Group 345.png"} alt="Star" />
                </div>
              </div>
              <h3>{course.title}</h3>
              <p className="price">{course.price}</p>
              <div className="details">
                <div className="detail-item">
                  <img src={process.env.PUBLIC_URL +"/images/Group.png"} alt="Time" />
                  <p>{course.time}</p>
                </div>
                <div className="detail-item">
                  <img src={process.env.PUBLIC_URL +"/images/video-svgrepo-com 1.png"} alt="Videos" />
                  <p>{course.videos}</p>
                </div>
                <div className="detail-item">
                  <img src={process.env.PUBLIC_URL +"/images/download-svgrepo-com 1.png"} alt="Students" />
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
