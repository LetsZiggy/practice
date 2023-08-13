const formToggle = document.querySelector<HTMLFormElement>("#form-toggle")!

for (const inputToggle of document.querySelectorAll<HTMLInputElement>(".toggle")) {
	inputToggle.addEventListener("change", (event) => {
		event.preventDefault()

		;(formToggle["todo-id"] as HTMLInputElement).value = inputToggle.value
		;(formToggle["todo-is-completed"] as HTMLInputElement).value = inputToggle.checked ? "true" : "false"

		formToggle.submit()
	})
}
