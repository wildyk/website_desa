import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hijau: {
          DEFAULT: '#1D6A3A',
          muda: '#2E8B57',
          terang: '#4CAF77',
          bg: '#F0FAF4',
        },
        kuning: {
          DEFAULT: '#E8B84B',
          bg: '#FDF8EC',
        },
        coklat: '#5C3D1E',
        desa: {
          putih: '#FAFDF8',
          abu: '#6B7A6E',
          'abu-muda': '#E8EDE9',
          teks: '#1A2E1F',
          'teks-sekunder': '#4A5E4F',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        desa: '14px',
        'desa-lg': '22px',
      },
      boxShadow: {
        desa: '0 4px 24px rgba(29,106,58,0.10)',
        'desa-lg': '0 8px 28px rgba(29,106,58,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
