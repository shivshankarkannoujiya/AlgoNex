import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "../index";
import { signupUser } from "../../features/auth/authThunks";
import { toast } from "react-toastify";

const Signup = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    console.log("Creating account: ", data);
    try {
      const response = await dispatch(signupUser(data));
      if (signupUser.fulfilled.match(response)) {
        toast.success("Account created successfully. Please log in.");
        navigate("/login");
      } else {
        setError(response.payload || "Signup failed");
      }
    } catch (error) {
      setError(error.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814] home-gradient text-white px-4">
      <div className="w-full max-w-md bg-[#0F172A]  rounded-xl p-10 border border-gray-600 shadow-2xl">
        <div className="mb-5 text-center">
          <Logo className="mx-auto w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-sm text-neutral-400 mt-1">
            Enter your information to create an account
          </p>
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="flex flex-col gap-2">
          <div>
            <Input
              label="Username"
              placeholder="Enter your username..."
              autoComplete="username"
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email..."
              autoComplete="email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter password..."
              autoComplete="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button disabled={loading} type="submit" className="w-full mt-5">
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?&nbsp;
          <Link to="/login" className="underline hover:text-white">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
