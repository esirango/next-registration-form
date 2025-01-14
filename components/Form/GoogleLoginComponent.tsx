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

    console.log(GOOGLE_CLIENT_ID);
    return (
        <>
            <div className={styles.googleSection}>
                <GoogleOAuthProvider clientId={String(GOOGLE_CLIENT_ID)}>
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
