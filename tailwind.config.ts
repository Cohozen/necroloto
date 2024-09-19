module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
    ],

    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                "necroloto-light": {
                    primary: "#5a7184", // Bleu-gris pour une bonne lisibilité
                    secondary: "#849cae", // Bleu clair-gris pour un contraste modéré
                    accent: "#f28c52", // Orange doux et terreux pour un contraste agréable
                    neutral: "#d1d8de", // Gris doux et neutre pour une base discrète
                    "base-100": "#f4f7fa", // Blanc légèrement bleuté pour un fond lisible
                    info: "#4fa3f7", // Bleu vif pour les informations
                    success: "#34d399", // Vert plus saturé pour les succès
                    warning: "#facc15", // Jaune doux mais bien visible pour les avertissements
                    error: "#f87171" // Rouge pastel mais plus saturé pour les erreurs
                }
            },
            {
                "necroloto-dark": {
                    primary: "#4b5563", // Gris anthracite doux pour une ambiance reposante
                    secondary: "#6b7280", // Gris moyen pour plus de contraste sans être trop sombre
                    accent: "#eab308", // Jaune doux et légèrement doré pour accentuer
                    neutral: "#374151", // Gris foncé apaisant pour une base calme
                    "base-100": "#1e293b", // Bleu nuit pour un fond relaxant et sombre
                    info: "#93c5fd", // Bleu doux pour les informations
                    success: "#4ade80", // Vert pastel pour les succès
                    warning: "#fde047", // Jaune pâle pour les avertissements
                    error: "#f87171" // Rouge doux pour les erreurs
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
