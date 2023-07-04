import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import SecondSecondaryButton from "@/Components/SecondSecondaryButton";
import { useState } from "react";

export default function Search({ auth, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        searchTerm: "",
        searchBy: "",
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
        post(route("searchCompletion", [data.searchTerm, data.searchBy]));
    };

    const [hideSearch, setHideSearch] = useState("hidden");
    const [hideCats, setHideCats] = useState("hidden");

    const [captionButtonClicked, setCaptionButtonClicked] = useState(
        "inline-flex items-center px-4 py-2 bg-white   rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm  disabled:opacity-25 transition ease-in-out duration-150"
    );
    const [categoryButtonClicked, setCategoryButtonClicked] = useState(
        "inline-flex items-center px-4 py-2 bg-white    rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm  disabled:opacity-25 transition ease-in-out duration-150"
    );

    const capHandleClick = (e) => {
        e.preventDefault();
        setData({ searchTerm: "" });
        setCaptionButtonClicked(
            "inline-flex items-center px-4 py-2 bg-gray-700    rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm  disabled:opacity-25 transition ease-in-out duration-150"
        );
        setCategoryButtonClicked(
            "inline-flex items-center px-4 py-2 bg-white    rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm  disabled:opacity-25 transition ease-in-out duration-150"
        );
        setData("searchBy", e.target.value);
        setHideCats("hidden");
        setHideSearch("inline-block pl-4");
    };

    const catHandleClick = (e) => {
        e.preventDefault();
        setData({ searchTerm: "" });
        setCategoryButtonClicked(
            "inline-flex items-center px-4 py-2 bg-gray-700   rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm  disabled:opacity-25 transition ease-in-out duration-150"
        );
        setCaptionButtonClicked(
            "inline-flex items-center px-4 py-2 bg-white    rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm disabled:opacity-25 transition ease-in-out duration-150"
        );
        setData("searchBy", e.target.value);
        setHideCats("mt-4 font-thin pt-4 border-t-2");
        setHideSearch("hidden");
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Search" />

            <div className=" grid grid-cols-8 gap-2 w-4/5 m-auto pt-2">
                <div className=" inline-block col-span-8 font-bold  text-xl pb-4 border-b-2">
                    {/* search by button */}
                    <div className="inline-block">
                        <h1 className="inline-block font-thin">Search by:</h1>
                        <div className="inline-block pl-3">
                            <SecondSecondaryButton
                                value="Caption"
                                onClick={capHandleClick}
                                className={captionButtonClicked}
                            >
                                Caption
                            </SecondSecondaryButton>
                        </div>
                        <div className="inline-block pl-3">
                            <SecondSecondaryButton
                                value="Category"
                                onClick={catHandleClick}
                                className={categoryButtonClicked}
                            >
                                Category
                            </SecondSecondaryButton>
                        </div>
                    </div>

                    {/* actual search form */}
                    <div className={hideSearch}>
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

                    {/* categories */}
                    <div className={hideCats}>
                        Select categories:
                        {categories.map((category, index) => (
                            <div className="pl-2 inline-block" key={index}>
                                <div>
                                    {" "}
                                    <SecondSecondaryButton
                                        className={`inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm  ${
                                            data.searchTerm.includes(
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
                            </div>
                        ))}
                        <div className="inline-block">
                            <SecondSecondaryButton
                                className="ml-4 inline-block"
                                disabled={processing}
                                type="submit"
                                onClick={submit}
                            >
                                Search
                            </SecondSecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
