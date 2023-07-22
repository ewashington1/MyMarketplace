import { useState } from "react";

export default function FollowButtonForPost({
    className = "",
    disabled,
    children,
    follows,
    ...props
}) {
    const [hovering, setHovering] = useState(false);
    if (follows) {
        return (
            <button
                type="submit"
                {...props}
                className={
                    `inline-flex items-center text-gray-500 hover:text-red-400 font-semibold text-xs uppercase tracking-widest transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                onMouseOver={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                disabled={disabled}
            >
                {hovering ? "Unfollow" : "Following"}
            </button>
        );
    }

    return (
        <button
            type="submit"
            {...props}
            className={
                `inline-flex items-center hover:text-blue-300 font-semibold text-xs text-blue-500 uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
