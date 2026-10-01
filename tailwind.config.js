/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF4F0',
          100: '#FFE7E0',
          200: '#FFD0C2',
          300: '#FFAA94',
          400: '#FF7E5F',
          500: '#FF5C35', // Primary Figma accent coral
          600: '#E64620',
          700: '#C23514',
          800: '#9E2C14',
          900: '#7E2613',
        },
        warm: {
          bg: '#FFFDF7', // Figma warm page background
          card: '#FFFFFF',
          cardMuted: '#FAF7EE',
          cardSubtle: '#F6F2E5',
          border: '#EFEBE0',
          borderSubtle: '#E8E3D4',
        },
        ink: {
          title: '#18181B',
          body: '#3F3F46',
          muted: '#71717A',
          subtle: '#A1A1AA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(24, 24, 27, 0.04), 0 2px 6px -1px rgba(24, 24, 27, 0.02)',
        'card-hover': '0 12px 30px -4px rgba(255, 92, 53, 0.08), 0 4px 12px -2px rgba(24, 24, 27, 0.05)',
        'floating': '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
