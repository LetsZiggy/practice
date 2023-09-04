/* eslint-disable unicorn/prefer-global-this */

window.htmx = require("htmx.org")

window.htmx.onLoad(function (content) {
	/* <input class="new-todo"> */
	const newInput = document.querySelector<HTMLInputElement>(".new-todo")

	if (newInput !== null) {
		newInput.value = ""
	}

	/* <input class="edit"> */
	const editInput = content.querySelector<HTMLInputElement>(".edit")

	if (editInput !== null) {
		editInput.addEventListener("keyup", (event: KeyboardEvent) => {
			event.preventDefault()

			const id: string = editInput.dataset["id"]!
			const original: string = editInput.dataset["todo"]!

			if (event.key === "Escape" || (event.key === "Enter" && editInput.value === original)) {
				window.htmx.ajax("GET", `/edit-todo/${ id }?t=label`, {
					swap: "outerHTML",
					target: `#todo-${ id }`,
				})
			}

			if (event.key === "Enter" && editInput.value !== original && editInput.value.length > 0) {
				window.htmx.ajax("PATCH", `/edit-todo/${ id }`, {
					source: `#edit-${ id }`,
					swap: "outerHTML",
					target: `#todo-${ id }`,
				})
			}
		})
	}
})
