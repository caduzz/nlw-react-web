/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.tsx',
      './index.html'
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif']
        },
        extend: {
            backgroundImage: {
                galaxy: "url('/background-galaxy.png')",
                'nlw-gradient': "linear-gradient(90deg, rgba(149,114,252,1) 0%, rgba(67,231,173,1) 43%, rgba(225,213,93,1) 100%)",
                'game-gradient': " linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);"
            },
        },
    },
    plugins: [],
}
  