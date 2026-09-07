import React, { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-spy, throttled to one measurement per animation frame instead of
  // running 5 getBoundingClientRect() reads on every raw scroll event.
  useEffect(() => {
    let ticking = false;

    const measure = () => {
      setScrolled(window.scrollY > 50);
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(SECTION_IDS[i]);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scroll and allow Escape to close the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a className="nav-logo" href="#home" onClick={() => handleNav('#home')}>
          <span className="logo-bracket">&lt;</span>
          DB
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={active === l.href.replace('#', '') ? 'nav-link active' : 'nav-link'}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav-cmd-toggle"
              onClick={() => window.dispatchEvent(new Event('openCmd'))}
              title="Command Palette (Cmd+K)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <span>⌘K</span>
            </button>
          </li>
          <li>
            <a
              className="nav-cta"
              href="mailto:digvijaybhota777@gmail.com?subject=Portfolio%20Inquiry&body=Hello%20Digvijay,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
          <span className={menuOpen ? 'bar open' : 'bar'} />
        </button>
      </div>
    </nav>
  );
}
