import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
import { useState } from "react";

export default function Search({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: ""
    });

    const handleClick = (e, category) => {
        e.preventDefault();
        if (!data.searchTerm.includes(category)) {
            setData({ ...data, searchTerm: [...data.searchTerm, category] });
        } else {
            setData({
                ...data,
                searchTerm: data.searchTerm.filter((cat) => cat !== category),
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data.searchTerm);
        post(route("searchCompletion", [data.searchTerm]));
    };

    const capHandleClick = (e) => {
        e.preventDefault();
        setData({ searchTerm: "" });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search" />

            <div className=" grid grid-cols-8 gap-2 w-4/5 m-auto pt-2">
                <div className=" inline-block col-span-8 font-bold  text-xl pb-4 border-b-2">
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
                            {/* 
                            <div className="flex items-center justify-end mt-4">
                                <SecondSecondaryButton
                                    className="ml-4 inline-block"
                                    disabled={processing}
                                >
                                    Search
                                </SecondSecondaryButton>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
