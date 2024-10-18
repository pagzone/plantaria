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



/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/* User Routes */
Route.post("/user/login", UsersController.login);
Route.post("/user/register", UsersController.register);
Route.post("/user/ii/login", UsersController.loginWithIdentity);
Route.post("/user/ii/register", UsersController.registerWithIdentity);

/* Tutorials Routes */
Route.get("/tutorials", TutorialsController.index);
Route.get("/tutorials/test", TutorialsController.test);

Route.get("/greet", ApisController.greet);
Route.get("/user/test", UsersController.test);
Route.get("/configurations", ApisController.configurations);
Route.post("/configuration/insert", ApisController.insert_configuration);
Route.post("/configuration/update", ApisController.update_configuration);
Route.post("/configuration/delete", ApisController.delete_configuration);

export { Route as routes };
