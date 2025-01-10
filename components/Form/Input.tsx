import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import styles from "@/styles/input.module.css";

import langFactory from "@/funcs/lang";

import langData from "@/data/lang.json";

import parse from "html-react-parser";
import { useRouter } from "next/router";

function Input({ type, errors, register, setValue, trigger, getValues }: any) {
    const { pathname, route, locale } = useRouter();

    const lang = langFactory(langData);

    const refPassword = useRef<any>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const loginInputTypes = [
        {
            id: 1,
            type: "email",
            name: "email",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        {
            id: 2,
            type: "password",
            name: "password",
            maxLength: 32,
            minLength: 8,
        },
    ];

    const registerInputTypes = [
        {
            id: 1,
            type: "text",
            name: "name",
            maxLength: 20,
            minLength: 3,
        },
        {
            id: 2,
            type: "email",
            name: "email",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        {
            id: 3,
            type: "password",
            name: "password",
            maxLength: 32,
            minLength: 8,
        },
        { id: 4, type: "checkbox", name: "privacyPolicy" },
    ];

    const inputTypes =
        type === "login"
            ? loginInputTypes
            : type === "register"
            ? registerInputTypes
            : [];

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (locale) {
            inputTypes?.forEach(
                (input: any) => getValues(input.name) && trigger(input.name)
            );
        }
    }, [locale]);

    return (
        <>
            {inputTypes?.map((input: any) => (
                <div
                    className={classNames(
                        styles.formLabel,
                        errors[input?.name] ? styles.hasError : ""
                    )}
                    dir="ltr"
                >
                    <input
                        type={
                            input.type === "password"
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : input?.type
                        }
                        placeholder=" "
                        {...register(input?.name, {
                            required: lang(
                                `AUTH_ERROR_MSG_REQUIRED_${input.name}`.toUpperCase()
                            ),
                            pattern: {
                                value: input.pattern,
                                message: lang(
                                    `AUTH_ERROR_MSG_PATTERN_${input.name}`.toUpperCase()
                                ),
                            },
                            maxLength: {
                                value: input.maxLength,
                                message: lang(
                                    `AUTH_ERROR_MSG_MAX_${input.name}`.toUpperCase()
                                ),
                            },
                            minLength: {
                                value: input.minLength,
                                message: lang(
                                    `AUTH_ERROR_MSG_MIN_${input.name}`.toUpperCase()
                                ),
                            },
                        })}
                        ref={refPassword}
                        onChange={(e) => {
                            if (e.target.name !== "privacyPolicy") {
                                setValue(input?.name, e.target.value);
                            } else {
                                setValue(
                                    input?.name,
                                    getValues(e.target.name) === true
                                        ? false
                                        : true
                                );
                            }

                            trigger(input?.name).then((r: any) => {});
                        }}
                    />
                    <label htmlFor={input.name}>
                        {lang(`AUTH_LOGIN_FORM_${input.name}`.toUpperCase())}
                    </label>
                    <small className={styles.errorMsgBox}>
                        {errors[input.name] ? (
                            <p>{errors[input.name].message}</p>
                        ) : (
                            <p></p>
                        )}
                    </small>
                    {input.type === "password" && (
                        <div
                            className={classNames(
                                "material-icons",
                                styles.iconBtn
                            )}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword
                                ? parse("&#xe8f5;")
                                : parse("&#xe417;")}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default Input;
