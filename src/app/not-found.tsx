import { Button, Picture } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="section shell not-found">
      <p className="eyebrow">Страница не найдена</p>
      <p className="not-found-number">4—0—4</p>
      <h1>
        Кажется, здесь
        <br />
        ещё нет пространства.
      </h1>
      <Picture
        src="/images/nord.webp"
        alt="Дом среди северного леса"
        className="not-found-photo"
        sizes="90vw"
      />
      <p className="body-copy">Вернёмся туда, где всё начинается.</p>
      <Button href="/">На главную</Button>
    </section>
  );
}
