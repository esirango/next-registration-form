import Link from "next/link";
import React from "react";

import styles from "@/styles/404.module.css";
import { toPersianNumber } from "@/funcs/toPersianNumber";
import { useRouter } from "next/router";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";

function notFound() {
    const { locale } = useRouter();

    const lang = langFactory(langData);

    return (
        <div className={styles.notFoundContainer}>
            <h1>{locale === "fa" ? toPersianNumber("404") : "404"}</h1>
            <Link href={"/register"}>
                <p>{lang("NOT_FOUND_PAGE_LINK_TO_HOME")}</p>
            </Link>
        </div>
    );
}

export default notFound;
