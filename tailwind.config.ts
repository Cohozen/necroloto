import { nextui } from "@nextui-org/react";

module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            fontSize: {
                "2xs": ["10px", "12px"]
            }
        }
    },

    darkMode: "class",

    plugins: [
        //require("daisyui"),
        nextui({
            themes: {
                light: {
                    colors: {
                        background: "#f4f7fa", // Blanc légèrement bleuté pour un fond clair et apaisant
                        foreground: "#333", // Noir doux pour un texte principal lisible
                        divider: "#e0e7eb", // Gris léger pour des séparations discrètes
                        focus: "#4fa3f7", // Bleu vif pour les états de focus

                        content1: "#ffffff", // Fond blanc pour des composants primaires (comme des cards)
                        content2: "#f3f4f6", // Fond légèrement plus gris pour des composants secondaires
                        content3: "#e5e7eb", // Fond gris très léger pour des composants tertiaires
                        content4: "#d1d5db", // Fond gris encore plus marqué pour des composants désactivés ou subtils

                        default: {
                            DEFAULT: "##d1d5db",
                            "50": "#f9fafb",
                            "100": "#f3f4f6",
                            "200": "#e5e7eb",
                            "300": "#d1d5db",
                            "400": "#9ca3af",
                            "500": "#6b7280",
                            "600": "#4b5563",
                            "700": "#374151",
                            "800": "#1f2937",
                            "900": "#111827"
                        },
                        primary: {
                            DEFAULT: "#3b82f6",
                            "50": "#eff6ff",
                            "100": "#dbeafe",
                            "200": "#bfdbfe",
                            "300": "#93c5fd",
                            "400": "#60a5fa",
                            "500": "#3b82f6",
                            "600": "#2563eb",
                            "700": "#1d4ed8",
                            "800": "#1e40af",
                            "900": "#1e3a8a"
                        },
                        secondary: {
                            DEFAULT: "#627d98",
                            "50": "#f0f4f8",
                            "100": "#d9e2ec",
                            "200": "#bcccdc",
                            "300": "#9fb3c8",
                            "400": "#829ab1",
                            "500": "#627d98",
                            "600": "#486581",
                            "700": "#334e68",
                            "800": "#243b53",
                            "900": "#102a43"
                        },
                        success: {
                            DEFAULT: "#10b981",
                            "50": "#ecfdf5",
                            "100": "#d1fae5",
                            "200": "#a7f3d0",
                            "300": "#6ee7b7",
                            "400": "#34d399",
                            "500": "#10b981",
                            "600": "#059669",
                            "700": "#047857",
                            "800": "#065f46",
                            "900": "#064e3b"
                        },
                        warning: {
                            DEFAULT: "#f59e0b",
                            "50": "#fffbeb",
                            "100": "#fef3c7",
                            "200": "#fde68a",
                            "300": "#fcd34d",
                            "400": "#fbbf24",
                            "500": "#f59e0b",
                            "600": "#d97706",
                            "700": "#b45309",
                            "800": "#92400e",
                            "900": "#78350f"
                        },
                        danger: {
                            DEFAULT: "#ef4444",
                            "50": "#fef2f2",
                            "100": "#fee2e2",
                            "200": "#fecaca",
                            "300": "#fca5a5",
                            "400": "#f87171",
                            "500": "#ef4444",
                            "600": "#dc2626",
                            "700": "#b91c1c",
                            "800": "#991b1b",
                            "900": "#7f1d1d"
                        }
                    }
                },
                dark: {
                    colors: {
                        background: "#1f2937", // Fond sombre
                        foreground: "#e5e7eb", // Texte principal en gris clair
                        divider: "#374151", // Séparateur discret
                        focus: "#93c5fd", // Bleu vif pour le focus

                        content1: "#2d3748", // Fond sombre pour des composants primaires
                        content2: "#374151", // Fond un peu plus clair pour des composants secondaires
                        content3: "#4b5563", // Niveau de gris intermédiaire pour des composants tertiaires
                        content4: "#6b7280", // Couleur encore plus claire pour des composants très subtils ou désactivés

                        default: {
                            DEFAULT: "#374151",
                            "50": "#111827",
                            "100": "#1f2937",
                            "200": "#374151",
                            "300": "#4b5563",
                            "400": "#6b7280",
                            "500": "#9ca3af",
                            "600": "#d1d5db",
                            "700": "#e5e7eb",
                            "800": "#f3f4f6",
                            "900": "#f9fafb"
                        },
                        primary: {
                            DEFAULT: "#3b82f6",
                            "50": "#1e3a8a",
                            "100": "#1e40af",
                            "200": "#1d4ed8",
                            "300": "#2563eb",
                            "400": "#3b82f6",
                            "500": "#60a5fa",
                            "600": "#93c5fd",
                            "700": "#bfdbfe",
                            "800": "#dbeafe",
                            "900": "#eff6ff"
                        },
                        secondary: {
                            DEFAULT: "#627d98",
                            "50": "#102a43",
                            "100": "#243b53",
                            "200": "#334e68",
                            "300": "#486581",
                            "400": "#627d98",
                            "500": "#829ab1",
                            "600": "#9fb3c8",
                            "700": "#bcccdc",
                            "800": "#d9e2ec",
                            "900": "#f0f4f8"
                        },
                        success: {
                            DEFAULT: "#10b981",
                            "50": "#064e3b",
                            "100": "#065f46",
                            "200": "#047857",
                            "300": "#059669",
                            "400": "#10b981",
                            "500": "#34d399",
                            "600": "#6ee7b7",
                            "700": "#a7f3d0",
                            "800": "#d1fae5",
                            "900": "#ecfdf5"
                        },
                        warning: {
                            DEFAULT: "#f59e0b",
                            "50": "#78350f",
                            "100": "#92400e",
                            "200": "#b45309",
                            "300": "#d97706",
                            "400": "#f59e0b",
                            "500": "#fbbf24",
                            "600": "#fcd34d",
                            "700": "#fde68a",
                            "800": "#fef3c7",
                            "900": "#fffbeb"
                        },
                        danger: {
                            DEFAULT: "#ef4444",
                            "50": "#7f1d1d",
                            "100": "#991b1b",
                            "200": "#b91c1c",
                            "300": "#dc2626",
                            "400": "#ef4444",
                            "500": "#f87171",
                            "600": "#fca5a5",
                            "700": "#fecaca",
                            "800": "#fee2e2",
                            "900": "#fef2f2"
                        }
                    }
                }
            }
        })
    ],

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
