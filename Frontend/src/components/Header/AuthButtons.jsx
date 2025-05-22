import { Link } from "react-router-dom";

const AuthButtons = () => {
    return (
        <div className="flex gap-3">
            <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-md border hover:bg-blue-50 transition "
            >
                Log In
            </Link>
            <Link
                to="/signup"
                className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
                Sign Up
            </Link>
        </div>
    );
};

export default AuthButtons;
