import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import OnePost from "./OnePost";

export default function Show({ auth, post, user }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Post" />

            {/* <div className="grid grid-cols-9 w-8/12 m-auto justify-items-center items-center">
                <div className="col-span-5 col-start-3 m-auto pt-4">
                    <img src={`/storage/${post.image}`} alt="post" />
                    <b className=" inline text-2xl">{username} </b>{" "}
                    <p className=" inline text-xl">{post.caption}</p>
                    <p className=" block text-xs align-bottom float-right">
                        {formatDistance(
                            new Date(Date.parse(post.created_at)),
                            new Date(),
                            { addSuffix: true }
                        )}
                    </p>
                </div>
            </div> */}
            <div className="grid grid-cols-9 w-full m-auto justify-items-center items-center">
                {" "}
                <OnePost postP={post} auth={auth}></OnePost>
            </div>
        </AuthenticatedLayout>
    );
}
