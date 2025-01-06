import React from "react";

import styles from "@/styles/form.module.css";
import Header from "../skeleton/Header";
import Footer from "../skeleton/Footer";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";

type propType = {
    type: string;
};

function Form({ type }: propType) {
    const lang = langFactory(langData);

    const renderTitle = (type: string) => {
        switch (type) {
            case "login":
                return lang("FORM_LOGIN_TITLE");
            case "register":
                return lang("FORM_REGISTER_TITLE");

            default:
                "";
        }
    };
    return (
        <>
            <Header />
            <div className={styles.form}>
                <h2>{renderTitle(type)}</h2>
            </div>
            <Footer />
        </>
    );
}

export default Form;
