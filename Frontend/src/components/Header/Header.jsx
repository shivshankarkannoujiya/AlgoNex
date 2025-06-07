import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import AuthButtons from "./AuthButtons";
import UserDropdown from "./UserDropdown";
import { Logo } from "../index.js";

const navLinks = [
  { path: "/", name: "Home" },
  { path: "/dashboard", name: "Problems" },
  { path: "/contests", name: "Contests" },
];

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#000814]/90 backdrop-blur border-b border-gray-700 shadow"
          : "bg-[#000814]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <Logo className="text-teal-500 text-2xl" />
        </div>

        <div className="hidden md:flex flex-1 justify-center  items-center">
          <ul className="flex items-center gap-15 font-medium text-white">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      isActive ? "text-teal-400" : "hover:text-teal-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block ">
          {isAuthenticated ? <UserDropdown user={user} /> : <AuthButtons />}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-[#000814] border-t border-gray-700 ${
          menuOpen ? "max-h-[300px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive ? "text-teal-400" : "hover:text-teal-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center">
          {isAuthenticated ? (
            <UserDropdown user={user} />
          ) : (
            <AuthButtons isMobile />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
