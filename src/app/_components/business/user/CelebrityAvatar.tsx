"use client";

import { Celebrity } from "@prisma/client";
import Avatar from "@/components/ui/Avatar";

interface CelebrityAvatarProps {
    celebrity: Celebrity;
    size?: string;
}

export default function CelebrityAvatar({ celebrity, size }: CelebrityAvatarProps) {
    const names = celebrity.name.split(" ");
    const placeholder = `${(names[0] && names[0].slice(0, 1)) || ""}${
        (names[1] && names[1].slice(0, 1)) || ""
    }`;

    return celebrity.photo ? (
        <Avatar size={size} image={celebrity.photo} />
    ) : (
        <Avatar size={size} placeholder={placeholder} />
    );
}
