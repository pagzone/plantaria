import { Configuration } from "Database/entities/configuration";
import type { Response, Request } from "express";
import { uploadToBackblaze } from "Helpers/b2";

export namespace ApisController {
	export const uploadImageUrl = async (request: Request, response: Response) => {
		const chunks: Buffer[] = [];

		request.on("data", (chunk: Buffer) => {
			chunks.push(chunk);
		});

		request.on('end', async () => {
			const buffer = Buffer.concat(chunks);
			const filename = request.headers['x-filename'] as string;

			await uploadToBackblaze(buffer, filename || 'image.png');

			return response.status(200).json({ status: 1, message: 'File has been uploaded!' });
		});

		request.on('error', (error) => {
			console.error("Error during file upload:", error);
			return response.status(500).json({ status: 0, message: 'Upload failed!' });
		});
	};

	export async function greet(request: Request, response: Response) {
		response.json({ greeting: `Hello, ${request.query.name}` });
	}

	export async function configurations(request: Request, response: Response) {
		const configuration = await Configuration.find();

		response.json({
			status: 1,
			data: configuration,
		});
	}

	export async function insert_configuration(
		request: Request,
		response: Response,
	) {
		const { key, value } = request.body;
		await Configuration.insert({ key, value });

		const checkIfExist = await Configuration.findBy({ key });

		if (!checkIfExist) {
			response.json({
				status: 0,
				message: "Configuration already exists!",
			});
		}

		response.json({
			status: 1,
			message: "Configuration has been inserted!",
		});
	}

	export async function update_configuration(
		request: Request,
		response: Response,
	) {
		const { key, value } = request.body;
		const getConfiguration = await Configuration.findBy({ key });

		if (!getConfiguration) {
			response.json({
				status: 0,
				message: "Configuration not found!",
			});
		}

		await Configuration.update({ key }, { value });
		response.json({
			status: 1,
			message: "Configuration has been updated!",
		});
	}

	export async function delete_configuration(
		request: Request,
		response: Response,
	) {
		const { key } = request.body;
		const getConfiguration = await Configuration.findBy({ key });

		if (!getConfiguration) {
			response.json({
				status: 0,
				message: "Configuration not found!",
			});
		}

		await Configuration.delete({ key });

		response.json({
			status: 1,
			message: "Configuration has been deleted!",
		});
	}
}
