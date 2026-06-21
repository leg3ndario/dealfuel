/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050508',
        surface: '#0d0d16',
        'surface-2': '#131320',
        blue: {
          DEFAULT: '#0070f3',
          bright: '#00aaff',
          glow: '#0050bb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,112,243,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0,170,255,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
