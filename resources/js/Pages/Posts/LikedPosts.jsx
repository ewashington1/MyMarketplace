import React, { useRef, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "@/components/LoadingCircle";

const LikedPosts = ({auth, initPosts, initPostCount, totalPostCount }) => {
    console.log(initPosts);

    const initDisplay = initPosts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}>
            <img src={`/storage/${post.image}`} alt="post" />
        </Link>
    ));

    // explain use ref
    const curCount = useRef(initPostCount);
    const [posts, setPosts] = useState(initDisplay);
    const [hasMore, setHasMore] = useState(initPostCount < totalPostCount);

    const renderMore = () => {
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsLiked", {
                    params: { curCount: curCount.current },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data != null) {
                        curCount.current = curCount.current + 3;
                        const newPosts = response.data.map((post) => (
                            <Link href={`/post/${post.id}`} key={post.id}>
                                <img
                                    src={`/storage/${post.image}`}
                                    alt="post"
                                />
                            </Link>
                        ));
                        setPosts([...posts, ...newPosts]);
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
            <Head title="Liked Posts" />
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
                                {post}
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </AuthenticatedLayout>
    );
}

export default LikedPosts