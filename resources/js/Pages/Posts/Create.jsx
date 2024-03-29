import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import SecondSecondaryButton from "@/components/SecondSecondaryButton";
import TextInput from "@/components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        caption: "",
        image: "",
        categories: [],
        price: "",
    });

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

        post(route("post", [data.caption, data.image, data.categories]));
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Post" />

            <div className="m-auto w-9/12 pt-5">
                <div className=" font-bold  text-4xl pb-4 border-b-2">
                    <h1>Create New Post: </h1>
                </div>
                <form
                    onSubmit={submit}
                    className="pt-4"
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel htmlFor="image" value="Photo" />

                        <input
                            id="image"
                            type="file"
                            name="image"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                            required
                        />

                        <InputError message={errors.image} className="mt-2" />
                    </div>

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
                            Post
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
