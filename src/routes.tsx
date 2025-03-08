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
import NotificationPage from "./notification/pages/notificationPage";
import { BookInfoPage } from "./book/pages/BookInfoPage";

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
      { path: "/book/:bookInfoId", element: <BookInfoPage /> },
      { path: "/add-books", element: <MultiPageForm /> },
      { path: "/enroll-user", element: <EnrollmentRequestForm /> },
      {path: "/notifications", element: <NotificationPage/>},
      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <DashboardBranch /> },
        { path: "attributes", element: <AttributesPage /> },
        { path: "/enrollments", element: <EnrollmentList /> },
        { path: "/enrollments-request", element: <EnrollmentApprovePage /> }
        ],
      },
    ],
  },
]);

export default router;
