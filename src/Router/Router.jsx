import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Login from "../components/Login";
import Signin from "../components/Signin";
import Dashboard from "../components/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
                <App />
        ),
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "post-job",
                element: (
                    <PostJob />
                ),
            },
            {
                path: "my-jobs",
                element: (
                    <MyJobs />
                ),

            },
            {
                path: "salary",
                element: <SalaryPage />,
            },
            {
                path: "edit-job/:id",
                element: (

                    <UpdateJob />

                ),
                loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`),
            },
            {
                path: "/job/:id",
                element: <JobDetails />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/sign-in",
                element: <Signin />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },


        ],
    },
]);

export default router;

