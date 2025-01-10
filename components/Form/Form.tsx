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
            </div>
            <Footer />
        </>
    );
}

export default Form;
