import type { AppProps } from "next/app";

import Footer from "@/components/skeleton/Footer";
import Header from "@/components/skeleton/Header";

import "@/styles/global/globals.css";
import "@/styles/global/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}
