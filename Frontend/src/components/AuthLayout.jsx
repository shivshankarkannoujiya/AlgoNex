import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authentication && loading) return;

    if (authentication && !isAuthenticated) {
      navigate("/login");
    } else if (!authentication && isAuthenticated) {
      navigate("/dashboard");
    }

    setLoader(false);
  }, [authentication, isAuthenticated, loading, navigate]);

  if (authentication && (loading || loader)) {
    return <h1>Loading...</h1>;
  }

  return <>{ children }</>
};

export default AuthLayout;
