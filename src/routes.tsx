import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoutes from "./pages/PrivateRoutes";
import DashboardBranch from "./pages/DashboardBranch";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import OnlineBooksPage from "./pages/OnlineBooksPage";
import SignInPage from "./pages/SignInPage";
import AttributesPage from "./pages/AttributesPage";
import BookList from "./components/BookList";
import MultiPageForm from "./pages/AddBookMultiFormPage";
import EnrollmentRequestForm from "./components/UserEnrollmentForm";
import EnrollmentList from "./components/EnrollmentList";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/registration", element: <RegistrationPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/about", element: <AboutPage />},
      { path: "/online-books", element: <OnlineBooksPage />},
      { path: "/book-list", element: <BookList />},
      {path: "/add-books", element: <MultiPageForm/>},
      {path: "/enroll-user", element: <EnrollmentRequestForm/>},
      
      
      

      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <DashboardBranch /> },
          {path: "attributes", element: <AttributesPage />},
          { path: "/enrollments", element: <EnrollmentList /> }
        ],
      },
    ],
  },
]);

export default router;
