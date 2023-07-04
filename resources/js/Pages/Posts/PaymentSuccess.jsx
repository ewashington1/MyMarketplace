import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import OnePost from "@/Pages/Posts/OnePost";

export default function PaymentSuccess({ auth, pId }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Payment Success" />
            <div className="grid grid-cols-9  h-full w-8/12 m-auto justify-items-center items-center">
                <h1 className=" col-span-9 text-6xl mt-64">
                    Payment successful! Your transaction id is: {pId}
                </h1>
            </div>
        </AuthenticatedLayout>
    );
}
