/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        PoppinsMedium: ['Poppins-Medium', 'sans-serif'],
        PoppinsBold: ['Poppins-Bold', 'sans-serif'],
        PoppinsLight: ['Poppins-Light', 'sans-serif']
      },
      colors: {
        primaryColor: '#171323',
        secondaryColor: '#100d1a',
        customGreen: '#22c55e'
      }
    }
  },
  plugins: []
};
