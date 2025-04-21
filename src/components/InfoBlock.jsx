import React, { useState } from "react";
import Slider from "react-slider";
import { useNavigate } from "react-router-dom";


const courses = [
  {
    image: "images/1.jpg",
    category: "Веб-Розробка",
    title: "HTML та CSS: Створення Сайтів з Нуля",
    price: "999 грн",
    time: "12 годин",
    videos: "15 відео",
    students: "1,500 учнів",
    language: "Українська",
  },
  {
    image: "images/2.jpg",
    category: "Веб-Розробка",
    title: "JavaScript для початківців",
    price: "1499 грн",
    time: "14 годин",
    videos: "18 відео",
    students: "2,300 учнів",
    language: "Українська",
  },
  {
    image: "images/3.jpg",
    category: "Веб-Розробка",
    title: "React.js: Побудова SPA",
    price: "1899 грн",
    time: "16 годин",
    videos: "20 відео",
    students: "3,100 учнів",
    language: "Англійська",
  },
  {
    image: "images/4.jpg",
    category: "Веб-Розробка",
    title: "Workshop: створення лендінг-сторінки",
    price: "Безкоштовно",
    time: "5 годин",
    videos: "7 відео",
    students: "850 учнів",
    language: "Українська",
  },
  {
    image: "images/5.jpg",
    category: "Веб-Розробка",
    title: "Node.js та Express для серверної частини",
    price: "1699 грн",
    time: "13 годин",
    videos: "17 відео",
    students: "1,900 учнів",
    language: "Англійська",
  },
  {
    image: "images/6.jpg",
    category: "Веб-Розробка",
    title: "Vue.js для новачків",
    price: "1499 грн",
    time: "11 годин",
    videos: "14 відео",
    students: "1,300 учнів",
    language: "Українська",
  },
  {
    image: "images/7.jpg",
    category: "Python",
    title: "Основи Python з практичними вправами",
    price: "1299 грн",
    time: "15 годин",
    videos: "19 відео",
    students: "2,000 учнів",
    language: "Англійська",
  },
  {
    image: "images/8.jpg",
    category: "Python",
    title: "Python для аналізу даних",
    price: "1399 грн",
    time: "13 годин",
    videos: "17 відео",
    students: "1,800 учнів",
    language: "Польська",
  },
  {
    image: "images/9.jpg",
    category: "Python",
    title: "Автоматизація задач з Python",
    price: "Безкоштовно",
    time: "10 годин",
    videos: "12 відео",
    students: "2,700 учнів",
    language: "Англійська",
  },
  {
    image: "images/10.jpg",
    category: "Python",
    title: "Веб-розробка з Django",
    price: "1599 грн",
    time: "14 годин",
    videos: "16 відео",
    students: "2,100 учнів",
    language: "Українська",
  },
  {
    image: "images/11.jpg",
    category: "Python",
    title: "Flask API з нуля",
    price: "1299 грн",
    time: "9 годин",
    videos: "11 відео",
    students: "1,600 учнів",
    language: "Англійська",
  },
  {
    image: "images/12.jpg",
    category: "UI/UX Дизайн",
    title: "Основи UI-дизайну",
    price: "1499 грн",
    time: "8 годин",
    videos: "10 відео",
    students: "1,200 учнів",
    language: "Українська",
  },
  {
    image: "images/13.jpg",
    category: "UI/UX Дизайн",
    title: "UX-проєктування: від ідеї до прототипу",
    price: "1599 грн",
    time: "11 годин",
    videos: "14 відео",
    students: "900 учнів",
    language: "Англійська",
  },
  {
    image: "images/14.jpg",
    category: "UI/UX Дизайн",
    title: "Figma для дизайнерів",
    price: "Безкоштовно",
    time: "6 годин",
    videos: "8 відео",
    students: "2,000 учнів",
    language: "Українська",
  },
  {
    image: "images/15.jpg",
    category: "UI/UX Дизайн",
    title: "Мобільний UX дизайн",
    price: "1399 грн",
    time: "9 годин",
    videos: "12 відео",
    students: "1,100 учнів",
    language: "Польська",
  },
  {
    image: "images/16.jpg",
    category: "UI/UX Дизайн",
    title: "Інтерактивні прототипи у Figma",
    price: "999 грн",
    time: "7 годин",
    videos: "9 відео",
    students: "1,000 учнів",
    language: "Українська",
  },
  {
    image: "images/ai-1.png",
    category: "Штучний Інтелект",
    title: "Вступ до штучного інтелекту",
    price: "1699 грн",
    time: "14 годин",
    videos: "16 відео",
    students: "1,500 учнів",
    language: "Українська",
  },
  {
    image: "images/ai-2.png",
    category: "Штучний Інтелект",
    title: "Machine Learning з Python",
    price: "1999 грн",
    time: "18 годин",
    videos: "22 відео",
    students: "2,400 учнів",
    language: "Англійська",
  },
  {
    image: "images/ai-3.png",
    category: "Штучний Інтелект",
    title: "ChatGPT для розробників",
    price: "Безкоштовно",
    time: "4 години",
    videos: "6 відео",
    students: "1,100 учнів",
    language: "Польська",
  },
  {
    image: "images/ai-4.png",
    category: "Штучний Інтелект",
    title: "AI у бізнесі",
    price: "1799 грн",
    time: "12 годин",
    videos: "15 відео",
    students: "1,700 учнів",
    language: "Англійська",
  },
  {
    image: "images/ai-5.png",
    category: "Штучний Інтелект",
    title: "Комп'ютерний зір з OpenCV",
    price: "1899 грн",
    time: "16 годин",
    videos: "19 відео",
    students: "1,600 учнів",
    language: "Українська",
  },
  {
    image: "images/business-1.png",
    category: "Бізнес",
    title: "Початок власного бізнесу",
    price: "1599 грн",
    time: "10 годин",
    videos: "13 відео",
    students: "1,800 учнів",
    language: "Українська",
  },
  {
    image: "images/business-2.png",
    category: "Бізнес",
    title: "Маркетингова стратегія 101",
    price: "1699 грн",
    time: "11 годин",
    videos: "14 відео",
    students: "2,000 учнів",
    language: "Англійська",
  },
  {
    image: "images/business-3.png",
    category: "Бізнес",
    title: "Управління фінансами для підприємців",
    price: "1499 грн",
    time: "9 годин",
    videos: "11 відео",
    students: "1,200 учнів",
    language: "Польська",
  },
  {
    image: "images/marketing.png",
    category: "Бізнес",
    title: "Цифровий маркетинг 101",
    price: "1499 грн",
    time: "12 годин",
    videos: "15 відео",
    students: "2,300 учнів",
    language: "Польська",
  },
  {
    image: "images/business-4.png",
    category: "Бізнес",
    title: "Бізнес-аналітика з Excel",
    price: "1299 грн",
    time: "8 годин",
    videos: "10 відео",
    students: "1,400 учнів",
    language: "Українська",
  },
  {
    image: "images/personal-1.png",
    category: "Особистісний Розвиток",
    title: "Мистецтво публічних виступів",
    price: "999 грн",
    time: "7 годин",
    videos: "10 відео",
    students: "1,000 учнів",
    language: "Українська",
  },
  {
    image: "images/personal-2.png",
    category: "Особистісний Розвиток",
    title: "Як підвищити продуктивність",
    price: "1299 грн",
    time: "8 годин",
    videos: "11 відео",
    students: "900 учнів",
    language: "Англійська",
  },
  {
    image: "images/personal-3.png",
    category: "Особистісний Розвиток",
    title: "Техніки тайм-менеджменту",
    price: "Безкоштовно",
    time: "6 годин",
    videos: "8 відео",
    students: "1,300 учнів",
    language: "Українська",
  },
  {
    image: "images/personal-4.png",
    category: "Особистісний Розвиток",
    title: "Майндфулнес для щоденного життя",
    price: "1199 грн",
    time: "5 годин",
    videos: "7 відео",
    students: "800 учнів",
    language: "Польська",
  },
  {
    image: "images/personal-5.png",
    category: "Особистісний Розвиток",
    title: "Емоційний інтелект",
    price: "1399 грн",
    time: "9 годин",
    videos: "12 відео",
    students: "1,500 учнів",
    language: "Англійська",
  },
  {
    image: "images/bonus-1.png",
    category: "Бізнес",
    title: "Побудова бренду",
    price: "1599 грн",
    time: "10 годин",
    videos: "13 відео",
    students: "1,800 учнів",
    language: "Українська",
  },
  {
    image: "images/bonus-2.png",
    category: "UI/UX Дизайн",
    title: "Формування дизайн-систем",
    price: "1499 грн",
    time: "10 годин",
    videos: "13 відео",
    students: "1,600 учнів",
    language: "Англійська",
  },
  {
    image: "images/bonus-3.png",
    category: "Python",
    title: "Pandas та аналіз даних",
    price: "1399 грн",
    time: "11 годин",
    videos: "14 відео",
    students: "2,100 учнів",
    language: "Українська",
  },
  {
    image: "images/bonus-4.png",
    category: "Штучний Інтелект",
    title: "NLP: обробка природної мови",
    price: "1699 грн",
    time: "13 годин",
    videos: "17 відео",
    students: "1,800 учнів",
    language: "Англійська",
  },
  {
    image: "images/bonus-5.png",
    category: "Особистісний Розвиток",
    title: "Кар'єрне планування",
    price: "Безкоштовно",
    time: "6 годин",
    videos: "9 відео",
    students: "1,100 учнів",
    language: "Українська",
  }
];


function InfoBlock() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleCheckboxChange = (value, selectedList, setSelectedList) => {
    setSelectedList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filterCourses = () => {
    return courses.filter((course) => {
      const coursePrice = course.price.toLowerCase().includes("безкоштовно")
        ? 0
        : parseInt(course.price.replace(/[^\d]/g, ""));
      const matchTitle =
        searchQuery === "" ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory.length === 0 || selectedCategory.includes(course.category);
      const matchLang =
        selectedLanguage.length === 0 || selectedLanguage.includes(course.language);
      const matchType =
        selectedProductType.length === 0 || selectedProductType.includes(course.type);
      const matchPrice =
        coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
      const matchFree = !showFreeOnly || coursePrice === 0;

      return matchTitle && matchCategory && matchLang && matchType && matchPrice && matchFree;
    });
  };

  const getFilterCounts = () => {
    const all = {
      categories: {},
      languages: {},
      types: {},
    };
  
    courses.forEach((course) => {
      all.categories[course.category] = (all.categories[course.category] || 0) + 1;
      all.languages[course.language] = (all.languages[course.language] || 0) + 1;
      all.types[course.type] = (all.types[course.type] || 0) + 1;
    });
  
    return all;
  };
  

  const counts = getFilterCounts();

  const applyFilter = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
  
    if (searchQuery) params.set("search", searchQuery);
    if (showFreeOnly) params.set("free", "true");
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0]);
    if (priceRange[1] < 5000) params.set("maxPrice", priceRange[1]);
  
    selectedCategory.forEach((cat) => params.append("category", cat));
    selectedLanguage.forEach((lang) => params.append("language", lang));
    selectedProductType.forEach((type) => params.append("type", type));
  
    navigate(`/courses?${params.toString()}`);
  };
  

  return (
    <div className="info-block">
      <div className="info-background">
        <div className="info-content">
          <h2 className="info-title-block">
            <span className="smart">Розумний</span> <br />
            Вибір Для <span className="future">Майбутнього</span>
          </h2>
          <p className="info-text">
            Elearn — це глобальний провайдер навчання, що працює по всій Європі
            та спеціалізується на акредитованих і унікальних навчальних курсах.
          </p>

          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Пошук курсів"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i
                className="bx bx-filter-alt filter-icon"
                onClick={toggleFilter}
              ></i>
            </div>
            <button
              className="search-btn"
              onClick={() =>
                navigate(`/courses?search=${encodeURIComponent(searchQuery)}`)
              }
            >
              Пошук
            </button>
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className="filter-modal">
          <div className="filter-modal-content">
          <div className="filter-header">
  <h3>Фільтри</h3>
  <i
    className="bx bx-x close-icon"
    onClick={toggleFilter}
    title="Закрити фільтри"
  ></i>
</div>
            <form onSubmit={applyFilter}>
              <div className="filter-section">
                <h4>Тема</h4>
                {Object.keys(counts.categories).map((cat) => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      checked={selectedCategory.includes(cat)}
                      onChange={() =>
                        handleCheckboxChange(cat, selectedCategory, setSelectedCategory)
                      }
                    />
                    {cat} ({counts.categories[cat]})
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <h4>Мова</h4>
                {Object.keys(counts.languages).map((lang) => (
                  <label key={lang}>
                    <input
                      type="checkbox"
                      checked={selectedLanguage.includes(lang)}
                      onChange={() =>
                        handleCheckboxChange(lang, selectedLanguage, setSelectedLanguage)
                      }
                    />
                    {lang} ({counts.languages[lang]})
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <h4>Тип продукту</h4>
                {Object.keys(counts.types).map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedProductType.includes(type)}
                      onChange={() =>
                        handleCheckboxChange(type, selectedProductType, setSelectedProductType)
                      }
                    />
                    {type} ({counts.types[type]})
                  </label>
                ))}
              </div>

              <div className="filter-section">
                <h4>Ціновий діапазон</h4>
                <Slider
                  className="custom-slider"
                  min={0}
                  max={5000}
                  step={100}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value)}
                  renderTrack={(props) => <div {...props} className="track" />}
                  renderThumb={(props) => <div {...props} className="thumb" />}
                />
                <div className="price-range">
                  <span>{priceRange[0]}₴</span> - <span>{priceRange[1]}₴</span>
                </div>
              </div>

              <div className="filter-section">
                <label>
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                  />
                  Показати лише безкоштовні курси
                </label>
              </div>

              <button type="submit" className="apply-btn">
                Застосувати
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="side-image">
        <img src="images/OBJECTS.png" alt="Side visual" />
      </div>
    </div>
  );
}

export default InfoBlock;
