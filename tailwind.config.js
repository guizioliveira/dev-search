/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    screens: {
      xxs: '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1000px',
    },
    extend: {
      fontFamily: {
        sans: 'Montserrat, sans-serif',
        roboto: 'Roboto, sans-serif',
      },
      colors: {
        apricot: '#F4A27E',
        'apricot-peach': '#F9C29D',
        'colonial-white': '#FFE6AB',
        charade: '#0D0D0E',
        'outer-space': '#1F282C',
        'oslo-gray': '#90969A',
        iron: '#DADFE2',
        gallery: '#EAEAEA',
        lighter: '#FAFAFA',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
