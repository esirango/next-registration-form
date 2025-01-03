export function containsHTML(str: string) {
    const regex = /<[a-z][\s\S]*>/i;
    return regex.test(str);
}

export const isUndefined = (variable: any) => {
    return typeof variable === "undefined";
};
