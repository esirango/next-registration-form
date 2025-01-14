import React from "react";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import styles from "@/styles/googleLogin.module.css";
import { GOOGLE_CLIENT_ID } from "@/store/environmentVariables";

function GoogleLoginComponent() {
    const handleLoginSuccess = (response: any) => {
        console.log("Login Success:", response);
    };

    const handleLoginFailure = () => {
        console.error("Login Failed:");
    };

    return (
        <>
            <div className={styles.googleSection}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
