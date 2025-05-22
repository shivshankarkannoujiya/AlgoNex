import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/auth/authThunks";
import { Outlet } from "react-router-dom";


const App = () => {

  const dispatch = useDispatch();

  useEffect( () => {
     dispatch(getCurrentUser())
  }, [dispatch])
  
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Outlet/>
    </>
  );
};

export default App;
