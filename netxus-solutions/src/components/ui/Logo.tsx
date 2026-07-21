export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const iconSizes = { sm: 28, md: 38, lg: 52 }
  const textSizes = { sm: "text-lg", md: "text-xl", lg: "text-3xl" }
  const subSizes = { sm: "text-[8px]", md: "text-[10px]", lg: "text-xs" }
  const subSpacing = { sm: "tracking-[0.2em]", md: "tracking-[0.3em]", lg: "tracking-[0.35em]" }

  const s = iconSizes[size]

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={s}
        height={s}
        viewBox="0 0 407 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        style={{ "--logo-grad": "var(--logo-gradient)" } as React.CSSProperties}
      >
        <defs>
          <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#FFD200" />
            <stop offset="50%" stopColor="#FF8C00" />
            <stop offset="100%" stopColor="#E8231A" />
          </linearGradient>
        </defs>
        <polygon
          points="40,52 40,98 367,439 367,315 119,52"
          fill="url(#gN)"
          className="theme-logo-polygon"
        />
        <polygon
          points="40,116 41,433 123,351 123,202"
          fill="url(#gN)"
          className="theme-logo-polygon"
        />
        <polygon
          points="366,40 290,116 290,215 367,295"
          fill="url(#gN)"
          className="theme-logo-polygon"
        />
        <style>{`
          .theme-logo-polygon { fill: var(--logo-gradient); transition: fill 0.3s ease; }
        `}</style>
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`${textSizes[size]} font-extrabold tracking-tight`}
          style={{ color: "var(--logo-wordmark)", transition: "color 0.3s ease" }}
        >
          Net
          <span
            style={{
              background: "var(--logo-x-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transition: "background 0.3s ease",
            }}
          >
            x
          </span>
          us
        </span>
        {size !== "sm" && (
          <span
            className={`${subSizes[size]} font-medium ${subSpacing[size]}`}
            style={{ color: "var(--logo-wordmark)", transition: "color 0.3s ease" }}
          >
            SOLUTIONS
          </span>
        )}
      </div>
    </div>
  )
}
