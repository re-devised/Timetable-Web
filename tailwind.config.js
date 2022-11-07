module.exports = {
  purge: {
	enabled: false,
	//content: [
	//'./components/**/*.{vue,js}',
    	//'./layouts/**/*.vue',
    	//'./pages/**/*.vue',
	//]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          // 100: '#606EAF',
          100: '#A4ABC9',
          200: '#454778',
          300: '#303154'
        },
        secondary: {
          100: '#E2E2D5',
          200: '#888883'
        },
        accent1: {
          100: '#DDDDDD',
          200: '#C9C9C9'
        },
        accent2: '#66CBFF',
        warning: '#ff7b00',
        background: '#EAEAEA',
      },
      fontFamily: {
        body: ['Nunito']
      }
    },
  },
  variants: {
    // extend: {},
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}
