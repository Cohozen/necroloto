"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

export const SWRProvider = ({ children }: { children: ReactNode }) => {
    return (
        <SWRConfig
            value={{
                fetcher: (url) => fetch(url).then((res) => res.json())
            }}
        >
            {children}
        </SWRConfig>
    );
};
