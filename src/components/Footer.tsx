import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold mb-4">DSrajan</h2>
          <p className="text-sm text-gray-400">
            Crafting timeless and sustainable architectural spaces. Let's design your future together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#expertise" className="hover:text-white">Expertise</a></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Email: <a href="mailto:info@dsrajan.com" className="hover:text-white">info@dsrajan.com</a></li>
            <li>Phone: <a href="tel:+911234567890" className="hover:text-white">+916386769992</a></li>
            <li>Location: Uttar Pradesh, India</li>
          </ul>
        </div>


<div className="flex space-x-4 text-xl">
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
    <FaInstagram />
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
    <FaFacebookF />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
    <FaLinkedinIn />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
    <FaTwitter />
  </a>
</div>

      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} DSrajan. All rights reserved.
      </div>
    </footer>
  );
}
