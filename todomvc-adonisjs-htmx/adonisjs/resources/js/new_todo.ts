const formNewTodo = document.querySelector("#form-new-todo") as HTMLFormElement

(formNewTodo["todo"] as HTMLInputElement).addEventListener("keyup", (event) => {
	event.preventDefault()

	if (event.key !== "Enter" || formNewTodo["todo"].value.length === 0) {
		return
	}

	formNewTodo.submit()
})
