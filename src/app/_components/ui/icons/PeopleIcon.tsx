import React, { SVGProps } from "react";

export function PeopleIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <circle cx="15" cy="6" r="3" fill="currentColor" opacity=".4"></circle>
            <ellipse cx="16" cy="17" fill="currentColor" opacity=".4" rx="5" ry="3"></ellipse>
            <circle cx="9.001" cy="6" r="4" fill="currentColor"></circle>
            <ellipse cx="9.001" cy="17.001" fill="currentColor" rx="7" ry="4"></ellipse>
        </svg>
    );
}
