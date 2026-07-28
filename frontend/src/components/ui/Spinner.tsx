interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
}

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center" role="status" aria-label="Cargando">
      <div
        className={`${sizeMap[size]} border-primary-700 border-t-transparent rounded-full animate-spin ${className}`}
      />
    </div>
  )
}