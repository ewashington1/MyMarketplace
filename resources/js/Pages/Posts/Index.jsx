import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import OnePost from "@/Pages/Posts/OnePost";

export default function Index({ auth, posts }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />
            <div className="grid grid-cols-9 w-8/12 m-auto justify-items-center items-center">
                {posts.map((post, index) => (
                    <OnePost postP={post} auth={auth} key={index}></OnePost>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
