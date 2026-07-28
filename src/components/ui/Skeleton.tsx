interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular"
  width?: string
  height?: string
}

const variantStyles = {
  text: "rounded-md h-4",
  circular: "rounded-full",
  rectangular: "rounded-md",
}

export function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-neutral-300/60 dark:bg-neutral-300/20 ${variantStyles[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}