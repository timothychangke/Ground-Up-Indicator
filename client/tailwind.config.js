/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{html,js}',
        './components/**/*.{html,js}',
    ],
    theme: {
        extend: {
            colors: {
                'custom-darkGreen': '#344E41',
                'custom-green': '#588157',
                'custom-emerald': '#57CC99',
                'custom-lightGreen': '#80ED99',
                'custom-teaGreen': '#C7F9CC',
            },
        },
    },
    plugins: [],
};
