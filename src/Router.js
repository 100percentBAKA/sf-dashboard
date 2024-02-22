import { createBrowserRouter } from "react-router-dom"
import Root from "./pages/Root"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ForgetPasswordRoot from "./pages/forget/ForgetPasswordRoot"

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
            element: <ForgetPasswordRoot />
        }
    ]
)

export default router;