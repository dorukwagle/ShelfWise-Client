import { Navigate, Outlet } from "react-router-dom"
import useMe from "../hooks/useMe";
import LoadingProgress from "../components/LoadingProgress";

const PrivateRoutes = () => {
  const {data: user,  isLoading} = useMe();

  if (isLoading) return <LoadingProgress />

  if (user?.userId) return <Outlet />;

  return <Navigate to={"/"} />
}

export default PrivateRoutes;