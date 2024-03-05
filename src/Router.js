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
import SubCategories from "./pages/SubCategories";
import SubToSubCategories from "./pages/SubToSubCategories";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/app",
        element: <Root />,
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
                element: <SubCategories />
            },
            {
                path: "sub-sub-categories",
                element: <SubToSubCategories />
            },
            {
                path: "file-upload",
                element: <FileUpload />,
            },
            {
                path: "excel-upload",
                element: <ExcelUpload />,
            },
        ],
    },
    {
        path: "/forget",
        element: <ForgetPasswordRoot />,
        children: [
            {
                path: "/forget",
                element: <ForgetForm />,
                index: true,
            },
            {
                path: "otp",
                element: <OtpForm />,
            },
            {
                path: "reset",
                element: <ResetForm />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]);

export default router;
