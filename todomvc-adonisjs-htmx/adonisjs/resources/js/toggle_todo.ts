const formToggle = document.querySelector("#form-toggle") as HTMLFormElement

for (const inputToggle of document.querySelectorAll<HTMLInputElement>(".toggle")) {
	inputToggle.addEventListener("change", (event) => {
		event.preventDefault()

		formToggle["todo-id"].value = inputToggle.value
		formToggle["todo-is-completed"].value = inputToggle.checked

		formToggle.submit()
	})
}
