import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./features/auth/authThunks";
import { Outlet } from "react-router-dom";
import { Footer, Header, Preloader } from "./components/index.js";

const App = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    if (loading) {
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
