import React, {useRef, useState} from 'react'
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout"

const Explore = ({auth, initPosts, initPostCount}) => {
    
    const initDisplay = initPosts.map((post, index) => (
        <Link href={`/post/${post.id}`} key={index}>
            <img
                src={`/storage/${post.image}`}
                alt="post"
            />
        </Link>
    ));
    
    const curCount = useRef(initPostCount);
    const [posts, setPosts] = useState(initDisplay);

    const renderMore = () => {
        axios.get('/add3', {
            params : {curCount: curCount.current},
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            if (response.data != null){
                curCount.current = curCount.current + 3;

                const newPosts = response.data.map((post, index) => (
                    <Link href={`/post/${post.id}`} key={index+curCount.current}>
                        <img
                            src={`/storage/${post.image}`}
                            alt="post"
                        />
                    </Link>
                ));
                setPosts([...posts, ...newPosts ]);
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Explore"/>
            <div className="grid w-3/5 pb-2 pt-2 m-auto grid-cols-3 gap-1">
                {posts}
            </div>
            <button onClick={renderMore}>Load More...</button>
        </AuthenticatedLayout>
    )
}

export default Explore