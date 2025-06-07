import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./Store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthLayout,
  Signin,
  PlaylistDetails,
  EditProblemForm,
} from "./components/index.js";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Problem from "./pages/Problem.jsx";
import Profile from "./pages/Profile.jsx";
import Submission from "./pages/Submission.jsx";
import AddProblem from "./pages/AddProblem.jsx";
import Contest from "./pages/Contest.jsx";


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
        path: "dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
      },

      {
        path: "problem/:id",
        element: (
          <AuthLayout authentication={true}>
            <Problem />
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
        path: "create-problem",
        element: (
          <AuthLayout authentication={true}>
            <AddProblem />
          </AuthLayout>
        ),
      },

      {
        path: "playlist/:id",
        element: (
          <AuthLayout authentication={true}>
            <PlaylistDetails />
          </AuthLayout>
        ),
      },

      {
        path: "admin/problems/edit/:id",
        element: (
          <AuthLayout authentication={true}>
            <EditProblemForm />
          </AuthLayout>
        ),
      },

      {
        path: "/contests",
        element: (
          <AuthLayout>
            <Contest/>
          </AuthLayout>
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
