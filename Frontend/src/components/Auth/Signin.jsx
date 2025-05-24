import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, Input, Logo } from "../index";
import { loginUser } from "../../features/auth/authThunks";

const Signin = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const Login = async (data) => {
        setError("");
        setLoading(true);
        console.log("Signing...", data);

        try {
            const response = await dispatch(loginUser(data));
            if (loginUser.fulfilled.match(response)) {
                toast.success("Signed in successfully!");
                navigate("/dashboard");
            } else {
                setError(response.payload?.message ?? "Invalid credentials");
                toast.error("Sign in failed");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error: ", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen  bg-[#000814] home-gradient text-white px-4">
            <div className="w-full max-w-md bg-[#0F172A] rounded-xl p-10 border border-gray-600 shadow-2xl ">
                <div className="mb-5 text-center">
                    <Logo className="mx-auto w-12 h-12 mb-2" />
                    <h2 className="text-2xl font-bold">Welcome back</h2>
                    <p className="text-sm text-neutral-400 mt-1">
                        Enter your email and password to sign in to your account
                    </p>
                </div>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(Login)}>
                    <div>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="m@example.com"
                            autoComplete="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Enter a valid email address",
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
                            placeholder="••••••••"
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

                    <Button
                        disabled={loading}
                        type="submit"
                        className="w-full mt-5"
                    >
                        {loading ? "Signing..." : "Sign In"}
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-neutral-400">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="underline hover:text-white">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;
