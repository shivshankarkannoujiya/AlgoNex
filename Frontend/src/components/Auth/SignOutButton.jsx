import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../../features/auth/authSlice";
import { logoutUser } from "../../features/auth/authThunks";
import { useState } from "react";
import { LogOutIcon } from "lucide-react";

const SignoutBtn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignOut = async () => {
        try {
            setLoading(true);
            await dispatch(logoutUser()).unwrap();
            dispatch(resetAuthState());
            navigate("/login");
        } catch (error) {
            setError("Logout failed. Try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start">
            <button
                onClick={handleSignOut}
                disabled={loading}
                className={`w-full text-left text-red-600 hover:bg-red-200 px-4 py-2 rounded-md transition text-sm  cursor-pointer flex items-center gap-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <LogOutIcon className="w-4 h-4"/>
                {loading ? "Signing out..." : "Sign Out"}
            </button>
            {error && <p className="text-xs text-red-500 mt-1 px-4">{error}</p>}
        </div>
    );
};

export default SignoutBtn;
