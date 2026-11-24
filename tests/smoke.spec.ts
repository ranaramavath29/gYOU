import { expect, test, type Page } from "@playwright/test";

/**
 * Smoke tests (Phase 10). Run against any server:
 *   PowerShell:  $env:PORT = "3100"; npm run test:e2e
 * Forms run in mock mode (NEXT_PUBLIC_LEAD_ENDPOINT unset), so nothing is sent.
 */

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  return errors;
}

const routes = [
  "/",
  "/about-us",
  "/services",
  "/services/website-design-development",
  "/services/performance-marketing",
  "/services/seo-content-marketing",
  "/services/social-media-marketing",
  "/our-work",
  "/industries",
  "/insights",
  "/contact",
  "/thank-you",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];

for (const route of routes) {
  test(`${route} returns 200, one h1, no console errors`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

test("unknown routes and drafts are 404", async ({ page }) => {
  for (const route of [
    "/services/not-a-service",
    "/services/branding-creative-design",
    "/services/video-content-production",
    "/case-studies/example-case-study",
    "/insights/example-post",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
  }
});

test("robots.txt and sitemap.xml respond", async ({ request }) => {
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});

test("navigation works (desktop nav or mobile menu)", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await menu.getByRole("link", { name: "About Us" }).click();
  } else {
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About Us" })
      .click();
  }
  await expect(page).toHaveURL(/\/about-us$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Websites and Marketing");
});

test("enquiry form validates each step and reaches the thank-you page", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/contact#enquiry");
  const form = page.locator("#enquiry form");

  // Step 1: must pick a service.
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Choose at least one service.")).toBeVisible();
  await form.getByText("Websites", { exact: true }).click();
  await form.getByRole("button", { name: "Continue" }).click();

  // Step 2: business details.
  await expect(form.getByRole("heading", { name: "About your business" })).toBeFocused();
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Tell us a little more (at least 20 characters).")).toBeVisible();
  await form.getByLabel("Company name").fill("Test Company");
  await form.getByLabel("Industry").selectOption({ label: "Other" });
  await form.getByLabel("Monthly marketing budget").selectOption({ label: "Not sure yet" });
  await form
    .getByLabel("Project details")
    .fill("Automated smoke test, please ignore this enquiry.");
  await form.getByRole("button", { name: "Continue" }).click();

  // Step 3: contact + consent.
  await form.getByRole("button", { name: "Send enquiry" }).click();
  await expect(form.getByText("Please confirm so we can respond to your enquiry.")).toBeVisible();
  await form.getByLabel("Full name").fill("Test Person");
  await form.getByLabel("Business email").fill("test@example.com");
  await form.getByLabel("Phone or WhatsApp number").fill("+91 90000 00000");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send enquiry" }).click();

  await expect(page).toHaveURL(/\/thank-you\?form=enquiry$/);
  await expect(page.getByText("We’ve received your enquiry.")).toBeVisible();
  const events = await page.evaluate(() =>
    (window.dataLayer ?? []).map((e) => (e as { event?: string }).event).filter(Boolean),
  );
  expect(events).toContain("form_submit_success");
  expect(errors).toEqual([]);
});

test("visiting /thank-you directly does not count as a conversion", async ({ page }) => {
  await page.goto("/thank-you?form=enquiry");
  const events = await page.evaluate(() =>
    (window.dataLayer ?? []).map((e) => (e as { event?: string }).event).filter(Boolean),
  );
  expect(events).not.toContain("form_submit_success");
});

test("consultation email form reaches the thank-you page", async ({ page }) => {
  await page.goto("/");
  const field = page.getByRole("textbox", { name: "Your business email" });
  await field.fill("not-an-email");
  await page.getByRole("button", { name: "Start a Conversation" }).click();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await field.fill("test@example.com");
  await page.getByRole("button", { name: "Start a Conversation" }).click();
  await expect(page).toHaveURL(/\/thank-you\?form=consultation$/);
});

test("audit request form validates the website URL", async ({ page }) => {
  await page.goto("/services/website-design-development");
  await page.getByRole("button", { name: "Request audit" }).click();
  await expect(page.getByText("This field is required.").first()).toBeVisible();
  await page.getByLabel("Your website").fill("example.com");
  await page.getByLabel("Business email", { exact: true }).fill("test@example.com");
  await page.getByRole("button", { name: "Request audit" }).click();
  await expect(page).toHaveURL(/\/thank-you\?form=audit$/);
});

test("styleguide is noindex and shows form errors", async ({ page }) => {
  await page.goto("/styleguide");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.getByRole("button", { name: "Submit demo" }).click();
  await expect(page.getByText("Pick at least one option.")).toBeVisible();
});
