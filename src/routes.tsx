import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import DashboardBranch from "./pages/DashboardBranch";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/registration", element: <RegistrationPage /> },
      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <DashboardBranch /> }],
      },
    ],
  },
]);

export default router;
