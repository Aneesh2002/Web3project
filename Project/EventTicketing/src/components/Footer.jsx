import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-png.png'; // Adjust the path to your logo

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo and About Us */}
        <div>
          <img src={Logo} alt="Logo" className="w-[100px] h-[80px] mb-4" />
          <h3 className="text-lg font-semibold">EnterSmart</h3>
          <p className="text-gray-400 mt-2">
            EnterSmart is your trusted platform for secure event ticketing solutions. We simplify ticketing for organizers and attendees alike.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="text-gray-300 hover:text-pink-400 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="text-gray-300 hover:text-pink-400 transition duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/addevent" className="text-gray-300 hover:text-pink-400 transition duration-200">
                Add Event
              </Link>
            </li>
            <li>
              <Link to="/myevents" className="text-gray-300 hover:text-pink-400 transition duration-200">
                My Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">123 Main Street, Thiruvananthapuram</p>
          <p className="text-gray-400">Kerala, India</p>
          <p className="text-gray-400 mt-2">Phone: +91 98765 43210</p>
          <p className="text-gray-400">Email: support@entersmart.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook text-gray-300 hover:text-pink-400 text-2xl"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter text-gray-300 hover:text-pink-400 text-2xl"></i>
            </a>
            <a href="https://www.instagram.com/mn_aneesh_2002/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-gray-300 hover:text-pink-400 text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/aneesh-mn-17ab17255/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin text-gray-300 hover:text-pink-400 text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} EnterSmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
