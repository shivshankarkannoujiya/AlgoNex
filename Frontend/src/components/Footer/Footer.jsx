import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#000814] home-gradient text-white py-12 px-6 border-t border-gray-800  animated-border-top">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src="/transparent_logo.png"
                            alt="algonex"
                            className="w-10 h-10"
                        />
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-700">
                            AlgoNex
                        </span>
                    </div>

                    <p className="text-gray-500 text-xs mt-8">
                        © 2025 AlgoNex. All rights reserved.
                    </p>
                </div>
            </div>

            <Link to="/">
                <div className="mt-16 text-center">
                    <h1 className="text-9xl sm:text-8xl md:text-9xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-700 opacity-50 hover:scale-95 transition-all duration-300">
                        ALGONEX
                    </h1>
                </div>
            </Link>
        </footer>
    );
};

export default Footer;
