export function FloorPlan({ name, area }: { name: string; area: number }) {
  return (
    <div className="floorplan">
      <svg
        width="1100"
        height="620"
        viewBox="0 0 1100 620"
        fill="none"
        role="img"
        aria-labelledby={`plan-${name}`}
      >
        <title
          id={`plan-${name}`}
        >{`Концептуальная планировка ${name}, ${area} м²`}</title>
        <g stroke="#1C1C1C">
          <path
            d="M100 100H1000V520H100V100ZM100 340H1000M520 100V340M760 100V340M420 340V520M700 340V520"
            strokeWidth="5"
          />
          <path
            d="M130 130H480V290H130ZM550 130H720V290H550ZM790 130H970V290H790ZM130 375H385V485H130ZM450 375H665V485H450ZM735 375H965V485H735"
            strokeWidth="1"
            opacity=".4"
          />
          <path
            d="M80 60H1020M100 48V72M520 48V72M760 48V72M1000 48V72M60 80V540M48 100H72M48 340H72M48 520H72M80 560H1020"
            strokeWidth="1"
          />
          <path
            d="M300 340h70M570 340h70M820 340h70"
            stroke="#E8E4DD"
            strokeWidth="7"
          />
          <path
            d="M300 340v-70a70 70 0 0 1 70 70M570 340v-70a70 70 0 0 1 70 70M820 340v-70a70 70 0 0 1 70 70"
            strokeWidth="1"
          />
        </g>
        <g
          fill="#625F59"
          fontFamily="sans-serif"
          fontSize="18"
          textAnchor="middle"
        >
          <text x="300" y="212">
            Общая зона
          </text>
          <text x="300" y="242">
            {Math.round(area * 0.32)} м²
          </text>
          <text x="638" y="215">
            Приватная зона
          </text>
          <text x="870" y="215">
            Кабинет
          </text>
          <text x="250" y="435">
            Спальня
          </text>
          <text x="555" y="435">
            Гардеробная
          </text>
          <text x="850" y="435">
            Входная группа
          </text>
          <text x="550" y="595" fontSize="13">
            КОНЦЕПЦИЯ / СХЕМА ЗОНИРОВАНИЯ
          </text>
        </g>
      </svg>
    </div>
  );
}
