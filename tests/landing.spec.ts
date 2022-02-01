import { test, expect } from "@playwright/test";

test.describe("landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("head", () => {
    test("title", async ({ page }) => {
      const title = page.locator("title");
      await expect(title).toHaveText(
        "StartupEmulator - training platform for developers"
      );
    });
  });

  test.describe("hero", () => {
    test("actions", async ({ page }) => {
      const buttons = page.locator(".get-experience a.button-link");
      await expect(buttons).toHaveText([
        "Explore Startups",
        "Explore Challenges",
      ]);
    });
  });

  test("headers", async ({ page }) => {
    const headers = page.locator(".startup-block-content__head h2");
    await expect(headers).toHaveText(["Startups", "Challenges"]);
  });

  test.describe("header", () => {
    test("logo", async ({ page }) => {
      const logo = page.locator(".main-header h2");
      await expect(logo).toHaveText("Startup Emulator");
    });

    test("navigation", async ({ page }) => {
      const items = page.locator(".main-header nav ul:visible>li a");
      await expect(items).toHaveText(["Startups", "Challenges", "Pricing"]);
    });

    test("login", async ({ page }) => {
      const loginButton = page.locator(
        ".main-header .main-header-buttons a[href='/login']"
      );
      await expect(loginButton).toHaveText("Log In");
    });

    test("register", async ({ page }) => {
      const loginButton = page.locator(
        ".main-header .main-header-buttons a[href='/createAccount']"
      );
      await expect(loginButton).toHaveText("Sign Up");
    });
  });
});
