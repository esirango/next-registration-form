import React from "react";

import styles from "@/styles/form.module.css";
import Header from "../skeleton/Header";
import Footer from "../skeleton/Footer";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Link from "next/link";
import { useRouter } from "next/router";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/store/environmentVariables";

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

    const postData = (data: any) => {
        console.log("hi");
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

    const handleLoginSuccess = (response: any) => {
        console.log("Login Success:", response);
    };

    const handleLoginFailure = () => {
        console.error("Login Failed:");
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
                    <div
                        className={styles.buttons}
                        style={type === "login" ? { marginTop: "50px" } : {}}
                    >
                        <button>
                            {lang(`FORM_${type.toUpperCase()}_TITLE`)}
                        </button>
                        <Link
                            href={`/${
                                type === "register" ? "login" : "register"
                            }`}
                            locale={locale}
                        >
                            <button>
                                {lang(
                                    `FORM_CHANGE_WAY_IN_${type.toUpperCase()}_TITLE`
                                )}
                            </button>
                        </Link>
                    </div>
                </form>
                <div className={styles.line}>
                    <span>{lang("AUTH_FORM_OR_SPAN_TEXT")}</span>
                </div>
                <div className={styles.googleSection}>
                    <GoogleOAuthProvider clientId={String(GOOGLE_CLIENT_ID)}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Form;
