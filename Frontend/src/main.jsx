import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, Signin } from "./components/index.js";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Problem from "./pages/Problem.jsx";
import Profile from "./pages/Profile.jsx";
import Submission from "./pages/Submission.jsx";
import MyList from "./pages/MyList.jsx";
import CreateProblem from "./pages/CreateProblem.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "login",
                element: (
                    <AuthLayout authentication={false}>
                        <Signin />
                    </AuthLayout>
                ),
            },

            {
                path: "signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },

            {
                path: "verify/:token",
                element: <VerifyEmail />,
            },

            {
                path: "dashboard",
                element: (
                    <AuthLayout authentication={true}>
                        <Dashboard />
                    </AuthLayout>
                ),
            },

            {
                path: "problems/:id",
                element: (
                    <AuthLayout authentication={true}>
                        <Problem />
                    </AuthLayout>
                ),
            },

            {
                path: "leaderboard",
                element: (
                    <AuthLayout authentication={true}>
                        <Leaderboard />
                    </AuthLayout>
                ),
            },
            {
                path: "profile",
                element: (
                    <AuthLayout authentication={true}>
                        <Profile />
                    </AuthLayout>
                ),
            },
            {
                path: "submissions",
                element: (
                    <AuthLayout authentication={true}>
                        <Submission />
                    </AuthLayout>
                ),
            },
            {
                path: "/mylist",
                element: (
                    <AuthLayout authentication={true}>
                        <MyList />
                    </AuthLayout>
                ),
            },
            {
                path: "create-problem",
                element: (
                    <AuthLayout authentication={true}>
                        <CreateProblem />
                    </AuthLayout>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
