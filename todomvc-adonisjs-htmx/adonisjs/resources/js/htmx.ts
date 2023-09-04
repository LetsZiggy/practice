window.htmx = require("htmx.org")

window.htmx.onLoad(function (content) {
	/* <input class="new-todo"> */
	const newInput = document.querySelector(".new-todo") as HTMLInputElement

	if (newInput !== null) {
		newInput.value = ""
	}

	/* <input class="edit"> */
	const editInput = content.querySelector(".edit") as HTMLInputElement

	if (editInput !== null) {
		editInput.addEventListener("keyup", (event: KeyboardEvent) => {
			event.preventDefault()

			const id = editInput.dataset["id"] as string
			const original = editInput.dataset["todo"] as string

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
