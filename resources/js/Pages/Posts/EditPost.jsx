import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

const EditPost = ({auth, postP, postCategories, categories, owner_id}) => {
    const { data, setData, patch, processing, errors, reset } = useForm({
        postId: postP.id,
        caption: postP.caption,
        categories: postCategories,
        price: postP.price,
    });
    console.log(data.categories);

    const handleClick = (e, category) => {
        e.preventDefault();
        if (!data.categories.includes(category)) {
            setData({ ...data, categories: [...data.categories, category] });
        } else {
            setData({
                ...data,
                categories: data.categories.filter((cat) => cat !== category),
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
    
        patch(route("post.update", {post: postP.id}), data);
    };
    
    if (auth.user.id !== owner_id) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Edit Post"/>
                <div className="m-auto w-9/12 pt-5">
                    <div className=" font-bold  text-4xl pb-4 border-b-2">
                        <h1>You're unauthorized to edit this post. </h1>
                    </div>
                </div>
            </AuthenticatedLayout>
        )
    }
    else {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Edit Post" />

                <div className="m-auto w-9/12 pt-5">
                    <div className=" font-bold  text-4xl pb-4 border-b-2">
                        <h1>Edit Post: </h1>
                    </div>
                    <form
                        onSubmit={submit}
                        className="pt-4 flex"
                        encType="multipart/form-data"
                    >
                        <div className="flex relative items-center justify-around p-4 mr-4 rounded-md bg-gray-300 shadow-md  w-1/2">
                            <img className="shadow-sm" src={`/storage/${postP.image}`} alt="post" />
                        </div>
                        <div>
                            <div className="mt-4">
                                <InputLabel htmlFor="caption" value="Caption" />

                                <TextInput
                                    id="caption"
                                    name="caption"
                                    value={data.caption}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("caption", e.target.value)}
                                />

                                <InputError message={errors.caption} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="price" value="Price (null, negative = not for sale)" />

                                <TextInput
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    type="number"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData("price", e.target.value)}
                                />

                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                Select categories:
                                {categories.map((category, index) => (
                                    <div className="pl-2 inline-block" key={index}>
                                        {" "}
                                        <SecondSecondaryButton
                                            className={`inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm  ${
                                                data.categories.includes(
                                                    category.category
                                                )
                                                    ? "bg-gray-700 text-white"
                                                    : "bg-white text-gray-700"
                                            } disabled:opacity-25 transition ease-in-out duration-150`}
                                            value={category.category}
                                            onClick={(e) =>
                                                handleClick(e, category.category)
                                            }
                                        >
                                            {category.category}
                                        </SecondSecondaryButton>
                                    </div>
                                ))}
                            </div>

                            {/* <SecondSecondaryButton onClick={click}>
                                See Categories Selected
                            </SecondSecondaryButton> */}

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="ml-4" disabled={processing}
                                >
                                    Confirm Edits
                                </PrimaryButton>
                            </div>
                        </div>

                        
                    </form>
                </div>
            </AuthenticatedLayout>
        );
    }
}

export default EditPost