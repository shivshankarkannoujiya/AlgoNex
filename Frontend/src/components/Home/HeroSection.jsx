import { Link, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import { useSelector } from "react-redux";

const HeroSection = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleClick = () => {
        isAuthenticated ? navigate("/dashboard") : navigate("login");
    };

    return (
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
            <Link to="/signup">
                <div className="flex items-center space-x-2 mb-8 px-4 py-2 bg-[#161D29] bg-opacity-30 rounded-full text-[#999DAA] text-sm cursor-pointer shadow-2xl transition-all duration-200 hover:scale-95">
                    <span className="relative inline-flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 animate-pulse-wave-outer"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500 animate-pulse"></span>
                    </span>
                    <span>Code with friends. Crush every challenge.</span>
                </div>
            </Link>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
                From Bugs to Brilliance with <br />
                <span className=" text-transparent bg-clip-text bg-gradient-to-br from-teal-200 to-teal-300 opacity-50">
                    AlgoNex.
                </span>
            </h1>

            <p className="tagline text-lg font-light md:text-xl max-w-2xl mb-10 ">
                Your AI-powered partner for mastering competitive programming,
                intelligent debugging, and acing every technical interview.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                    onClick={handleClick}
                    className="px-12 py-4 w-full bg-teal-600 text-xl font-semibold hover:bg-teal-800 transition-color duration-300 hover:scale-105 transition-transform"
                >
                    Start Practicing
                </Button>
            </div>
        </section>
    );
};

export default HeroSection;
