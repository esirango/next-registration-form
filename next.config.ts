import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
};

module.exports = {
    i18n: {
        locales: ["en", "fa"],
        defaultLocale: "en",
    },
    localeDetection: false,
    trailingSlash: false,
};

export default nextConfig;
