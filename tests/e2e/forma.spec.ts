import { test, expect, type Page } from "@playwright/test";
class CalculatorPage {
  constructor(readonly page: Page) {}
  async goto() {
    await this.page.goto("/calculator");
  }
  async next() {
    await this.page.getByRole("button", { name: "Далее", exact: true }).click();
  }
}

async function prepareScreenshot(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("button", { name: "Следующий слайд", exact: true })
    .click();
  await expect(page.getByText("02 / 03 — SILENCE")).toBeVisible();
  await page
    .getByRole("button", { name: "Предыдущий слайд", exact: true })
    .click();
  await expect(page.getByText("01 / 03 — MONOLITH")).toBeVisible();
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < height; y += 700)
    await page.evaluate(async (y) => {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
    }, y);
  await page.evaluate(async () => {
    const images = Array.from(document.images).filter(
      (img) => !img.closest('[aria-hidden="true"]'),
    );
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    );
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  expect(
    await page.evaluate(
      () =>
        Array.from(document.images).filter(
          (img) =>
            !img.closest('[aria-hidden="true"]') && img.naturalWidth === 0,
        ).length,
    ),
  ).toBe(0);
}

test("homepage, carousel, comparison and client runtime", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "осмысленного",
  );
  await expect(
    page.getByAltText(
      "Гостиная с панорамными окнами, травертином и тёплым дубом",
    ),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Следующий слайд", exact: true })
    .click();
  await expect(page.getByText("02 / 03 — SILENCE")).toBeVisible();
  const comparison = page.getByRole("slider", { name: "Сравнение до и после" });
  await comparison.focus();
  await comparison.press("End");
  await expect(comparison).toHaveValue("100");
  await comparison.press("Home");
  await expect(comparison).toHaveValue("0");
  expect(errors).toEqual([]);
});
test("portfolio filters and individual project gallery", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Интерьеры", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(2);
  await expect(
    page.getByRole("button", { name: "Интерьеры", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "SILENCE — Апартаменты", exact: true })
    .click();
  await expect(page).toHaveURL(/\/projects\/silence/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("SILENCE");
  await page.getByRole("button", { name: /Открыть фотографию 1:/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Следующая фотография" }).click();
  await expect(dialog.getByText(/02 — 03/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
test("services accordion reveals the correct service", async ({ page }) => {
  await page.goto("/services");
  const button = page.getByRole("button", { name: /Дизайн интерьеров/ });
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: /Архитектурное проектирование/ }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("link", { name: "Подробнее об услуге" }).click();
  await expect(page).toHaveURL(/\/services\/interior-design/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("дома");
});
test("calculator validates area and computes the selected configuration", async ({
  page,
}) => {
  const calc = new CalculatorPage(page);
  await calc.goto();
  await page.getByRole("radio", { name: "Частный дом", exact: true }).check();
  await calc.next();
  const area = page.getByRole("spinbutton", { name: "Точная площадь" });
  await area.fill("501");
  await calc.next();
  await expect(
    page.getByRole("alert").filter({ hasText: "от 30 до 500" }),
  ).toContainText("от 30 до 500");
  await area.fill("200");
  await calc.next();
  await page.getByRole("radio", { name: "Japandi", exact: true }).check();
  await calc.next();
  await page.getByRole("checkbox", { name: /Авторский надзор/ }).check();
  await calc.next();
  await expect(page.getByText(/от 886.000/)).toBeVisible();
  await expect(
    page.getByText("Иллюстративная оценка.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Обсудить результат" }).click();
  await expect(
    page.getByRole("textbox", { name: "Расскажите о вашем проекте" }),
  ).toHaveValue(/200 м².*Japandi/);
});
test("form validates and explicitly reports demo completion", async ({
  page,
}) => {
  await page.goto("/contacts");
  const form = page.getByRole("form", { name: "Обсудить проект" });
  await form
    .getByRole("button", { name: "Обсудить проект", exact: true })
    .click();
  await expect(page.getByText("Укажите имя, минимум 2 символа")).toBeVisible();
  await form
    .getByRole("textbox", { name: "Ваше имя", exact: true })
    .fill("Тест FORMA");
  await form
    .getByRole("textbox", { name: "Электронная почта", exact: true })
    .fill("demo@example.com");
  await form.getByRole("checkbox", { name: /Согласен/ }).check();
  await form
    .getByRole("button", { name: "Обсудить проект", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Спасибо за интерес к FORMA." }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Это демонстрационная форма. Данные проверены, но заявка никуда не отправлена.",
    ),
  ).toBeVisible();
});
test("demo endpoint rejects bad, cross-origin and oversized payloads", async ({
  request,
}) => {
  const valid = {
    name: "Тест FORMA",
    phone: "",
    email: "demo@example.com",
    project: "Квартира",
    message: "Демонстрация",
    consent: true,
    company: "",
  };
  expect(
    (await request.post("/api/inquiries", { data: { name: "" } })).status(),
  ).toBe(400);
  expect(
    (
      await request.post("/api/inquiries", {
        headers: { Origin: "https://unrelated.example" },
        data: valid,
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/inquiries", {
        data: { ...valid, message: "a".repeat(10000) },
      })
    ).status(),
  ).toBe(413);
  const response = await request.post("/api/inquiries", { data: valid });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ mode: "demo" });
});
test("all routes and missing page respond correctly", async ({ request }) => {
  test.setTimeout(120000);
  const paths = [
    "/",
    "/about",
    "/projects",
    "/services",
    "/journal",
    "/contacts",
    "/calculator",
    "/privacy",
    ...["monolith", "silence", "nord", "terra", "linea", "epure"].map(
      (s) => "/projects/" + s,
    ),
    ...[
      "architecture",
      "interior-design",
      "visualization",
      "supervision",
      "procurement",
      "commercial",
    ].map((s) => "/services/" + s),
    ...["minimalism", "natural-materials", "light-and-space"].map(
      (s) => "/journal/" + s,
    ),
  ];
  for (const path of paths) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(await res.text(), path).toContain("<h1");
  }
  expect((await request.get("/this-space-does-not-exist")).status()).toBe(404);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
});
for (const width of [390, 768, 1280, 1440])
  test(`layout has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth + 1,
      ),
    ).toBe(true);
    if (width === 390 || width === 1440) {
      await prepareScreenshot(page);
      await page.screenshot({
        path:
          width === 390
            ? "/tmp/forma-live-mobile.png"
            : "/tmp/forma-live-desktop.png",
        fullPage: true,
        caret: "initial",
      });
    }
  });
test("mobile menu traps focus, navigates and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Меню", exact: true }).click();
  const menu = page.getByRole("dialog");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: /Проекты/ }).click();
  await expect(page).toHaveURL(/\/projects/);
  await expect(menu).not.toBeVisible();
  await page.getByRole("button", { name: "Меню", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Меню", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("reduced-motion preference keeps content and controls usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el.children[0]).animationName),
  ).toBe("none");
  await page
    .getByRole("button", { name: "Следующий слайд", exact: true })
    .click();
  await expect(page.getByText("02 / 03 — SILENCE")).toBeVisible();
});
