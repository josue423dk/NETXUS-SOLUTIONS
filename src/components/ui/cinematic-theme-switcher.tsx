import { Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function CinematicThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; delay: number }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark');

  useEffect(() => { setMounted(true) }, []);

  const handleToggle = () => {
    const newParticles = Array.from({ length: 3 }, (_, i) => ({ id: i, delay: i * 100 }));
    setParticles(newParticles);
    setIsAnimating(true);
    setTheme(isDark ? 'light' : 'dark');
    setTimeout(() => { setIsAnimating(false); setParticles([]) }, 1000);
  };

  if (!mounted) {
    return (
      <div className="relative inline-block">
        <div className="relative flex h-9 w-[58px] items-center rounded-full bg-neutral-300" />
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        ref={toggleRef}
        onClick={handleToggle}
        className="relative flex h-9 w-[58px] items-center rounded-full p-[5px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/50 active:scale-98"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at top left, #1e293b 0%, #0f172a 40%, #020617 100%)'
            : 'radial-gradient(ellipse at top left, #ffffff 0%, #f1f5f9 40%, #cbd5e1 100%)',
          boxShadow: isDark
            ? 'inset 3px 3px 6px rgba(0,0,0,0.9), inset -3px -3px 6px rgba(71,85,105,0.4), 0 4px 12px rgba(0,0,0,0.4)'
            : 'inset 3px 3px 6px rgba(148,163,184,0.5), inset -3px -3px 6px rgba(255,255,255,1), 0 4px 12px rgba(0,0,0,0.08)',
          border: isDark ? '1px solid rgba(51,65,85,0.6)' : '1px solid rgba(203,213,225,0.6)',
        }}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        role="switch"
        aria-checked={isDark}
      >
        <div className="absolute inset-0 flex items-center justify-between px-[10px]">
          <Sun size={12} className={isDark ? 'text-yellow-100' : 'text-amber-600'} />
          <Moon size={12} className={isDark ? 'text-yellow-100' : 'text-slate-700'} />
        </div>

        <div
          className="relative z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            transform: `translateX(${isDark ? 24 : 0}px)`,
            background: isDark
              ? 'linear-gradient(145deg, #64748b 0%, #475569 50%, #334155 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%)',
            boxShadow: isDark
              ? 'inset 1px 1px 2px rgba(100,116,139,0.4), inset -1px -1px 2px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)'
              : 'inset 1px 1px 2px rgba(203,213,225,0.3), inset -1px -1px 2px rgba(255,255,255,1), 0 4px 12px rgba(0,0,0,0.18)',
            border: isDark ? '1px solid rgba(148,163,184,0.3)' : '1px solid rgba(255,255,255,0.9)',
          }}
        >
          {isAnimating && particles.map((p) => (
            <div key={p.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="absolute rounded-full animate-particle-burst"
                style={{
                  width: '10px',
                  height: '10px',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(147,197,253,0.5) 0%, rgba(147,197,253,0) 70%)'
                    : 'radial-gradient(circle, rgba(251,191,36,0.7) 0%, rgba(251,191,36,0) 70%)',
                  animationDelay: `${p.delay}ms`,
                  animationDuration: isDark ? '500ms' : '700ms',
                }}
              />
            </div>
          ))}

          <div className="relative z-10">
            {isDark ? <Moon size={12} className="text-yellow-200" /> : <Sun size={12} className="text-amber-500" />}
          </div>
        </div>
      </button>
    </div>
  );
}
