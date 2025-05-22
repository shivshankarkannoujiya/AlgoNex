import React from "react";

function Container({
    children,
    bgColor = "bg-teal-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <div
            className={`w-full max-w-7xl mx-auto px-4 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Container;
