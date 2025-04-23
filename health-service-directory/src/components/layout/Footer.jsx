import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white w-full border-t border-gray-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 order-2 md:order-1">
          <Link to="/about" className="footer-link">
            About Us
          </Link>
          <Link to="/contact" className="footer-link">
            Contact
          </Link>
          <Link to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer-link">
            Terms of Service
          </Link>
        </nav>
        <div className="order-1 md:order-2 w-full md:w-auto flex justify-center">
          <p className="text-xs leading-5 text-gray-500 text-center">
            &copy; 2024 HealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
