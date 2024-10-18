import { isAuthenticated } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const authenticated = isAuthenticated();

	if (!authenticated) {
		// return (
		//   <div>Unauthorized</div>
		// )

		return <Navigate to={"/login"} />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
