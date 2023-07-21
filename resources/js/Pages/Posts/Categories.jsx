import React, { useRef, useState, useEffect } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import SecondSecondaryButton from '@/components/SecondSecondaryButton';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import {Link} from '@inertiajs/react';
import GridIndex from '@/components/GridIndex';

const Categories = ({auth, categories}) => {
    const [checkedCategories, setCheckedCategories] = useState({});

    useEffect(() => {
        const initialCheckState = categories.reduce((acc, cat) => ({...acc, [cat.category]: false}), {});
        setCheckedCategories(initialCheckState);
    }, [categories]);

    const addCat = (cat) => {
        setCheckedCategories(prev => ({...prev, [cat]: !prev[cat]}));
    }

    const [posts, setPosts] = useState(null);
    const curCount = useRef();
    const selectedCategories = useRef();
    const [hasMore, setHasMore] = useState(true);
    const [totalPostCount, setTotalPostCount] = useState();

    const renderMore = () => {
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsCategories", {
                    params: { curCount: curCount.current, categories: Array.from(selectedCategories.current) },
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

    const filter = () => {
        const cats = Object.keys(checkedCategories).filter(key => checkedCategories[key]);
        if (cats.length === 0) {
            setPosts('You must select a category.')
            return;
        }
        setCheckedCategories(prev => {
            const resetCheckState = Object.keys(prev).reduce((acc, key) => ({...acc, [key]: false}), {});
            return resetCheckState;
        });
        selectedCategories.current = cats;
        axios.get('/filter', {
            params: {
                categories: cats
            }
        }).then((response) => {
            console.log(response);
            if (response.data) {
                setHasMore(response.data.initPostCount < response.data.totalPostCount);
                setPosts(response.data.posts);
                setTotalPostCount(response.data.totalPostCount);
            }
        }).catch((err) => console.log(err.response.data));
    }

    if (!posts) {
        return renderContent('Select categories:');
    } else if (Array.isArray(posts)) {
        return renderContent(`Selected categories: ${selectedCategories.current.join(', ')}`);
    } else if (typeof posts === "string") {
        return renderContent('Select categories:');
    }
    
    function renderContent(headerText) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Categories"/>
                <div className='ml-2 mt-1'>
                    {headerText}
                    {categories.map((cat, index) => (
                        <div key={index} className=" inline-flex items-center w-1/5 mt-1 pl-4 ml-2 border border-gray-200 rounded">
                            <input 
                                checked={checkedCategories[cat.category] || false} 
                                onChange={() => addCat(cat.category)} 
                                id={`input${index}`} 
                                type="checkbox" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor={`input${index}`} className="w-full py-4 ml-2 text-sm font-medium text-gray-900">{cat.category}</label>
                        </div>
                    ))}
                    <PrimaryButton className='ml-2' onClick={filter}>Filter</PrimaryButton>
                    {Array.isArray(posts) &&
                        <div className="flex justify-center items-center mt-2">
                            <GridIndex auth={auth} renderMore={renderMore} hasMore={hasMore} posts={posts}/>
                        </div>
                    }
                    {typeof posts === "string" &&
                        <div className="flex justify-center items-center mt-2">
                            <div className="w-3/5">
                                {posts}
                            </div>
                        </div>
                    }
                </div>
            </AuthenticatedLayout>
        )
    }
}

export default Categories
