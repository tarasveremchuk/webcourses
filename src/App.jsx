import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import InfoBlock from "./components/InfoBlock";
import CourseSection from "./components/CourseSection";
import PreFooterSection from "./components/PreFooterSection";
import ReviewsSection from "./components/ReviewSection";
import TeachersSection from "./components/TeachersSection";

// Сторінки для маршрутизації
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CoursePage from "./pages/CoursePage";
import CoursesPage from "./pages/CoursesPage";
import InfoPage from "./pages/InfoPage";
function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <InfoBlock />
                <CourseSection />
                <PreFooterSection />
                <ReviewsSection />
                <TeachersSection />
              </>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/info" element={<InfoPage />} />


        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
