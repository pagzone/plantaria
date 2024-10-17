import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { PageRoutes } from "./constants/PageRoutes";
import IdentitySignUpPage from "./pages/auth/IdentitySignUpPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protected-route";
import PublicRoute from "./components/public-route";

function App() {
	return (
		<>
			<Toaster />
			<Router>
				<Routes>
					<Route path={PageRoutes.LANDING} element={<LandingPage />} />
					<Route path={PageRoutes.HOME} element={<HomePage />} />

					{/* Public Routes */}
					<Route element={<PublicRoute />}>
						<Route path={PageRoutes.SIGN_UP} element={<SignUpPage />} />
						<Route
							path={PageRoutes.IDENTITY_SIGN_UP}
							element={<IdentitySignUpPage />}
						/>
						<Route
							path={`${PageRoutes.IDENTITY_SIGN_UP}/:principal`}
							element={<IdentitySignUpPage />}
						/>
						<Route path={PageRoutes.LOGIN} element={<LoginPage />} />
					</Route>

					{/* Protected Routes */}
					<Route element={<ProtectedRoute />}>
						<Route path={PageRoutes.PROFILE} element={<ProfilePage />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
