import Form from "@/components/Form/Form";
import React from "react";

import langData from "@/data/lang.json";
import langFactory from "@/funcs/lang";

function index() {
    const lang = langFactory(langData);

    return (
        <>
            <Form type="login" />
        </>
    );
}

export default index;
