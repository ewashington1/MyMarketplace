import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function Show({ auth, categories }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="No Results Found" />
            <div className="grid grid-cols-9 w-8/12 m-auto justify-items-center items-center">
                <div className="col-span-5 col-start-3 m-auto pt-4">
                    No Posts Found with Categories: {categories}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
