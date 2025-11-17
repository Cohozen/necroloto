import React, { SVGProps } from "react";

export function LinkCircleIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                <path d="M14 12a6 6 0 1 1-6-6" />
                <path d="M10 12a6 6 0 1 1 6 6" opacity=".5" />
            </g>
        </svg>
    );
}
