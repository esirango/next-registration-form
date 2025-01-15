import { useRouter } from "next/router";
import React from "react";
import { Bounce, ToastContainer } from "react-toastify";

function ToastContainerComponent() {
    const { locale } = useRouter();

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={locale === "fa"}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </>
    );
}

export default ToastContainerComponent;
