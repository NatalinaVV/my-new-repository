/** @type {import('tailwindcss').Config} */

const { join } = require('path');
module.exports = {
  content: [
    join('app', 'components', '**', '*.hbs'),
    join('app', 'templates', '**', '*.hbs'),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none' /* IE и Edge */,
          'scrollbar-width': 'none' /* Firefox */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Chrome, Safari и Opera */,
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
