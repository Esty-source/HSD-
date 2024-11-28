import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 HealthConnect. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6 md:order-2">
          <nav className="flex space-x-6">
            <Link to="/about" className="text-sm leading-6 text-gray-600 hover:text-blue-600">
              About Us
            </Link>
            <Link to="/contact" className="text-sm leading-6 text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm leading-6 text-gray-600 hover:text-blue-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm leading-6 text-gray-600 hover:text-blue-600">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
