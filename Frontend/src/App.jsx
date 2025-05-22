import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authThunks";
import { Outlet } from "react-router-dom";
import { Header } from "./components/index.js";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <Header />
            <Outlet />
        </>
    );
};

export default App;
