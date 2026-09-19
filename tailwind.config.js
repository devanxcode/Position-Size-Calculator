/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#FAFAFA',
          dark: '#0A0A0A',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#121212',
          subtle: {
            light: '#F4F4F5',
            dark: '#1A1A1A',
          }
        },
        ink: {
          primary: {
            light: '#111111',
            dark: '#EDEDED',
          },
          secondary: {
            light: '#6B7280',
            dark: '#A1A1AA',
          },
          muted: {
            light: '#9CA3AF',
            dark: '#71717A',
          }
        },
        hairline: {
          light: 'rgba(0, 0, 0, 0.08)',
          dark: 'rgba(255, 255, 255, 0.08)',
        },
        accent: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          subtle: 'rgba(59, 130, 246, 0.12)',
        },
        trading: {
          long: '#10B981',
          short: '#EF4444',
          warning: '#F59E0B',
          caution: '#EC4899',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'island': '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
        'tactile': '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
      }
    },
  },
  plugins: [],
}
