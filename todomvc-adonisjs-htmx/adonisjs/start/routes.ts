/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import "./routes/cart"
| import "./routes/customer"
|
*/

import Route from "@ioc:Adonis/Core/Route"

Route.get("/", "TodosController.index")
Route.get("/active", "TodosController.index")
Route.get("/completed", "TodosController.index")
Route.put("/new-todo", "TodosController.newTodo")
Route.patch("/edit-todo/:id", "TodosController.editTodoUpdate")
Route.get("/edit-todo/:id", "TodosController.editTodoSwap")
Route.patch("/toggle/:id", "TodosController.toggle")
Route.post("/toggle-all", "TodosController.toggleAll")
Route.delete("/destroy/:id", "TodosController.destroy")
Route.post("/destroy-completed", "TodosController.destroyCompleted")
