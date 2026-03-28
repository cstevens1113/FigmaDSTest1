import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },

      colors: {
        background:  'var(--background)',
        foreground:  'var(--foreground)',
        card:        { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        primary:     { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary:   { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted:       { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent:      { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },
        border:      'var(--border)',
        input:       'var(--input)',
        ring:        'var(--ring)',

        zinc: {
          50:  '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        indigo: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },

      borderRadius: {
        none: '0px',
        sm:   '4px',
        md:   '6px',
        DEFAULT: '6px',
        lg:   '8px',
        xl:   '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },

      boxShadow: {
        sm:   '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        base: '0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        md:   '0px 4px 8px -2px rgba(0, 0, 0, 0.08)',
        lg:   '0px 8px 16px -4px rgba(0, 0, 0, 0.10)',
        xl:   '0px 16px 24px -5px rgba(0, 0, 0, 0.12)',
        '2xl': '0px 24px 48px -8px rgba(0, 0, 0, 0.20)',
      },

      fontSize: {
        // Caption
        'caption':   ['12px', { lineHeight: '16px', fontWeight: '400' }],
        // Labels
        'label-sm':  ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'label-md':  ['14px', { lineHeight: '20px', fontWeight: '500' }],
        // Body
        'body-sm':   ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-md':   ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg':   ['18px', { lineHeight: '28px', fontWeight: '400' }],
        // Headings
        'heading-md': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'heading-xl': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        // Display
        'display-md': ['30px', { lineHeight: '38px', fontWeight: '700' }],
        'display-lg': ['36px', { lineHeight: '44px', fontWeight: '700' }],
        'display-xl': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'display-2xl': ['60px', { lineHeight: '72px', fontWeight: '700' }],
      },

      spacing: {
        '0.5':  '2px',
        '1':    '4px',
        '1.5':  '6px',
        '2':    '8px',
        '2.5':  '10px',
        '3':    '12px',
        '4':    '16px',
        '5':    '20px',
        '6':    '24px',
        '8':    '32px',
        '10':   '40px',
        '12':   '48px',
        '16':   '64px',
        '20':   '80px',
        '24':   '96px',
      },
    },
  },
  plugins: [],
}

export default config
