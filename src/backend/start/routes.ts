import { ApisController } from "App/Controllers/Http/ApisController";
import { TutorialsController } from "App/Controllers/Http/TutorialsController";
import { UsersController } from "App/Controllers/Http/UsersController";
import { AuthMiddleware } from "App/Middlewares/AuthMiddleware";
import { Router } from "express";
const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

/* Tutorials Routes */
Route.post("/tutorial/create", AuthMiddleware.authorize, TutorialsController.create);
//TODO: update and delete tutorial
// Route.post("/tutorial/:id", AuthMiddleware.authorize, TutorialsController.update);
// Route.post("/tutorial/:id/delete", AuthMiddleware.authorize, TutorialsController.delete);

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/* User Routes */
Route.post("/auth/login", UsersController.login);
Route.post("/auth/register", UsersController.register);
Route.post("/auth/ii/login", UsersController.loginWithIdentity);
Route.post("/auth/ii/register", UsersController.registerWithIdentity);

/* Tutorials Routes */
Route.get("/tutorials", TutorialsController.index);
//TODO: get tutorial by id
// Route.get("/tutorial/:id", TutorialsController.findById);
Route.get("/tutorials/test", TutorialsController.test);

Route.get("/greet", ApisController.greet);
Route.get("/user/test", UsersController.test);
Route.get("/configurations", ApisController.configurations);
Route.post("/configuration/insert", ApisController.insert_configuration);
Route.post("/configuration/update", ApisController.update_configuration);
Route.post("/configuration/delete", ApisController.delete_configuration);

export { Route as routes };
