export enum APIRoutes {
	/* AUTH */
	LOGIN = "/icp/auth/login",
	REGISTER = "/icp/auth/register",
	LOGIN_WITH_IDENTITY = "/icp/auth/ii/login",
	REGISTER_WITH_IDENTITY = "/icp/auth/ii/register",

	/* TUTORIAL */
	GET_TUTORIALS = "/icp/tutorials",
	GET_TUTORIAL = "/icp/tutorials/:id",
	CREATE_TUTORIAL = "/icp/tutorial/create",
	UPDATE_TUTORIAL = "/icp/tutorial/:id/update",
	DELETE_TUTORIAL = "/icp/tutorial/:id/delete",
	// GET_TUTORIALS_BY_CATEGORY = "/icp/tutorials/category/:category",

	/* STORY */
	GET_STORIES = "/icp/stories",
	GET_STORY = "/icp/stories/:id",
	CREATE_STORY = "/icp/story/create",
	UPDATE_STORY = "/icp/story/:id/update",
	DELETE_STORY = "/icp/story/:id/delete",

	UPLOAD_IMAGE = "/icp/images/upload"
}
