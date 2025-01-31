module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        sans: ['Cairo', 'sans-serif'], 
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
        },
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow'
      },
    },
  },
  plugins: [],
};

