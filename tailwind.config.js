/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0f4c81',
                    light: '#1b64aa',
                    dark: '#0a365c'
                },
                secondary: '#facc15'
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
