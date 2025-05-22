import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { verifyEmail } from '../features/auth/authThunks';



const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const verify = async () => {
        try {
          const response = await dispatch(verifyEmail(token));
          if (verifyEmail.fulfilled.match(response)) {
            console.log("VERIFY RESPONSE:", response);
            console.log("MATCH FULFILLED:", verifyEmail.fulfilled.match(response));
            toast.success("Email verified successfully");
            console.log("Navigating to login...");
            setTimeout(() => navigate("/login"), 1000); 
          } else {
            toast.error(response.payload || "Verification failed.");
          }
        } catch (err) {
          toast.error("Unexpected error occurred.");
        } finally {
          setLoading(false);
        }
      };
  
      verify();
    }, [token, dispatch, navigate]);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-semibold">
          {loading ? "Verifying your email..." : "Redirecting..."}
        </h1>
      </div>
    );
  };

export default VerifyEmail