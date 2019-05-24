"use strict"

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
		.get("users/check", "UserController.check")

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
}).prefix("api")

/* Must be final route */
Route.any("*", ({ view }) => view.render("index"))
