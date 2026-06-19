import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import SpeedChecker from './SpeedChecker';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import ArticlePage from './pages/ArticlePage';
import ContactUs from './pages/ContactUs';
import WebsitePerformance from './pages/WebsitePerformance';
import WebsitePerformanceArticle from './pages/WebsitePerformanceArticle';
import Faq from './pages/Faq';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpeedChecker />} />
        <Route path="/guides" element={<Blog />} />
        <Route path="/guides/:slug" element={<ArticlePage />} />
        <Route path="/website-performance" element={<WebsitePerformance />} />
        <Route path="/website-performance/:slug" element={<WebsitePerformanceArticle />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Navigate to="/guides" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/guides" replace />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
