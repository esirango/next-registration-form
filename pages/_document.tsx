import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export async function getServerSideProps(context: any) {
    return {
        locale: context.locale,
    };
}

export default function Document({ locale }: any) {
    return (
        <>
            <Html
                dir={locale === "fa" ? "rtl" : "ltr"}
                lang={locale}
                data-theme="light"
            >
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        </>
    );
}
