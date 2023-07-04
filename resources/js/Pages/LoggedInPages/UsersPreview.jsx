import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

export default function UsersPreview({ auth, allProfiles }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            {/* default dashboard */}
            <Head title="Home" />
            <div className=" w-full align-center pb-2 pt-2">
                {" "}
                <h1 className=" text-4xl font-bold text-center text-gray-400">
                    Hmmmm... no posts to show here.
                </h1>
                <p className="pt-2 text-xl text-gray-800 font-medium text-center ">
                    Try following some users to get started.
                </p>
            </div>
            {allProfiles.map((profile, index) => (
                <div key={index} className=" block p-2 border-t-2 text-center">
                    <Link href={`/profile/${profile.user.id}`}>
                        <img
                            src={
                                profile.pfp
                                    ? `/storage/${profile.pfp}`
                                    : "/storage/profile/default.png"
                            }
                            alt="pfp"
                            className="inline max-h-full h-10 rounded-full"
                        />
                        <b className=" inline pl-2 text-3xl text-center align-middle">
                            {profile.username}{" "}
                        </b>{" "}
                        <b className="text-gray-500 inline pl-2 text-2xl text-center align-middle">
                            {profile.displayName}{" "}
                        </b>{" "}
                        <p className="text-gray-500 pl-2 text-l text-center align-middle block">
                            {profile.bio}{" "}
                        </p>{" "}
                    </Link>
                    <div className="grid w-2/5 pb-2 pt-2 m-auto grid-cols-3 gap-1">
                        {profile.user.posts.slice(0, 9).map((post, index2) => (
                            <Link href={`/post/${post.id}`} key={index2}>
                                <img
                                    src={`/storage/${post.image}`}
                                    alt="post"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </AuthenticatedLayout>
    );
}
