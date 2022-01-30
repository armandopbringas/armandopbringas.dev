module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'x-sm': '425px'
      },
      fontFamily: {
        mPlusCode: ['M PLUS 1 Code', 'serif']
      },
      colors: {
        'pink-link': '#ff63c3',
        'dark-gray': '#202023',
        'lihgt-gray': '#525252',
        'light-blue': '#88ccca',
        'white-text': '#EEEEEE',
      },
      boxShadow: {
        '3xl': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      }
    },
  },
  plugins: [],
}
