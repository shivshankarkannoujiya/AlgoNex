import { Link } from "react-router-dom";

const AuthButtons = () => {
    return (
        <div className="flex gap-3">
            <Link
                to="/login"
                className="text-md text-white px-6 py-3 rounded-md border"
            >
                Log In
            </Link>
            <Link
                to="/signup"
                className="text-md px-6 py-3 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300"
            >
                Sign Up
            </Link>
        </div>
    );
};

export default AuthButtons;
