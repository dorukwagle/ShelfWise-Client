import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const err = useRouteError();

  return (
    <>
      <h1>Oops!</h1>
      {
        isRouteErrorResponse(err) ? "That route doesn't exist" : err
      }
    </>
  )
}

export default ErrorPage;