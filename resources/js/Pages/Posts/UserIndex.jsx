import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "@/components/LoadingCircle";
import { Link } from "@inertiajs/react";

const UserIndex = ({ renderMore, hasMore, profiles }) => {

    return (
            <div className="w-3/5 pb-2 pt-2 m-auto">
                <InfiniteScroll
                    dataLength={profiles.length}
                    next={renderMore}
                    hasMore={hasMore}
                    loader={
                        <div className=" text-lg text-center h-12">
                            Loading more posts...&nbsp;
                            <LoadingCircle />
                        </div>
                    }
                    endMessage={
                        <div className="text-lg text-center h-12">
                            No more profiles.
                        </div>
                    }
                >
                    <div className="grid grid-cols-3 gap-1">
                        {profiles.map((profile, index) => (
                            <div key={index} className=" col-span-3 block p-2 border-t-2 text-center">
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
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
    );
};

export default UserIndex;
