import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgetPasswordRoot from "./pages/forget/ForgetPasswordRoot";
import ForgetForm from "./pages/forget/ForgetForm";
import OtpForm from "./pages/forget/OtpForm";
import ResetForm from "./pages/forget/ResetForm";
import FileUpload from "./pages/FileUpload";
import ExcelUpload from "./pages/ExcelUpload";
import Categories from "./pages/Categories";
import PageNotFound from "./pages/404";
import SubCategories from "./pages/subCategories/SubCategories";
import SubToSubCategories from "./pages/subSubCategories/SubToSubCategories";
import Author from "./pages/Author";
import AddSC from "./pages/subCategories/AddSC";
import UpdateSC from './pages/subCategories/UpdateSC'
import AddS2SC from "./pages/subSubCategories/AddS2SC";
import Register from "./pages/Register";
import AuthRoot from "./pages/AuthRoot";
import { ProtectedRoute1, ProtectedRoute2, ProtectedRoute3 } from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute3 />,
    },
    {
        path: "/auth",
        element: (
            <ProtectedRoute2>
                <AuthRoot />
            </ProtectedRoute2>
        ),
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/app",
        element: (
            <ProtectedRoute1>
                <Root />
            </ProtectedRoute1>
        ),
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
                index: true,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "sub-categories",
                element: <SubCategories />,
            },
            {
                path: "sub-categories/add",
                element: <AddSC />,
            },
            {
                path: "sub-categories/update",
                element: <UpdateSC />,
            },
            {
                path: "sub-sub-categories",
                element: <SubToSubCategories />,
            },
            {
                path: "sub-sub-categories/add",
                element: <AddS2SC />,
            },
            {
                path: "file-upload",
                element: <FileUpload />,
            },
            {
                path: "excel-upload",
                element: <ExcelUpload />,
            },
            {
                path: "author",
                element: <Author />,
            },
        ],
    },
    {
        path: "/auth/forget",
        element: <ForgetPasswordRoot />,
        children: [
            {
                path: "/auth/forget",
                element: <ForgetForm />,
                index: true,
            },
            {
                path: "/auth/forget/otp",
                element: <OtpForm />,
            },
            {
                path: "/auth/forget/reset",
                element: <ResetForm />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

export default router;