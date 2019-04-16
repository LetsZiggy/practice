/* eslint-disable unicorn/no-array-for-each */

import { nextStateHistory } from "aurelia-store"

// https://aurelia.io/docs/plugins/store#making-our-app-history-aware
// https://github.com/zewa666/aurelia-store-examples/blob/master/markdown/src/actions.ts
const actions = {
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
