import React, { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M3.25 12a.75.75 0 0 1 .75-.75h9.25v1.5H4a.75.75 0 0 1-.75-.75"
                clipRule="evenodd"
                opacity=".5"
            ></path>
            <path
                fill="currentColor"
                d="M13.25 12.75V18a.75.75 0 0 0 1.28.53l6-6a.75.75 0 0 0 0-1.06l-6-6a.75.75 0 0 0-1.28.53v5.25z"
            ></path>
        </svg>
    );
}
