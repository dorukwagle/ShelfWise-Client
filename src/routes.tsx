import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./pages/PrivateRoutes";
import DashboardBranch from "./pages/DashboardBranch";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import OnlineBooksPage from "./book/pages/OnlineBooksPage";
import AttributesPage from "./attributes/pages/AttributesPage";
import BookList from "./book/components/BookList";
import MultiPageForm from "./book/pages/AddBookMultiFormPage";
import EnrollmentRequestForm from "./enrollment/components/UserEnrollmentForm";
import EnrollmentList from "./enrollment/components/EnrollmentList";
import RegistrationPage from "./auth/pages/RegistrationPage";
import SignInPage from "./auth/pages/SignInPage";
import EnrollmentApprovePage from "./enrollment";
import UserPaymentPage from "./userpayment/pages/UserPaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/registration", element: <RegistrationPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/online-books", element: <OnlineBooksPage /> },
      { path: "/book-list", element: <BookList /> },
      { path: "/add-books", element: <MultiPageForm /> },
      { path: "/enroll-user", element: <EnrollmentRequestForm /> },
      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <DashboardBranch /> },
        { path: "attributes", element: <AttributesPage /> },
        { path: "/enrollments", element: <EnrollmentList /> },
        { path: "/enrollments-request", element: <EnrollmentApprovePage /> },
        { path: '/user-payment', element: <UserPaymentPage /> },
        ],
      },
    ],
  },
]);

export default router;
