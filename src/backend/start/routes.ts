import { ApisController } from "App/Controllers/Http/ApisController";
import { FavoritesController } from "App/Controllers/Http/FavoritesController";
import { StoriesController } from "App/Controllers/Http/StoriesController";
import { TutorialsController } from "App/Controllers/Http/TutorialsController";
import { AuthController } from "App/Controllers/Http/AuthController";
import { AuthMiddleware } from "App/Middlewares/AuthMiddleware";
import { Router } from "express";
import { UsersController } from "App/Controllers/Http/UsersController";
const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

/* Users Routes */
Route.get("/users/current", AuthMiddleware.authorize, UsersController.currentUser);
Route.post("/users/me/avatar", AuthMiddleware.authorize, UsersController.updateAvatar);

/* Tutorials Routes */
Route.post("/tutorials", AuthMiddleware.authorize, TutorialsController.create);
Route.route("/tutorials/:id")
  .put(AuthMiddleware.authorize, TutorialsController.update)
  .delete(AuthMiddleware.authorize, TutorialsController.destroy);

/* Stories Routes */
Route.post("/stories", AuthMiddleware.authorize, StoriesController.create);
Route.route("/stories/:id")
  .put(AuthMiddleware.authorize, StoriesController.update)
  .delete(AuthMiddleware.authorize, StoriesController.destroy);

/* Upload Routes */
Route.post("/images/upload", AuthMiddleware.authorize, ApisController.uploadImageUrl);

/* Favorites Routes */
Route.get("/tutorials/:id/is_favorite", AuthMiddleware.authorize, FavoritesController.isFavorite)
Route.post("/tutorials/:id/favorite", AuthMiddleware.authorize, FavoritesController.favoriteTutorial)
Route.post("/tutorials/:id/unfavorite", AuthMiddleware.authorize, FavoritesController.unfavoriteTutorial);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/* User Routes */
Route.post("/auth/login", AuthController.login);
Route.post("/auth/register", AuthController.register);
Route.post("/auth/ii/login", AuthController.loginWithIdentity);
Route.post("/auth/ii/register", AuthController.registerWithIdentity);

/* Tutorials Routes */
Route.get("/tutorials", TutorialsController.index);
Route.get("/tutorials/:id", TutorialsController.show);

/* Stories Routes */
Route.get("/stories", StoriesController.index);
Route.get("/stories/:id", StoriesController.show);

/* Download Routes */
Route.post("/auth/download", ApisController.downloadAuthorization);

/* Favorites Routes */
Route.get("/favorites", FavoritesController.index);
Route.get("/users/:id/favorites", FavoritesController.getUserFavorites);

export { Route as routes };
