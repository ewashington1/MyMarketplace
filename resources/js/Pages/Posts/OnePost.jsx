import { Link, Head, useForm } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect, useState } from "react";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as unfilledHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons'

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
    console.log(postP);
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
            }
            else {
                setLiked(false);
            }
            setLikeLoading(false);
        });
    }
    
    

    useEffect(() => {
        if (data.amount !== "") {
            post(route("payment", data));
        }
    }, [data.amount]);

    return (
        <div className="col-span-5 col-start-3 h-full m-auto pt-4">
            <div className="relative">
                <img src={`/storage/${postP.image}`} alt="post" />
                {/* add loading state animation */}
                <button 
                    className="absolute h-14 w-14 justify-center right-0 bottom-0 rounded-tl-lg text-[27px]" 
                    onClick={() => toggleLikeBtn()} 
                    style={{ backgroundColor: 'rgba(241, 245, 249, 0.5)' }}>
                        {liked ?
                        <FontAwesomeIcon className={`px-3 py-2 text-red-500 text-3xl ${likeLoading ? "like-animate" : "like-button"}`} icon={filledHeart} />
                        : <FontAwesomeIcon icon={unfilledHeart} className={`px-3 py-2 text-3xl ${likeLoading ? "like-animate" : "like-button"}`} />
                }</button>
            </div>
            
            <div className=" max-h-full pt-3 pb-3">
                <Link href={`/profile/${postP.user.id}`}>
                    <img
                        src={
                            postP.user.profile.pfp
                                ? `/storage/${postP.user.profile.pfp}`
                                : "/storage/profile/default.png"
                        }
                        alt="pfp"
                        className="inline max-h-full h-10 rounded-full"
                    /> 
                    <b className=" inline pl-2 text-2xl text-center align-middle">
                        {postP.user.profile.username}{" "}
                    </b>{" "}
                </Link>
                <p className=" inline text-xl align-middle">{postP.caption}</p>
                <div className="block text-xs align-top float-right">
                    {" "}
                    <p className=" inline text-xs align-top float-right pb-1">
                        {formatDistance(
                            new Date(Date.parse(postP.created_at)),
                            new Date(),
                            { addSuffix: true }
                        )}
                    </p>
                    <div className="block">
                        {" "}
                        <form
                            onSubmit={(e) => pay(e, postP.price)}
                            encType="multipart/form-data"
                        >
                            <input
                                type="hidden"
                                name="amount"
                                value={postP.price}
                            />
                            {buyBtn(auth, postP)}
                        </form>
                    </div>
                    
                    
                </div>
                
            </div>
            <div className=" pt-3 border-b-2 border-gray-300"></div>
        </div>
        
    );
}
