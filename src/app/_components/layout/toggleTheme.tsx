"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { MoonIcon } from "@/ui/icons/MoonIcon";
import { SunIcon } from "@/ui/icons/SunIcon";
import { LaptopIcon } from "@/ui/icons/LaptopIcon";

export default function ToggleTheme() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

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
            radius="full"
            color="default"
            selectedKey={theme}
            onSelectionChange={(key) => setTheme(key.toString())}
        >
            <Tab key="dark" title={<MoonIcon className="w-4 h-4" />} />
            <Tab key="light" title={<SunIcon className="w-4 h-4" />} />
            <Tab key="system" title={<LaptopIcon className="w-4 h-4" />} />
        </Tabs>
    );
}
