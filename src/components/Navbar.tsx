import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import dsrajan_logo_transparent from '../assets/dsrajan_logo-removebg-preview.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md">
        {/* Logo */}
        <Link to="/">
          <img
            src={dsrajan_logo_transparent}
            alt="Logo"
            className="object-contain h-16 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-8 text-black font-medium text-sm md:text-base">
          {/* Articles */}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Articles <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[220px] p-2">
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Architecture</a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Interior</a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Landscape</a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Sustainability</a>
            </div>
          </div>

          <Link to="/projects" className="hover:text-blue-400">Projects</Link>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Work With Us <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[240px] p-2">
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Architectural Writing Internship</a>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Submit <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[260px] p-2">
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Article</a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Project</a>
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Dissertation</a>
            </div>
          </div>

          <a href="#contact" className="hover:text-blue-400">Contact Us</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-xl z-[9999] px-6 py-6 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl text-black"
            >
              <FaTimes />
            </button>

            <nav className="mt-16 space-y-8 text-black font-medium text-lg">
              <div>
                <p className="font-semibold mb-2">Articles</p>
                <ul className="space-y-1 ml-3">
                  <li><a href="#">Architecture</a></li>
                  <li><a href="#">Interior</a></li>
                  <li><a href="#">Landscape</a></li>
                  <li><a href="#">Sustainability</a></li>
                </ul>
              </div>

              <Link to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>

              <div>
                <p className="font-semibold mb-2">Work With Us</p>
                <ul className="ml-3 space-y-1">
                  <li><a href="#">Architectural Writing Internship</a></li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Submit</p>
                <ul className="ml-3 space-y-1">
                  <li><a href="#">Submit Your Article</a></li>
                  <li><a href="#">Submit Your Project</a></li>
                  <li><a href="#">Submit Your Dissertation</a></li>
                </ul>
              </div>

              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
