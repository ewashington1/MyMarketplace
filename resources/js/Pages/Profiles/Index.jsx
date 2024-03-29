import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import PrimaryButton from "@/components/PrimaryButton";
import FollowButton from "@/components/FollowButton";
import axios from "axios";
import React, { useState, Fragment } from "react";

function showPostImages({ user }) {
    const posts = user.posts;

    return (
        <div className="grid  gap-2 grid-cols-3 m-auto w-3/6 pt-10">
            {posts.map((post) => (
                <div className=" col-span-1" key={post.id}>
                    <Link href={`/post/${post.id}`}>
                        <img src={`/storage/${post.image}`} alt="post" />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default function Profile({ auth, user, follows, followers, following }) {
    const [isFollowing, setIsFollowing] = useState(follows);
    const [followersDisplay, setFollowers] = useState(followers);

    const follow = (user) => {
        setFollowLoading(true);

        const followPromise = axios.post(`/follow/${user.id}`);
        const timeout = new Promise((resolve) => setTimeout(resolve, 2000));

        Promise.all([followPromise, timeout])
            .then(([response]) => {
                setIsFollowing(!isFollowing);
                if (!isFollowing) {
                    setFollowers(followersDisplay + 1);
                } else {
                    setFollowers(followersDisplay - 1);
                }
                setFollowLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const [followLoading, setFollowLoading] = useState(false);
    return (
        <AuthenticatedLayout user={auth.user}>
            {/* default dashboard */}
            <Head title="Home" />
            <div className="grid grid-cols-7 m-auto w-3/6 pt-10">
                <div className="col-span-1">
                    <img
                        src={
                            user.profile.pfp
                                ? `/storage/${user.profile.pfp}`
                                : "/storage/profile/default.png"
                        }
                        className="row-span-1 object-cover rounded-full overflow-hidden"
                        alt="PFP"
                    />
                </div>
                <div className="col-span-6 pl-10">
                    <div className=" max-h-fit flex relative">
                        <h1 className="text-4xl inline align-middle pr-4">
                            @{user.username}
                        </h1>
                        {auth.user.id === user.id && (
                            <Link href={`/profile`} className=" ml-4 inline">
                                <PrimaryButton>Edit Profile</PrimaryButton>
                            </Link>
                        )}
                        {auth.user.id !== user.id && (
                            <FollowButton
                                follows={isFollowing}
                                className={`${followLoading && "followLoad"}`}
                                onClick={() => follow(user)}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </FollowButton>
                        )}
                    </div>

                    <div className="flex [&>*]:pt-3">
                        <div className="flex pr-3">
                            <strong>{user.posts.length}&nbsp;</strong> posts
                        </div>
                        <div className="flex pr-3">
                            <strong>{followersDisplay}&nbsp;</strong> followers
                        </div>
                        <div className="flex pr-3">
                            <strong>{following}&nbsp;</strong> following
                        </div>
                    </div>
                    <div className="pt-3 font-bold">
                        {user.profile.displayName}
                    </div>
                    <div className="pt-2">{user.profile.bio}</div>
                    <div className="pt-2 text-blue-800 font-bold">
                        <Link href="/">{user.profile.url}</Link>
                    </div>
                </div>
            </div>
            {showPostImages({ user })}

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
