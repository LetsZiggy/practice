const { expect, test } = require("@playwright/test")

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:9000")
})

test.describe("app", () => {
	test("shows message", async ({ page }) => {
		await expect(page.locator("h1"))
			.toHaveText("Hello World!")
	})
})
