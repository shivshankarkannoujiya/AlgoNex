import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authThunks";
import { Outlet } from "react-router-dom";
import { Footer, Header, Preloader } from "./components/index.js";

const App = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getCurrentUser());
            setLoader(false);
        };
        fetchUser();
    }, [dispatch]);

    if (loader) {
        return <Preloader />;
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default App;
