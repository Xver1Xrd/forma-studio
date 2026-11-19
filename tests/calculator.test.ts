import { test } from "node:test";
import assert from "node:assert/strict";
import { estimate, defaultConfig } from "../src/lib/calculator.ts";
import { inquirySchema } from "../src/lib/inquiry.ts";
test("reference apartment estimate is 420000 RUB", () =>
  assert.equal(estimate(defaultConfig).total, 420000));
test("property, style and selected services change the estimate", () =>
  assert.equal(
    estimate({
      property: "house",
      area: 200,
      style: "japandi",
      services: ["design", "visualization", "documentation", "supervision"],
    }).total,
    886000,
  ));
test("all area boundaries are enforced", () => {
  for (const area of [0, 29, 501, NaN, Infinity])
    assert.throws(() => estimate({ ...defaultConfig, area }), RangeError);
  for (const area of [30, 500])
    assert.ok(estimate({ ...defaultConfig, area }).total > 0);
});
test("unknown and duplicated services cannot produce a misleading price", () => {
  for (const services of [[], ["design", "design"], ["unknown"]])
    assert.throws(() => estimate({ ...defaultConfig, services }), RangeError);
  assert.throws(
    () => estimate({ ...defaultConfig, style: "unknown" }),
    RangeError,
  );
});
test("valid demonstration inquiry needs consent and a contact", () => {
  const valid = {
    name: "Тест FORMA",
    phone: "",
    email: "demo@example.com",
    project: "Квартира",
    message: "Демонстрационный проект",
    consent: true,
    company: "",
  };
  assert.ok(inquirySchema.safeParse(valid).success);
  assert.equal(
    inquirySchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(inquirySchema.safeParse({ ...valid, email: "" }).success, false);
  assert.equal(
    inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success,
    false,
  );
  assert.equal(
    inquirySchema.safeParse({ ...valid, company: "spam" }).success,
    false,
  );
});
