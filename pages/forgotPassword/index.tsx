import React from "react";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";
import Form from "@/components/Form/Form";

function index() {
    const lang = langFactory(langData);

    return (
        <>
            <Form type="forgotPassword" />
        </>
    );
}

export default index;
