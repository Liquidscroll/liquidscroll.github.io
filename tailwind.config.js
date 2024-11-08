/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
    /*content: [ "./src/**+/*.{html,md,njk,11ty.js,js}", "./_site/**+/*.html"],*/
    content: ['./src/**/*.{njk,md}'],
    theme: {
        colors: {
            "dark_gray": "#48483e",
            "dark_red": "#dc2566",
            "dark_green": "#8fc029",
            "dark_yellow": "#d4c96e",
            "dark_blue": "#55bcce",
            "dark_purple": "#9358fe",
            "dark_cyan": "#56b7a5",
            "dark_white": "#acada1",
            "light_gray": "#76715e",
            "light_red": "#fa2772",
            "light_green": "#a7e22e",
            "light_yellow": "#e7db75",
            "light_blue": "#66d9ee",
            "light_purple": "#ae82ff",
            "light_cyan": "#66efd5",
            "light_white": "#cfd0c2",
            "foreground": "#f1ebeb",
            "background": "#272822"
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Hack Font', 'monospace'],
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require('daisyui'),
    ],
    daisyui: {
        themes: [
            {
                monokai: {
                    /* light green */
                    "primary": "#a7e22e",
                    /* light red */
                    "secondary": "#fa2772",
                    /* dark blue */
                    "accent": "#55bcce",
                    /* dark gray */
                    "neutral": "#48483e",
                    /* light cyan */
                    "link-info": "#66efd5",
                    "base-100": "#272822",
                    "base-content": "f1ebeb",
                    "foreground": "#f1ebeb",
                    "background": "#272822"
                }
            },
        ],
        darkTheme: "monokai",
    },
}

