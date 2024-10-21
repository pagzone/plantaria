// import * as cors from "cors";
import express from "express";

import ExceptionHandler from "./app/Exceptions/Handler";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./start/routes";

export function CreateServer() {
	const loadenv = dotenv.config();
	if (loadenv.error) {
		console.error("Error loading .env file:", loadenv.error);
	} else {
		console.log("Environment variables loaded successfully!");
	}

	const app = express();

	// const corsOptions: cors.CorsOptions = {
	// 	origin: "*",
	// 	methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
	// 	allowedHeaders: ["Content-Type", "Authorization"],
	// 	credentials: true,
	// }

	app.use(express.json({ limit: "1.5mb" }));
	app.use(cors());
	// app.options("*", cors(corsOptions));
	app.use(ExceptionHandler);
	app.use("/icp", routes);
	app.use(express.static("/dist"));
	return app.listen();
}
