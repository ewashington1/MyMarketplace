import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { useForm } from "@inertiajs/react";
import SecondSecondaryButton from "@/components/SecondSecondaryButton";
import { useState } from "react";
import GridIndex from "@/components/GridIndex";
import UserIndex from "./UserIndex";

export default function Search({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: ""
    });

    const [posts, setPosts] = useState(null);
    const [totalPostCount, setTotalPostCount] = useState(null);
    const [hasMorePosts, setHasMorePosts] = useState(null);
    const[curPostCount, setCurPostCount] = useState(null);

    const [profiles, setProfiles] = useState(null);
    const [totalProfileCount, setTotalProfileCount] = useState(null);
    const [hasMoreProfiles, setHasMoreProfiles] = useState(null);
    const [curProfileCount, setCurProfileCount] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        axios.post(route("searchCompletion", {
            searchTerm: data.searchTerm,
        })).then((response) => {
            setPosts(response.data.initPosts);
            setTotalPostCount(response.data.totalPostCount);
            setHasMorePosts(response.data.initPosts.length < response.data.totalPostCount);
            setCurPostCount(response.data.initPosts.length);

            setProfiles(response.data.initProfiles);
            setTotalProfileCount(response.data.totalProfileCount);
            setHasMoreProfiles(response.data.initProfiles.length < response.data.totalProfileCount);
            setCurProfileCount(response.data.initProfiles.length);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    const renderMoreProfiles = () => {
        if (profiles.length < totalProfileCount) {
            axios
                .get("/api/addProfilesSearch", {
                    params: { curCount: curCount.current, searchTerm: data.searchTerm },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data != null) {
                        setCurProfileCount(curProfileCount + 9);
                        setProfiles([...posts, ...response.data]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setHasMoreProfiles(false);
        }
    };

    const renderMorePosts = () => {
        if (posts.length < totalPostCount) {
            axios
                .get("/addPostsSearch", {
                    params: { curCount: curPostCount, searchTerm: data.searchTerm },
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data != null) {
                        setCurPostCount(curPostCount + 3);
                        setPosts([...posts, ...response.data]);
                        
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setHasMorePosts(false);
        }
    };

    const [filter, setFilter] = useState('profiles');

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search" />

            <div className=" grid grid-cols-8 gap-2 w-4/5 m-auto pt-2">
                <div className=" inline-block col-span-8 font-bold  text-xl pb-4">
                    {/* actual search form */}
                    <div>
                        <form
                            onSubmit={submit}
                            className="pt-2 inline-block"
                            encType="multipart/form-data"
                        >
                            <div className="inline-block">
                                <TextInput
                                    id="searchTerm"
                                    name="searchTerm"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    placeholder="Search"
                                    onChange={(e) =>
                                        setData("searchTerm", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.searchTerm}
                                    className="mt-2"
                                />
                            </div>
                            <div className="inline-block">
                                <SecondSecondaryButton
                                    className="ml-4 inline-block"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Search
                                </SecondSecondaryButton>
                            </div>
                        </form>
                    </div>
                    <div>
                        <SecondSecondaryButton className={`${filter === 'profiles' && 'text-white bg-gray-300'} mt-2 mx-1`} onClick={()=> setFilter('profiles')}>
                            Users
                        </SecondSecondaryButton>
                        <SecondSecondaryButton className={`${filter === 'posts' && 'text-white bg-gray-300'} mt-2 mx-1`} onClick={() => setFilter('posts')}>
                            Posts (Caption)
                        </SecondSecondaryButton>
                    </div>
                    {(filter === 'profiles' && profiles !== null ) && 
                        <UserIndex renderMore={renderMoreProfiles} hasMore={hasMoreProfiles} profiles={profiles} />
                    }
                    {(filter === 'posts' && posts !== null) &&
                        <GridIndex renderMore={renderMorePosts} hasMore={hasMorePosts} posts={posts} />
                    }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
