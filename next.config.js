/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ["avatars.githubusercontent.com", "avatar.vercel.sh"]
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

module.exports = nextConfig;
