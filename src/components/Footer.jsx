import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';
import logoSvg from '../assets/logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust Highlight Banner */}
        <div className="footer-trust-banner">
          <div className="trust-item">
            <ShieldCheck size={28} className="trust-icon" />
            <div>
              <strong>RBI Registered</strong>
              <p>Trusted & Regulated Financial Institution</p>
            </div>
          </div>
          <div className="trust-item">
            <Clock size={28} className="trust-icon" />
            <div>
              <strong>24x7 Digital Access</strong>
              <p>Seamless online loan application</p>
            </div>
          </div>
          <div className="trust-item">
            <Phone size={28} className="trust-icon" />
            <div>
              <strong>Toll-Free Support</strong>
              <p><a href="tel:8958623532" style={{ color: 'inherit' }}>+91 8958623532</a></p>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-col company-col">
            <Link to="/" className="footer-logo">
              <img src={logoSvg} alt="Utkarsh Finance Logo" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">
              <strong>आपकी उम्मीद का फाइनेंस</strong>
            </p>
            <p className="footer-desc">
              Utkarsh Finance is committed to financial inclusion and empowering individuals, entrepreneurs, and enterprises across India with trusted, transparent, and affordable financial solutions.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/emi-calculator">EMI Calculator</Link></li>
              <li><Link to="/online-loan-apply">Apply For Loan</Link></li>
              <li><Link to="/contact-us">Branch & Office Locator</Link></li>
              <li><Link to="/contact-us">Support Desk</Link></li>
            </ul>
          </div>

          {/* Loan Services */}
          <div className="footer-col">
            <h4>Loan Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/personal-loan">Personal Loan</Link></li>
              <li><Link to="/home-loan">Home Loan</Link></li>
              <li><Link to="/business-loan">Business Loan</Link></li>
              <li><Link to="/msme-loan">MSME Loan</Link></li>
              <li><Link to="/loan-against-property">Loan Against Property</Link></li>
              <li><Link to="/education-loan">Education Loan</Link></li>
              <li><Link to="/car-loan">Vehicle & Car Loan</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col contact-col">
            <h4>Registered & Head Office</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={22} className="contact-icon flex-shrink-0" />
                <span>11/27, Rudraksh complex, Maninagar, Ahmedabad, Gujarat</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon flex-shrink-0" />
                <div>
                  <a href="mailto:support@utkarshfinance.in">support@utkarshfinance.in</a>
                </div>
              </li>
              <li>
                <Phone size={18} className="contact-icon flex-shrink-0" />
                <div>
                  <a href="tel:8958623532">+91 8958623532</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            *Disclaimer: Utkarsh Finance is a premier financial institution regulated by RBI guidelines. All loans and credit approvals are subject to credit verification, risk assessment, and policy terms.
          </p>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Utkarsh Finance. All Rights Reserved.</p>
          <ul className="bottom-links">
            <li><Link to="/term-of-use">Terms of Use</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
