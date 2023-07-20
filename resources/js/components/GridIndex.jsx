import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "@/components/LoadingCircle";
import { Link } from "@inertiajs/react";

const GridIndex = ({ renderMore, hasMore, posts }) => {

    return (
            <div className="w-3/5 pb-2 pt-2 m-auto">
                <InfiniteScroll
                    dataLength={posts.length}
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
                            No more posts.
                        </div>
                    }
                >
                    <div className="grid grid-cols-3 gap-1">
                        {posts.map((post, index) => (
                            <div key={index} className="col-span-1">
                                <Link href={`/post/${post.id}`} key={post.id}>
                                    <img src={`/storage/${post.image}`} alt="post" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
    );
};

export default GridIndex;
