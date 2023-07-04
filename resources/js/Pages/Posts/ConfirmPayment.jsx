import { Link, Head, useForm } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";
import { useState } from "react"; // import useState hook to store the redirect URL

export default function ConfirmPayment() {
    const [redirectUrl, setRedirectUrl] = useState(""); // initialize the redirect URL state with an empty string

    useEffect(() => {
        // redirect to the URL when the component mounts
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }, [redirectUrl]); // run this effect whenever the redirect URL changes

    // function to handle the payment confirmation
    function handleConfirmPayment() {
        // make the API call to confirm payment and get the redirect URL
        // ...

        // set the redirect URL in the state
        setRedirectUrl("https://example.com/payment/success"); // replace with the actual redirect URL
    }

    return (
        <div className="col-span-5 col-start-3 h-full m-auto pt-4">
            <PrimaryButton onClick={handleConfirmPayment}>
                Confirm Payment
            </PrimaryButton>
        </div>
    );
}
