import { useSelector } from "react-redux";
import { Logo } from "../index.js";
import AuthButtons from "./AuthButtons.jsx";
import UserDropdown from "./UserDropdown.jsx";

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    return (
        <nav className="w-full bg-gray-950 text-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-7 flex items-center justify-between">
                <Logo />

                <div>
                    <ul className="flex items-center gap-15 text-[18px] font-semibold">
                        <li>About</li>
                        <li>Problem</li>
                        <li>Contest</li>
                    </ul>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <UserDropdown user={user} />
                    ) : (
                        <AuthButtons />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
