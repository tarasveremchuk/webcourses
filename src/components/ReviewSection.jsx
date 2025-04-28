import React, { useEffect, useRef } from 'react';

const reviews = [
  {
    text: 'Цей курс змінив моє уявлення про програмування! Дуже зрозумілий матеріал і круті викладачі.',
    name: 'Олександр Іваненко',
    course: 'UI/UX дизайн',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34.png',
  },
  {
    text: 'Дуже сподобалась подача матеріалу. Всі теми пояснюються на реальних прикладах.',
    name: 'Марина Коваленко',
    course: 'Веб-розробка',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34(1).png',
  },
  {
    text: 'Після цього курсу я отримав свою першу роботу у сфері IT! Дякую за чудовий досвід.',
    name: 'Артем Дорошенко',
    course: 'Фронтенд-розробка',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34(3).png',
  },
  {
    text: 'Все доступно і структуровано! Рекомендую всім, хто хоче швидко освоїти нову професію.',
    name: 'Наталія Бондар',
    course: 'Тестування ПЗ',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34(2).png',
  },
  {
    text: 'Курс дуже насичений, але подача дозволяє легко засвоїти матеріал.',
    name: 'Дмитро Сидоренко',
    course: 'Data Science',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34(4).png',
  },
  {
    text: 'Навчання було продуктивним і цікавим. Дуже задоволений результатом!',
    name: 'Ірина Жук',
    course: 'Back-End розробка',
    image: process.env.PUBLIC_URL + '/images/Ellipse 34(5).png',
  },
];

const ReviewsSection = () => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const fullList = [...reviews, ...reviews, ...reviews]; // дублюємо 3 рази

  // Автоматичне позиціонування на центр
  useEffect(() => {
    const container = scrollRef.current;
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const scrollTo = cardWidth * reviews.length; // центр
    container.scrollLeft = scrollTo;
  }, []);

  // Циклічне повернення у центр, якщо ми долистали вліво або вправо
  useEffect(() => {
    const container = scrollRef.current;
    const cardWidth = cardRef.current?.offsetWidth || 0;
    const listLength = reviews.length;

    const handleScroll = () => {
      if (!container) return;

      const maxScroll = cardWidth * listLength * 2;
      const minScroll = cardWidth * listLength;

      if (container.scrollLeft <= cardWidth) {
        container.scrollLeft = minScroll + cardWidth;
      } else if (container.scrollLeft >= maxScroll - cardWidth) {
        container.scrollLeft = minScroll - cardWidth;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="reviews-section">
      <h2>Відгуки наших студентів</h2>
      <div className="reviews-container">
        <button className="prev-btn" onClick={() => scroll('left')}>&#10094;</button>
        <div className="reviews-wrapper">
          <div className="reviews" ref={scrollRef}>
            {fullList.map((review, index) => (
              <div
                className="review-card"
                key={index}
                ref={index === reviews.length ? cardRef : null} // середня (оригінальна) карта для заміру
              >
                <p>"{review.text}"</p>
                <div className="reviewer-info">
                  <img src={review.image} alt={review.name} className="profile-photo" />
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">{review.name}</h4>
                    <p className="reviewer-course">{review.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="next-btn" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </section>
  );
};

export default ReviewsSection;
