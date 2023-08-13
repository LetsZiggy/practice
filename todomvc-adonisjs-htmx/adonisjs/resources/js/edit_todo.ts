const formEditTodo = document.querySelector<HTMLFormElement>("#form-edit-todo")!

for (const editLabel of document.querySelectorAll<HTMLLabelElement>(".edit-label")) {
	const parentList = editLabel?.parentElement?.parentElement as HTMLOListElement
	const editInput = editLabel?.parentElement?.nextElementSibling as HTMLInputElement

	editLabel.addEventListener("dblclick", (event) => {
		event.preventDefault()

		for (const editing of document.querySelectorAll<HTMLOListElement>(".editing")) {
			editing.classList.remove("editing")
		}

		parentList.classList.add("editing")
		editInput.focus()
	})

	editInput.addEventListener("blur", (event) => {
		event.preventDefault()

		parentList.classList.remove("editing")
		editInput.value = editLabel.dataset["todo"] ?? ""
	})

	editInput.addEventListener("keyup", (event) => {
		event.preventDefault()

		if (event.key === "Escape") {
			editInput.blur()
		}

		if (event.key !== "Enter" || editInput.value.length === 0) {
			return
		}

		(formEditTodo["todo-id"] as HTMLInputElement).value = editInput.name.split("-")[1]!
		;(formEditTodo["todo-text"] as HTMLInputElement).value = editInput.value

		formEditTodo.submit()
	})
}
