// import * as cors from "cors";
import express from "express";

import ExceptionHandler from "./app/Exceptions/Handler";
import cors from "cors";
import { routes } from "./start/routes";

export function CreateServer() {
	const app = express();

	// const corsOptions: cors.CorsOptions = {
	// 	origin: "*",
	// 	methods: ["GET", "POST", "PUT", "DELETE"],
	// 	allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
	// 	credentials: true,
	// }

	app.use(express.json({ limit: "1.5mb" }));
	app.use(cors());
	app.use(ExceptionHandler);
	app.use("/icp", routes);
	app.use(express.static("/dist"));
	return app.listen();
}
