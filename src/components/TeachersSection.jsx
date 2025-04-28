import React from 'react';

const TeacherCard = ({ name, position, bio, instagramLink, linkedinLink, imageSrc }) => {
  return (
    <article className="teacher">
      <img src={imageSrc} alt={`Teacher ${name}`} width="464" height="238" />
      <div className="teacher-info">
        <h3>{name}</h3>
        <p className="position">{position}</p>
        <p className="bio">{bio}</p>
        <div className="social-container">
          <p className="social-text">{position}</p>
          <div className="social-links">
            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <img src={process.env.PUBLIC_URL + "/images/Instagram_logo_2016 1.png"} alt="Instagram" />
            </a>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
              <img src={process.env.PUBLIC_URL + "/images/174857 1.png"} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const TeachersSection = () => {
  return (
    <section className="teachers-section" id="teachers">
      <h2>Наші викладачі</h2>
      <p className="intro-text">Знайомтеся з нашими досвідченими та відданими викладачами.</p>

      <div className="teachers">
        <TeacherCard
          name="Олександр Сидоренко"
          position="Senior Web Developer"
          bio="Олександр має понад 10 років досвіду у веб-розробці, спеціалізується на фронтенд-технологіях."
          instagramLink="https://www.instagram.com/"
          linkedinLink="https://ua.linkedin.com/"
          imageSrc={process.env.PUBLIC_URL + "/images/Group 337(1).png"}
        />
        <TeacherCard
          name="Марина Гриневич"
          position="Python Instructor"
          bio="Марина є експертом в Python та машинному навчанні."
          instagramLink="https://www.instagram.com/"
          linkedinLink="https://ua.linkedin.com/"
          imageSrc={process.env.PUBLIC_URL + "/images/Group 338(1).png"}
        />
        <TeacherCard
          name="Світлана Романенко"
          position="UI/UX Designer"
          bio="Світлана є експертом з UX, який захоплюється створенням зручних та красивих дизайнів."
          instagramLink="https://www.instagram.com/"
          linkedinLink="https://ua.linkedin.com/"
          imageSrc={process.env.PUBLIC_URL + "/images/Group 339(1).png"}
        />
      </div>
    </section>
  );
};

export default TeachersSection;
