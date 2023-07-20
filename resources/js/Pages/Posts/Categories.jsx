import React, { useRef, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import SecondSecondaryButton from '@/components/SecondSecondaryButton';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import {Link} from '@inertiajs/react';
import GridIndex from '@/components/GridIndex';

//possibly use state management library like redux or MobX
const Categories = ({auth, categories}) => {
    //hashset to keep track of which ones checked
    let set = new Set();

    const addCat = (cat) => {
        if (set.has(cat)) {
           set.delete(cat); 
        }
        else {
            set.add(cat);
        }
        //change styling too
    }

    //state for posts
    const [posts, setPosts] = useState(null);
    const curCount = useRef();
    const selectedCategories = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [totalPostCount, setTotalPostCount] = useState();


    const renderMore = () => {
        
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsCategories", {
                    params: { curCount: curCount.current, categories: selectedCategories },
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

    //handle null return value (no results)
    //handle on backend or frontend to require user to fill out at least one category
    //currently gets first 9
    const filter = () => {
        const cats = Array.from(set);
        if (cats.length == 0) {
            setPosts('You must select a category.')
            return;
        }
        set.clear();
        selectedCategories.current = cats.join(', ');
        axios.get('/filter', {
            params: {
                categories: cats
            }
        }).then((response) => {
            console.log(response);
            if (response.data) {
                console.log(response.data);
                setPosts(response.data.posts);
                setTotalPostCount(response.data.totalPostCount);
                console.log(response.data.totalPostCount)
            }
        }).catch((err) => console.log(err.response.data));
    }


    if (!posts) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Categories"/>
                <div className='ml-2 mt-1'>
                    Select categories:
                    {categories.map((cat, index) => (
                        <div key={index} className=" inline-flex items-center w-1/5 mt-1 pl-4 ml-2 border border-gray-200 rounded">
                            <input onChange={() => addCat(cat.category)} id={`input${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                            <label htmlFor={`input${index}`} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{cat.category}</label>
                        </div>
                    ))}
                    <PrimaryButton className='ml-2' onClick={filter}>Filter</PrimaryButton>
                </div>
            </AuthenticatedLayout>
            
        )
    }
    else if (Array.isArray(posts)) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Categories"/>
                <div className='ml-2 mt-1'>
                    Selected categories: {selectedCategories.current}
                    {categories.map((cat, index) => (
                        <div key={index} className=" inline-flex items-center w-1/5 mt-1 pl-4 ml-2 border border-gray-200 rounded">
                            <input onChange={() => addCat(cat.category)} id={`input${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                            <label htmlFor={`input${index}`} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{cat.category}</label>
                        </div>
                    ))}
                    <PrimaryButton className='ml-2' onClick={filter}>Filter</PrimaryButton>
                    <div className="flex justify-center items-center mt-2">
                        <GridIndex auth={auth} renderMore={renderMore} hasMore={hasMore} posts={posts}/>
                    </div>
                    
                </div>
            </AuthenticatedLayout>
            
        )
    }
    else if (typeof posts === "string") {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Categories"/>
                <div className='ml-2 mt-1'>
                    Select categories:
                    {categories.map((cat, index) => (
                        <div key={index} className=" inline-flex items-center w-1/5 mt-1 pl-4 ml-2 border border-gray-200 rounded">
                            <input onChange={() => addCat(cat.category)} id={`input${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                            <label htmlFor={`input${index}`} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{cat.category}</label>
                        </div>
                    ))}
                    <PrimaryButton className='ml-2' onClick={filter}>Filter</PrimaryButton>

                    <div className="flex justify-center items-center mt-2">
                        <div className="w-3/5">
                            {posts} {selectedCategories.current}
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
    
}

export default Categories