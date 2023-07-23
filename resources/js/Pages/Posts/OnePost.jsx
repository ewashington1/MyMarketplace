import { Link, Head, useForm } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect, useState } from "react";
import SecondSecondaryButton from "@/components/SecondSecondaryButton";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import FollowButtonForPost from "@/components/FollowButtonForPost";


function buyBtn(auth, post) {
    if (post.price !== 0 && auth.user.id !== post.user.id) {
        return (
            <PrimaryButton type="submit">Buy for ${post.price}</PrimaryButton>
        );
    } else if (post.user.id === auth.user.id) {
        return (
            <SecondSecondaryButton className=" pointer-events-none">
                Owned at ${post.price}
            </SecondSecondaryButton>
        );
    }
}

export default function OnePost({ auth, postP }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        post_id: postP.id,
        buyer_id: auth.user.id,
        seller_id: postP.user_id,
    });

    //if (postP.user == null || postP.user.id == null) return;
    const pay = (e, value) => {
        e.preventDefault();
        setData({
            amount: value,
            post_id: postP.id,
            buyer_id: auth.user.id,
            seller_id: postP.user_id,
        });
    };

    const [liked, setLiked] = useState(postP.is_liked_by_auth_user);
    const [likeLoading, setLikeLoading] = useState(false);
    const [etcHovered, setEtcHovered] = useState(false);
    const [likeCount, setLikeCount] = useState(postP.like_count);
    const [isFollowing, setIsFollowing] = useState(postP.user.profile.is_followed_by_auth_user);
    const [followLoading, setFollowLoading] = useState(false);

    const follow = (user) => {
        setFollowLoading(true);

        const followPromise = axios.post(`/follow/${user.id}`);

        const timeout = new Promise(resolve => setTimeout(resolve, 2000));

        Promise.all([followPromise, timeout]).then(([response]) => {
            console.log(response);
            setIsFollowing(!isFollowing);
            setFollowLoading(false);
        }).catch((err) => console.log(err));
    };

    const [showModal, setShowModal] = useState(false);
    const DetailsModal = () => {
        return (
            <div className="flex fixed w-screen top-0 left-0 h-screen bg-opacity-60 bg-gray-300 items-center justify-around z-50">
                <div className="w-1/4 bg-white p-2 rounded-md items-center relative flex-col flex">
                    <button className="absolute right-1 top-1" onClick={() => setShowModal(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    {auth.user.id === postP.user.id && <Link className="block border-b-[1px] border-b-gray-300 mx-auto w-4/5 text-center" href={`/post/${postP.id}/edit`}>Edit Post</Link>}
                    <Link className="block" href={`/post/${postP.id}`}>Go to Post</Link>
                </div>
            </div>
        );
    }
    
    const toggleLikeBtn = () => {
        setLikeLoading(true);
        //promise 1
        const postRequest = axios.post('/likes', {
            post_id: postP.id,
        });
        //promise 2 (just waits 2 seconds before calling resolve function)
        const timeout = new Promise(resolve => setTimeout(resolve, 1000));
        //waiting until all promises are resolved
        Promise.all([postRequest, timeout]).then(([response]) => {
            if (response.data == true) {
                setLiked(true);
                setLikeCount(likeCount + 1);
            }
            else {
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
            setLikeLoading(false);
        });
        setLikeLoading(false);
    }

    useEffect(() => {
        if (data.amount !== "") {
            post(route("payment", data));
        }
    }, [data.amount]);

    return (
        <div className="col-span-5 col-start-3 h-full m-auto pt-1">
            {showModal && <DetailsModal setShowModal={setShowModal} postP={postP} />}
            <div className="max-h-full pt-1 pb-2 flex relative items-center">
                <Link href={`/profile/${postP.user.id}`} className="flex items-center">
                    <img
                        src={
                            postP.user.profile.pfp
                                ? `/storage/${postP.user.profile.pfp}`
                                : "/storage/profile/default.png"
                        }
                        alt="pfp"
                        className="inline max-h-full h-10 rounded-full"
                    /> 
                    <b className=" inline pl-2 text-2xl">
                        {postP.user.profile.username}{" "}
                    </b>{" "}
                </Link>
                <div className="mx-2 p-1 bg-gray-300 rounded-full"></div>
                <div className="text-xs">
                    {formatDistance(
                        new Date(Date.parse(postP.created_at)),
                        new Date(),
                        { addSuffix: true }
                    )}
                </div>
                
                {auth.user.id !== postP.user.id && ( 
                    <>
                        <div className="mx-2 p-1 bg-gray-300 rounded-full"></div>
                        <FollowButtonForPost
                            follows={isFollowing}
                            className={`${followLoading &&'followLoad'}`}
                            onClick={() => follow(postP.user)}
                            
                        >
                            {isFollowing ? "Following" : "Follow"}
                        </FollowButtonForPost>
                    </>
                )}
                
                <button onClick={() => setShowModal(true)} onMouseLeave={()=>setEtcHovered(false)} onMouseOver={()=>setEtcHovered(true)} className={`hover:bg-gray-700 absolute shadow-sm hover:shadow-md bg-gray-300  rounded-md p-2 right-4 flex`}>
                    <div className={`${etcHovered ? 'bg-gray-300' : 'bg-gray-700'} mx-[1px] p-[2px] rounded-full`}></div>
                    <div className={`${etcHovered ? 'bg-gray-300' : 'bg-gray-700'} mx-[1px] p-[2px] rounded-full`}></div>
                    <div className={`${etcHovered ? 'bg-gray-300' : 'bg-gray-700'} mx-[1px] p-[2px] rounded-full`}></div>
                </button>
            </div>
            <div className="flex relative">
                <img src={`/storage/${postP.image}`} alt="post" />
                
            </div>
            
            <div className=" max-h-full pt-2 flex items-center justify-between align-middle">
                <div className="flex align-middle">
                    <Link href={`/profile/${postP.user.id}`} className="font-bold inline px-2 text-[22px] text-center">
                        {postP.user.profile.username}
                    </Link>
                    <div className=" inline text-[22px] align-middle">{postP.caption}</div>
                </div>
                
                <div className="block text-xs align-top float-right">
                    {" "}
                    
                    <div className=" flex items-center">
                        <div>{likeCount !== 1 ? `${likeCount} likes` : `${likeCount} like`}</div>
                        <div className="mx-2 p-1 bg-gray-300 rounded-full"></div>

                        {/* add loading state animation */}
                        <button 
                            className="h-10 w-10 justify-center text-[27px] mr-2" 
                            onClick={() => toggleLikeBtn()}>
                                {liked ?
                                <FontAwesomeIcon className={`text-red-500 text-3xl ${likeLoading ? "like-animate" : "like-button"}`} icon={filledHeart} />
                                : <FontAwesomeIcon icon={unfilledHeart} className={`text-3xl ${likeLoading ? "like-animate" : "like-button"}`} />
                        }</button>
                        <form
                            onSubmit={(e) => pay(e, postP.price)}
                            encType="multipart/form-data"
                        >
                            <input
                                type="hidden"
                                name="amount"
                                value={postP.price || '0'}
                            />
                            {(postP.price >0 && postP.price !== null) && buyBtn(auth, postP)}
                        </form>
                    </div>
                    
                    
                </div>
                
            </div>
            <div className=" pt-3 border-b-2 border-gray-300"></div>
        </div>
        
    );
}
