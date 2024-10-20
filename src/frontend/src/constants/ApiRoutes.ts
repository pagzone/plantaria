export enum APIRoutes {
	/* AUTH */
	LOGIN = "/icp/auth/login",
	REGISTER = "/icp/auth/register",
	LOGIN_WITH_IDENTITY = "/icp/auth/ii/login",
	REGISTER_WITH_IDENTITY = "/icp/auth/ii/register",

	/* TUTORIAL */
	GET_TUTORIALS = "/icp/tutorials",
	GET_TUTORIAL = "/icp/tutorials/:id",
	CREATE_TUTORIAL = "/icp/tutorials",
	UPDATE_TUTORIAL = "/icp/tutorials/:id",
	DELETE_TUTORIAL = "/icp/tutorials/:id",
	// GET_TUTORIALS_BY_CATEGORY = "/icp/tutorials/category/:category",

	/* STORY */
	GET_STORIES = "/icp/stories",
	GET_STORY = "/icp/stories/:id",
	CREATE_STORY = "/icp/stories",
	UPDATE_STORY = "/icp/stories/:id",
	DELETE_STORY = "/icp/stories/:id",

	UPLOAD_IMAGE = "/icp/images/upload"
}
