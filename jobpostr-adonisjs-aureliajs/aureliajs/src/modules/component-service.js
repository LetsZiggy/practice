export const DEFAULT_RESPONSE_OBJECT = {
	success: false,
	data: {},
}

export const componentStateInit = async (store) => {
	// await store.dispatch("rehydrateFromLocalStorage", "jobpostr")
	await store.dispatch("setIdentifier", document.head.querySelector(`meta[name="identifier"]`).content)
	await store.dispatch("setToken", document.head.querySelector(`meta[name="token"]`).content)
}

export const componentSignInInit = async (store, http, identifier) => {
	const response = await http
		.post({
			url: "users/check",
			obj: { identifier },
		}) || DEFAULT_RESPONSE_OBJECT

	await store.dispatch("toggleIsSignin", response.data.isSignin || false)
	await store.dispatch("setUserId", response.data.userId || 0)
	await store.dispatch("setUsername", response.data.username || "")
}
