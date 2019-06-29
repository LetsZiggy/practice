/* eslint-disable unicorn/no-object-as-default-parameter, unicorn/no-null, unicorn/no-array-for-each */

import { nextStateHistory } from "aurelia-store"

// https://aurelia.io/docs/plugins/store#making-our-app-history-aware
// https://github.com/zewa666/aurelia-store-examples/blob/master/markdown/src/actions.ts
const actions = {
	toggleIsSignin: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isSignin: data,
		})
	},
	toggleUsernameValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isUsernameValid: data,
		})
	},
	toggleEmailValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isEmailValid: data,
		})
	},
	togglePasswordValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isPasswordValid: data,
		})
	},
	togglePasswordConfirmationValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isConfirmValid: data,
		})
	},
	setUsername: (state, data = "") => {
		return nextStateHistory(state, {
			...state.present,
			username: data,
		})
	},
	setUserId: (state, data = 0) => {
		return nextStateHistory(state, {
			...state.present,
			userId: data,
		})
	},
	setJobs: (state, { data = [], type = "full" }) => {
		let jobs = null

		if (type === "full") {
			jobs = [...data]
		}
		else {
			const currentJobs = [...state.present.jobs]
			const newJobs = []

			for (let index = (data.length - 1); index >= 0; index--) {
				let found = false

				for (let index_ = (currentJobs.length - 1); index_ >= 0; index_--) {
					if (currentJobs[index_].id === data[index].id) {
						found = true
						currentJobs[index_] = { ...data[index] }

						break
					}
				}

				if (!found) {
					newJobs.push(data[index])
				}
			}

			jobs = [...currentJobs, ...newJobs]
		}

		return nextStateHistory(state, {
			...state.present,
			jobs,
		})
	},
	setJobsLastUpdate: (state) => {
		return nextStateHistory(state, {
			...state.present,
			jobsLastUpdate: Date.now(),
		})
	},
	updateJob: (state, data = { id: 0 }) => {
		const jobs = [...state.present.jobs]
		const index = jobs
			.reduce((accumulator, value, index) => {
				return ((value.id === data.id) ? index : accumulator)
			}, -1)

		if (index === -1) {
			return nextStateHistory(state, {
				...state.present,
			})
		}

		jobs[index] = { ...jobs[index], ...data }

		return nextStateHistory(state, {
			...state.present,
			jobs,
		})
	},
	deleteJob: (state, data = { id: 0 }) => {
		const jobs = [...state.present.jobs]
		const index = jobs
			.reduce((accumulator, value, index) => {
				return ((value.id === data.id) ? index : accumulator)
			}, -1)

		if (index === -1) {
			return nextStateHistory(state, {
				...state.present,
			})
		}

		jobs.splice(index, 1)

		return nextStateHistory(state, {
			...state.present,
			jobs,
		})
	},
	toggleJobTitleValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isJobTitleValid: data,
		})
	},
	toggleJobLinkValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isJobLinkValid: data,
		})
	},
	toggleJobDescriptionValid: (state, data = false) => {
		return nextStateHistory(state, {
			...state.present,
			isJobDescriptionValid: data,
		})
	},
	setIdentifier: (state, data = 0) => {
		return nextStateHistory(state, {
			...state.present,
			identifier: data,
		})
	},
	setToken: (state, data = 0) => {
		return nextStateHistory(state, {
			...state.present,
			token: data,
		})
	},
	// action: (state, data) => {
	// 	return nextStateHistory(state, {
	// 		...state.present,
	// 	})
	// },
}

const getAction = (keyArray, action = actions) => {
	const maxIndex = keyArray.length - 1

	action = (maxIndex === 0)
		? action[keyArray[0]]
		: getAction(keyArray.slice(1), action[keyArray[0]])

	return action
}

// store.registerAction(name, action)
export const registerActions = (store, list) => {
	list
		.map(({ key, name }) => {
			const action = (typeof key === "string")
				? getAction(key.split("."))
				: key

			return ({
				name,
				action,
			})
		})
		.forEach(({ action, name }) => {
			store.registerAction(name, action)
		})
}

// store.unregisterAction(action)
export const unregisterActions = (store, list) => {
	list
		.map(({ key }) => {
			const action = (typeof key === "string")
				? getAction(key.split("."))
				: key

			return ({
				action,
			})
		})
		.forEach(({ action }) => {
			store.unregisterAction(action)
		})
}
