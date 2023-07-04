import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
import TextInput from "@/Components/TextInput";
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

    const click = () => {
        let j = "";

        for (let i = 0; i < data.categories.length; i++) {
            j += data.categories[i] + ",";
        }

        alert(j);
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
                        <InputLabel htmlFor="price" value="Price" />

                        <TextInput
                            id="price"
                            name="price"
                            value={data.price}
                            type="number"
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("price", e.target.value)}
                        />

                        <InputError message={errors.caption} className="mt-2" />
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
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Post
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
