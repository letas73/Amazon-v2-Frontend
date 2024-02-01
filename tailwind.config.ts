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
        'primary': '#ff9900',
        'background': '#161d25',
        'dark': '#41464f',
        'light': '#fcfcfc',
        'secondary': '#b7b7b9',
        'darkblue':'#222f3e'
      }
    },
  },
  plugins: [],
}
export default config
