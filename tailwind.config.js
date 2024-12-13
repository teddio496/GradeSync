/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/*.html", "./build/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sometype: ['SomeType', 'monospace'], 
      },
      textColor :{
        skin: {
          'main': 'var(--color-text-base)',
          'sub': 'var(--color-text-sub)'
        }
      },
      backgroundColor: {
        skin: {
          'back':'var(--color-background)',
          'fore': 'var(--color-foreground)',
          'highlight':'var(--color-highlight)'
        }
      },
      borderColor: {
        skin: {
          'main': 'var(--color-text-base)',
          'sub': 'var(--color-text-sub)'
        }
      },
      accentColor: {
        skin: {
          'back': 'var(--color-background)',
        }
      }
    },
  },
  plugins: [],
};
