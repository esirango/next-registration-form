// language

import HTMLReactParser from "html-react-parser";
import { containsHTML, isUndefined } from "./utils";
import { NODE_ENV } from "@/store/environmentVariables";
import { useRouter } from "next/router";

type argType = {
    key: string;
    value: string;
};

type optionsType = {
    args?: argType[];
};

export default function langFactory(langSource: any) {
    const { locale }: any = useRouter();

    if (!langSource) return (key: langKeys, options?: optionsType) => "";
    return (key: langKeys, options?: optionsType) => {
        key = key.toUpperCase();
        if (!key) return "";
        const args = options?.args;

        if (args) {
            return findKeysAndReplaceWithValues(langSource, key, args);
        } else {
            const langKey = langSource[key];
            if (isUndefined(langKey)) {
                if (NODE_ENV !== "production") {
                    return key;
                } else {
                    return "";
                }
            } else {
                const lang = langKey[locale];
                if (isUndefined(lang)) {
                    return "";
                }
                return lang;
            }
        }
    };
}

const findKeysAndReplaceWithValues = (
    langSource: any,
    key: string,
    args: argType[]
) => {
    if (!langSource) return;

    let string = langSource[key];
    // showing the keys and values we need if it's not provided by source(api)
    if (isUndefined(string)) {
        let str = "";
        if (NODE_ENV !== "production") {
            str += "(";
            args.forEach((arg, index) => {
                str += `@[${arg.key}]`;
                if (index + 1 !== args.length) {
                    str += `, `;
                }
            });
            str += ")";
        }
        return key + str;
    }

    // replacing keys with values
    args.forEach((arg) => {
        string = string.replace(`@[${arg.key}]`, arg.value);
    });

    // removing @[] from undefined characters in case of api typo
    function extractKeyName(string: string) {
        return string.replace(/[@\[\]]/g, "");
    }
    const undefinedArgs = string.match(/@\[([A-Za-z_]+)\]/g);
    undefinedArgs?.forEach((arg: any) => {
        string = string.replace(arg, extractKeyName(arg));
    });

    if (containsHTML(string)) {
        return HTMLReactParser(string);
    } else {
        return string;
    }
};

// TODO sync with api every once a while...
type langKeys =
    | "SITE_NAVBAR_LANG_FA"
    | "SITE_NAVBAR_LANG_EN"
    // TODO remove when completed
    | string;
