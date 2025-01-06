import classNames from "classnames";
import React from "react";

import styles from "@/styles/input.module.css";

import langFactory from "@/funcs/lang";

import langData from "@/data/lang.json";

function Input({ type, errors, register, setValue, trigger }: any) {
    const lang = langFactory(langData);

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
            type: "email",
            name: "email",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
    ];

    const inputTypes =
        type === "login"
            ? loginInputTypes
            : type === "register"
            ? registerInputTypes
            : [];

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
                        type={input?.type}
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
                        onChange={(e) => {
                            setValue(input?.name, e.target.value);
                            trigger(input?.name).then((r: any) => {});
                        }}
                    />
                    <label htmlFor={input.name}>
                        {lang(`AUTH_LOGIN_FORM_${input.name}`.toUpperCase())}
                    </label>
                    <small className={styles.fieldInfo}>
                        {errors[input.name] ? (
                            <p>{errors[input.name].message}</p>
                        ) : (
                            <p></p>
                        )}
                    </small>
                    <i className="material-icons">&#xe001;</i>
                </div>
            ))}
        </>
    );
}

export default Input;
