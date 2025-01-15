import React, { useState } from "react";

import styles from "@/styles/form.module.css";
import Header from "../skeleton/Header";
import Footer from "../skeleton/Footer";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Link from "next/link";
import { useRouter } from "next/router";
import OtherWayLogin from "./OtherWayLogin";

import ShowToastError from "@/funcs/toasts/ShowToastError";
import ShowSuccessError from "@/funcs/toasts/ShowToastSuccess";

type propType = {
    type: string;
};

interface IFormInput {
    name: string;
    email: string;
    password: string;
    privacyPolicy: boolean;
}

function Form({ type }: propType) {
    const { locale } = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const lang = langFactory(langData);

    const ifWasNotForgotPasswordType = type === "login" || type === "register";

    const renderTitle = (type: string) => {
        switch (type) {
            case "login":
                return lang("FORM_LOGIN_TITLE");
            case "register":
                return lang("FORM_REGISTER_TITLE");
            case "forgotPassword":
                return lang("FORM_FORGOT_PASSWORD_TITLE");
            default:
                "";
        }
    };

    const postData = async (data: any) => {
        const isValid = await trigger();
        const hasErrors = !isValid;

        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setLoading(false);

        if (hasErrors) {
            ShowToastError(type, lang);
        } else {
            ShowSuccessError(type, lang);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setValue,
        getValues,
    } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        postData(data);
    };

    return (
        <>
            <Header />
            <div className={styles.form}>
                <h2>{renderTitle(type)}</h2>
                <form
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <Input
                        type={type}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                        getValues={getValues}
                    />
                    {type === "login" && (
                        <Link
                            href={"/forgotPassword"}
                            locale={locale}
                            className={styles.forgotPasswordLink}
                        >
                            {lang(
                                "AUTH_FORM_FORGOT_PASSWORD_LINK_FOR_LOGIN_MODE"
                            )}
                        </Link>
                    )}
                    <div
                        className={styles.buttons}
                        style={type === "login" ? { marginTop: "50px" } : {}}
                    >
                        <button
                            disabled={loading}
                            aria-busy={loading}
                            onClick={(data) => {
                                trigger();
                                postData(data);
                            }}
                        >
                            {lang(`FORM_${type.toUpperCase()}_TITLE`)}
                        </button>
                        {ifWasNotForgotPasswordType && (
                            <Link
                                href={`/${
                                    type === "register" ? "login" : "register"
                                }`}
                                locale={locale}
                            >
                                <button disabled={loading}>
                                    {lang(
                                        `FORM_CHANGE_WAY_IN_${type.toUpperCase()}_TITLE`
                                    )}
                                </button>
                            </Link>
                        )}
                    </div>
                </form>
                {ifWasNotForgotPasswordType && <OtherWayLogin />}
            </div>
            <Footer />
        </>
    );
}

export default Form;
