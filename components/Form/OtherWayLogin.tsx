import React from "react";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";

import styles from "@/styles/otherWayLogin.module.css";

import GoogleLoginComponent from "./GoogleLoginComponent";
import GithubLoginComponent from "./GithubLoginComponent";
import { SessionProvider } from "next-auth/react";

function OtherWayLogin() {
    const lang = langFactory(langData);

    return (
        <>
            <div className={styles.line}>
                <span>{lang("AUTH_FORM_OR_SPAN_TEXT")}</span>
            </div>
            <GoogleLoginComponent />
            <SessionProvider>
                <GithubLoginComponent />
            </SessionProvider>
        </>
    );
}

export default OtherWayLogin;
