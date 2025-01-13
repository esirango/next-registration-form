import React from "react";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/store/environmentVariables";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";

import styles from "@/styles/googleLogin.module.css";

function GoogleLoginComponent() {
    const lang = langFactory(langData);

    const handleLoginSuccess = (response: any) => {
        console.log("Login Success:", response);
    };

    const handleLoginFailure = () => {
        console.error("Login Failed:");
    };
    return (
        <>
            <div className={styles.line}>
                <span>{lang("AUTH_FORM_OR_SPAN_TEXT")}</span>
            </div>
            <div className={styles.googleSection}>
                <GoogleOAuthProvider
                    clientId={String(
                        GOOGLE_CLIENT_ID
                            ? GOOGLE_CLIENT_ID
                            : "256591891219-sq0uk8tvpep66jprg0pqrjjfmr72u3nm.apps.googleusercontent.com"
                    )}
                >
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={handleLoginFailure}
                    />
                </GoogleOAuthProvider>
            </div>
        </>
    );
}

export default GoogleLoginComponent;
