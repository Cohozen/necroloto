import React, { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
            {/* Triangle supérieur stylisé */}
            <polygon points="30,20 70,20 50,45" fill="currentColor" />

            {/* Triangle inférieur stylisé */}
            <polygon points="30,80 70,80 50,55" fill="currentColor" />

            {/* Sable tombant */}
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="60" r="3" fill="currentColor" />
        </svg>
    );
}
