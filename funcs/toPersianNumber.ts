export const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const toPersianNumber = (
    n: string | number | undefined,
    doNotConvertFloat = false,
): any => {
    if (typeof n === "undefined") {
        return "";
    }
    n = n.toString();
    // TODO in exchange input if we switch between sale and buy at float number there is a bug...
    if (doNotConvertFloat && n.includes(".")) {
        return n;
    }
    return n.replace(/\d/g, (x: any) => farsiDigits[x]);
};
