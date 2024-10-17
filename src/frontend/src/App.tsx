import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { PageRoutes } from "./constants/PageRoutes";
import IdentitySignUpPage from "./pages/auth/IdentitySignUpPage";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Toaster />
			<Router>
				<Routes>
					<Route path={PageRoutes.LANDING} element={<LandingPage />} />
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
					<Route path={PageRoutes.HOME} element={<HomePage />} />
					<Route path={PageRoutes.PROFILE} element={<ProfilePage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
