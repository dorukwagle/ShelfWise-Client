import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./pages/PrivateRoutes";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import OnlineBooksPage from "./book/pages/OnlineBooksPage";
import AttributesPage from "./attributes/pages/AttributesPage";
import BookList from "./book/components/BookList";
import MultiPageForm from "./book/pages/AddBookMultiFormPage";
import EnrollmentRequestForm from "./enrollment/components/UserEnrollmentForm";
import SignInPage from "./auth/pages/SignInPage";
import EnrollmentApprovePage from "./enrollment";
import NotificationPage from "./notification/pages/notificationPage";
import { BookInfoPage } from "./book/pages/BookInfoPage";
import UserPaymentPage from "./userpayment/pages/UserPaymentPage";
import IssuancePage from "./bookflow/issuance/pages/IssuancePage";
import ReservationPage from "./reservation/pages/ReservationPage";
import ReservationIssuePage from "./bookflow/reservation/Pages/ReservationIssuePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/enroll-user", element: <EnrollmentRequestForm /> },
      { path: "/notifications", element: <NotificationPage /> },
      {path: "/notifications", element: <NotificationPage/>},
      {path: "/reservations", element: <ReservationPage/>},
      
      {
        element: <PrivateRoutes />,
        children: [
        { path: "attributes", element: <AttributesPage /> },
        { path: "/enrollments-request", element: <EnrollmentApprovePage /> },
        { path: "/user-payment", element: <UserPaymentPage /> },
        { path: "/issuance", element: <IssuancePage /> },
        { path: "/reservation-issue", element: <ReservationIssuePage /> },
        { path: "/online-books", element: <OnlineBooksPage /> },
        { path: "/user-payment", element: <UserPaymentPage /> },
        { path: "/book-list", element: <BookList /> },
        { path: "/book/:bookInfoId", element: <BookInfoPage /> },
        { path: "/add-books", element: <MultiPageForm /> },
        {path: "/notifications", element: <NotificationPage/>},
        ],
      },
    ],
  },
]);

export default router;
