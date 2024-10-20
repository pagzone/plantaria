import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { PageRoutes } from "./constants/PageRoutes";
import IdentitySignUpPage from "./pages/auth/IdentitySignUpPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/authorization/protected-route";
import PublicRoute from "./components/authorization/public-route";
import PageNotFound from "./pages/PageNotFound";
import OrganizationPage from "./pages/OrganizationPage";
import Favorites from "./layout/HomeLayout/Favorites";
import HomeContent from "./layout/HomeLayout/Home";
import Ranking from "./layout/HomeLayout/Ranking";
import TutorialContent from "./layout/HomeLayout/TutorialContent";
import StoriesContent from "./layout/HomeLayout/StoriesContent";
import SearchResult from "./layout/HomeLayout/SearchResult";

function App() {
	return (
		<>
			<Toaster />
			<Router>
				<Routes>
					<Route path={PageRoutes.LANDING} element={<LandingPage />} />	

					<Route path="/home" element={<HomePage />}>
						<Route index element={<HomeContent />} /> 
						<Route path="ranking" element={<Ranking />} /> 
						<Route path="favorites" element={<Favorites/>} />
					</Route>

					<Route element={<HomePage />}>
						<Route path="/tutorial/:id" element={<TutorialContent />} /> 
						<Route path="/stories/:id" element={<StoriesContent />} />
						<Route path="/search" element={<SearchResult />} />  
						<Route path="/favorites/:id" element={<TutorialContent/>} /> 
						<Route path="/featured/:id" element={<TutorialContent/>} /> 
					</Route>

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
						<Route path={PageRoutes.ORGANIZATION} element={<OrganizationPage />} />
					</Route>

					{/* Page not found */}
					<Route path="*" element={<PageNotFound />} />

				</Routes>
			</Router>
		</>
	);
}

export default App;
