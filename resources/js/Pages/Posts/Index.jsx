import React, { useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import OnePost from "@/Pages/Posts/OnePost";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "@/components/LoadingCircle";

//BROKEN
export default function Index({
    auth,
    initPosts,
    initPostCount,
    totalPostCount,
}) {

    const curCount = useRef(initPostCount);
    const [posts, setPosts] = useState(initPosts);
    const [hasMore, setHasMore] = useState(initPostCount < totalPostCount);

    const renderMore = () => {
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsHome", {
                    params: { curCount: curCount.current },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data != null) {
                        curCount.current = curCount.current + 3;
                        setPosts([...posts, ...response.data]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setHasMore(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />
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
                        No more posts to load.
                    </div>
                }
            >
                <div className="grid grid-cols-9 w-8/12 m-auto justify-items-center items-center">
                    {posts.map((post, index) => (
                        <OnePost postP={post} auth={auth} key={index}></OnePost>
                    ))}
                </div>
            </InfiniteScroll>
        </AuthenticatedLayout>
    );
}
