"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section shell route-error">
      <p className="eyebrow">Временная пауза</p>
      <h1>
        Нужно немного
        <br />
        времени.
      </h1>
      <p className="body-copy">
        Не удалось открыть страницу. Попробуйте ещё раз.
      </p>
      <button className="button" onClick={reset}>
        Повторить
      </button>
    </section>
  );
}
