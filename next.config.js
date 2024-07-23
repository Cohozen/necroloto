const withPWA = require("next-pwa")({
    dest: "public",
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
    disable: process.env.NODE_ENV === "development" // Disable PWA in development mode
});

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enable React strict mode for improved error handling
    swcMinify: true, // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development" // Remove console.log in production
    },
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.corentinlegal.fr/js/script.js"
            },
            {
                source: "/api/event",
                destination: "https://plausible.corentinlegal.fr/api/event"
            }
        ];
    }
};

module.exports = withPWA(nextConfig);
