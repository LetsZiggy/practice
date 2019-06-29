"use strict"

const Token = use("App/Models/Token")

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import("@adonisjs/framework/src/Route/Manager")} */
const Route = use("Route")

/* API Routes */
Route.group(() => {
	Route
		.post("users/check", "UserController.check")

	Route
		.post("users/end-session", "UserController.endSession")

	Route
		.post("users/signup", "UserController.signup")
		.validator("UserSignup")
		.middleware(["guest"])

	Route
		.post("users/signin", "UserController.signin")
		.validator("UserSignin")
		.middleware(["guest"])

	Route
		.post("users/signout", "UserController.signout")
		.middleware(["auth"])

	Route
		.get("jobs/list/:t?", "JobController.list")

	Route
		.post("jobs/new-job", "JobController.newJob")
		.validator("Job")
		.middleware(["auth", "apiToken"])

	Route
		.post("jobs/edit-job", "JobController.editJob")
		.validator("Job")
		.middleware(["auth", "apiToken"])

	Route
		.post("jobs/delete-job", "JobController.deleteJob")
		.validator("Delete")
		.middleware(["auth", "apiToken"])
}).prefix("api")

/* Must be final route */
Route.any("*", async ({ request, view }) => {
	await Token
		.create({
			identifier: request.nonce,
			token: request.csrfToken,
		})

	return view.render("index")
})
