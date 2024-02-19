/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./public3/index.html",
            "./public3/allOrders.html",
            "./public3/newOrderForm.html",
            "./public3/example.html", 
            "./public3/main.js" 
],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9', 
      'bermuda': '#78dcca',
      'cherryRed': '#990011',
      'offWhite': '#FCF6F5',
      'babyBlue': '#8AAAE5',
      'blue': '#2F3C7E',
      'pastelPink': '#FBEAEB',
      'darkCharcoal': '#101820',
      'brightYellow': '#FEE715',
      'lightRed': '#F96167',
      'darkBlue': '#00246B', 
      'lightBlue': '#CADCFC',
      'skyBlue': '#89ABE3',
      'bubblegumPink': '#EA738D',
      'midnightBlue': '#1E2761',
      'royalBlue': '#408EC6',
      'burgundyRed': '#7A2048',
      'terracottaRed': '#B85042',
      'lightBeige': '#E7E8D1', 
      'mutedTeal': '#A7BEAE'

      
    },
  },
  plugins: [require('flowbite/plugin'),
            require("daisyui")
          ],
}

