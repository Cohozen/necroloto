module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    ],

    plugins: [require("daisyui")],

    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: [
            {
                "necroloto-light": {
                    primary: "#4b5563", // Un gris moyen pour un aspect neutre et sérieux
                    secondary: "#ef4444", // Un rouge pour ajouter une touche de suspense et de danger
                    accent: "#f97316", // Un orange pour un contraste vif et attirer l'attention
                    neutral: "#d1d5db", // Un gris clair pour une base neutre
                    "base-100": "#ffffff", // Blanc pour une base de fond claire
                    info: "#3b82f6", // Un bleu pour des informations et des messages
                    success: "#10b981", // Un vert pour des succès et des notifications positives
                    warning: "#f59e0b", // Un jaune pour des avertissements et des alertes
                    error: "#dc2626" // Un rouge foncé pour des erreurs et des échecs
                }
            },
            {
                "necroloto-dark": {
                    primary: "#6b7280", // Un gris moyen pour un aspect neutre et sérieux
                    secondary: "#ef4444", // Un rouge pour ajouter une touche de suspense et de danger
                    accent: "#f97316", // Un orange pour un contraste vif et attirer l'attention
                    neutral: "#111827", // Un noir profond pour une base sombre
                    "base-100": "#1f2937", // Un gris foncé pour une base de fond
                    info: "#3b82f6", // Un bleu pour des informations et des messages
                    success: "#10b981", // Un vert pour des succès et des notifications positives
                    warning: "#f59e0b", // Un jaune pour des avertissements et des alertes
                    error: "#dc2626" // Un rouge foncé pour des erreurs et des échecs
                }
            }
        ],
        darkTheme: "necroloto-dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root" // The element that receives theme color CSS variables
    }
};
