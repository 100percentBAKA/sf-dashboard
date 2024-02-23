import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ForgetPasswordRoot from "./pages/forget/ForgetPasswordRoot"
import ForgetForm from "./pages/forget/ForgetForm"
import OtpForm from "./pages/forget/OtpForm"
import ResetForm from "./pages/forget/ResetForm"

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                    index: true
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/forget",
            element: <ForgetPasswordRoot />,
            children: [
                {
                    path: "/forget",
                    element: <ForgetForm />,
                    index: true
                },
                {
                    path: "/forget/otp",
                    element: <OtpForm />
                },
                {
                    path: "/forget/reset",
                    element: <ResetForm />
                }
            ]
        }
    ]
)

export default router;