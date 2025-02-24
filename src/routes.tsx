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
import EnrollmentPage from "./pages/ApprovePage";

const staticEnrollments = [
  {
      userId: '1',
      accountStatus: 'Pending',
  },
  {
      userId: '2',
      accountStatus: 'Active',
  },
  {
      userId: '3',
      accountStatus: 'Inactive',
  },
  {
      userId: '4',
      accountStatus: 'Rejected',
  },
];
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
      {path: "/enroll-approve", element: <EnrollmentPage enrollments={staticEnrollments}/>},
      
      

      {
        element: <PrivateRoutes />,
        children: [{ path: "dashboard", element: <DashboardBranch /> },
          {path: "attributes", element: <AttributesPage />}
        ],
      },
    ],
  },
]);

export default router;
