import Footer from './Footer';
import Header from './Header';
import BackToTop from './BackToTop';

export default function Layout({ children }) {
  return (
    <div className="speed-page">
      <div className="speed-app">
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
