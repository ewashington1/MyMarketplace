import { Link, Head, useForm } from "@inertiajs/react";
import { format, formatDistance, formatRelative } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
// import axios from "axios";

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
    // } else {
    //     return (
    //         <PrimaryButton type="submit">Owned at ${post.price}</PrimaryButton>
    //     );
    // }
}

export default function OnePost({ auth, postP }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
        post_id: postP.id,
        user_id: auth.user.id,
    });

    const pay = (e, value) => {
        e.preventDefault();
        setData({ amount: value, post_id: postP.id, user_id: auth.user.id });
    };

    useEffect(() => {
        if (data.amount !== "") {
            post(route("payment", data));
        }
    }, [data.amount]);
    return (
        <div className="col-span-5 col-start-3 h-full m-auto pt-4">
            <img src={`/storage/${postP.image}`} alt="post" />
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
                    <div className="">
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
