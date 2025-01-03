import langFactory from "@/funcs/lang";
import React from "react";

import langData from "@/data/lang.json";

import styles from "@/styles/footer.module.css";

function Footer() {
    const lang = langFactory(langData);
    return (
        <>
            <div className={styles.footerBox}>
                <p>{lang("FOOTER_TEXT")}</p>
            </div>
        </>
    );
}

export default Footer;
