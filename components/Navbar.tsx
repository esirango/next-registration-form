import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import styles from "@/styles/navbar.module.css";

function Navbar() {
    const router = useRouter();
    const { locales, locale, asPath, pathname, query } = router;

    return (
        <>
            <div className={styles.navbar}>
                <ul className={styles.switchLocale}>
                    {locales?.map((lng) => (
                        <li
                            key={lng}
                            className={lng === locale ? "active" : ""}
                        >
                            <Link
                                href={asPath}
                                locale={lng}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .querySelector("html")
                                        ?.setAttribute(
                                            "dir",
                                            lng === "fa" ? "rtl" : "ltr"
                                        );

                                    router.push({ pathname, query }, asPath, {
                                        locale: lng,
                                    });
                                }}
                            >
                                <img
                                    src={"/assets/img/lang/" + lng + ".svg"}
                                    alt={lng}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Navbar;
