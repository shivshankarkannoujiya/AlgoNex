import { Link } from "react-router-dom";

// const Logo = ({width = "100px"}) => {
//   return (
//     <div>Logo</div>
//   )
// }

const Logo = ({ textColor = "text-white", className = "", ...props }) => {
    return (
        <Link
            to="/"
            className={`text-xl font-bold ${textColor} ${className}`}
            {...props}
        >
            AlgoNex
        </Link>
    );
};

export default Logo;
