import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import FormData from "form-data";

export default function UpdatePublicProfileForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const profile = user.profile; //user profile

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            displayName: profile.displayName,
            bio: profile.bio,
            url: profile.url,
            pfp: profile.pfp,
        });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("username", data.username);
        formData.append("displayName", data.displayName);
        formData.append("bio", data.bio);
        formData.append("url", data.url);
        formData.append("pfp", data.pfp);

        post(route("profile.update"), formData);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Public Profile Info
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your public profile
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <InputLabel htmlFor="displayName" value="Display Name" />

                    <TextInput
                        id="displayName"
                        className="mt-1 block w-full"
                        value={data.displayName ?? ""}
                        onChange={(e) => setData("displayName", e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.displayName} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="Bio" />

                    <TextInput
                        id="bio"
                        className="mt-1 block w-full"
                        value={data.bio ?? ""}
                        onChange={(e) => setData("bio", e.target.value)}
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.bio} />
                </div>

                <div>
                    <InputLabel htmlFor="url" value="Link" />

                    <TextInput
                        id="url"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.url ?? ""}
                        onChange={(e) => setData("url", e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.url} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="pfp" value="Profile Picture" />

                    <input
                        id="pfp"
                        type="file"
                        name="pfp"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("pfp", e.target.files[0])}
                    />

                    <InputError message={errors.pfp} className="mt-2" />
                </div>

                <input type="hidden" name="_method" value="PATCH" />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
