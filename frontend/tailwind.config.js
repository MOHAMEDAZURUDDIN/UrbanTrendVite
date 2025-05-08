/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
    },
    screens:{
      'xl':{'max':'1200px'},
      'lg':{'max':'991px'},
      'md':{'max':'767px'},
      'sm':{'max':'550px'},
      'xsm':{'max':'375px'},
    },
    container: {
      center:true
    }
  },
  plugins: [],
}