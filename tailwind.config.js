module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mPlusCode: ['M PLUS 1 Code', 'sans-serif'],
      },
      colors: {
        'pink-link': '#ff63c3',
        'dark-gray': '#202023',
        'lihgt-gray': '#525252',
        'light-blue': '#88ccca',
        'white-text': '#EEEEEE',
      },
    },
  },
  plugins: [],
}
