interface HeroBackgroundProps {
  scrollProgress: number
}

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {

  return (
    <div className="absolute inset-0" style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/50 dark:bg-transparent"
           style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }} />
    </div>
  )
}
