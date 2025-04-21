import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slider";

function CoursesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [showFreeOnly, setShowFreeOnly] = useState(query.get("free") === "true");

  const [priceRange, setPriceRange] = useState([
    parseInt(query.get("minPrice") || "0"),
    parseInt(query.get("maxPrice") || "5000"),
  ]);

  const [myCourses, setMyCourses] = useState([]);
  const [sortOption, setSortOption] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState(query.get("search")?.toLowerCase() || "");
  useEffect(() => {
    const initialCategories = query.getAll("category");
    const initialLanguages = query.getAll("language");
    const initialTypes = query.getAll("type");
  
    setSelectedCategory(initialCategories);
    setSelectedLanguage(initialLanguages);
    setSelectedProductType(initialTypes);
  }, []);
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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
      image: "images/17.jpg",
      category: "Штучний Інтелект",
      title: "Вступ до штучного інтелекту",
      price: "1699 грн",
      time: "14 годин",
      videos: "16 відео",
      students: "1,500 учнів",
      language: "Українська",
    },
    {
      image: "images/18.jpg",
      category: "Штучний Інтелект",
      title: "Machine Learning з Python",
      price: "1999 грн",
      time: "18 годин",
      videos: "22 відео",
      students: "2,400 учнів",
      language: "Англійська",
    },
    {
      image: "images/19.jpg",
      category: "Штучний Інтелект",
      title: "ChatGPT для розробників",
      price: "Безкоштовно",
      time: "4 години",
      videos: "6 відео",
      students: "1,100 учнів",
      language: "Польська",
    },
    {
      image: "images/20.jpg",
      category: "Штучний Інтелект",
      title: "AI у бізнесі",
      price: "1799 грн",
      time: "12 годин",
      videos: "15 відео",
      students: "1,700 учнів",
      language: "Англійська",
    },
    {
      image: "images/21.jpg",
      category: "Штучний Інтелект",
      title: "Комп'ютерний зір з OpenCV",
      price: "1899 грн",
      time: "16 годин",
      videos: "19 відео",
      students: "1,600 учнів",
      language: "Українська",
    },
    {
      image: "images/22.jpg",
      category: "Бізнес",
      title: "Початок власного бізнесу",
      price: "1599 грн",
      time: "10 годин",
      videos: "13 відео",
      students: "1,800 учнів",
      language: "Українська",
    },
    {
      image: "images/23.jpg",
      category: "Бізнес",
      title: "Маркетингова стратегія 101",
      price: "1699 грн",
      time: "11 годин",
      videos: "14 відео",
      students: "2,000 учнів",
      language: "Англійська",
    },
    {
      image: "images/24.jpg",
      category: "Бізнес",
      title: "Управління фінансами для підприємців",
      price: "1499 грн",
      time: "9 годин",
      videos: "11 відео",
      students: "1,200 учнів",
      language: "Польська",
    },
    {
      image: "images/25.jpg",
      category: "Бізнес",
      title: "Цифровий маркетинг 101",
      price: "1499 грн",
      time: "12 годин",
      videos: "15 відео",
      students: "2,300 учнів",
      language: "Польська",
    },
    {
      image: "images/26.jpg",
      category: "Бізнес",
      title: "Бізнес-аналітика з Excel",
      price: "1299 грн",
      time: "8 годин",
      videos: "10 відео",
      students: "1,400 учнів",
      language: "Українська",
    },
    {
      image: "images/27.jpg",
      category: "Особистісний Розвиток",
      title: "Мистецтво публічних виступів",
      price: "999 грн",
      time: "7 годин",
      videos: "10 відео",
      students: "1,000 учнів",
      language: "Українська",
    },
    {
      image: "images/28.jpg",
      category: "Особистісний Розвиток",
      title: "Як підвищити продуктивність",
      price: "1299 грн",
      time: "8 годин",
      videos: "11 відео",
      students: "900 учнів",
      language: "Англійська",
    },
    {
      image: "images/29.jpg",
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
      image: "images/python-1.webp",
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
  

  const handleCheckboxChange = (value, currentList, setList) => {
    const updated = currentList.includes(value)
      ? currentList.filter((v) => v !== value)
      : [...currentList, value];
    setList(updated);
  };

  const filterCourses = (customFilters = {}) => {
    const categoryFilter = customFilters.selectedCategory ?? selectedCategory;
    const languageFilter = customFilters.selectedLanguage ?? selectedLanguage;
    const typeFilter = customFilters.selectedProductType ?? selectedProductType;
    const freeFilter = customFilters.showFreeOnly ?? showFreeOnly;
    const [minPrice, maxPrice] = customFilters.priceRange ?? priceRange;

    return courses.filter((course) => {
        const matchTitle = searchQuery === "" || course.title.toLowerCase().includes(searchQuery);

      const coursePrice = course.price.toLowerCase().includes("безкоштовно")
        ? 0
        : parseInt(course.price.replace(/[^\d]/g, ""));
      const matchCategory =
        categoryFilter.length === 0 || categoryFilter.includes(course.category);
      const matchLang =
        languageFilter.length === 0 || languageFilter.includes(course.language);
      const matchType =
        typeFilter.length === 0 || typeFilter.includes(course.type);
      const matchPrice = coursePrice >= minPrice && coursePrice <= maxPrice;
      const matchFree = !freeFilter || coursePrice === 0;

      return matchTitle && matchCategory && matchLang && matchType && matchPrice && matchFree;
    });
  };

  const filteredCourses = filterCourses();

  const getFilterCounts = () => {
    const all = {
      categories: {},
      languages: {},
      types: {},
    };

    courses.forEach((course) => {
      const matches = filterCourses({
        selectedCategory: [],
        selectedLanguage,
        selectedProductType,
        priceRange,
        showFreeOnly,
      }).includes(course);
      if (matches) {
        all.categories[course.category] = (all.categories[course.category] || 0) + 1;
      }

      const matchesLang = filterCourses({
        selectedCategory,
        selectedLanguage: [],
        selectedProductType,
        priceRange,
        showFreeOnly,
      }).includes(course);
      if (matchesLang) {
        all.languages[course.language] = (all.languages[course.language] || 0) + 1;
      }

      const matchesType = filterCourses({
        selectedCategory,
        selectedLanguage,
        selectedProductType: [],
        priceRange,
        showFreeOnly,
      }).includes(course);
      if (matchesType) {
        all.types[course.type] = (all.types[course.type] || 0) + 1;
      }
    });

    return all;
  };

  const counts = getFilterCounts();

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const aPrice = a.price.toLowerCase().includes("безкоштовно")
      ? 0
      : parseInt(a.price.replace(/[^\d]/g, ""));
    const bPrice = b.price.toLowerCase().includes("безкоштовно")
      ? 0
      : parseInt(b.price.replace(/[^\d]/g, ""));
    if (sortOption === "priceAsc") return aPrice - bPrice;
    if (sortOption === "priceDesc") return bPrice - aPrice;
    return (
      parseInt(b.students.replace(/[^\d]/g, "")) -
      parseInt(a.students.replace(/[^\d]/g, ""))
    );
  });

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
      const newCourse = { ...course };
      const updatedCourses = [...myCourses, newCourse];
      localStorage.setItem("myCourses", JSON.stringify(updatedCourses));
      setMyCourses(updatedCourses);
    }
  };
  const clearAllFilters = () => {
    setSelectedCategory([]);
    setSelectedLanguage([]);
    setSelectedProductType([]);
    setShowFreeOnly(false);
    setPriceRange([0, 5000]);
  };
  
  const getButtonState = (courseTitle) => {
    const isAdded = myCourses.some((c) => c.title === courseTitle);
    const progress =
      parseInt(localStorage.getItem(`progress_${courseTitle}`)) || 0;
    const isCompleted =
      localStorage.getItem(`completed_${courseTitle}`) === "true";

    if (isCompleted) {
      return { text: "Завершено", background: "#2ecc71", disabled: true };
    } else if (isAdded || progress > 0) {
      return { text: "Переглянути", background: "#3498db", disabled: false };
    } else {
      return { text: "Приєднатися", background: "#e67e22", disabled: false };
    }
  };
  const areFiltersActive =
  selectedCategory.length > 0 ||
  selectedLanguage.length > 0 ||
  selectedProductType.length > 0 ||
  showFreeOnly ||
  priceRange[0] !== 0 ||
  priceRange[1] !== 5000;



  return (
    <div className="courses-page">
      <div className="sidebar">
      <div className="filters-header2">
  <h3>Фільтри</h3>
  {areFiltersActive && (
    <i
      className="bx bx-trash clear-icon2"
      onClick={clearAllFilters}
      title="Очистити всі фільтри"
    ></i>
  )}
</div>
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
      </div>
      {isFilterModalOpen && (
  <div className="filter-modal-backdrop" onClick={() => setIsFilterModalOpen(false)}>
    <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Фільтри</h3>
        <span className="close-modal" onClick={() => setIsFilterModalOpen(false)}>&times;</span>
      </div>
      <div className="modal-body">
      <div className="sidebar">
      <div className="filters-header2">
  <h3>Фільтри</h3>
  {areFiltersActive && (
    <i
      className="bx bx-trash clear-icon2"
      onClick={clearAllFilters}
      title="Очистити всі фільтри"
    ></i>
  )}
</div>
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
      </div>
      </div>
    </div>
  </div>
)}

      <section className="course-results">
      <div className="search-sort-wrapper">



  <div className="search-wrapper-inline">
    <input
      type="text"
      placeholder="Пошук курсів"
      className="search-input-inline"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    {searchQuery && (
      <span
        className="clear-icon"
        onClick={() => setSearchQuery("")}
        title="Очистити"
      >
        &times;
      </span>
    )}
  </div>
  <button className="mobile-filter-button" onClick={() => setIsFilterModalOpen(true)}>
    Фільтри
  </button>
  <div className="sort-inline">
    <label htmlFor="sort">Сортувати за: </label>
    <select
      id="sort"
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="popularity">Популярністю</option>
      <option value="priceAsc">Ціною: від дешевих до дорогих</option>
      <option value="priceDesc">Ціною: від дорогих до дешевих</option>
    </select>
  </div>
</div>


        <div className="courses-head">
          <h2>Результати пошуку</h2>

        </div>

        <div className="courses">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course, index) => {
              const buttonState = getButtonState(course.title);
              return (
                <article className="course" key={index}>
                  <img src={course.image} alt={course.title} />
                  <div className="course-info">
                    <p className="category">{course.category}</p>
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
            })
          ) : (
            <p className="no-results">Нічого не знайдено.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CoursesPage;
