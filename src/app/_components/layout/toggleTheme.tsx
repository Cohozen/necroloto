"use client";

import { useEffect, useState } from "react";
import { MoonIcon } from "@/ui/icons/MoonIcon";
import { SunIcon } from "@/ui/icons/SunIcon";

export default function ToggleTheme() {
    const [theme, setTheme] = useState("");

    const toggleTheme = (_evt: any) => {
        const newTheme = theme === "necroloto-light" ? "necroloto-dark" : "necroloto-light";

        document.documentElement.setAttribute("data-theme", newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme && localTheme !== document.documentElement.getAttribute("data-theme")) {
            setTheme(localTheme);
            document.documentElement.setAttribute("data-theme", localTheme);
        }
    }, []);

    return (
        <label className="flex cursor-pointer gap-2 px-1">
            <MoonIcon className="w-6 h-6 text-base-content lg:text-primary-content" />

            <input
                type="checkbox"
                className="toggle theme-controller"
                checked={theme === "necroloto-light"}
                onChange={(e) => toggleTheme(e)}
            />

            <SunIcon className="w-6 h-6 text-base-content lg:text-primary-content" />
        </label>
    );
}
