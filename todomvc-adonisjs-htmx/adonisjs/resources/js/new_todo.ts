const formNewTodo = document.querySelector<HTMLFormElement>("#form-new-todo")!

;(formNewTodo["todo"] as HTMLInputElement).addEventListener("keyup", (event) => {
	event.preventDefault()

	if (event.key !== "Enter" || (formNewTodo["todo"] as HTMLInputElement).value.length === 0) {
		return
	}

	formNewTodo.submit()
})
