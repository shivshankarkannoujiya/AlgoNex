import { Link } from "react-router-dom";

const AuthButtons = ({ isMobile = false }) => {
  return (
    <div className={`flex ${isMobile ? "flex-col gap-4" : "gap-3"}`}>
      <Link
        to="/login"
        className="px-6 py-2 text-white border border-teal-500 rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
