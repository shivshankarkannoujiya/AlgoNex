import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignoutBtn from "../Auth/SignOutButton";

const UserDropdown = ({ user }) => {
    console.log(user?.role);
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
                className="flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
            >
                <img
                    src={
                        user?.avatar ||
                        "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-md z-50 p-2 space-y-2">
                    <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/submissions"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                        My Submissions
                    </Link>
                    <Link
                        to="/mylist"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                        Favourite List
                    </Link>
                    {user?.role === "ADMIN" && (
                        <Link
                            to="/create-problem"
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                        >
                            Add Problem
                        </Link>
                    )}
                    <SignoutBtn />
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
