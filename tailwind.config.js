/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#0b0f19",
        cardbg: "rgba(17, 24, 39, 0.75)",
        cockpitPanel: "#111827",
        cyanGlow: "#00f0ff",
        blueAccent: "#3b82f6",
        warnGold: "#f59e0b",
        dangerRed: "#ef4444",
        safeGreen: "#10b981"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.35)',
        'cyan-sm': '0 0 10px rgba(0, 240, 255, 0.25)',
        'red-glow': '0 0 20px rgba(239, 68, 68, 0.4)',
        'green-glow': '0 0 20px rgba(16, 185, 129, 0.35)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
