import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authThunks";
import { resetAuthState } from "../../features/auth/authSlice";

const SignoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await dispatch(logoutUser());
    dispatch(resetAuthState());
    navigate("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      Sign Out
    </button>
  );
};

export default SignoutBtn;
