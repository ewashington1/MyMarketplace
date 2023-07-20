import React, { useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";
import OnePost from "@/Pages/Posts/OnePost";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingCircle from "@/components/LoadingCircle";
import GridIndex from "@/components/GridIndex";

//BROKEN
export default function SearchIndex({
    auth,
    initPosts,
    initPostCount,
    totalPostCount,
    searchTerm
}) {

    const curCount = useRef(initPostCount);
    const [posts, setPosts] = useState(initPosts);
    const [hasMore, setHasMore] = useState(true);

    const renderMore = () => {
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsSearch", {
                    params: { curCount: curCount.current, searchTerm: searchTerm },
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
            <Head title="Search" />
            <GridIndex renderMore={renderMore} hasMore={hasMore} posts={posts} />
        </AuthenticatedLayout>
    );
}
