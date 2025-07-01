import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import dsrajan_logo_transparent from '../assets/dsrajan_logo-removebg-preview.png';

export default function Navbar() {
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

        {/* Navigation */}
        <div className="relative flex items-center space-x-4 md:space-x-8 text-black font-medium text-sm md:text-base">

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

          {/* Projects */}
          <Link to="/projects" className="hover:text-blue-400">Projects</Link>

          {/* Work With Us */}
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-blue-400">
              Work With Us <FaChevronDown size={12} />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-50 min-w-[240px] p-2">
              <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Architectural Writing Internship</a>
            </div>
          </div>

          {/* Submit */}
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

          {/* Contact Us */}
          <a href="#contact" className="hover:text-blue-400">Contact Us</a>
        </div>
      </nav>
    </header>
  );
}
