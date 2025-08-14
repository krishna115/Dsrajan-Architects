import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import dsrajan_logo_transparent from '../assets/dsrajan_logo-removebg-preview.png';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center bg-white/10 backdrop-blur-md">
        {/* Logo */}
        <Link to="/">
          <img
            src={dsrajan_logo_transparent}
            alt="Logo"
            className="object-none h-16 w-30"
          />
        </Link>

        {/* Desktop Navigation */}
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

          <Link to="/projects" className="hover:text-blue-400 p-2">Projects</Link>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Work With Us <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[240px] p-2">
<Link to="/writing-internship" className="block px-4 py-2 rounded hover:bg-gray-100">Architectural Writing Internship</Link>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Submit <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[260px] p-2">
              <Link to="/submit-your-story" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Story</Link>
              <Link to="/submit-your-project" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Project</Link>
              <Link to="/submit-your-dissertation" className="block px-4 py-2 rounded hover:bg-gray-100">Submit Your Dissertation</Link>

            </div>
          </div>

          <Link to="/contact-us" className="hover:text-blue-400 p-2">Contact Us</Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsDrawerOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Side Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white z-[9999] p-6 shadow-xl overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setIsDrawerOpen(false)} className="text-xl">
                  <FaTimes />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="space-y-4 text-gray-800 font-medium">

                {/* Articles */}
                <div>
                  <button
                    onClick={() => toggleDropdown('articles')}
                    className="flex justify-between items-center w-full hover:text-blue-500"
                  >
                    Articles <FaChevronDown size={12} />
                  </button>
                  {openDropdown === 'articles' && (
                    <ul className="mt-2 ml-3 space-y-1 text-sm">
                      <li><a href="#">Architecture</a></li>
                      <li><a href="#">Interior</a></li>
                      <li><a href="#">Landscape</a></li>
                      <li><a href="#">Sustainability</a></li>
                    </ul>
                  )}
                </div>

                <Link to="/projects" onClick={() => setIsDrawerOpen(false)}>Projects</Link>

                {/* Work With Us */}
                <div>
                  <button
                    onClick={() => toggleDropdown('work')}
                    className="flex justify-between items-center w-full hover:text-blue-500"
                  >
                    Work With Us <FaChevronDown size={12} />
                  </button>
                  {openDropdown === 'work' && (
                    <ul className="mt-2 ml-3 space-y-1 text-sm">
                      <li><Link to="/writing-internship" className="block px-4 py-2 rounded hover:bg-gray-100">Architectural Writing Internship</Link>
</li>
                    </ul>
                  )}
                </div>

                {/* Submit */}
                <div>
                  <button
                    onClick={() => toggleDropdown('submit')}
                    className="flex justify-between items-center w-full hover:text-blue-500"
                  >
                    Submit <FaChevronDown size={12} />
                  </button>
                  {openDropdown === 'submit' && (
                    <ul className="mt-2 ml-3 space-y-1 text-sm">
                       <li>
      <Link to="/submit-your-story" onClick={() => setIsDrawerOpen(false)}>
        Submit Your Story
      </Link>
    </li>
                      <li>
      <Link to="/submit-your-project" onClick={() => setIsDrawerOpen(false)}>
        Submit Your Project
      </Link>
    </li>
    <li>
      <Link to="/submit-your-dissertation" onClick={() => setIsDrawerOpen(false)}>
        Submit Your Dissertation
      </Link>
    </li>
                    </ul>
                  )}
                </div>

          <Link to="/contact-us" className="hover:text-blue-400 p-2">Contact Us</Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
