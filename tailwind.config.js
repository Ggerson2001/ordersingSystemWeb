module.exports = {

  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  purge: [
    "./src/**/*.svelte",
    "./src/**/*.svelte",
    "./src/**/*.html",
    "./src/**/*.js",
  ],
  // publicPath: process.env.NODE_ENV === 'production' ? '/snackion/' : '/',
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",

      'print': {'raw': 'print'},
      // => @media (min-width: 1536px) { ... }
    },  extend: {
      width: {
        '1070': '1070px',
      }
    }

  },
  variants: {
    extend: {},
  },
  plugins: [ require('flowbite/plugin')],
};
