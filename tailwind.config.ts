module.exports = {
    content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],

    plugins: [require("@tailwindcss/typography"), require("@headlessui/tailwindcss"), require("daisyui")],

    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: ["halloween", "emerald"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root" // The element that receives theme color CSS variables
    }
};
