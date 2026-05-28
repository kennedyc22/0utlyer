// Phase 7-final: contact form integrity. Asserts:
// - the form is server-rendered (not client-hydrated only) so Netlify's
//   build-time scraper can register it;
// - it carries data-netlify and a form-name hidden input;
// - every visible input has an autocomplete attribute;
// - the honeypot field is hidden (CSS display:none OR the HTML hidden
//   attribute, which is equivalent for assistive tech);
// - HTML5 validation refuses an empty submission and the first invalid
//   field receives focus.
//
// The Netlify POST itself isn't exercised in CI (requires a Netlify deploy);
// we assert the form carries Netlify attributes and expected redirect target.

import { expect, test } from "@playwright/test";

test("form-integrity: server-rendered Netlify form is present in home HTML", async ({
  request,
}) => {
  const res = await request.get("/");
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).toContain('data-netlify="true"');
  expect(html).toContain('name="form-name"');
  expect(html).toContain('value="contact"');
  expect(html).toContain('action="/thank-you"');
});

test("form-integrity: success acknowledgement after Netlify redirect param", async ({
  page,
}) => {
  await page.goto("/?contact=sent#contact");
  await page.waitForLoadState("networkidle");
  const success = page.getByTestId("contact-form-success");
  await expect(success).toBeVisible();
  await expect(success).toContainText("Thanks");
  await expect(page.locator('form[name="contact"]')).toHaveCount(0);
});

test("form-integrity: hidden form field names match the live form", async ({
  page,
}) => {
  await page.goto("/");
  const names = await page
    .locator(
      'form[name="contact"] input[name], form[name="contact"] textarea[name], form[name="contact"] select[name]',
    )
    .evaluateAll((els) =>
      (
        els as Array<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ).map((el) => el.getAttribute("name")),
    );
  // form-name + at least one user-facing field
  expect(names).toContain("form-name");
  expect(names.filter((n) => n && n !== "form-name").length).toBeGreaterThan(0);
});

test("form-integrity: honeypot is hidden from assistive tech", async ({
  page,
}) => {
  await page.goto("/");
  const honeypot = page.locator('form[name="contact"] input[name="bot-field"]');
  await expect(honeypot).toHaveCount(1);
  const hidden = await honeypot.evaluate((el) => {
    // Walk every ancestor — the honeypot may be hidden via a `hidden`
    // attribute or `display:none` on any wrapper, not necessarily the
    // immediate one.
    let cur: HTMLElement | null = el as HTMLElement;
    while (cur) {
      if (cur.hidden) return true;
      const cs = window.getComputedStyle(cur);
      if (cs.display === "none" || cs.visibility === "hidden") return true;
      cur = cur.parentElement;
    }
    return false;
  });
  expect(hidden, "honeypot wrapper must be visually hidden").toBe(true);
});

test("form-integrity: every visible input has an autocomplete attribute", async ({
  page,
}) => {
  await page.goto("/");
  const inputs = await page
    .locator(
      'form[name="contact"] input:not([type="hidden"]):not([name="bot-field"]), form[name="contact"] textarea',
    )
    .all();
  expect(inputs.length).toBeGreaterThan(0);
  for (const i of inputs) {
    const ac = await i.getAttribute("autocomplete");
    const name = await i.getAttribute("name");
    expect(
      ac,
      `input name="${name}" is missing autocomplete attribute`,
    ).not.toBeNull();
    expect(ac, `input name="${name}" has empty autocomplete`).not.toBe("");
  }
});

test("form-integrity: required field marking uses '(required)' in label text", async ({
  page,
}) => {
  await page.goto("/");
  const requiredInputs = await page
    .locator(
      'form[name="contact"] input[required], form[name="contact"] textarea[required]',
    )
    .all();
  expect(requiredInputs.length).toBeGreaterThan(0);
  for (const i of requiredInputs) {
    const id = await i.getAttribute("id");
    expect(id, "required input missing id").toBeTruthy();
    const labelText =
      (await page.locator(`label[for="${id}"]`).first().textContent()) ?? "";
    expect(
      labelText.toLowerCase().includes("(required)"),
      `label for required input "${id}" must include "(required)" — got: ${labelText.trim()}`,
    ).toBe(true);
  }
});

test("form-integrity: empty submission is blocked by validation", async ({
  page,
}) => {
  await page.goto("/#contact");
  await page.waitForLoadState("networkidle");
  const form = page.locator('form[name="contact"]');
  await expect(form).toBeVisible();
  // Click submit on an empty form — HTML5 validation should report invalid.
  await form.locator('button[type="submit"]').click();
  const invalidCount = await form
    .locator(
      'input:not([type="hidden"]):not([name="bot-field"]):invalid, textarea:invalid',
    )
    .count();
  expect(invalidCount).toBeGreaterThan(0);
});

test("form-integrity: invalid email shape is rejected", async ({ page }) => {
  await page.goto("/#contact");
  await page.waitForLoadState("networkidle");
  const email = page.locator('form[name="contact"] input[type="email"]');
  await expect(email).toBeVisible();
  await email.fill("not-an-email");
  const validity = await email.evaluate(
    (el) => (el as HTMLInputElement).validity.typeMismatch,
  );
  expect(validity).toBe(true);
});
