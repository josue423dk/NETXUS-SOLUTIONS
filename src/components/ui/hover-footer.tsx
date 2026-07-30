import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

function useCursorMask(svgRef: React.RefObject<SVGSVGElement | null>) {
  const [hovered, setHovered] = useState(false)
  const maskRef = useRef<SVGRadialGradientElement | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current
    const mask = maskRef.current
    if (!svg || !mask) return

    const rect = svg.getBoundingClientRect()
    const cx = ((e.clientX - rect.left) / rect.width) * 100
    const cy = ((e.clientY - rect.top) / rect.height) * 100
    mask.setAttribute("cx", `${cx}%`)
    mask.setAttribute("cy", `${cy}%`)
  }, [svgRef])

  return { hovered, setHovered, maskRef, handleMouseMove }
}

export const TextHoverEffect = ({
  text,
  className,
}: {
  text: string
  duration?: number
  automatic?: boolean
  className?: string
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { hovered, setHovered, maskRef, handleMouseMove } = useCursorMask(svgRef)

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#0F4C4C" />
              <stop offset="25%" stopColor="#1C7C7E" />
              <stop offset="50%" stopColor="#2DD4BF" />
              <stop offset="75%" stopColor="#C7D3D3" />
              <stop offset="100%" stopColor="#0A2E30" />
            </>
          )}
        </linearGradient>

        <radialGradient id="revealMask" ref={maskRef} gradientUnits="userSpaceOnUse" r="20%" cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800 transition-opacity duration-300"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#0F4C4C] font-[helvetica] text-7xl font-bold dark:stroke-[#0F4C4C99] animate-stroke-draw"
      >
        {text}
      </text>

      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#textGradient)" strokeWidth="0.3" mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}


export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(15,76,76,0.3) 50%, rgba(45,212,191,0.12) 100%)",
      }}
    />
  )
}
