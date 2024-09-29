"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";

import { MoonIcon } from "@/ui/icons/MoonIcon";
import { SunIcon } from "@/ui/icons/SunIcon";
import { SettingsIcon } from "@/ui/icons/SettingsIcon";
import { useTheme } from "next-themes";
import { LaptopIcon } from "@/ui/icons/LaptopIcon";

export default function ToggleTheme() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Tabs
            aria-label="Options"
            variant="bordered"
            size="sm"
            color="default"
            selectedKey={theme}
            onSelectionChange={(key) => setTheme(key.toString())}
        >
            <Tab key="dark" title={<MoonIcon className="w-4 h-4" />} />
            <Tab key="light" title={<SunIcon className="w-4 h-4" />} />
            <Tab key="system" title={<LaptopIcon className="w-4 h-4" />} />
        </Tabs>
    );

    // const [theme, setTheme] = useState("");
    //
    // const toggleTheme = (_evt: any) => {
    //     const newTheme = theme === "necroloto-light" ? "necroloto-dark" : "necroloto-light";
    //
    //     document.documentElement.setAttribute("data-theme", newTheme);
    //     setTheme(newTheme);
    //     localStorage.setItem("theme", newTheme);
    // };
    //
    // useEffect(() => {
    //     const localTheme = localStorage.getItem("theme");
    //     if (localTheme) {
    //         setTheme(localTheme);
    //         document.documentElement.setAttribute("data-theme", localTheme);
    //     }
    // }, []);

    // return (
    //     <label className="flex cursor-pointer gap-2 px-1">
    //         <MoonIcon className="w-6 h-6 text-base-content lg:text-primary-content" />
    //
    //         <input
    //             type="checkbox"
    //             className="toggle theme-controller"
    //             checked={theme === "necroloto-light"}
    //             onChange={(e) => toggleTheme(e)}
    //         />
    //
    //         <SunIcon className="w-6 h-6 text-base-content lg:text-primary-content" />
    //     </label>
    // );
}
