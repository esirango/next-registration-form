import React from "react";

import styles from "@/styles/githubLogin.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

import langFactory from "@/funcs/lang";
import langData from "@/data/lang.json";

function GithubLoginComponent() {
    const { data: session } = useSession();

    const lang = langFactory(langData);

    return (
        <>
            <div className={styles.githubSection}>
                {session ? (
                    <div>
                        <p>Welcome, {session?.user?.name}</p>
                        <button onClick={() => signOut()}>Sign out</button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn("github")}
                        className={styles.signinButton}
                    >
                        {lang("FORM_SIGNIN_WITH_GITHUB_BUTTON_TITLE")}
                    </button>
                )}
            </div>
        </>
    );
}

export default GithubLoginComponent;
