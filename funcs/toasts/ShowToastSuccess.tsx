import { Bounce, toast } from "react-toastify";

function ShowSuccessError(type: string, lang: any) {
    toast.success(
        lang("FORM_TOAST_SUCCESS_MSG", {
            args: [
                {
                    key: "FORM_TYPE",
                    value: `${lang(`FORM_${type.toUpperCase()}_TITLE`)}`,
                },
            ],
        }),
        {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        }
    );
}

export default ShowSuccessError;
