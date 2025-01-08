import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

import styles from "@/styles/navbar.module.css";
import classNames from "classnames";
import langFactory from "@/funcs/lang";

import langData from "@/data/lang.json";

function Navbar() {
    const router = useRouter();
    const { locales, locale, asPath, pathname, query } = router;

    const lang = langFactory(langData);

    const [hamburger, setHamburger] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                menuRef.current.style.transform = "translateX(0)";
                setTimeout(() => {
                    setHamburger(false);
                }, 300);
            }
        }
        if (hamburger) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [hamburger]);

    return (
        <>
            <div className={styles.navbar}>
                <div
                    className={classNames(styles.hamburger)}
                    onClick={() => {
                        setHamburger(!hamburger);
                    }}
                >
                    <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-iguwhy"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="MenuIcon"
                        fill="white"
                    >
                        <path d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
                    </svg>
                </div>

                <div className={styles.links}>
                    <Link href={"/register"} locale={locale}>
                        {lang("FORM_REGISTER_TITLE")}
                    </Link>
                    <Link href={"/login"} locale={locale}>
                        {lang("FORM_LOGIN_TITLE")}
                    </Link>
                </div>
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
            {hamburger && (
                <>
                    <div className={styles.backdrop} />
                    <div ref={menuRef}>
                        <div
                            className={styles.menu}
                            style={
                                locale === "fa"
                                    ? {
                                          right: 0,
                                          transform: `translateX(100%)`,
                                      }
                                    : {
                                          left: 0,
                                          transform: `translateX(-100%)`,
                                      }
                            }
                        >
                            <div className={styles.menuLinks}>
                                <Link
                                    href={"/register"}
                                    locale={locale}
                                    onClick={(e) => {
                                        if (pathname === "/register") {
                                            setHamburger(false);
                                        }
                                    }}
                                >
                                    {lang("FORM_REGISTER_TITLE")}
                                </Link>
                                <Link
                                    href={"/login"}
                                    locale={locale}
                                    onClick={(e) => {
                                        if (pathname === "/login") {
                                            setHamburger(false);
                                        }
                                    }}
                                >
                                    {lang("FORM_LOGIN_TITLE")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;
