import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import logoSvg from '../assets/logo.svg';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Personal Loan', path: '/personal-loan' },
    { name: 'Home Loan', path: '/home-loan' },
    { name: 'Business Loan', path: '/business-loan' },
    { name: 'MSME Loan', path: '/msme-loan' },
    { name: 'EMI Calculator', path: '/emi-calculator' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className="site-header">
      {/* Utkarsh Top Utility Bar */}
      <div className="top-bar">
        <div className="container header-container top-bar-container">
          <div className="top-bar-left">
            <span className="top-item">
              <PhoneCall size={12} className="top-icon" />
              <span className="toll-free-label">Toll-Free: </span>
              <a href="tel:8958623532">+91 8958623532</a>
            </span>
            <span className="top-item hide-mobile">
              <Mail size={12} className="top-icon" />
              <a href="mailto:support@utkarshfinance.in">support@utkarshfinance.in</a>
            </span>
          </div>
          <div className="top-bar-right">
            <span className="top-tagline hide-mobile">
              आपकी उम्मीद का फाइनेंस
            </span>
            <span className="top-badge">
              <ShieldCheck size={12} />
              <span className="badge-text-full">RBI Registered Financial Institution</span>
              <span className="badge-text-short">RBI Registered</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container navbar-container">
          <Link to="/" className="logo-container" aria-label="Utkarsh Finance Home">
            <img src={logoSvg} alt="Utkarsh Finance Logo" className="logo-img" />
          </Link>

          <div className="desktop-menu">
            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <li key={index} className="nav-item">
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="nav-actions">
              <Link to="/online-loan-apply" className="btn btn-secondary apply-btn">
                Apply Loan <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="mobile-menu-toggle">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              aria-label="Toggle mobile menu"
              className="menu-button"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-top-info">
            <p><strong>Utkarsh Finance</strong> | आपकी उम्मीद का फाइनेंस</p>
            <p>Mob: +91 8958623532 | support@utkarshfinance.in</p>
          </div>
          <ul className="mobile-nav-links">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="mt-4">
              <Link to="/online-loan-apply" className="btn btn-secondary w-full">
                Apply for Loan Now <ArrowRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
