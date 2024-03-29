import { useState } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import Dropdown from "@/components/Dropdown";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="inline-block pr-3 h-9 w-auto fill-current text-gray-800" />
                                    <p className="pl-3 inline-block border-l-2">
                                        MyMarketplace
                                    </p>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.show", user)}
                                        >
                                            My Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <header className="bg-white shadow">
                <div className="mx-auto w-2/3 text-center">
                    <div className="inline-block">
                        <Link
                            className="max-w-xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("home")}
                        >
                            Home
                        </Link>
                    </div>
                    <div className="inline-block">
                        <Link
                            className="max-w-6xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("explore")}
                        >
                            Explore
                        </Link>
                    </div>
                    <div className="inline-block">
                        <Link
                            className="max-w-7xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("search")}
                        >
                            Search
                        </Link>
                    </div>
                    <div className="inline-block">
                        <Link
                            className=" max-w-6xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("categories")}
                        >
                            Categories
                        </Link>
                    </div>
                    <div className="inline-block">
                        <Link
                            className=" max-w-6xl  mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("purchases")}
                        >
                            Purchases
                        </Link>
                    </div>
                    <div className="inline-block">
                        <Link
                            className=" max-w-6xl  mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("sales")}
                        >
                            Sales
                        </Link>
                    </div>
                    <div className="inline-block ">
                        <Link
                            className="max-w-6xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("notifications")}
                        >
                            Notifications
                        </Link>
                    </div>
                    <div className="inline-block ">
                        <Link
                            className="max-w-6xl mx-auto py-4 px-2 sm:px-4 lg:px-6 inline-block hover:bg-slate-300 hover:cursor-pointer duration-500"
                            href={route("likedPosts")}
                        >
                            Liked Posts
                        </Link>
                    </div>
                </div>
            </header>

            <div className="fixed bottom-6 right-6 text-8xl hover:duration-300 hover:text-9xl">
                <Link href={route("post.create")}>
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="text-green-500 text-8xl hover:text-green-700 static"
                    />
                </Link>
            </div>

            <main>{children}</main>
        </div>
    );
}
