import type { Response, Request } from "express";
import { getDownloadAuthorization, uploadToBackblaze } from "Helpers/b2";

export namespace ApisController {
	export const uploadImageUrl = async (request: Request, response: Response) => {
		const chunks: Buffer[] = [];

		request.on("data", (chunk: Buffer) => {
			chunks.push(chunk);
		});

		request.on('end', async () => {
			const buffer = Buffer.concat(chunks);
			const filename = request.headers['x-filename'] as string;

			const uploadResponse = await uploadToBackblaze(buffer, filename || 'image.png');

			return response.status(200).json({ status: 1, message: 'File has been uploaded!', data: uploadResponse });
		});

		request.on('error', (error) => {
			console.error("Error during file upload:", error);
			return response.status(500).json({ status: 0, message: 'Upload failed!' });
		});
	};

	export const downloadAuthorization = async (request: Request, response: Response) => {
		const { prefix } = request.body;

		if (!prefix) {
			return response.status(400).json({
				status: 0,
				message: "Missing prefix",
			});
		}

		try {
			const downloadAuthorization = await getDownloadAuthorization(prefix);

			return response.status(200).json({
				status: 1,
				message: "Download authorization",
				data: downloadAuthorization
			});
		} catch (error: any) {
			return response.status(500).json({ status: 0, message: error.message });
		}
	}
}
