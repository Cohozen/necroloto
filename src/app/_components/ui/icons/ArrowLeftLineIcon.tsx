import React, { SVGProps } from "react";

export function ArrowLeftLineIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="none">
                <path
                    fill="currentColor"
                    d="M20 12.75a.75.75 0 0 0 0-1.5zm0-1.5H4v1.5h16z"
                    opacity=".5"
                ></path>
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m10 6l-6 6l6 6"
                ></path>
            </g>
        </svg>
    );
}
