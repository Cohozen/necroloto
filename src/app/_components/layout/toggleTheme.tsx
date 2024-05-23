"use client";

import { useEffect, useState } from "react";

export default function ToggleTheme() {
    const [theme, setTheme] = useState("");

    const toggleTheme = (evt: any) => {
        const newTheme = theme === "dim" ? "emerald" : "dim";

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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <input
                type="checkbox"
                data-toggle-theme="dim,emerald"
                className="toggle theme-controller"
                checked={theme === "emerald"}
                onChange={(e) => toggleTheme(e)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
            >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
        </label>
    );
}
