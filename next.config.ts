import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    i18n: {
        locales: ["en", "fa"],
        defaultLocale: "en",
        localeDetection: false,
    },
    trailingSlash: false,
    reactStrictMode: true,

    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
