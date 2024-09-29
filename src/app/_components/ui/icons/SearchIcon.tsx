import React, { SVGProps } from "react";

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <defs>
                <mask id="solarMinimalisticMagniferLineDuotone0">
                    <g fill="none" strokeWidth="1.5">
                        <circle cx="11.5" cy="11.5" r="9.5" stroke="gray"></circle>
                        <path stroke="#fff" strokeLinecap="round" d="m20 20l2 2"></path>
                    </g>
                </mask>
            </defs>
            <path
                fill="currentColor"
                d="M0 0h24v24H0z"
                mask="url(#solarMinimalisticMagniferLineDuotone0)"
            ></path>
        </svg>
    );
}
