import type { AppProps } from "next/app";

import "@/styles/global/globals.css";
import "@/styles/global/fonts.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}
