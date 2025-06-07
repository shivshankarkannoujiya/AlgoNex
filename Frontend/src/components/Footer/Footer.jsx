import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#000814] text-white px-4 sm:px-6 py-10 border-t border-gray-800 animated-border-top">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/transparent_logo.png"
              alt="AlgoNex"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-600">
              AlgoNex
            </span>
          </div>
          <p className="text-gray-400 text-sm sm:text-xs mt-3">
            Building the future of collaborative coding, problem solving, and
            learning together.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            © 2025 AlgoNex. All rights reserved.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-teal-500 uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-white transition-colors"
              >
                Problems
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white transition-colors"
              >
                Playlists
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-teal-500 uppercase mb-4">
            Connect
          </h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="mailto:support@algonex.com" className="hover:text-white">
                Email Us
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Link to="/">
        <div className="mt-12 sm:mt-16 text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-700 opacity-50 hover:scale-95 transition-all duration-300">
            ALGONEX
          </h1>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
