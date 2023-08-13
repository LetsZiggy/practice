const formDestroy = document.querySelector("#form-destroy") as HTMLFormElement

for (const inputDestroy of document.querySelectorAll<HTMLInputElement>(".destroy")) {
	inputDestroy.addEventListener("click", (event) => {
		event.preventDefault()

		formDestroy["todo-id"].value = inputDestroy.value

		formDestroy.submit()
	})
}
