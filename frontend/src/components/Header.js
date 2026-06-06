import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Guides' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about-us', label: 'About' },
  { to: '/contact-us', label: 'Contact' },
];

export default function Header({ onStartTest, testing = false, showAction = false }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="topbar" id="site-header">
      <Link to="/" className="brand" onClick={closeMenu} aria-label="Speed Pings Home">
        <img src="/logo.svg" alt="Speed Pings logo" className="brand-logo" />
        <span className="brand-text">Speed Pings</span>
      </Link>

      <button
        type="button"
        className={`menu-toggle ${open ? 'is-open' : ''}`}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`topnav ${open ? 'nav-open' : ''}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to={item.to}
            onClick={closeMenu}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {showAction && (
        <button className="run-btn header-action" onClick={onStartTest} disabled={testing}>
          {testing ? 'Testing...' : 'Start Test'}
        </button>
      )}
    </header>
  );
}
