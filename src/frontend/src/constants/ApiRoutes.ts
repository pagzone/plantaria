export enum APIRoutes {
	/* AUTH */
	LOGIN = "/icp/auth/login",
	REGISTER = "/icp/auth/register",
	LOGIN_WITH_IDENTITY = "/icp/auth/ii/login",
	REGISTER_WITH_IDENTITY = "/icp/auth/ii/register",

	/* TUTORIAL */
	TUTORIALS = "/icp/tutorials",

	/* STORY */
	STORIES = "/icp/stories",

	UPLOAD_IMAGE = "/icp/images/upload",

	DOWNLOAD_AUTHORIZATION = "/icp/auth/download",

	/* USER */
	CURRENT_USER = "/icp/users/current",
	UPDATE_AVATAR = "/icp/users/me/avatar",
}
