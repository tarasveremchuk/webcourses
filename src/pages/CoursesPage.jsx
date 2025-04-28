import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slider";
import Pagination from "../components/Pagination";
import { db,collection, getDocs } from "../services/firebase";

function CoursesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const handlePageChange = (page) => {
  setCurrentPage(page);
};
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "courses"));

      const coursesList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          image: data.image || "",
          language: data.language || "",
          learn: data.learn || [],
          skills: data.skills || [],
          students: data.students || "0 учнів",
          price: data.price || "0 грн",
          reviews: data.reviews || [],
          time: data.time || "",
          videos: data.videos || "",
          rating: data.rating || 0,
        };
      });

      setCourses(coursesList);
    } catch (err) {
      console.error("Помилка при завантаженні курсів:", err);
      setError("Не вдалося завантажити курси.");
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);


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
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLanguage, selectedProductType, showFreeOnly, priceRange]);
  
  
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);


  

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
  const currentCourses = sortedCourses.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
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
      <div className="filters-header2">
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
)}

      <section className="course-results">
      <div className="search-sort-wrapper">


      <div className="search-wrapper-inline">
  <i
    className="bx bx-filter-alt filter-icon-inside"
    onClick={() => setIsFilterModalOpen(true)}
    title="Фільтри"
  ></i>

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
  currentCourses.map((course, index) => {
    const buttonState = getButtonState(course.title);
              return (
                <article className="course" key={index} onClick={() => navigate(`/course_info/${encodeURIComponent(course.title)}`)}
                style={{ cursor: "pointer" }}>
                  <img src={course.image} alt={course.title} />
                  <div className="course-info">
                    <p className="category">{course.category}</p>
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
                  
                </article>
              );
            })
          ) : (
            <p className="no-results">Нічого не знайдено.</p>
          )}
        </div>
        {totalPages > 1 && (
  <Pagination
  totalPages={totalPages}
  currentPage={currentPage}
  onPageChange={handlePageChange}
/>
)}

      </section>
    </div>
  );
}

export default CoursesPage;
