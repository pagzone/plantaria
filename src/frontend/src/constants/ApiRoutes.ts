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
}
