import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpeedChecker from './SpeedChecker';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import AboutUs from './pages/AboutUs';
import CookiePolicy from './pages/CookiePolicy';
import Blog from './pages/Blog';
import ArticlePage from './pages/ArticlePage';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpeedChecker />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
