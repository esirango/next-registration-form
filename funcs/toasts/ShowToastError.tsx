import { Bounce, toast } from "react-toastify";

function ShowToastError(type: string, lang: any) {
    toast.error(
        lang("FORM_TOAST_ERROR_MSG", {
            args: [
                {
                    key: "FORM_TYPE",
                    value: `${lang(`FORM_${type.toUpperCase()}_TITLE`)}`,
                },
            ],
        }),
        {
            position: "bottom-center",
            autoClose: 5000,
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

export default ShowToastError;
