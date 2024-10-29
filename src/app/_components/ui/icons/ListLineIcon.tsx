import React, { SVGProps } from "react";

export function ListLineIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
                <path d="M20 7H4"></path>
                <path d="M15 12H4" opacity=".7"></path>
                <path d="M9 17H4" opacity=".4"></path>
            </g>
        </svg>
    );
}
