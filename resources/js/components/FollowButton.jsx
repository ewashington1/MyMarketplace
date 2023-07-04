export default function FollowButton({
    className = "",
    disabled,
    children,
    follows,
    ...props
}) {
    if (follows) {
        return (
            <button
                type="submit"
                {...props}
                className={
                    `inline-flex items-center px-4 py-2  text-blue-700 border border-5 border-blue-700 rounded-md font-semibold text-xs uppercase tracking-widest  active:bg-blue-700 active:text-white transition ease-in-out duration-150 ${
                        disabled && "opacity-25"
                    } ` + className
                }
                disabled={disabled}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            type="submit"
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-blue-700 border border-5 border-blue-700 rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
