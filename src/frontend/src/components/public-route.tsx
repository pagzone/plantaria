import { PageRoutes } from "@/constants/PageRoutes";
import { isAuthenticated } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const authenticated = isAuthenticated();

  if (authenticated) {
		return <Navigate to={PageRoutes.HOME} />;
	}

	return <Outlet />;
};

export default PublicRoute;