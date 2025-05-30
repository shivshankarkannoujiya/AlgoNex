import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SignoutBtn from "../Auth/SignOutButton";
import { Code, User, Lightbulb, List, LayoutDashboard, LogOutIcon } from "lucide-react";

const UserDropdown = ({ user }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
      >
        <img
          src={user?.avatar || "https://avatar.iran.liara.run/public/boy"}
          loading="lazy"
          alt="avatar"
          className="w-10 h-10 md:w-10 md:h-10 p-1 rounded-full border-2 border-gray-400"
        />
      </button>

      <div
        className={`absolute z-50 mt-2 w-48 bg-[#000814] text-white rounded-md shadow-lg border transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } right-0 origin-top-right`}
      >
        <div className="p-2 space-y-2">
          <Link
            to="/profile"
            className=" px-4 py-2 text-sm rounded-md hover:bg-[#1a2432] flex items-center justify-start gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm rounded-md hover:bg-[#1a2432] flex items-center justify-start gap-2"
          >
            <LayoutDashboard className="h-4 w-4 text-blue-500" />
            Dashboard
          </Link>
          <Link
            to="/submissions"
            className=" px-4 py-2 text-sm rounded-md hover:bg-[#1a2432] flex items-center justify-start gap-2"
          >
            <Lightbulb className="h-4 w-4 text-amber-500" />
            My Submissions
          </Link>
          <Link
            to="#"
            className="px-4 py-2 text-sm rounded-md hover:bg-[#1a2432] flex items-center justify-start gap-2"
          >
            <List className="h-4 w-4 text-teal-500" />
            My List
          </Link>
          {user?.role === "ADMIN" && (
            <Link
              to="/create-problem"
              className=" px-4 py-2 text-sm rounded-md hover:bg-[#1a2432] flex items-center justify-start gap-2"
            >
              <Code className="h-4 w-4 text-emerald-500" />
              Add Problem
            </Link>
          )}
          <SignoutBtn />
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
