import { createHash } from "node:crypto";
import { inquirySchema } from "@/lib/inquiry";
export const runtime = "nodejs";
const rate = new Map<string, { count: number; until: number }>();
async function limitedBody(request: Request) {
  if (Number(request.headers.get("content-length")) > 8192)
    throw new RangeError("body");
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        throw new RangeError("body");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const data = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    data.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder().decode(data);
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(request.url);
  expectedOrigin.host = request.headers.get("host") || expectedOrigin.host;
  const protocol = request.headers.get("x-forwarded-proto");
  if (protocol === "https") expectedOrigin.protocol = "https:";
  if (origin && origin !== expectedOrigin.origin)
    return Response.json(
      { error: "Недопустимый источник запроса." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ error: "Требуется JSON." }, { status: 415 });
  let body: unknown;
  try {
    body = JSON.parse(await limitedBody(request));
  } catch (e) {
    return Response.json(
      { error: "Некорректный запрос." },
      { status: e instanceof RangeError ? 413 : 400 },
    );
  }
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success)
    return Response.json(
      {
        error: "Проверьте поля формы.",
        fields: parsed.error.issues.map((i) => ({
          field: i.path[0],
          message: i.message,
        })),
      },
      { status: 400 },
    );
  const now = Date.now();
  for (const [key, value] of rate) if (value.until < now) rate.delete(key);
  if (rate.size > 2000) rate.clear();
  const ip = createHash("sha256")
    .update(
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local",
    )
    .digest("hex");
  const bucket = rate.get(ip) || { count: 0, until: now + 60_000 };
  if (bucket.count >= 8)
    return Response.json(
      { error: "Слишком много запросов. Попробуйте через минуту." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  bucket.count++;
  rate.set(ip, bucket);
  // Deliberate demo endpoint: no persistence, notifications, or logging of submitted fields.
  return Response.json(
    {
      mode: "demo",
      message:
        "Данные проверены. Это демонстрационная форма, заявка никуда не отправлена.",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
