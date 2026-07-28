interface SectionHeaderProps {
  overline?: string
  title: string
  description?: string
  as?: "h1" | "h2"
  className?: string
}

export function SectionHeader({
  overline,
  title,
  description,
  as: Tag = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {overline && (
        <span className="inline-block text-primary-700 dark:text-primary-500 font-accent tracking-[0.2em] text-sm uppercase">
          {overline}
        </span>
      )}
      <Tag className={`font-heading font-bold text-primary-900 dark:text-neutral-900 leading-tight ${overline ? "mt-3 text-3xl sm:text-4xl lg:text-5xl" : "text-3xl sm:text-4xl lg:text-5xl"}`}>
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
