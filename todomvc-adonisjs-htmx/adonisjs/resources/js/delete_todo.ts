const formDestroy = document.querySelector<HTMLFormElement>("#form-destroy")!

for (const inputDestroy of document.querySelectorAll<HTMLInputElement>(".destroy")) {
	inputDestroy.addEventListener("click", (event) => {
		event.preventDefault()

		;(formDestroy["todo-id"] as HTMLInputElement).value = inputDestroy.value

		formDestroy.submit()
	})
}
