import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignoutBtn from "../Auth/SignOutButton";

const UserDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md"
            >
                <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">
                    {user?.username || "User"}
                </span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50 p-2 space-y-2">
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/submissions"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                        My Submissions
                    </Link>
                    <SignoutBtn />
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
