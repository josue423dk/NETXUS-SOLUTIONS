import { useTheme } from "next-themes"

import heroBgDark from "../../assets/hero/hero-bg-dark.webp"
import heroBgDarkMovil from "../../assets/hero/hero-bg-dark-movil.webp"

interface HeroBackgroundProps {
  scrollProgress: number
}

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="absolute inset-0" style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }}>
      {isDark && (
        <picture>
          <source media="(min-width: 768px)" srcSet={heroBgDark} type="image/webp" />
          <source media="(max-width: 767px)" srcSet={heroBgDarkMovil} type="image/webp" />
          <img src={heroBgDark} alt="" width={1920} height={1080} fetchPriority="high"
               className="absolute inset-0 w-full h-full object-cover" />
        </picture>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50 dark:bg-black/70"
           style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }} />
    </div>
  )
}
