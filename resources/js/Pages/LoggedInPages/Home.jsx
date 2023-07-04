import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            {/* default dashboard */}
            <Head title="Home" />
            <div className="grid grid-cols-7 m-auto w-3/6 pt-10">
                <div className="col-span-1">
                    <img
                        src="/storage/photos/IMG_8952.jpeg"
                        className="row-span-1 object-cover rounded-full overflow-hidden"
                        alt="PFP"
                    />
                </div>
                <div className="col-span-6 pl-10">
                    <div>
                        <h1 className="text-4xl">@{auth.user.username}</h1>
                    </div>
                    <div className="flex [&>*]:pt-3">
                        <div className="flex pr-3">
                            <strong>NUM&nbsp;</strong> posts
                        </div>
                        <div className="flex pr-3">
                            <strong>NUM&nbsp;</strong> followers
                        </div>
                        <div className="flex pr-3">
                            <strong>NUM&nbsp;</strong> following
                        </div>
                    </div>
                    <div className="pt-3 font-bold">
                        {auth.user.displayName}
                    </div>
                    <div className="pt-2">{auth.user.bio}</div>
                    <div className="pt-2 text-blue-800 font-bold">
                        <Link href="/">{auth.user.url}</Link>
                    </div>
                </div>
            </div>
            <div className="grid  gap-2 grid-cols-3 m-auto w-3/6 pt-10">
                <div className=" col-span-1">
                    <img src="/storage/photos/IMG_8952.jpeg" alt="post1" />
                </div>
                <div className="col-span-1">
                    <img src="/storage/photos/IMG_8952.jpeg" alt="post2" />
                </div>
                <div className="col-span-1">
                    <img src="/storage/photos/IMG_8952.jpeg" alt="post3" />
                </div>
            </div>

            {/* <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Fuck you!</div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
