const colors = require("tailwindcss/colors");

const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts,md}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Epilogue', 'ui-sans-serif', 'system-ui'
        ]
      },
      colors: {
        ...colors,
        yellow: colors.yellow,
        pink: colors.pink
        // yellow: {
        //   50: "#eff6ff",
        //   100: "#dbeafe",
        //   // include more shades of yellow if needed
        //   600: "#ffd400",
        // },
        // pink: "#EC4899"
      },
    },
  },

  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};

module.exports = config;
