import React, { useRef, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = ({ auth, initPosts, initPostCount, totalPostCount }) => {
    const initDisplay = initPosts.map((post, index) => (
        <Link href={`/post/${post.id}`} key={index}>
            <img src={`/storage/${post.image}`} alt="post" />
        </Link>
    ));

    // explain use ref
    const curCount = useRef(initPostCount);
    const [posts, setPosts] = useState(initDisplay);
    const [hasMore, setHasMore] = useState(true);

    const renderMore = () => {
        if (posts.length < totalPostCount) {
            setTimeout(() => {
                axios
                    .get("/add3", {
                        params: { curCount: curCount.current },
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        if (response.data != null) {
                            curCount.current = curCount.current + 3;

                            const newPosts = response.data.map(
                                (post, index) => (
                                    <Link
                                        href={`/post/${post.id}`}
                                        key={index + curCount.current}
                                    >
                                        <img
                                            src={`/storage/${post.image}`}
                                            alt="post"
                                        />
                                    </Link>
                                )
                            );
                            setPosts([...posts, ...newPosts]);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 500);
        } else {
            setHasMore(false);
        }
    };

    // <Head title="Explore" />
    // <div className="grid w-3/5 pb-2 pt-2 m-auto grid-cols-3 gap-1">
    //     {posts}
    // </div>
    // <button onClick={renderMore}>Load More...</button>

    // how to get unique key?
    // this can be implemeted into home page aswell, I will do later hella tired
    // could not figure out how to fix the css u did sorry :/
    return (
        <AuthenticatedLayout user={auth.user}>
            <InfiniteScroll
                dataLength={posts.length}
                next={renderMore}
                hasMore={hasMore}
                // css?
                loader={<p>loading...</p>}
            >
                {posts.map((post, index) => {
                    return (
                        <div
                            key={post.id}
                            className="grid w-3/5 pb-2 pt-2 m-auto grid-cols-3 gap-1"
                        >
                            {post}
                        </div>
                    );
                })}
            </InfiniteScroll>
        </AuthenticatedLayout>
    );
};

export default Explore;