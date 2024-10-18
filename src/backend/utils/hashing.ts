import * as bcrypt from "bcryptjs";

export async function hash(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

export async function verifyHash(
	password: string,
	storedHash: string,
): Promise<boolean> {
	try {
		return await bcrypt.compare(password, storedHash);
	} catch (error) {
		return false;
	}
}
