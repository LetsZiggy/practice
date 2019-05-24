export const DEFAULT_RESPONSE_OBJECT = {
	success: false,
	data: {},
}

export const componentStateInit = async (store) => {
	// await store.dispatch("rehydrateFromLocalStorage", "jobpostr")
}

export const componentSignInInit = async (store, http) => {
	const response = await http
		.post({ url: "users/check" }) || DEFAULT_RESPONSE_OBJECT

	await store.dispatch("toggleIsSignin", response.data.isSignin || false)
	await store.dispatch("setUserId", response.data.userId || 0)
	await store.dispatch("setUsername", response.data.username || "")
}
