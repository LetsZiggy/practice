/* eslint-disable unicorn/no-array-for-each */

import { MiddlewarePlacement } from "aurelia-store"

const middlewares = {
// 	middleware: (currentState, originalState, settings, action) => {},
}

const getMiddleware = (keyArray, middleware = middlewares) => {
	const maxIndex = keyArray.length - 1

	middleware = (maxIndex === 0)
		? middleware[keyArray[0]]
		: getMiddleware(keyArray.slice(1), middleware[keyArray[0]])

	return middleware
}

// store.registerMiddleware(middleware, MiddlewarePlacement[placement], options)
export const registerMiddlewares = (store, list) => {
	list
		.map(({ key, options, placement }) => {
			placement = placement
				.toLowerCase()
				.replaceAll(/(^[a-z]| [a-z])/g, (match) => match.toUpperCase())

			const middleware = (typeof key === "string")
				? getMiddleware(key.split("."))
				: key

			return ({
				middleware,
				placement,
				options,
			})
		})
		.forEach(({ middleware, options, placement }) => {
			store.registerMiddleware(middleware, MiddlewarePlacement[placement], options)
		})
}

// store.unregisterMiddleware(middleware)
export const unregisterMiddlewares = (store, list) => {
	list
		.map(({ key }) => {
			const middleware = (typeof key === "string")
				? getMiddleware(key.split("."))
				: key

			return ({
				middleware,
			})
		})
		.forEach(({ middleware }) => {
			store.unregisterMiddleware(middleware)
		})
}
