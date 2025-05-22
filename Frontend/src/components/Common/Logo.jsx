import { Link } from "react-router-dom";

// const Logo = ({width = "100px"}) => {
//   return (
//     <div>Logo</div>
//   )
// }

const Logo = () => {
    return (
        <Link to="/" className="text-xl font-bold text-blue-600">
            AlgoNex
        </Link>
    );
};

export default Logo;
