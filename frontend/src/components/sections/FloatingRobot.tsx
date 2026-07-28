import { useTheme } from "../../hooks/useTheme"
import heroObjLight from "../../assets/hero/hero-object-light.webp"
import heroObjDark from "../../assets/hero/hero-object-dark.webp"

export function FloatingRobot() {
  const { isDark } = useTheme()

  return (
    <div
      className="fixed z-50 w-[180px] sm:w-[260px] lg:w-[380px]"
      style={{
        right: "2%",
        top: "10%",
      }}
      aria-hidden="true"
    >
      <img
        src={isDark ? heroObjDark : heroObjLight}
        alt=""
        className="w-full h-auto"
      />
    </div>
  )
}
