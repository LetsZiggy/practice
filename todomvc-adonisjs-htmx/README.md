# [TodoMVC](https://todomvc.com/)

#### Setup

- Setup PostgreSQL
	1. `cd <ROOT_FOLDER>/database`
	2. Create and edit `development.env`
		- Use `development.example.env` as example
- Setup Adonis.js
	1. `cd <ROOT_FOLDER>/adonisjs`
	2. Create and edit `.env`
		- Use `.env.example` as example
	3. `pnpm install`

---

#### Run

1. Run database
	1. Open new terminal
	2. `cd <ROOT_FOLDER>/database`
	3. Run `docker compose`
		- To up docker compose containers
			- `docker compose up --remove-orphans --build --detach`
		- To down docker compose containers
			- `docker compose down --remove-orphans --rmi=local`
2. Run server
	1. Open new terminal
	2. `cd <ROOT_FOLDER>/adonisjs`
	3. `node ace migration:run`
	4. `pnpm run dev`

---

#### Testing

1. Run database
	1. Open new terminal
	2. `cd <ROOT_FOLDER>/database`
	3. Run `docker compose`
		- To up docker compose containers
			- `docker compose up --remove-orphans --build --detach`
		- To down docker compose containers
			- `docker compose down --remove-orphans --rmi=local`
2. Run server
	1. Open new terminal
	2. `cd <ROOT_FOLDER>/adonisjs`
	3. `pnpm run test`
